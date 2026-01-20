import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react'
import { SEO, updatePageMeta } from '../utils/seo'
import FloatingLabelInput from '../components/ui/FloatingLabelInput'
import MultiStateButton from '../components/ui/MultiStateButton'
import { Toaster, toast } from 'sonner'
import { useEffect } from 'react'
// @ts-ignore
import ContactVisual from '../assets/profile/12.jpg'

export default function Contact() {
  useEffect(() => {
    updatePageMeta(SEO.contact.title, SEO.contact.description, SEO.contact.keywords)
  }, [])

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [sendVia, setSendVia] = useState<'email' | 'whatsapp'>('email')
  const [buttonState, setButtonState] = useState<'idle' | 'loading' | 'success'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      })
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formState.name) newErrors.name = "Name is required"
    if (!formState.email && sendVia === 'email') {
      newErrors.email = "Email is required"
    } else if (formState.email && !/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Invalid email address"
    }
    if (!formState.message) newErrors.message = "Message is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      toast.error("Please fix the errors in the form.", {
        style: { background: '#fee2e2', color: '#b91c1c', border: '1px solid #fecaca' }
      })
      return
    }

    setButtonState('loading')

    try {
      if (sendVia === 'whatsapp') {
        const text = `Hello BioVitam Team,%0A%0AMy name is ${formState.name}.%0AEmail: ${formState.email || 'N/A'}%0ASubject: ${formState.subject || 'Inquiry'}%0A%0A${formState.message}`
        window.open(`https://wa.me/254105800800?text=${text}`, '_blank')
        setButtonState('success')
        toast.success("Opening WhatsApp...")
      } else {
        // Simulating API call for email
        await new Promise(resolve => setTimeout(resolve, 2000))
        setButtonState('success')
        toast.success("Message sent successfully via Email!")
      }

      // Reset buffer
      setTimeout(() => {
        setButtonState('idle')
        if (sendVia === 'email') setFormState({ name: '', email: '', phone: '', subject: '', message: '' })
      }, 3000)

    } catch (err) {
      setButtonState('idle')
      toast.error("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="pt-24 pb-12 min-h-screen relative overflow-hidden">
      <Toaster position="top-right" expand={true} richColors />

      {/* Background Decor */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-biovitam-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-biovitam-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-biovitam-primary mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-sans">
            Have questions about our bio-fortified solutions? Our team of agronomists is ready to help you optimize your yield.
          </p>
        </motion.div>

        {/* Main Glass Card Container - Now with Background Image */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/50 min-h-[600px]">
          {/* Global Background Image for the Card */}
          <div className="absolute inset-0 z-0">
            <img src={ContactVisual} alt="Contact Support" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-biovitam-dark/60 mix-blend-multiply" /> {/* Tint */}
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 h-full">

            {/* Left: Contact Info - Transparent Glass */}
            <div className="p-10 text-white flex flex-col justify-center bg-biovitam-primary/20 backdrop-blur-sm border-r border-white/10">
              <div className="space-y-10">
                <div>
                  <h2 className="text-3xl font-bold mb-6 drop-shadow-md">Contact Information</h2>
                  <p className="text-white/90 leading-relaxed max-w-sm text-lg shadow-black/50 drop-shadow-sm">
                    Visit our demo farms or reach out directly for a consultation.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <a href="tel:0742500500" className="flex items-center space-x-4 group">
                      <div className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors backdrop-blur-md">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-white/70 uppercase font-bold tracking-wider">Phone / WhatsApp</p>
                        <p className="text-lg font-semibold group-hover:translate-x-1 transition-transform">0742 500 500</p>
                      </div>
                    </a>

                    <a href="tel:0105800800" className="flex items-center space-x-4 group">
                      <div className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors backdrop-blur-md">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-white/70 uppercase font-bold tracking-wider">Secondary Contact</p>
                        <p className="text-lg font-semibold group-hover:translate-x-1 transition-transform">0105 800 800</p>
                      </div>
                    </a>

                    <a href="https://wa.me/254105800800" target="_blank" className="flex items-center space-x-4 group">
                      <div className="w-12 h-12 bg-green-500/20 hover:bg-green-500/30 rounded-lg flex items-center justify-center transition-colors backdrop-blur-md border border-green-500/30">
                        <svg className="w-6 h-6 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.559 4.19 1.617 6.03L0 24l6.105-1.602a11.832 11.832 0 005.637 1.441h.005c6.634 0 12.032-5.38 12.035-12.015.002-3.217-1.251-6.242-3.528-8.52" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-green-400 uppercase font-bold tracking-wider">WhatsApp Direct</p>
                        <p className="text-lg font-semibold group-hover:translate-x-1 transition-transform">Start Chat</p>
                      </div>
                    </a>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-md">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-white/70 uppercase font-bold tracking-wider">Office</p>
                      <p className="text-lg font-semibold">Off Thika Road, Nairobi</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-md">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-white/70 uppercase font-bold tracking-wider">Working Hours</p>
                      <p className="text-lg font-medium">Mon - Fri: 8am - 5pm</p>
                      <p className="text-sm text-white/80">Sat: 9am - 1pm</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 flex space-x-4">
                  {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/30 bg-white/10 flex items-center justify-center hover:bg-white hover:text-biovitam-primary transition-all backdrop-blur-md">
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form - Fully Transparent Glass */}
            <div className="p-10 bg-white/10 backdrop-blur-md flex flex-col justify-center">
              <form onSubmit={handleSubmit} className="h-full flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-white mb-8 drop-shadow-md">Send us a Message</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                  <FloatingLabelInput
                    label="Your Name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                  <FloatingLabelInput
                    label="Phone Number"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                  />
                </div>

                <FloatingLabelInput
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  error={errors.email}
                />

                <FloatingLabelInput
                  label="Subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                />

                <FloatingLabelInput
                  label="How can we help?"
                  name="message"
                  multiline
                  value={formState.message}
                  onChange={handleChange}
                  error={errors.message}
                />

                <div className="mb-6">
                  <p className="text-sm font-bold text-white/70 uppercase tracking-widest mb-3">Send inquiry via:</p>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setSendVia('email')}
                      className={`flex-1 py-3 px-4 rounded-xl border transition-all flex items-center justify-center gap-2 ${sendVia === 'email'
                        ? 'bg-white text-biovitam-primary border-white shadow-lg'
                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                        }`}
                    >
                      <Mail size={18} /> Email
                    </button>
                    <button
                      type="button"
                      onClick={() => setSendVia('whatsapp')}
                      className={`flex-1 py-3 px-4 rounded-xl border transition-all flex items-center justify-center gap-2 ${sendVia === 'whatsapp'
                        ? 'bg-green-500 text-white border-green-500 shadow-lg'
                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                        }`}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.559 4.19 1.617 6.03L0 24l6.105-1.602a11.832 11.832 0 005.637 1.441h.005c6.634 0 12.032-5.38 12.035-12.015.002-3.217-1.251-6.242-3.528-8.52" />
                      </svg> WhatsApp
                    </button>
                  </div>
                </div>

                <MultiStateButton
                  buttonState={buttonState}
                  type="submit"
                  idleText={sendVia === 'whatsapp' ? "Chat on WhatsApp" : "Send Email"}
                  className="w-full md:w-auto self-start mt-4 shadow-xl"
                />
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <section className="mt-20 relative rounded-organic overflow-hidden shadow-lg border border-white/50 h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.857997645851!2d36.855!3d-1.255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTUnMTguMCJTIDM2wrA1MScxOC4wIkU!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'saturate(50%) contrast(1.2)' }}
            allowFullScreen={true}
            loading="lazy"
            title="Google Map"
          ></iframe>

          {/* Map Overlay Card */}
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-6 rounded-organic shadow-xl max-w-xs border border-white/60 hidden md:block">
            <h4 className="font-bold text-biovitam-primary mb-1">Nova Gardens HQ</h4>
            <p className="text-sm text-gray-600 mb-2">P.O. Box 45678, Nairobi</p>
            <a href="https://maps.google.com" target="_blank" className="text-xs font-bold text-biovitam-secondary hover:underline flex items-center gap-1">
              Get Directions <Send className="w-3 h-3" />
            </a>
          </div>
        </section>

      </div>
    </div>
  )
}
