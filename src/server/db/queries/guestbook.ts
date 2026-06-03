import { and, desc, eq, sql } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'

import type { GuestbookEntryItem } from '@/lib/validators/guestbook'
import { db } from '@/server/db'
import { guestbookEntries, guestbookReactions, users } from '@/server/db/schema'

const fetchGuestbookEntries = async (
  currentUserId?: string | null
): Promise<GuestbookEntryItem[]> => {
  // Fetch entries first
  const entries = await db
    .select({
      id: guestbookEntries.id,
      name: guestbookEntries.name,
      message: guestbookEntries.message,
      signature: guestbookEntries.signature,
      userId: guestbookEntries.userId,
      role: users.role,
      banned: users.banned,
      createdAt: guestbookEntries.createdAt,
      editedAt: guestbookEntries.editedAt,
    })
    .from(guestbookEntries)
    .innerJoin(users, eq(users.id, guestbookEntries.userId))
    .orderBy(desc(guestbookEntries.createdAt))

  if (entries.length === 0) {
    return []
  }

  // Fetch all reactions
  const allReactions = await db
    .select({
      entryId: guestbookReactions.entryId,
      emoji: guestbookReactions.emoji,
      count: sql<number>`count(*)`.mapWith(Number),
      reacted: currentUserId
        ? sql<boolean>`max(case when ${guestbookReactions.userId} = ${currentUserId} then true else false end)`
        : sql<boolean>`false`,
    })
    .from(guestbookReactions)
    .groupBy(guestbookReactions.entryId, guestbookReactions.emoji)

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

export const getGuestbookEntries = (currentUserId?: string | null) =>
  unstable_cache(
    () => fetchGuestbookEntries(currentUserId),
    ['guestbook', currentUserId ?? 'anonymous'],
    {
      tags: ['guestbook'],
    }
  )()

export const deleteGuestbookEntry = async (
  entryId: number,
  userId: string,
  isAdmin = false
) => {
  const deleted = await db
    .delete(guestbookEntries)
    .where(
      isAdmin
        ? eq(guestbookEntries.id, entryId)
        : and(
            eq(guestbookEntries.id, entryId),
            eq(guestbookEntries.userId, userId)
          )
    )
    .returning({
      id: guestbookEntries.id,
      signature: guestbookEntries.signature,
    })

  return deleted.length > 0 ? deleted[0] : null
}
