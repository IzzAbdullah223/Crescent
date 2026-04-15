import z from 'zod'

export const profileSchema = z.object({
displayName: z.string().min(1, 'Name required').max(50),
bio: z.string().max(160).optional(),
website: z.literal('').or(z.string().url('Invalid URL')).optional(),
github: z.literal('').or(z.string().url('Invalid URL')).optional(),
})