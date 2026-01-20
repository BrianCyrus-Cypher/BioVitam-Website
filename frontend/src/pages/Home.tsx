import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { useEffect, useRef, useState } from 'react'
import { SEO, updatePageMeta } from '../utils/seo'
import { Activity, Layers, ShieldCheck, Sprout, ArrowUp, TrendingUp, Shield, Clock, Quote, MapPin, ZoomIn, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Lightbox } from '../components/ui/Lightbox'

const successStories = [
  {
    image: "https://images.unsplash.com/photo-1625246333195-bf791325d7b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    client: "James Mwangi",
    role: "Head Agronomist",
    farm: "Kiambu Coffee Estate",
    location: "Kiambu, Kenya",
    quote: "Since switching to Biovitam, we've seen a consistent yield increase of 30kg per tree on our coffee blocks.",
    stat: "+45% Yield Increase",
    category: "Coffee"
  },
  {
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    client: "Sarah Wanjiku",
    role: "Proprietor",
    farm: "Naivasha Rose Garden",
    location: "Naivasha, Kenya",
    quote: "The stem strength and color intensity of our roses have improved drastically. Our export rejection rate fell to nearly zero.",
    stat: "99% Export Grade",
    category: "Floriculture"
  },
  {
    image: "https://images.unsplash.com/photo-1595009552535-be713ad30ba3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    client: "Samuel Okech",
    role: "Farm Manager",
    farm: "Rift Valley Horticulture",
    location: "Nakuru, Kenya",
    quote: "Reducing the flush period by 10 days allowed us to hit market windows we previously missed. It's a game changer.",
    stat: "10 Days Faster Cycle",
    category: "Vegetables"
  }
]

