import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { updatePageMeta } from '../utils/seo'
import { Lightbox } from '../components/ui/Lightbox'
import { api } from '../utils/api'
import { ProcessStep } from '../types'
import { CheckCircle2, FlaskConical, Droplets, Leaf, ShieldCheck, Zap, ChevronDown } from 'lucide-react'

// @ts-ignore
import ProcessHero from '../assets/profile/6.jpg'
// @ts-ignore
import LabVisual from '../assets/profile/5.jpg'
// @ts-ignore
const FactoryVisual = '../assets/profile/11.jpg'

function mapIcon(title: string) {
    const t = title.toLowerCase()
    if (t.includes('source')) return Leaf
    if (t.includes('fermentation')) return Droplets
    if (t.includes('fortification')) return Zap
    if (t.includes('mineral')) return FlaskConical
    if (t.includes('quality')) return ShieldCheck
    return Leaf
}

const FALLBACK_PROCESS_STEPS: ProcessStep[] = [
    {
        id: 1,
        title: "Raw Material Sourcing",
        icon: Leaf,
        description: "We utilize high-grade vegetal extracts and avian waste sources, carefully screened for purity and nutrient density.",
        details: "Our sourcing strategy prioritizes renewable organic matter that is naturally rich in primary nutrients and trace elements.",
        technical: "Sourced from certified sustainable farms.",
        matrix: { "Purity": "98%", "Moisture": "12%" }
    },
    {
        id: 2,
        title: "Bio-Fermentation",
        icon: Droplets,
        description: "Proprietary fermentation technology that breaks down organic matter into bio-available forms.",
        details: "Using specific microbial strains, we ensure the complete conversion of complex molecules into easily absorbable nutrients.",
        technical: "Continuous monitoring of temperature and pH.",
        matrix: { "Temp": "55°C", "pH": "6.2" }
    },
    {
        id: 3,
        title: "Bio-Fortification",
        icon: Zap,
        description: "Enrichment with natural plant hormones, amino acids, and specific microbial biostimulants.",
        details: "This step introduces auxins, cytokinins, and essential amino acids that trigger vigorous root development and stress tolerance.",
        technical: "Proprietary hormone blend integration.",
        matrix: { "Hormones": "Organic", "AminoAcids": "Full Spectrum" }
    },
    {
        id: 4,
        title: "Mineral Optimization",
        icon: FlaskConical,
        description: "Precision addition of Calcium, Magnesium, Boron, and Zinc to prevent common deficiencies.",
        details: "We calibrate the mineral balance to ensure zero antagonism, maximizing the efficacy of every drop.",
        technical: "Chelated minerals for maximum uptake.",
        matrix: { "Ca": "20%", "Mg": "5%" }
    },
    {
        id: 5,
        title: "Quality Assurance",
        icon: ShieldCheck,
        description: "Every batch undergoes rigorous lab testing for consistency, potency, and safety.",
        details: "Our standards exceed local regulatory requirements, ensuring that farmers receive only the highest quality biofertilizer.",
        technical: "Third-party lab verification.",
        matrix: { "BatchID": "Verified", "Safety": "100%" }
    }
]

