import { z } from 'zod'

// Input schemas
export const MessageEntrySchema = z.object({
  message: z
    .string()
    .trim()
    .min(3, { message: 'Message must be at least 3 characters.' })
    .max(500, { message: 'Message must be under 500 characters.' }),
  signature: z
    .string()
    .startsWith('data:image/png;base64,', {
      message: 'Signature must be a PNG data URL.',
    })
    .max(200_000, { message: 'Signature is too large.' })
    .optional(),
})

export const MessageReactionSchema = z.object({
  entryId: z.number().int().positive(),
  emoji: z.string().min(1).max(12),
})

export const MessageEntryIdSchema = z.object({
  entryId: z.number().int().positive(),
})

export const MessageEditSchema = MessageEntrySchema.merge(MessageEntryIdSchema)

export const MessageDeleteSchema = MessageEntryIdSchema
export const MessageBanUserSchema = z.object({
  userId: z.string().min(1),
  action: z.enum(['ban', 'unban']),
})

export const MessageModerationInputSchema = MessageEntrySchema.pick({
  message: true,
  signature: true,
})

export const ModerationResultSchema = z.object({
  allowed: z.boolean(),
  reason: z.string().min(1).max(120),
})

// Output schemas
export const MessageReactionItemSchema = z.object({
  emoji: z.string(),
  count: z.number(),
  reacted: z.boolean(),
})

export const MessageEntryItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  message: z.string(),
  signature: z.string().nullable(),
  userId: z.string(),
  role: z.string(),
  banned: z.boolean(),
  createdAt: z.string(),
  editedAt: z.string().nullable(),
  reactions: z.array(MessageReactionItemSchema),
})

// Inferred types
export type MessageEntry = z.infer<typeof MessageEntrySchema>
export type MessageReaction = z.infer<typeof MessageReactionSchema>
export type MessageEdit = z.infer<typeof MessageEditSchema>
export type MessageDelete = z.infer<typeof MessageDeleteSchema>
export type MessageBanUser = z.infer<typeof MessageBanUserSchema>
export type MessageModerationInput = z.infer<
  typeof MessageModerationInputSchema
>
export type MessageModerationResult = z.infer<typeof ModerationResultSchema>
export type MessageReactionItem = z.infer<typeof MessageReactionItemSchema>
export type MessageEntryItem = z.infer<typeof MessageEntryItemSchema>