export default function Home() {
  const [currentStory, setCurrentStory] = useState(0)
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; src: string; alt: string }>({
    isOpen: false,
    src: '',
    alt: '',
  })

  useEffect(() => {
    updatePageMeta(SEO.home.title, SEO.home.description, SEO.home.keywords)
  }, [])

  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const productScience = [
    {
      title: "All Growth",
      ratio: "30:9:12",
      focus: "Overall Vigor",
      icon: <Activity className="w-8 h-8 text-white" />,
      color: "bg-biovitam-primary",
      desc: "Balanced nutrition for vegetative growth and general health."
    },
    {
      title: "Strong Plant",
      ratio: "10:25:15",
      focus: "Structural Integrity",
      icon: <Layers className="w-8 h-8 text-white" />,
      color: "bg-biovitam-secondary",
      desc: "Fortifies stems and roots for robust, resilient plants."
    },
    {
      title: "Calcium Nitrate",
      ratio: "20:4:6:3",
      focus: "Cell Strength",
      icon: <ShieldCheck className="w-8 h-8 text-white" />,
      color: "bg-blue-600",
      desc: "Enhances cell wall strength and nutrient balance."
    },
    {
      title: "Flower & Fruit",
      ratio: "15:10:45",
      focus: "Reproductive Yields",
      icon: <Sprout className="w-8 h-8 text-white" />,
      color: "bg-orange-500",
      desc: "Maximizes flowering and fruiting for higher market value."
    }
  ]

  const benefits = [
    { title: "Stem Strength", desc: "Strong and sturdy stems for export quality.", icon: <ArrowUp className="text-biovitam-primary" /> },
    { title: "Yield Increase", desc: "More shoots per stalk, higher productivity.", icon: <TrendingUp className="text-biovitam-primary" /> },
    { title: "Natural Resistance", desc: "Resist pests & diseases, reducing chemical use.", icon: <Shield className="text-biovitam-primary" /> },
    { title: "Efficiency", desc: "Reduced flush period by up to 10 days.", icon: <Clock className="text-biovitam-primary" /> },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: "spring" },
    },
  }

  return (
    <div className="pt-16 min-h-screen">
      {/* A. Hero Section ("The Powering Hook") */}
      <section ref={targetRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-biovitam-primary/5 to-transparent skew-x-[-12deg] transform origin-top-right translate-x-1/4" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-biovitam-secondary/10 text-biovitam-secondary font-bold text-sm tracking-wide border border-biovitam-secondary/20">
              BIO-FORTIFIED ORGANIC SOLUTIONS
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-biovitam-primary mb-6 leading-tight">
              Powering Kenya's <span className="text-biovitam-secondary">Floriculture</span>
            </h1>
            <h2 className="text-2xl font-medium text-gray-700 mb-8 max-w-lg leading-relaxed font-sans">
              Achieve up to <span className="font-bold text-biovitam-primary">10 days reduced flush periods</span> and vibrant, export-quality blooms.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg font-bold shadow-xl shadow-biovitam-primary/20" onClick={() => window.location.href = '/contact'}>
                Get Your Yield Estimate
              </Button>
              <Button variant="outline" size="lg" className="text-lg font-bold border-2 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-biovitam-dark" onClick={() => window.location.href = '/products'}>
                View Product Formulas
              </Button>
              <Button variant="secondary" size="lg" className="text-lg font-bold shadow-lg" onClick={() => window.location.href = '/profile'}>
                Discover Our Profile
              </Button>
            </div>
          </motion.div>

          {/* Right: Visual (3D Render Placeholder) */}
          <motion.div
            style={{ y, opacity }}
            className="relative h-[600px] flex items-center justify-center"
          >
            {/* Decorative Circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[500px] h-[500px] border border-biovitam-primary/10 rounded-full absolute animate-[spin_60s_linear_infinite]" />
              <div className="w-[400px] h-[400px] border border-biovitam-secondary/20 rounded-full absolute animate-[spin_40s_linear_reverse_infinite]" />
            </div>

            {/* 3D Bottle Placeholder Generator */}
            <div className="relative z-10 w-full h-full max-w-md bg-white/30 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center justify-center text-center p-8 border border-white/50 dark:bg-black/30 dark:border-white/10 group cursor-zoom-in" onClick={() => setLightbox({ isOpen: true, src: "https://images.unsplash.com/photo-1585336261022-097e51e48c56?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", alt: "Biovitam Product in Garden" })}>
              <img
                src="https://images.unsplash.com/photo-1585336261022-097e51e48c56?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Biovitam Product in Garden"
                className="rounded-2xl shadow-lg mb-6 object-cover h-80 w-full transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 hidden md:block dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600 font-bold dark:bg-green-900 dark:text-green-300">✓</div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold dark:text-gray-400">Eco-Certified</p>
                    <p className="font-bold text-biovitam-primary">100% Organic</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* B. The "Product Science" Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-biovitam-primary mb-4">Our Bio-Fortified Formulas</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-sans">
              Scientifically engineered ratios to target every stage of crop development.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {productScience.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="group relative glass-panel rounded-organic overflow-hidden transition-all duration-300 hover:-translate-y-2 dark:bg-gray-800/50"
              >
                {/* Header Color Bar */}
                <div className={`${item.color} h-2 w-full`} />

                <div className="p-8">
                  <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md transform group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                  <p className="text-sm font-bold text-biovitam-secondary mb-4 uppercase tracking-wider">{item.focus}</p>

                  <div className="bg-gray-50/50 dark:bg-gray-700/50 p-3 rounded-lg border border-gray-100 dark:border-gray-600 mb-4 text-center">
                    <span className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight">{item.ratio}</span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mt-1">NPK Ratio</span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* C. "Key Benefits" Hub */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-biovitam-primary text-white overflow-hidden relative rounded-3xl mx-4 my-8">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-extrabold mb-6 leading-tight">Why Leading Farms Switch to Biovitam</h2>
              <p className="text-lg text-white/80 mb-8 font-sans leading-relaxed">
                Our bio-organic technology doesn't just replace synthetics—it outperforms them by restoring soil health and maximizing genetic potential.
              </p>
              <Button variant="secondary" size="lg" className="font-bold text-biovitam-primary bg-white hover:bg-gray-100" onClick={() => window.location.href = '/benefits'}>
                Explore the Science
              </Button>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/10 backdrop-blur-lg p-6 rounded-organic border border-white/10 hover:bg-white/20 transition-colors"
                >
                  <div className="bg-white/90 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-white/70 text-sm">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* D. "Proof of Results" (Success Stories Slideshow) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-biovitam-secondary/10 text-biovitam-secondary font-bold text-sm mb-4">
              <Star size={16} fill="currentColor" /> BEST PROJECTS & SUCCESS STORIES
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-biovitam-primary mb-4 dark:text-white">Impact in the Field</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Real results from farmers who have transformed their productivity with Biovitam.
            </p>
          </div>

          <div className="relative glass-panel rounded-organic-lg shadow-2xl border border-white/40 dark:border-white/10 overflow-hidden mx-auto max-w-6xl">
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentStory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]"
              >
                {/* Image Section */}
                <div className="lg:col-span-5 relative group cursor-zoom-in overflow-hidden"
                  onClick={() => setLightbox({ isOpen: true, src: successStories[currentStory].image, alt: successStories[currentStory].farm })}>
                  <img
                    src={successStories[currentStory].image}
                    alt={successStories[currentStory].farm}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-biovitam-dark/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center gap-2 mb-2 bg-biovitam-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      <MapPin size={14} /> {successStories[currentStory].location}
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                    <ZoomIn className="w-12 h-12 text-white drop-shadow-lg" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:col-span-7 p-8 md:p-16 flex flex-col justify-center bg-white dark:bg-card">
                  <div className="mb-8">
                    <Quote className="w-12 h-12 text-biovitam-primary/20 mb-6" />
                    <blockquote className="text-2xl md:text-3xl font-heading font-medium text-gray-800 dark:text-white leading-relaxed italic">
                      "{successStories[currentStory].quote}"
                    </blockquote>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mt-auto">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-biovitam-olive/10 flex items-center justify-center border-2 border-biovitam-olive/20 overflow-hidden">
                        <img
                          src={`https://ui-avatars.com/api/?name=${successStories[currentStory].client}&background=random`}
                          alt={successStories[currentStory].client}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-xl">{successStories[currentStory].client}</h4>
                        <p className="text-biovitam-secondary font-medium">{successStories[currentStory].role}, {successStories[currentStory].farm}</p>
                      </div>
                    </div>

                    <div className="bg-biovitam-primary/5 dark:bg-biovitam-primary/10 px-6 py-4 rounded-2xl border border-biovitam-primary/10">
                      <p className="text-xs font-bold text-biovitam-primary uppercase tracking-widest mb-1">Key Result</p>
                      <p className="text-2xl font-black text-biovitam-dark dark:text-white">{successStories[currentStory].stat}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute bottom-10 right-10 flex gap-4">
              <button
                onClick={() => setCurrentStory((prev) => (prev - 1 + successStories.length) % successStories.length)}
                className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center text-biovitam-primary hover:bg-biovitam-primary hover:text-white transition-all border border-gray-100 dark:border-white/10"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => setCurrentStory((prev) => (prev + 1) % successStories.length)}
                className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center text-biovitam-primary hover:bg-biovitam-primary hover:text-white transition-all border border-gray-100 dark:border-white/10"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Dots */}
            <div className="absolute top-10 right-10 flex gap-1.5">
              {successStories.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentStory ? 'w-8 bg-biovitam-primary' : 'w-1.5 bg-gray-200 dark:bg-gray-700'}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-20 flex flex-wrap justify-center items-center gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {['KEPHIS Approved', 'ECOCERT Certified', 'Organic Standard', 'ISO 9001'].map((cert) => (
              <div key={cert} className="text-xl font-black text-gray-400 dark:text-gray-600 tracking-tighter uppercase">{cert}</div>
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
