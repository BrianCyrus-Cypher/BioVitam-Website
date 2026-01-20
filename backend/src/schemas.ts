import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string()
    .regex(/^(\+254|0)[0-9]{9}$/, 'Phone must be valid Kenyan number (+254... or 0...)'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(200).optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
