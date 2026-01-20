import { motion } from 'framer-motion'
import { updatePageMeta } from '../utils/seo'
import { useEffect, useState } from 'react'
import { Lightbox } from '../components/ui/Lightbox'
// @ts-ignore
import CertImage from '../assets/profile/9.jpg'
import { CheckCircle, Shield } from 'lucide-react'
// @ts-ignore
import AssuranceImage from '../assets/profile/5.jpg'

export default function Certifications() {
    const [lightbox, setLightbox] = useState({ isOpen: false, src: '', alt: '' })

    const openLightbox = (src: string, alt: string) => {
        setLightbox({ isOpen: true, src, alt })
    }

    useEffect(() => {
        updatePageMeta("Certifications | BioVitam", "Our quality assurance and organic certifications.", "organic certification, kephis, ecocert")
    }, [])

    return (
        <div className="min-h-screen pt-20 bg-biovitam-light dark:bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-extrabold text-biovitam-dark dark:text-white mb-4"
                    >
                        Quality Assurance & <span className="text-biovitam-olive">Certifications</span>
                    </motion.h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        We adhere to the strictest international standards for organic agriculture. Our products are rigorously tested and certified safe for the environment and consumers.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Cert Image / Doc Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-organic-lg overflow-hidden shadow-2xl border-8 border-white dark:border-white/10 cursor-zoom-in"
                        onClick={() => openLightbox(CertImage, "BioVitam Certificates")}
                    >
                        <img src={CertImage} alt="BioVitam Certificates" className="w-full h-auto object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-black/80 backdrop-blur-md p-6">
                            <p className="font-bold text-biovitam-dark dark:text-white text-center flex items-center justify-center gap-2">
                                <Shield className="text-biovitam-olive" /> Official Compliance Documents
                            </p>
                        </div>
                    </motion.div>

                    {/* Cert Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="bg-white dark:bg-card p-8 rounded-organic shadow-sm border border-gray-100 dark:border-white/10">
                            <h3 className="text-2xl font-bold text-biovitam-dark dark:text-white mb-6 flex items-center">
                                <CheckCircle className="text-biovitam-secondary w-8 h-8 mr-3" />
                                Accreditations
                            </h3>
                            <ul className="space-y-6">
                                <li className="pb-6 border-b border-gray-50 dark:border-gray-800 last:border-0 last:pb-0">
                                    <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200">KEPHIS Approved</h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Kenya Plant Health Inspectorate Service</p>
                                    <p className="text-gray-500 dark:text-gray-500 mt-2 text-sm leading-relaxed">
                                        Fully registered and approved for distribution in Kenya, meeting all phyto-sanitary requirements for safety and efficacy.
                                    </p>
                                </li>
                                <li className="pb-6 border-b border-gray-50 dark:border-gray-800 last:border-0 last:pb-0">
                                    <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200">ECOCERT Inputs</h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Organic Agriculture Standards</p>
                                    <p className="text-gray-500 dark:text-gray-500 mt-2 text-sm leading-relaxed">
                                        Formulated in accordance with international organic farming regulations, suitable for use in organic crop production.
                                    </p>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-biovitam-olive/5 dark:bg-biovitam-olive/10 p-8 rounded-organic border border-biovitam-olive/10 dark:border-white/10">
                            <h3 className="text-xl font-bold text-biovitam-olive mb-4">Why This Matters</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                For export-oriented flower and vegetable farms, input traceability is non-negotiable. Our certifications provide the assurance you need to meet MRL (Maximum Residue Level) standards for European and Asian markets.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Assurance Visual Section (5.jpg) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 relative rounded-organic-lg overflow-hidden shadow-2xl h-[400px] cursor-zoom-in"
                    onClick={() => openLightbox(AssuranceImage, "Quality Assurance")}
                >
                    <img src={AssuranceImage} alt="Quality Assurance" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-biovitam-dark/90 to-transparent dark:from-black/90 dark:to-transparent flex items-center p-12">
                        <div className="max-w-lg">
                            <h3 className="text-3xl font-bold text-white mb-4">Our Commitment to Purity</h3>
                            <p className="text-gray-200 text-lg leading-relaxed mb-8">
                                Every batch of Biovitam is rigorously tested in our state-of-the-art laboratories. We don't just meet standards; we set new benchmarks for agricultural safety and efficacy.
                            </p>
                            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur px-6 py-3 rounded-full border border-white/20">
                                <CheckCircle className="text-biovitam-secondary" />
                                <span className="text-white font-bold">100% Traceable Ingredients</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
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
