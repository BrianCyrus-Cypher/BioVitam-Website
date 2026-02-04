import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { updatePageMeta } from '../utils/seo'
import { ChevronLeft, ChevronRight, Quote, ZoomIn } from 'lucide-react'
import { Lightbox } from '../components/ui/Lightbox'

import ClientImg1 from '../assets/profile/7.jpg'
import ClientImg2 from '../assets/profile/8.jpg'

import { CLIENTELE_DATA } from '../data/seed'
import { api } from '../utils/api'

export default function Clientele() {
    const [testimonials, setTestimonials] = useState<any[]>([]) // eslint-disable-line @typescript-eslint/no-explicit-any
    const [currentIndex, setCurrentIndex] = useState(0)
    const [lightbox, setLightbox] = useState({ isOpen: false, src: '', alt: '' })
    const [isLoading, setIsLoading] = useState(true)

    const openLightbox = (src: string, alt: string) => {
        setLightbox({ isOpen: true, src, alt })
    }

    useEffect(() => {
        updatePageMeta("Clientele | BioVitam", "Our partners and success stories.", "clients, testimonials, reviews, success stories")

        const fetchClientele = async () => {
            try {
                const data = await api.getClientele()
                const clientImages = [ClientImg1, ClientImg2];
                if (data && data.length > 0) {
                    const mapped = data.map((c: any, index: number) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
                        id: c.id,
                        image: clientImages[index % clientImages.length],
                        name: c.name,
                        role: c.category,
                        quote: c.feedback,
                        location: c.location
                    }))
                    setTestimonials(mapped)
                } else {
                    setTestimonials(CLIENTELE_DATA.map((c, index) => ({
                        id: c.id,
                        image: clientImages[index % clientImages.length],
                        name: c.name,
                        role: c.category,
                        quote: c.feedback,
                        location: c.location
                    })))
                }
            } catch (err) {
                // eslint-disable-next-line no-console
                console.warn('Failed to fetch clientele, using fallback.', err)
                const clientImages = [ClientImg1, ClientImg2];
                setTestimonials(CLIENTELE_DATA.map((c, index) => ({
                    id: c.id,
                    image: clientImages[index % clientImages.length],
                    name: c.name,
                    role: c.category,
                    quote: c.feedback,
                    location: c.location
                })))
            } finally {
                setIsLoading(false)
            }
        }

        fetchClientele()
    }, [])

    useEffect(() => {
        if (testimonials.length === 0) return
        // Auto-advance slideshow
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [testimonials.length])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-biovitam-light dark:bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-biovitam-olive"></div>
            </div>
        )
    }

    const nextSlide = () => {
        if (testimonials.length === 0) return
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }

    const prevSlide = () => {
        if (testimonials.length === 0) return
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    return (
        <div className="min-h-screen pt-20 bg-biovitam-light dark:bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-extrabold text-biovitam-dark dark:text-white mb-4"
                    >
                        Our Esteemed <span className="text-biovitam-olive">Clientele</span>
                    </motion.h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Trusted by the region&apos;s leading growers to deliver results that matter.
                    </p>
                </div>

                {/* Slideshow Container */}
                <div className="relative max-w-5xl mx-auto h-[600px] rounded-organic-lg overflow-hidden shadow-2xl bg-black group/slider">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-0 cursor-zoom-in"
                            onClick={() => openLightbox(testimonials[currentIndex].image, testimonials[currentIndex].name)}
                        >
                            <img
                                src={testimonials[currentIndex].image}
                                alt={testimonials[currentIndex].name}
                                className="w-full h-full object-cover opacity-60 group-hover/slider:opacity-80 transition-opacity"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-biovitam-dark/90 via-transparent to-transparent" />

                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover/slider:opacity-100 transition-opacity">
                                <ZoomIn className="text-white w-12 h-12 drop-shadow-lg" />
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-12 md:p-20 text-white pointer-events-none">
                                <Quote className="w-12 h-12 text-biovitam-secondary mb-6 opacity-80" />
                                <h2 className="text-3xl md:text-5xl font-bold mb-4">{testimonials[currentIndex].name}</h2>
                                <p className="text-xl text-biovitam-secondary font-medium mb-8 uppercase tracking-widest">{testimonials[currentIndex].role} — {testimonials[currentIndex].location}</p>
                                <p className="text-xl md:text-2xl font-light italic leading-relaxed max-w-3xl">
                                    &quot;{testimonials[currentIndex].quote}&quot;
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Controls */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur p-3 rounded-full text-white transition-all z-20"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur p-3 rounded-full text-white transition-all z-20"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>

                    {/* Digits/Dots */}
                    <div className="absolute bottom-8 right-8 flex gap-2 z-20">
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? 'bg-biovitam-secondary w-8' : 'bg-white/50'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Client Grid (Static logos placeholder if needed, otherwise just list) */}
                <div className="mt-20 text-center">
                    <p className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-8">Partnering with Excellence</p>
                    <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-opacity">
                        {/* Simulated Logos */}
                        {['FloraHolland', 'Kenya Flower Council', 'FPEAK', 'KFC'].map((logo) => (
                            <div key={logo} className="text-2xl font-black text-gray-300 dark:text-gray-700">{logo}</div>
                        ))}
                    </div>
                </div>
            </div>

            <Lightbox
                isOpen={lightbox.isOpen}
                src={lightbox.src}
                alt={lightbox.alt}
                onClose={() => setLightbox(prev => ({ ...prev, isOpen: false }))}
            />
        </div>
    )
}
