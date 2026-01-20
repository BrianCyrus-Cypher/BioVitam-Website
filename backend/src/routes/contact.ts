import { Router, Request, Response } from 'express'
import { contactFormSchema } from '../schemas.js'
import { sendContactEmail } from '../services/emailService.js'

const router = Router()

router.post('/submit', async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validatedData = contactFormSchema.parse(req.body)

    // Send email
    await sendContactEmail(
      validatedData.name,
      validatedData.email,
      validatedData.phone,
      validatedData.message,
      validatedData.subject
    )

    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully. We will contact you soon!',
    })
  } catch (error: any) {
    console.error('Contact form error:', error)

    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        errors: error.errors.map((e: any) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      })
    }

    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
    })
  }
})

export default router
