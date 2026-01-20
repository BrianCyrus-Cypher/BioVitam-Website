import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export const sendContactEmail = async (
  name: string,
  email: string,
  phone: string,
  message: string,
  subject?: string
) => {
  try {
    // Email to company
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.CONTACT_EMAIL_TO,
      subject: subject || `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    // Confirmation email to user
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'We received your message - Biovitam',
      html: `
        <h2>Thank you for contacting Biovitam!</h2>
        <p>Hello ${name},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <hr />
        <p><strong>Your Message Details:</strong></p>
        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr />
        <p>Best regards,<br/>Biovitam Team</p>
      `,
    })

    return { success: true, message: 'Email sent successfully' }
  } catch (error) {
    console.error('Email sending error:', error)
    throw new Error('Failed to send email')
  }
}
