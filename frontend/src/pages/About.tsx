import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Target, Globe, ShieldCheck } from 'lucide-react'
import { SEO, updatePageMeta } from '../utils/seo'
import { Lightbox } from '../components/ui/Lightbox'
import AboutIntro from '../assets/profile/1.jpg'
import ProcessImg from '../assets/profile/6.jpg'
import HistoryImg from '../assets/profile/10.jpg'

import { COMPANY_DATA, TIMELINE_DATA } from '../data/seed'
import { api } from '../utils/api'

export default function About() {
  const [lightbox, setLightbox] = useState({ isOpen: false, src: '', alt: '' })
  const [company, setCompany] = useState(COMPANY_DATA)
  const [timeline, setTimeline] = useState(TIMELINE_DATA)
  const [isLoading, setIsLoading] = useState(true)

  const openLightbox = (src: string, alt: string) => {
    setLightbox({ isOpen: true, src, alt })
  }

  useEffect(() => {
    updatePageMeta(SEO.about.title, SEO.about.description, SEO.about.keywords)

    // Fetch dynamic data
    const fetchData = async () => {
      try {
        const [companyData, timelineData] = await Promise.all([
          api.getCompany(),
          api.getTimeline()
        ]);
        if (companyData && Object.keys(companyData).length > 0) setCompany(companyData);
        if (timelineData && timelineData.length > 0) setTimeline(timelineData);
      } catch (err) {
        console.warn('API Fetch failed, using seeded fallback data.', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-biovitam-light dark:bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-biovitam-olive"></div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-biovitam-light dark:bg-background">
      {/* Hero Section - Visual 1.jpg */}
      <section className="relative py-24 bg-white dark:bg-card overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative rounded-organic-lg overflow-hidden shadow-2xl border-4 border-white dark:border-white/10 transform rotate-2 hover:rotate-0 transition-all duration-500 cursor-zoom-in"
              onClick={() => openLightbox(AboutIntro, "BioVitam Team")}
            >
              <img src={AboutIntro} alt="BioVitam Team" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-biovitam-dark/80 to-transparent flex items-end p-8">
                <p className="text-white font-heading font-bold text-xl">Dedicated to Soil Health</p>
              </div>
            </motion.div>
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-biovitam-olive text-white font-bold text-sm tracking-wide">
                OUR MISSION
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-biovitam-dark dark:text-white leading-tight">
                Empowering Farmers with <span className="text-biovitam-olive">Sustainable Solutions</span>
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                "{company.tagline}"
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {company.about.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-biovitam-light dark:bg-background/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 rounded-organic relative overflow-hidden group hover:shadow-xl transition-all duration-300 dark:bg-black/20 dark:border-white/10"
          >
            <div className="absolute top-0 right-0 bg-biovitam-primary/10 w-24 h-24 rounded-bl-full transition-transform group-hover:scale-150" />
            <Target className="w-12 h-12 text-biovitam-primary mb-6 relative z-10" />
            <h3 className="text-2xl font-bold text-biovitam-dark dark:text-white mb-4 relative z-10">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-400 relative z-10">
              Provide affordable, high-quality organic biofertilizers that enhance productivity while protecting soil health.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-8 rounded-organic relative overflow-hidden group hover:shadow-xl transition-all duration-300 dark:bg-black/20 dark:border-white/10"
          >
            <div className="absolute top-0 right-0 bg-biovitam-secondary/10 w-24 h-24 rounded-bl-full transition-transform group-hover:scale-150" />
            <Globe className="w-12 h-12 text-biovitam-secondary mb-6 relative z-10" />
            <h3 className="text-2xl font-bold text-biovitam-dark dark:text-white mb-4 relative z-10">Our Vision</h3>
            <p className="text-gray-600 dark:text-gray-400 relative z-10">
              To be Kenya's leading producer of certified organic biofertilizers, driving sustainable agricultural innovation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-8 rounded-organic relative overflow-hidden group hover:shadow-xl transition-all duration-300 dark:bg-black/20 dark:border-white/10"
          >
            <div className="absolute top-0 right-0 bg-blue-100/10 w-24 h-24 rounded-bl-full transition-transform group-hover:scale-150" />
            <ShieldCheck className="w-12 h-12 text-blue-600 mb-6 relative z-10" />
            <h3 className="text-2xl font-bold text-biovitam-dark dark:text-white mb-4 relative z-10">Specific Goals</h3>
            <ul className="text-gray-600 dark:text-gray-400 relative z-10 text-sm space-y-1">
              {company.about.objectives.slice(0, 3).map((obj: string, i: number) => (
                <li key={i}>• {obj}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Process Section - Visual 6.jpg */}
      <section className="py-24 bg-white dark:bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              <h2 className="text-3xl font-bold text-biovitam-dark dark:text-white">Our Manufacturing Process</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {company.qualityAssurance.production}
              </p>
              <ul className="space-y-4">
                {company.about.objectives.slice(3).map((item: string, i: number) => (
                  <li key={i} className="flex items-center space-x-3">
                    <CheckCircle className="text-biovitam-olive w-6 h-6" />
                    <span className="text-gray-800 dark:text-gray-200 font-bold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 rounded-organic-lg overflow-hidden shadow-xl cursor-zoom-in"
              onClick={() => openLightbox(ProcessImg, "Manufacturing Process")}
            >
              <img src={ProcessImg} alt="Manufacturing Process" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Supply Capability Section (10.jpg) */}
      <section id="supply-capability" className="py-24 bg-biovitam-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={HistoryImg} alt="Supply Capability Background" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold mb-6">Unmatched Supply Capability</h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              With our advanced production facilities and robust logistics network, we guarantee consistent availability for large-scale operations.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              <div>
                <h4 className="text-biovitam-secondary font-bold text-lg mb-2">Production Capacity</h4>
                <p className="text-3xl font-bold">50,000+ <span className="text-sm font-normal text-gray-400">Liters/Month</span></p>
              </div>
              <div>
                <h4 className="text-biovitam-secondary font-bold text-lg mb-2">Delivery Network</h4>
                <p className="text-3xl font-bold">Nationwide <span className="text-sm font-normal text-gray-400">coverage</span></p>
              </div>
            </div>
            <button className="bg-biovitam-secondary hover:bg-white hover:text-biovitam-secondary text-biovitam-dark px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-biovitam-secondary/20">
              Partner With Us
            </button>
          </div>
        </div>
      </section>


      {/* Company History - Visual 10.jpg (Reused/Context) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-background relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.h2
            className="text-4xl font-bold text-biovitam-dark dark:text-white mb-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Our Journey
          </motion.h2>

          <div className="relative mb-16 cursor-zoom-in" onClick={() => openLightbox(HistoryImg, "Biovitam History")}>
            <img src={HistoryImg} alt="Biovitam History" className="w-full rounded-organic shadow-lg border border-gray-200 dark:border-white/10 mb-12" />
          </div>

          <div className="space-y-0 relative">
            {/* Vertical Line */}
            <div className="absolute left-[23px] top-4 bottom-12 w-0.5 bg-gray-200 dark:bg-gray-800 -z-10" />

            {timeline.map((item: { year: string; event: string }, idx: number) => (
              <motion.div
                key={item.year}
                className="flex gap-8 group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white dark:bg-card border-4 border-biovitam-primary rounded-full flex items-center justify-center text-biovitam-primary font-bold text-sm shadow-sm group-hover:scale-110 transition-transform duration-300 z-10">
                    {item.year}
                  </div>
                  <div className="h-full w-0.5 bg-transparent my-2" />
                </div>
                <div className="pb-12 pt-2">
                  <div className="bg-white dark:bg-card p-6 rounded-organic border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-lg font-medium text-gray-800 dark:text-gray-200">{item.event}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 dark:bg-background/80">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-biovitam-dark dark:text-white mb-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Trusted Certifications
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {company.certifications.map((cert: any, idx: number) => (
              <motion.div
                key={cert.name}
                className="p-10 bg-white dark:bg-card rounded-organic border border-gray-100 dark:border-white/10 shadow-lg flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="text-7xl mb-6 filter drop-shadow-sm">{cert.logo}</div>
                <h3 className="text-2xl font-bold text-biovitam-dark dark:text-white mb-2">{cert.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">{cert.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-16 p-8 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-organic text-center max-w-3xl mx-auto backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4 text-blue-600">
              <CheckCircle size={24} />
            </div>
            <h3 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-2">Quality Assurance</h3>
            <p className="text-blue-800/80 dark:text-blue-300/80 leading-relaxed text-sm">
              All Biovitam products undergo rigorous testing to ensure purity, potency, and consistency. We maintain the highest standards in organic certification compliance.
            </p>
          </motion.div>
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
