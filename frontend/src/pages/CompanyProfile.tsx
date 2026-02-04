import { motion } from 'framer-motion'
import { updatePageMeta } from '../utils/seo'
import { useEffect, useState } from 'react'
import { Lightbox } from '../components/ui/Lightbox'
import { OptimizedImage } from '../components/ui/OptimizedImage'
import { Button } from '../components/ui/Button'
import { Download, CheckCircle, Shield, Quote, TrendingUp, Leaf, Target, Zap, Users, MapPin } from 'lucide-react'

import { COMPANY_DATA as FALLBACK_COMPANY } from '../data/seed'
import { CLIENTELE_DATA } from '../data/seed'
import { api } from '../utils/api'
import { CompanyData } from '../types'

// Images
import CertImage from '../assets/profile/9.jpg'
import AssuranceImage from '../assets/profile/5.jpg'
import ClientImg1 from '../assets/profile/7.jpg'
import ClientImg2 from '../assets/profile/8.jpg'
import BeforeImg from '../assets/profile/before.jpg'
import AfterImg from '../assets/profile/after.jpg'
import ProfileCover from '../assets/profile/0.jpg'
import RiftValleyImg from '../assets/profile/rift valley.jpg'


const FALLBACK_ACCREDITATIONS = [
    {
        title: "KEPHIS Approved",
        subtitle: "Kenya Plant Health Inspectorate Service",
        description: "Fully registered and approved for distribution in Kenya, meeting all phyto-sanitary requirements for safety and efficacy."
    },
    {
        title: "Organic Inputs",
        subtitle: "International Standards",
        description: "Formulated in accordance with international organic farming regulations, suitable for use in organic crop production."
    }
]

const FALLBACK_BENEFITS = [
    {
        icon: <TrendingUp className="text-biovitam-primary" size={32} />,
        title: 'Increased Crop Yields',
        description: 'Farmers using Biovitam report significant improvements in crop productivity and quality.',
        metrics: ['20-30% yield increase', 'Improved crop uniformity', 'Faster growth cycles']
    },
    {
        icon: <Leaf className="text-biovitam-secondary" size={32} />,
        title: 'Enhanced Soil Health',
        description: 'Our biofertilizers improve soil structure, fertility, and microbial diversity.',
        metrics: ['Better water retention', 'Increased organic matter', 'Improved soil pH balance']
    },
    {
        icon: <Target className="text-blue-600" size={32} />,
        title: 'Cost Efficiency',
        description: 'Reduce dependency on synthetic fertilizers while improving long-term soil sustainability.',
        metrics: ['Lower input costs', 'Reduced chemical use', 'Long-term soil investment']
    },
    {
        icon: <Zap className="text-yellow-500" size={32} />,
        title: 'Environmental Benefits',
        description: 'Contribute to sustainable agriculture and reduce your farm\'s carbon footprint.',
        metrics: ['No chemical runoff', 'Carbon sequestration', 'Biodiversity support']
    }
]

const FALLBACK_RESULTS = {
    traditional: [
        "Heavy dependency on expensive synthetics",
        "Declining soil fertility and structure degradation",
        "Lower crop quality and inconsistent yields",
        "High water usage and chemical runoff",
        "Increased susceptibility to pests and diseases"
    ],
    biovitam: [
        "Significantly reduced input costs",
        "Restored soil microbiome and organic matter",
        "20-30% higher yields with premium market value",
        "Better water retention and drought resistance",
        "Stronger, resilient plants naturally fighting disease"
    ]
}

const TOP_REGIONS = [
    { name: 'Naivasha', count: 27, percentage: 90 },
    { name: 'Nakuru', count: 27, percentage: 90 },
    { name: 'Nanyuki', count: 19, percentage: 63 },
    { name: 'Thika', count: 12, percentage: 40 },
    { name: 'Limuru', count: 6, percentage: 20 },
]