export default function Process() {
    const [lightbox, setLightbox] = useState({ isOpen: false, src: '', alt: '' })
    const [activeStep, setActiveStep] = useState(0)
    const [processSteps, setProcessSteps] = useState<ProcessStep[]>(FALLBACK_PROCESS_STEPS)
    const [isLoading, setIsLoading] = useState(true)

    const openLightbox = (src: string, alt: string) => {
        setLightbox({ isOpen: true, src, alt })
    }

    useEffect(() => {
        updatePageMeta("Manufacturing Process | BioVitam", "Discover the science behind our bio-fortified organic fertilizers.", "bio-fermentation, organic fertilizer manufacturing, bio-fortification, sustainable agriculture")

        const fetchSteps = async () => {
            try {
                const data = await api.getProcessSteps()
                if (data && data.length > 0) {
                    const mapped = data.map((step: any) => ({
                        ...step,
                        icon: mapIcon(step.title)
                    }))
                    setProcessSteps(mapped)
                }
            } catch (err) {
                console.warn('Failed to fetch process steps, using fallback.', err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchSteps()
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
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={ProcessHero} alt="Manufacturing Process" className="w-full h-full object-cover transform scale-105" />
                    <div className="absolute inset-0 bg-biovitam-dark/70 dark:bg-black/80 backdrop-blur-[2px]" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-6">
                            Precision <span className="text-biovitam-secondary">Bio-Fermentation</span>
                        </h1>
                        <p className="text-xl text-gray-200 leading-relaxed font-light">
                            Bridging the gap between organic tradition and advanced biotechnology to create the world's most efficient bio-stimulants.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Interactive Steps */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-biovitam-dark dark:text-white mb-12">The Biovitam Journey</h2>
                        {processSteps.map((step, idx) => (
                            <div key={idx} className="space-y-4">
                                <motion.button
                                    onClick={() => setActiveStep(idx)}
                                    className={`w-full text-left p-6 rounded-organic-lg transition-all border-2 ${activeStep === idx
                                        ? 'bg-white dark:bg-card border-biovitam-olive shadow-xl ring-4 ring-biovitam-olive/10'
                                        : 'bg-transparent border-transparent hover:bg-white/50 dark:hover:bg-white/5'
                                        }`}
                                    whileHover={{ x: 10 }}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-full ${activeStep === idx ? 'bg-biovitam-olive text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-500'}`}>
                                            <step.icon size={24} />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className={`text-xl font-bold mb-1 ${activeStep === idx ? 'text-biovitam-olive' : 'text-biovitam-dark dark:text-gray-300'}`}>
                                                {step.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm">{step.description}</p>
                                        </div>
                                        <div className={`lg:hidden transition-transform duration-300 ${activeStep === idx ? 'rotate-180' : ''}`}>
                                            <ChevronDown className="text-gray-400" />
                                        </div>
                                    </div>
                                </motion.button>

                                {/* Mobile Detail View (Accordion style) */}
                                <AnimatePresence>
                                    {activeStep === idx && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="lg:hidden overflow-hidden"
                                        >
                                            <div className="glass-panel p-6 rounded-organic-lg border-biovitam-olive/20 mb-4">
                                                <div className="mb-6 rounded-lg overflow-hidden h-48" onClick={() => openLightbox(idxToIndexImage(idx), step.title)}>
                                                    <img src={idxToIndexImage(idx)} alt={step.title} className="w-full h-full object-cover" />
                                                </div>
                                                <h3 className="text-xl font-bold text-biovitam-dark dark:text-white mb-4">Deep Dive: {step.title}</h3>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">{step.details || step.description}</p>

                                                {step.technical && (
                                                    <div className="mb-6 p-4 bg-biovitam-olive/5 rounded-lg border-l-4 border-biovitam-olive">
                                                        <p className="text-[10px] font-bold text-biovitam-olive uppercase tracking-widest mb-1">Technical Note</p>
                                                        <p className="text-xs text-gray-700 dark:text-gray-300 italic">{step.technical}</p>
                                                    </div>
                                                )}

                                                {step.matrix && (
                                                    <div className="grid grid-cols-2 gap-3 mb-6">
                                                        {Object.entries(step.matrix).map(([key, value]) => (
                                                            <div key={key} className="bg-white/50 dark:bg-white/5 p-2 rounded-lg border border-gray-100 dark:border-white/10 text-center">
                                                                <p className="text-[9px] text-gray-500 uppercase font-bold">{key}</p>
                                                                <p className="text-sm font-bold text-biovitam-dark dark:text-white">{value as string}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-2 text-biovitam-olive font-bold text-xs">
                                                        <CheckCircle2 size={16} />
                                                        <span>Certified Quality Standard</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-biovitam-olive font-bold text-xs">
                                                        <CheckCircle2 size={16} />
                                                        <span>100% Bio-Available Nutrients</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    <div className="hidden lg:block sticky top-32">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="glass-panel p-10 rounded-organic-lg shadow-2xl dark:bg-black/30 border-biovitam-olive/20"
                            >
                                <div className="mb-8 rounded-lg overflow-hidden h-64 cursor-zoom-in" onClick={() => openLightbox(idxToIndexImage(activeStep), processSteps[activeStep].title)}>
                                    <img
                                        src={idxToIndexImage(activeStep)}
                                        alt={processSteps[activeStep].title}
                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-biovitam-dark dark:text-white mb-4">
                                    Deep Dive: {processSteps[activeStep].title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                    {processSteps[activeStep].details || processSteps[activeStep].description}
                                </p>

                                {processSteps[activeStep].technical && (
                                    <div className="mb-6 p-4 bg-biovitam-olive/5 rounded-lg border-l-4 border-biovitam-olive">
                                        <p className="text-xs font-bold text-biovitam-olive uppercase tracking-widest mb-1">Technical Note</p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 italic">{processSteps[activeStep].technical}</p>
                                    </div>
                                )}

                                {processSteps[activeStep].matrix && (
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        {Object.entries(processSteps[activeStep].matrix).map(([key, value]) => (
                                            <div key={key} className="bg-white/50 dark:bg-white/5 p-3 rounded-lg border border-gray-100 dark:border-white/10 text-center">
                                                <p className="text-[10px] text-gray-500 uppercase font-bold">{key}</p>
                                                <p className="text-lg font-bold text-biovitam-dark dark:text-white">{value as string}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-biovitam-olive font-bold">
                                        <CheckCircle2 size={20} />
                                        <span>Certified Quality Standard</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-biovitam-olive font-bold">
                                        <CheckCircle2 size={20} />
                                        <span>100% Bio-Available Nutrients</span>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Technical Matrix */}
            <section className="py-24 bg-biovitam-dark text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-biovitam-primary/20 rounded-full blur-3xl -mr-48 -mt-48" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Technical Advantage</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Our formulation strategy ensures maximum performance across all climatic conditions.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { label: "Amino Acid Profile", value: "Full Spectrum", desc: "Assists in protein synthesis and stress recovery." },
                            { label: "Bacterial Counts", value: "10^9 CFU/ml", desc: "High density of beneficial soil microorganisms." },
                            { label: "Nutrient Ratio", value: "Precision Balanced", desc: "No antagonism between macro and micro elements." }
                        ].map((stat, i) => (
                            <div key={i} className="p-8 bg-white/5 rounded-organic border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                                <h4 className="text-biovitam-secondary font-bold text-sm uppercase tracking-widest mb-2">{stat.label}</h4>
                                <p className="text-3xl font-bold mb-4">{stat.value}</p>
                                <p className="text-gray-400 text-sm">{stat.desc}</p>
                            </div>
                        ))}
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

function idxToIndexImage(idx: number) {
    if (idx === 0) return LabVisual
    if (idx === 1) return ProcessHero
    if (idx === 2) return FactoryVisual
    if (idx === 3) return LabVisual
    return ProcessHero
}


