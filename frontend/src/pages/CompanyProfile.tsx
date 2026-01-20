import { motion } from 'framer-motion'
import { updatePageMeta } from '../utils/seo'
import { useEffect, useState } from 'react'
import { Lightbox } from '../components/ui/Lightbox'
import { OptimizedImage } from '../components/ui/OptimizedImage'
// @ts-ignore
import ProfileCover from '../assets/profile/0.jpg'
// @ts-ignore
import ProcessVisual from '../assets/profile/6.jpg'
import { Button } from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { Download, ChevronRight } from 'lucide-react'

import { COMPANY_DATA as FALLBACK_COMPANY } from '../data/seed'
import { api } from '../utils/api'
import { CompanyData } from '../types'

export default function CompanyProfile() {
    const navigate = useNavigate()
    const [company, setCompany] = useState<CompanyData>(FALLBACK_COMPANY as CompanyData)
    const [isLoading, setIsLoading] = useState(true)
    const [lightbox, setLightbox] = useState({ isOpen: false, src: '', alt: '' })

    const openLightbox = (src: string, alt: string) => {
        setLightbox({ isOpen: true, src, alt })
    }

    useEffect(() => {
        updatePageMeta(`${company.brand} | Company Profile`, company.about.description, "biovitam, company profile, organic agriculture")

        const fetchCompany = async () => {
            try {
                const data = await api.getCompany()
                if (data && Object.keys(data).length > 0) setCompany(data)
            } catch (err) {
                console.warn('Failed to fetch company profile, using fallback.', err)
            } finally {
                setIsLoading(false)
            }
        }
        fetchCompany()
    }, [])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-biovitam-light dark:bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-biovitam-olive"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-20 bg-biovitam-light dark:bg-background">
            {/* Hero / Cover Section corresponding to 0.jpg */}
            <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center cursor-zoom-in" onClick={() => openLightbox(ProfileCover, "Biovitam Company Profile Cover")}>
                <div className="absolute inset-0">
                    <OptimizedImage
                        src={ProfileCover}
                        alt="Biovitam Company Profile Cover"
                        className="w-full h-full"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-biovitam-dark/90 via-biovitam-dark/50 to-transparent dark:from-black/90 dark:via-black/50" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <div className="inline-block mb-6 px-6 py-2 rounded-full bg-biovitam-olive/20 text-green-100 dark:text-biovitam-secondary font-bold tracking-widest border border-biovitam-olive/40 backdrop-blur-md uppercase text-sm">
                            Established Excellence
                        </div>
                        <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-white mb-8 leading-tight">
                            {company.tagline.split(' ').slice(0, 3).join(' ')} <span className="text-biovitam-secondary">{company.tagline.split(' ').slice(3).join(' ')}</span>
                        </h1>
                        <p className="text-xl text-gray-200 mb-10 leading-relaxed max-w-2xl">
                            {company.about.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5">
                            <Button size="lg" className="bg-biovitam-olive hover:bg-biovitam-olive-dark text-white shadow-xl shadow-biovitam-olive/20 border-0" onClick={(e) => e.stopPropagation()}>
                                Download Full Profile <Download className="ml-2 w-5 h-5" />
                            </Button>
                            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-biovitam-dark" onClick={(e) => { e.stopPropagation(); navigate('/process') }}>
                                Learn About Our Process <ChevronRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Hover Reveal Interaction Section (6.jpg) */}
            <section className="py-12 bg-gray-50 dark:bg-background/80 flex justify-center">
                <div className="relative group">
                    <Button className="bg-biovitam-dark dark:bg-biovitam-primary text-white px-10 py-4 text-lg rounded-full shadow-lg hover:bg-biovitam-primary dark:hover:bg-biovitam-secondary transition-colors z-20 relative">
                        Explore Manufacturing Technology
                    </Button>

                    {/* Hover Card */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-96 bg-white dark:bg-card p-4 rounded-organic shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform group-hover:-translate-y-2 z-30 border border-gray-100 dark:border-white/10">
                        <div className="h-48 rounded-lg overflow-hidden mb-4 cursor-zoom-in" onClick={() => openLightbox(ProcessVisual, "Manufacturing Tech")}>
                            <OptimizedImage src={ProcessVisual} alt="Manufacturing Tech" className="w-full h-full" />
                        </div>
                        <h4 className="font-bold text-biovitam-dark dark:text-white mb-2">State-of-the-Art Bio-Reactors</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {company.qualityAssurance.production}
                        </p>
                    </div>
                </div>
            </section>

            {/* Corporate Overview */}
            <section className="py-24 bg-white dark:bg-card relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-biovitam-olive mb-6">Who We Are</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                                {company.name}, trading as <span className="font-bold text-biovitam-dark dark:text-biovitam-secondary">{company.brand}</span>, is a premier agricultural solutions provider specializing in bio-fortified organic fertilizers. We bridge the gap between sustainable farming and high-yield commercial agriculture.
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                Our flagship products are engineered to combat soil degradation, a critical issue facing farmers today. By analyzing local soil conditions and crop requirements, we formulate precise nutrient blends that rejuvenate the earth while boosting profitability.
                            </p>
                        </div>
                        <div className="bg-biovitam-light dark:bg-background/50 p-10 rounded-organic-lg border border-biovitam-olive/10 dark:border-white/10 relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-biovitam-olive/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                            <h3 className="text-2xl font-bold text-biovitam-dark dark:text-white mb-8">Core Objectives</h3>
                            <ul className="space-y-6">
                                {company.about.objectives.slice(0, 4).map((item, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <span className="w-8 h-8 rounded-full bg-biovitam-olive flex items-center justify-center text-white font-bold mr-4 shrink-0">{idx + 1}</span>
                                        <div>
                                            <p className="text-gray-600 dark:text-gray-400 font-medium">{item}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <Lightbox
                isOpen={lightbox.isOpen}
                src={lightbox.src}
                alt={lightbox.alt}
                onClose={() => setLightbox(prev => ({ ...prev, isOpen: false }))}
            />
        </div>
    )
}
