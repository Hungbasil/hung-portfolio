'use server'

import { del, put } from '@vercel/blob'
import { and, eq } from 'drizzle-orm'
import { revalidatePath, updateTag } from 'next/cache'
import { headers } from 'next/headers'
import { type Base64FileParts, parseB64File } from '@/lib/files'
import { ActionError, actionClient } from '@/lib/safe-action/client'
import type { ActionContext } from '@/lib/safe-action/middleware'
import { botIdMiddleware, userMiddleware } from '@/lib/safe-action/middleware'
import {
  type MessageBanUser,
  MessageBanUserSchema,
  type MessageDelete,
  MessageDeleteSchema,
  type MessageEdit,
  MessageEditSchema,
  type MessageEntry,
  MessageEntrySchema,
  type MessageReaction,
  MessageReactionSchema,
} from '@/lib/validators'
import { auth } from '@/server/auth'
import { db } from '@/server/db'
import { deleteMessageEntry } from '@/server/db/queries/message'
import { messageEntries, messageReactions, users } from '@/server/db/schema'
import { moderateEntry } from './utils/moderation'

const protectedMessageAction = actionClient
  .use(botIdMiddleware)
  .use(userMiddleware)

export const createMessageEntry = protectedMessageAction
  .inputSchema(MessageEntrySchema)
  .action(
    async ({
      parsedInput,
      ctx,
    }: {
      parsedInput: MessageEntry
      ctx: ActionContext
    }) => {
      const { user } = ctx
      const name = user.name ?? 'Guest'

      let parsedSignature: Base64FileParts | null = null

      if (parsedInput.signature) {
        parsedSignature = parseB64File(parsedInput.signature)

        if (!parsedSignature || parsedSignature.mediaType !== 'image/png') {
          throw new ActionError('Signature must be a PNG data URL.')
        }
      }

      const moderation = await moderateEntry({
        message: parsedInput.message,
        signature: parsedSignature ?? undefined,
      })

      if (!moderation.allowed) {
        throw new ActionError(moderation.reason)
      }

      let signatureUrl: string | null = null

      if (parsedSignature) {
        const buffer = Buffer.from(parsedSignature.data, 'base64')
        const blob = await put(
          `messages/signatures/${user.id}-${Date.now()}.png`,
          buffer,
          {
            access: 'public',
            contentType: 'image/png',
            cacheControlMaxAge: 31_536_000,
          }
        )
        signatureUrl = blob.url
      }

      await db.insert(messageEntries).values({
        userId: user.id,
        name,
        message: parsedInput.message,
        signature: signatureUrl,
      })

      revalidatePath('/message')
      updateTag('message')

      return { success: true }
    }
  )

export const toggleMessageReaction = protectedMessageAction
  .inputSchema(MessageReactionSchema)
  .action(
    async ({
      parsedInput,
      ctx,
    }: {
      parsedInput: MessageReaction
      ctx: ActionContext
    }) => {
      const { user } = ctx
      const { entryId, emoji } = parsedInput

      const deleted = await db
        .delete(messageReactions)
        .where(
          and(
            eq(messageReactions.entryId, entryId),
            eq(messageReactions.userId, user.id),
            eq(messageReactions.emoji, emoji)
          )
        )
        .returning({ entryId: messageReactions.entryId })

      if (deleted.length === 0) {
        await db
          .insert(messageReactions)
          .values({
            entryId,
            userId: user.id,
            emoji,
          })
          .onConflictDoNothing()
      }

      revalidatePath('/message')
      updateTag('message')

      return { success: true }
    }
  )

export const editMessageEntry = protectedMessageAction
  .inputSchema(MessageEditSchema)
  .action(
    async ({
      parsedInput,
      ctx,
    }: {
      parsedInput: MessageEdit
      ctx: ActionContext
    }) => {
      const { user } = ctx
      const isAdmin = user.role === 'admin'

      const moderation = await moderateEntry({
        message: parsedInput.message,
        signature: undefined,
      })

      if (!moderation.allowed) {
        throw new ActionError(moderation.reason)
      }

      const updated = await db
        .update(messageEntries)
        .set({
          message: parsedInput.message,
          editedAt: new Date(),
        })
        .where(
          isAdmin
            ? eq(messageEntries.id, parsedInput.entryId)
            : and(
                eq(messageEntries.id, parsedInput.entryId),
                eq(messageEntries.userId, user.id)
              )
        )
        .returning({ id: messageEntries.id })

      if (updated.length === 0) {
        throw new ActionError('Unable to edit this message.')
      }

      revalidatePath('/message')
      updateTag('message')

      return { success: true }
    }
  )

export const removeMessageEntry = protectedMessageAction
  .inputSchema(MessageDeleteSchema)
  .action(
    async ({
      parsedInput,
      ctx,
    }: {
      parsedInput: MessageDelete
      ctx: ActionContext
    }) => {
      const { user } = ctx
      const isAdmin = user.role === 'admin'
      const removed = await deleteMessageEntry(
        parsedInput.entryId,
        user.id,
        isAdmin
      )

      if (!removed) {
        throw new ActionError('Unable to delete this message.')
      }

      if (removed.signature) {
        try {
          await del(removed.signature)
        } catch (error) {
          console.error('Failed to delete message signature blob:', {
            entryId: parsedInput.entryId,
            signature: removed.signature,
            error:
              error instanceof Error
                ? { name: error.name, message: error.message }
                : String(error),
          })
        }
      }

      revalidatePath('/message')
      updateTag('message')

      return { success: true }
    }
  )

export const banMessageUser = protectedMessageAction
  .inputSchema(MessageBanUserSchema)
  .action(
    async ({
      parsedInput,
      ctx,
    }: {
      parsedInput: MessageBanUser
      ctx: ActionContext
    }) => {
      const { user } = ctx
      const isAdmin = user.role === 'admin'

      if (!isAdmin) {
        throw new ActionError('Only admins can ban users.')
      }

      if (parsedInput.userId === user.id) {
        throw new ActionError('You cannot ban your own account.')
      }

      const [targetUser] = await db
        .select({
          role: users.role,
          banned: users.banned,
        })
        .from(users)
        .where(eq(users.id, parsedInput.userId))
        .limit(1)

      if (!targetUser) {
        throw new ActionError('User not found.')
      }

      if (targetUser.role === 'admin') {
        throw new ActionError('Admin accounts cannot be banned from here.')
      }

      if (parsedInput.action === 'ban') {
        if (targetUser.banned) {
          throw new ActionError('This user is already banned.')
        }

        await auth.api.banUser({
          body: {
            userId: parsedInput.userId,
            banReason: 'Banned by an admin from the message board.',
          },
          headers: await headers(),
        })
      } else {
        if (!targetUser.banned) {
          throw new ActionError('This user is not banned.')
        }

        await auth.api.unbanUser({
          body: {
            userId: parsedInput.userId,
          },
          headers: await headers(),
        })
      }

      revalidatePath('/message')
      updateTag('message')

      return { success: true }
    }
  )