const TRUSTED_FARMS = [
    'AAA Chestnut Farm', 'AAA Chui Farm', 'AAA Hippo(Thika)', 'AAA Simba', 'Africalla Lilies Ltd',
    'Aquila Flowers', 'Beauty line Ltd', 'Bigot Flowers', 'Bilashaka Flowers', 'Black Tulip Batian Flowers',
    'Black Tulip Black Petals Ltd', 'Black Tulip Eco Roses', 'Black Tulip Golden Tulip', 'Black Tulip Laurel'
]

export default function CompanyProfile() {
    const [company, setCompany] = useState<CompanyData>(FALLBACK_COMPANY as CompanyData)
    const [isLoading, setIsLoading] = useState(true)
    const [lightbox, setLightbox] = useState({ isOpen: false, src: '', alt: '' })
    const [accreditations, setAccreditations] = useState(FALLBACK_ACCREDITATIONS)
    const [testimonials, setTestimonials] = useState<any[]>([]) // eslint-disable-line @typescript-eslint/no-explicit-any
    const [results, setResults] = useState(FALLBACK_RESULTS)

    const openLightbox = (src: string, alt: string) => {
        setLightbox({ isOpen: true, src, alt })
    }

    useEffect(() => {
        updatePageMeta(`${company.brand} | Company Profile`, company.about.description, "biovitam, company profile, organic agriculture")
    }, [company.brand, company.about.description])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [companyData, certsData, clienteleData, benefitsData] = await Promise.all([
                    api.getCompany(),
                    api.getCertificationsPage(),
                    api.getClientele(),
                    api.getBenefitsPage()
                ])

                if (companyData && Object.keys(companyData).length > 0) setCompany(companyData)
                if (certsData?.accreditations) setAccreditations(certsData.accreditations)
                if (benefitsData?.results) setResults(benefitsData.results)

                const clientImages = [ClientImg1, ClientImg2];
                if (clienteleData && clienteleData.length > 0) {
                    const mapped = clienteleData.map((c: any, index: number) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
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
                console.warn('Failed to fetch profile data, using fallback.', err)
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
        fetchData()
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
            {/* Hero Section with Background */}
            <section className="relative py-16 md:py-24 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <OptimizedImage
                        src={ProfileCover}
                        alt="BioVitam Profile"
                        className="w-full h-full object-cover opacity-20 dark:opacity-10"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white dark:from-background/90 dark:via-background/80 dark:to-background" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block mb-6 px-6 py-2 rounded-full bg-biovitam-olive/20 text-biovitam-olive dark:text-biovitam-secondary font-bold tracking-widest border border-biovitam-olive/40 uppercase text-sm"
                        >
                            Company Profile
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl sm:text-3xl md:text-6xl font-heading font-extrabold text-biovitam-dark dark:text-white mb-4 sm:mb-6 leading-tight"
                        >
                            {company.tagline.split(' ').slice(0, 3).join(' ')} <span className="text-biovitam-secondary">{company.tagline.split(' ').slice(3).join(' ')}</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 leading-relaxed px-2"
                        >
                            {company.about.description}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-5 justify-center"
                        >
                            <a href="/docs/Profile.pdf" download="BioVitam_Profile.pdf">
                                <Button size="lg" className="bg-biovitam-olive hover:bg-biovitam-olive-dark text-white shadow-xl hover:shadow-2xl transition-all">
                                    Download Full Profile <Download className="ml-2 w-5 h-5" />
                                </Button>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Corporate Overview with Background */}
            <section className="py-16 md:py-20 relative overflow-hidden bg-white dark:bg-card">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-5 dark:opacity-10">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-biovitam-olive mb-6">Who We Are</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                                {company.name}, trading as <span className="font-bold text-biovitam-dark dark:text-biovitam-secondary">{company.brand}</span>, is a premier agricultural solutions provider specializing in bio-fortified organic fertilizers.
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                Our flagship products are engineered to combat soil degradation, a critical issue facing farmers today. By analyzing local soil conditions and crop requirements, we formulate precise nutrient blends that rejuvenate the earth while boosting profitability.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-gray-50 dark:bg-background/50 p-8 rounded-2xl border border-gray-100 dark:border-white/10 shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <h3 className="text-2xl font-bold text-biovitam-dark dark:text-white mb-6">Core Objectives</h3>
                            <ul className="space-y-4">
                                {company.about.objectives.slice(0, 4).map((item, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-start"
                                    >
                                        <span className="w-8 h-8 rounded-full bg-biovitam-olive flex items-center justify-center text-white font-bold mr-4 shrink-0">{idx + 1}</span>
                                        <p className="text-gray-600 dark:text-gray-400 font-medium">{item}</p>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Before & After Section */}
            <section className="py-16 md:py-20 bg-gray-50 dark:bg-background/80 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-biovitam-olive/5 rounded-full blur-3xl -mr-48 -mt-48" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-biovitam-secondary/5 rounded-full blur-3xl -ml-48 -mb-48" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold text-biovitam-dark dark:text-white mb-12 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Real Results: <span className="text-biovitam-olive">Before & After</span>
                    </motion.h2>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.2 },
                            },
                        }}
                    >
                        {/* Before */}
                        <motion.div
                            className="group bg-white dark:bg-card rounded-2xl border-2 border-transparent shadow-lg dark:border-white/5 overflow-hidden hover:shadow-2xl transition-all"
                            variants={{
                                hidden: { opacity: 0, x: -20 },
                                visible: { opacity: 1, x: 0 },
                            }}
                        >
                            <div className="relative h-64 overflow-hidden">
                                <OptimizedImage
                                    src={BeforeImg}
                                    alt="Before Biovitam"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 px-4 py-1 bg-red-600 text-white rounded-full text-xs font-bold shadow-lg">BEFORE</div>
                            </div>
                            <div className="p-8">
                                <div className="inline-block px-4 py-1 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-full text-xs font-bold mb-6 border border-red-100 dark:border-red-900/20">Traditional Farming Issues</div>
                                <ul className="space-y-4 text-gray-700 dark:text-gray-400 text-sm">
                                    {results.traditional.map(item => (
                                        <li key={item} className="flex items-start">
                                            <span className="flex-shrink-0 w-5 h-5 bg-red-100 dark:bg-red-900/20 text-red-500 rounded-full flex items-center justify-center text-[10px] mr-3 mt-0.5">✕</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* After */}
                        <motion.div
                            className="group bg-white dark:bg-card rounded-2xl border-2 border-biovitam-primary/20 shadow-xl shadow-biovitam-primary/5 relative overflow-hidden dark:border-biovitam-primary/40 hover:shadow-2xl hover:shadow-biovitam-primary/10 transition-all"
                            variants={{
                                hidden: { opacity: 0, x: 20 },
                                visible: { opacity: 1, x: 0 },
                            }}
                        >
                            <div className="relative h-64 overflow-hidden">
                                <OptimizedImage
                                    src={AfterImg}
                                    alt="After Biovitam"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 px-4 py-1 bg-biovitam-primary text-white rounded-full text-xs font-bold shadow-lg">AFTER</div>
                                <div className="absolute top-4 right-4 animate-pulse">
                                    <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg text-biovitam-primary">
                                        <TrendingUp size={20} />
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 sm:p-8">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-biovitam-primary/5 rounded-bl-[100px] -z-0"></div>
                                <div className="relative z-10">
                                    <div className="inline-block px-4 py-1 bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-biovitam-primary rounded-full text-xs font-bold mb-6 border border-green-100 dark:border-green-900/20">The Biovitam Difference</div>
                                    <ul className="space-y-4 text-gray-700 dark:text-gray-400 text-sm">
                                        {results.biovitam.map(item => (
                                            <li key={item} className="flex items-start">
                                                <span className="flex-shrink-0 w-5 h-5 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-biovitam-primary rounded-full flex items-center justify-center text-[10px] mr-3 mt-0.5">✓</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Certifications Section with Background */}
            <section className="py-16 md:py-20 relative overflow-hidden bg-white dark:bg-card">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <OptimizedImage
                        src={AssuranceImage}
                        alt="Quality Assurance"
                        className="w-full h-full object-cover opacity-10 dark:opacity-5"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white dark:from-background/95 dark:via-background/90 dark:to-background" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-biovitam-dark dark:text-white mb-4">
                            Quality Assurance & <span className="text-biovitam-olive">Certifications</span>
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
                            We adhere to the strictest international standards for organic agriculture. Our products are rigorously tested and certified safe for the environment and consumers.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-white/10 cursor-zoom-in hover:shadow-2xl transition-shadow"
                            onClick={() => openLightbox(CertImage, "BioVitam Certificates")}
                        >
                            <img src={CertImage} alt="BioVitam Certificates" className="w-full h-auto object-cover" />
                            <div className="bg-white/95 dark:bg-black/80 p-4">
                                <p className="font-bold text-biovitam-dark dark:text-white text-center flex items-center justify-center gap-2">
                                    <Shield className="text-biovitam-olive" /> Official Compliance Documents
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <div className="bg-gray-50 dark:bg-background/50 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 hover:shadow-lg transition-shadow">
                                <h3 className="text-lg sm:text-xl font-bold text-biovitam-dark dark:text-white mb-4 flex items-center">
                                    <CheckCircle className="text-biovitam-secondary w-6 h-6 mr-3" />
                                    Accreditations
                                </h3>
                                <ul className="space-y-4">
                                    {accreditations.map((cert, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0"
                                        >
                                            <h4 className="font-bold text-gray-800 dark:text-gray-200">{cert.title}</h4>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{cert.subtitle}</p>
                                            <p className="text-gray-500 dark:text-gray-500 mt-2 text-sm leading-relaxed">
                                                {cert.description}
                                            </p>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-biovitam-olive/5 dark:bg-biovitam-olive/10 p-6 rounded-2xl border border-biovitam-olive/10 hover:border-biovitam-olive/30 transition-colors"
                            >
                                <h3 className="text-lg font-bold text-biovitam-olive mb-3">Why This Matters</h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                                    For export-oriented flower and vegetable farms, input traceability is non-negotiable. Our certifications provide the assurance you need to meet MRL standards for European and Asian markets.
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Scientific Approach Section */}
            <section className="py-16 md:py-20 bg-gray-50 dark:bg-background/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-biovitam-olive/10 text-biovitam-olive font-medium text-sm tracking-wide border border-biovitam-olive/20">
                            THE SCIENCE OF BIOVITAM
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-biovitam-dark dark:text-white mb-4">
                            Unlock Your Soil&apos;s <span className="text-biovitam-olive">Full Potential</span>
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Our advanced formula does more than just feed the plant. It reactivates the soil microbiome, creating a self-sustaining ecosystem for long-term productivity.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 },
                            },
                        }}
                    >
                        {FALLBACK_BENEFITS.map((benefit) => (
                            <motion.div
                                key={benefit.title}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                className="p-6 bg-white dark:bg-card rounded-2xl border border-gray-100 dark:border-white/10 hover:shadow-lg hover:border-biovitam-olive/30 transition-all group"
                            >
                                <div className="mb-4 p-3 bg-gray-50 dark:bg-white/5 rounded-xl w-fit group-hover:bg-biovitam-olive/10 transition-colors">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-lg font-bold text-biovitam-dark dark:text-white mb-2">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                                    {benefit.description}
                                </p>
                                <ul className="space-y-2 border-t border-gray-200 dark:border-white/10 pt-3">
                                    {benefit.metrics.map((metric) => (
                                        <li key={metric} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                                            <span className="text-biovitam-primary mr-2 font-bold">•</span>
                                            {metric}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Clientele Section - Stats Style */}
            <section className="py-16 md:py-20 relative overflow-hidden bg-white dark:bg-card">
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <OptimizedImage
                        src={RiftValleyImg}
                        alt="Agricultural Landscape"
                        className="w-full h-full object-cover opacity-10 dark:opacity-5"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white dark:from-background/95 dark:via-background/90 dark:to-background" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold text-biovitam-dark dark:text-white mb-4">
                            Our Esteemed <span className="text-biovitam-olive">Clientele</span>
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Trusted by the region&apos;s leading growers to deliver results that matter.
                        </p>
                    </motion.div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-gray-50 dark:bg-background/50 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-white/10 text-center hover:shadow-xl transition-all group"
                        >
                            <div className="w-16 h-16 bg-biovitam-olive/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-biovitam-olive/20 transition-colors">
                                <Users className="text-biovitam-olive" size={32} />
                            </div>
                            <h3 className="text-4xl md:text-5xl font-black text-biovitam-dark dark:text-white mb-2">138+</h3>
                            <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Partner Farms</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-gray-50 dark:bg-background/50 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-white/10 text-center hover:shadow-xl transition-all group"
                        >
                            <div className="w-16 h-16 bg-biovitam-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-biovitam-secondary/20 transition-colors">
                                <MapPin className="text-biovitam-secondary" size={32} />
                            </div>
                            <h3 className="text-4xl md:text-5xl font-black text-biovitam-dark dark:text-white mb-2">4,654 Ha</h3>
                            <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Hectares Covered</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/10 dark:to-green-800/10 p-6 rounded-2xl shadow-lg border border-green-200 dark:border-green-900/20"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <MapPin className="text-green-600 dark:text-green-400" size={20} />
                                <h4 className="font-bold text-green-700 dark:text-green-400 text-sm uppercase tracking-wider">Top Regions</h4>
                            </div>
                            <ul className="space-y-2">
                                {TOP_REGIONS.map((region, idx) => (
                                    <motion.li
                                        key={region.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4 + idx * 0.05 }}
                                        className="flex items-center justify-between"
                                    >
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{region.name}</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${region.percentage}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.5 + idx * 0.05, duration: 0.8 }}
                                                    className="h-full bg-green-500 dark:bg-green-400 rounded-full"
                                                />
                                            </div>
                                            <span className="text-xs font-bold text-gray-600 dark:text-gray-400 w-6 text-right">{region.count}</span>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Trusted Farms */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6">Trusted by Leading Growers Across Kenya</p>
                        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
                            {TRUSTED_FARMS.map((farm, idx) => (
                                <motion.span
                                    key={farm}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.03 }}
                                    className="px-4 py-2 bg-gray-50 dark:bg-background/50 rounded-full text-xs font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:border-biovitam-olive hover:text-biovitam-olive transition-colors"
                                >
                                    {farm}
                                </motion.span>
                            ))}
                            <span className="px-4 py-2 bg-biovitam-olive/10 rounded-full text-xs font-bold text-biovitam-olive border border-biovitam-olive/20">
                                and 123 more...
                            </span>
                        </div>
                    </motion.div>

                    {/* Testimonials Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {testimonials.slice(0, 4).map((testimonial, idx) => (
                            <motion.div
                                key={testimonial.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-gray-50 dark:bg-background/50 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-white/10 hover:shadow-xl transition-all group"
                            >
                                <div className="relative h-48 cursor-zoom-in overflow-hidden" onClick={() => openLightbox(testimonial.image, testimonial.name)}>
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>
                                <div className="p-6">
                                    <Quote className="w-8 h-8 text-biovitam-secondary/30 mb-3" />
                                    <p className="text-gray-600 dark:text-gray-400 italic mb-4 text-sm leading-relaxed">
                                        &quot;{testimonial.quote}&quot;
                                    </p>
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-biovitam-primary/20 rounded-full flex items-center justify-center text-biovitam-primary font-bold mr-3">
                                            {testimonial.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold text-biovitam-dark dark:text-white text-sm">
                                                {testimonial.name}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                                {testimonial.role} — {testimonial.location}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
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
