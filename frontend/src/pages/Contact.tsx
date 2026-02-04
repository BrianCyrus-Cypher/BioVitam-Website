import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, Send, Quote } from 'lucide-react'
import { SEO, updatePageMeta } from '../utils/seo'
import { api } from '../utils/api'
import FloatingLabelInput from '../components/ui/FloatingLabelInput'
import MultiStateButton from '../components/ui/MultiStateButton'
import { Toaster, toast } from 'sonner'
import BobbyImg from '../assets/profile/Bobby.jpg'
import BackgroundImg from '../assets/profile/rift valley.jpg'

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
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' })
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
            toast.error("Please fill in all required fields.")
            return
        }
        setButtonState('loading')
        try {
            if (sendVia === 'whatsapp') {
                const text = `*New Inquiry from BioVitam Website*%0A%0A*Name:* ${formState.name}%0A*Phone:* ${formState.phone || 'N/A'}%0A*Email:* ${formState.email || 'N/A'}%0A*Subject:* ${formState.subject || 'N/A'}%0A%0A*Message:*%0A${formState.message}`
                window.open(`https://wa.me/254742500500?text=${text}`, '_blank')
                setButtonState('success')
                toast.success("Opening WhatsApp...")
            } else {
                await api.contact(formState)
                setButtonState('success')
                toast.success("Inquiry dispatched successfully!")
            }
            setTimeout(() => {
                setButtonState('idle')
                if (sendVia === 'email') setFormState({ name: '', email: '', phone: '', subject: '', message: '' })
            }, 3000)
        } catch (err) {
            setButtonState('idle')
            // Tooltip error is handled by the API interceptor
        }
    }

    return (
        <div className="relative min-h-screen bg-biovitam-light dark:bg-biovitam-dark overflow-hidden transition-colors duration-300">
            {/* Background Image with Theme-Aware Overlay */}
            <div className="fixed inset-0 z-0">
                <img
                    src={BackgroundImg}
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                {/* Light Mode Overlay: Clean, bright, allowing image to show */}
                <div className="absolute inset-0 bg-white/60 dark:bg-biovitam-dark/80 backdrop-blur-[2px] transition-all duration-300" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white dark:from-biovitam-dark/60 dark:via-biovitam-dark/80 dark:to-biovitam-dark transition-all duration-300" />
            </div>

            <Toaster position="top-right" richColors />

            <div className="relative z-10 pt-32 pb-20">
                <div className="content-container">
                    <div className="max-w-7xl mx-auto">
                        {/* Header Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-20"
                        >
                            <div className="inline-flex items-center gap-2 mb-6 px-6 py-2.5 rounded-full bg-biovitam-primary text-white font-black text-xs tracking-[0.3em] uppercase shadow-[0_0_20px_rgba(76,175,80,0.4)] glow-text-white border border-white/20">
                                Expert Consultation
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-biovitam-dark dark:text-white mb-8 tracking-tighter leading-none transition-colors">
                                Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-biovitam-primary to-biovitam-secondary">Agriculture.</span>
                            </h1>
                            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed transition-colors">
                                Our agronomists are ready to help you optimize your plantation with specialized bio-protocols.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-stretch">
                            {/* Profile Column (Left 5) */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="xl:col-span-5"
                            >
                                <div className="h-full bg-white/30 dark:bg-black/40 backdrop-blur-xl p-10 rounded-[4rem] border border-white/40 dark:border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between transition-all">
                                    {/* Decorative Glow */}
                                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-biovitam-secondary/30 dark:bg-biovitam-secondary/20 rounded-full blur-[100px]" />
                                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-biovitam-primary/30 dark:bg-biovitam-primary/20 rounded-full blur-[100px]" />

                                    <div className="relative z-10">
                                        <div className="flex flex-col items-center text-center mb-10">
                                            <div className="relative group mb-8">
                                                <div className="absolute inset-0 bg-biovitam-secondary/50 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700 opacity-0 group-hover:opacity-100" />
                                                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-8 border-white/50 dark:border-white/10 shadow-3xl">
                                                    <img src={BobbyImg} alt="Bobby Wangae" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                </div>
                                                <div className="absolute bottom-4 right-4 w-12 h-12 bg-biovitam-secondary rounded-full flex items-center justify-center border-4 border-white dark:border-biovitam-dark text-white">
                                                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                                                </div>
                                            </div>

                                            <h2 className="text-3xl font-black text-biovitam-dark dark:text-white glow-text-white mb-2 transition-colors">Bobby Wangae</h2>
                                            <p className="text-biovitam-primary dark:text-biovitam-secondary font-black text-sm uppercase tracking-[0.3em] mb-8 drop-shadow-sm">Telesales & Marketing</p>

                                            <div className="max-w-md mx-auto relative px-8">
                                                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-biovitam-primary/30" />
                                                <p className="italic text-gray-700 dark:text-gray-300 text-lg leading-relaxed font-medium transition-colors">
                                                    &quot;Precision nutrition is the master key to sustainable yield. I&apos;m here to guide you through our specialized bio-protocols.&quot;
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4">
                                            <a href="tel:254742500500" className="flex items-center gap-5 p-6 rounded-3xl bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/10 hover:border-biovitam-secondary hover:bg-white/60 dark:hover:bg-white/10 transition-all group/item">
                                                <div className="w-14 h-14 rounded-2xl bg-biovitam-secondary/20 flex items-center justify-center text-biovitam-secondary group-hover/item:scale-110 transition-transform">
                                                    <Phone size={24} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-gray-600 dark:text-white/50 uppercase tracking-widest mb-1 group-hover/item:text-biovitam-secondary transition-colors">Direct Lines</p>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-xl font-bold text-biovitam-dark dark:text-white tracking-tight">0742 500 500</span>
                                                        <span className="text-xl font-bold text-biovitam-dark dark:text-white tracking-tight">0105 800 800</span>
                                                    </div>
                                                </div>
                                            </a>

                                            <a href="mailto:info@novagardens.co.ke" className="flex items-center gap-5 p-6 rounded-3xl bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/10 hover:border-biovitam-primary hover:bg-white/60 dark:hover:bg-white/10 transition-all group/item">
                                                <div className="w-14 h-14 rounded-2xl bg-biovitam-primary/20 flex items-center justify-center text-biovitam-primary group-hover/item:scale-110 transition-transform">
                                                    <Mail size={24} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-gray-600 dark:text-white/50 uppercase tracking-widest mb-1 group-hover/item:text-biovitam-primary transition-colors">Corporate Email</p>
                                                    <p className="text-xl font-bold text-biovitam-dark dark:text-white tracking-tight">info@biovitam.co.ke</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="relative z-10 mt-10 pt-10 border-t border-black/10 dark:border-white/10 flex justify-center gap-6">
                                        {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                                            <a key={i} href="#" className="w-14 h-14 rounded-2xl border border-black/10 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-biovitam-primary dark:hover:text-white hover:border-biovitam-primary dark:hover:border-white transition-all hover:-translate-y-1 bg-white/20 dark:bg-transparent">
                                                <Icon size={24} />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Form Column (Right 7) */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="xl:col-span-7"
                            >
                                <div className="h-full glass-panel p-10 md:p-14 rounded-[4rem] border border-white/20 shadow-3xl bg-black/40 backdrop-blur-2xl">
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                                            <div>
                                                <h3 className="text-4xl font-black text-white mb-2">Grow with us.</h3>
                                                <p className="text-gray-400 font-medium tracking-wide">Expected response in under 12 working hours.</p>
                                            </div>
                                            <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10">
                                                <button type="button" onClick={() => setSendVia('email')} className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${sendVia === 'email' ? 'bg-white text-biovitam-dark shadow-xl' : 'text-gray-400 hover:text-white'}`}>Email</button>
                                                <button type="button" onClick={() => setSendVia('whatsapp')} className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${sendVia === 'whatsapp' ? 'bg-green-500 text-white shadow-xl shadow-green-500/20' : 'text-gray-400 hover:text-white'}`}>WhatsApp</button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <FloatingLabelInput label="Full Name" name="name" value={formState.name} onChange={handleChange} error={errors.name} theme="dark" />
                                            <FloatingLabelInput label="Contact Number" name="phone" value={formState.phone} onChange={handleChange} theme="dark" />
                                        </div>
                                        <div className="grid grid-cols-1 gap-8">
                                            <FloatingLabelInput label="Inquiry Subject" name="subject" value={formState.subject} onChange={handleChange} theme="dark" />
                                            <FloatingLabelInput label="Email Address" type="email" name="email" value={formState.email} onChange={handleChange} error={errors.email} theme="dark" />
                                        </div>
                                        <FloatingLabelInput label="How can we assist your farm?" multiline name="message" value={formState.message} onChange={handleChange} error={errors.message} theme="dark" />

                                        <div className="pt-6">
                                            <MultiStateButton
                                                buttonState={buttonState}
                                                type="submit"
                                                idleText={sendVia === 'whatsapp' ? "Consult on WhatsApp" : "Dispatch Inquiry"}
                                                className={`w-full h-20 rounded-[2.5rem] text-xl font-black transition-all duration-500 shadow-2xl ${sendVia === 'whatsapp' ? 'bg-green-500 hover:bg-green-600 shadow-green-500/20' : 'shadow-biovitam-primary/20'}`}
                                            />

                                            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                {[
                                                    { icon: <Clock size={20} />, text: "8AM — 5PM" },
                                                    { icon: <Send size={20} />, text: "Regional HQ" }
                                                ].map((item, i) => (
                                                    <div key={i} className="flex items-center gap-3 text-white/60">
                                                        <div className="text-biovitam-primary navbar-icon-glow">{item.icon}</div>
                                                        <span className="text-xs font-bold uppercase tracking-widest">{item.text}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Embedded Map */}
                                            <div className="mt-10 rounded-3xl overflow-hidden border border-white/10 h-64 md:h-80 shadow-2xl relative group">
                                                <iframe
                                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.943141159938!2d36.9038089!3d-1.1999201999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3fc96564619d%3A0xe7268d660879e60a!2sBiovitam%20(Nova%20Gardens%20Ltd)!5e0!3m2!1sen!2ske!4v1738500642991!5m2!1sen!2ske"
                                                    width="100%"
                                                    height="100%"
                                                    style={{ border: 0, filter: 'grayscale(1) contrast(1.2) opacity(0.8)' }}
                                                    allowFullScreen
                                                    loading="lazy"
                                                    referrerPolicy="no-referrer-when-downgrade"
                                                    title="BioVitam Location"
                                                    className="group-hover:grayscale-0 transition-all duration-700"
                                                />
                                                <div className="absolute top-4 right-4 z-10">
                                                    <a
                                                        href="https://maps.app.goo.gl/DkzV6B8p2j6v6mY9A"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="bg-biovitam-dark/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white text-[10px] font-black tracking-widest flex items-center gap-2 hover:bg-biovitam-primary transition-colors"
                                                    >
                                                        <MapPin size={12} /> OPEN IN MAPS
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
