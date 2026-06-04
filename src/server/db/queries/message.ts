import { and, desc, eq, sql } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'

import type { MessageEntryItem } from '@/lib/validators/message'
import { db } from '@/server/db'
import { messageEntries, messageReactions, users } from '@/server/db/schema'

const fetchMessageEntries = async (
  currentUserId?: string | null
): Promise<MessageEntryItem[]> => {
  // Fetch entries first
  const entries = await db
    .select({
      id: messageEntries.id,
      name: messageEntries.name,
      message: messageEntries.message,
      signature: messageEntries.signature,
      userId: messageEntries.userId,
      role: users.role,
      banned: users.banned,
      createdAt: messageEntries.createdAt,
      editedAt: messageEntries.editedAt,
    })
    .from(messageEntries)
    .innerJoin(users, eq(users.id, messageEntries.userId))
    .orderBy(desc(messageEntries.createdAt))

  if (entries.length === 0) {
    return []
  }

  // Fetch all reactions
  const allReactions = await db
    .select({
      entryId: messageReactions.entryId,
      emoji: messageReactions.emoji,
      count: sql<number>`count(*)`.mapWith(Number),
      reacted: currentUserId
        ? sql<boolean>`max(case when ${messageReactions.userId} = ${currentUserId} then true else false end)`
        : sql<boolean>`false`,
    })
    .from(messageReactions)
    .groupBy(messageReactions.entryId, messageReactions.emoji)

  // Group reactions by entry ID
  const reactionsMap = new Map<number, typeof allReactions>()
  for (const reaction of allReactions) {
    if (!reactionsMap.has(reaction.entryId)) {
      reactionsMap.set(reaction.entryId, [])
    }
    reactionsMap.get(reaction.entryId)!.push(reaction)
  }

  return entries.map((entry) => ({
    id: entry.id,
    name: entry.name,
    message: entry.message,
    signature: entry.signature ?? null,
    userId: entry.userId,
    role: entry.role,
    banned: entry.banned ?? false,
    createdAt: entry.createdAt.toISOString(),
    editedAt: entry.editedAt?.toISOString() ?? null,
    reactions: (reactionsMap.get(entry.id) || []).map((r) => ({
      emoji: r.emoji,
      count: r.count,
      reacted: r.reacted,
    })),
  }))
}

export const getMessageEntries = (currentUserId?: string | null) =>
  unstable_cache(
    () => fetchMessageEntries(currentUserId),
    ['message', currentUserId ?? 'anonymous'],
    {
      tags: ['message'],
    }
  )()

export const deleteMessageEntry = async (
  entryId: number,
  userId: string,
  isAdmin = false
) => {
  const deleted = await db
    .delete(messageEntries)
    .where(
      isAdmin
        ? eq(messageEntries.id, entryId)
        : and(eq(messageEntries.id, entryId), eq(messageEntries.userId, userId))
    )
    .returning({
      id: messageEntries.id,
      signature: messageEntries.signature,
    })

  return deleted.length > 0 ? deleted[0] : null
}
