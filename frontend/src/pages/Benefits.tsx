import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Target, Leaf, Zap, Microscope } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { SEO, updatePageMeta } from '../utils/seo'
import BenefitIntro from '../assets/profile/2.jpg'

interface Benefit {
  icon: React.ReactNode
  title: string
  description: string
  metrics: string[]
}

const benefits: Benefit[] = [
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

const testimonials = [
  {
    quote: 'Biovitam transformed our flower farm. Our yields increased by 25% and we\'re now fully certified organic.',
    author: 'James Kipchoge',
    farm: 'Kiprotich Flowers, Rift Valley'
  },
  {
    quote: 'The soil quality improvement was noticeable within 6 months. Our water consumption is down, but yields are up!',
    author: 'Maria Santos',
    farm: 'Santos Vegetable Cooperative, Central Kenya'
  },
  {
    quote: 'Switching to Biovitam biofertilizers was the best decision for our family farm. Sustainable and profitable.',
    author: 'Peter Ochieng',
    farm: 'Ochieng Heritage Farm, Kisumu'
  }
]

export default function Benefits() {
  useEffect(() => {
    updatePageMeta(SEO.benefits.title, SEO.benefits.description, SEO.benefits.keywords)
  }, [])

  return (
    <div className="pt-20 min-h-screen bg-biovitam-light">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-white to-biovitam-light overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-biovitam-olive/10 text-biovitam-olive font-medium text-sm tracking-wide border border-biovitam-olive/20">
                THE SCIENCE OF BIOVITAM
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-biovitam-dark mb-6 tracking-tight">
                Unlock Your Soil's <span className="text-biovitam-olive">Full Potential</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-xl leading-relaxed mb-8">
                Our advanced formula does more than just feed the plant. It reactivates the soil microbiome, creating a self-sustaining ecosystem for long-term productivity.
              </p>
              <Button size="lg" className="bg-biovitam-olive hover:bg-biovitam-olive-dark shadow-xl hover:shadow-2xl transition-all">
                Download Research Data
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-organic-lg overflow-hidden shadow-2xl border-4 border-white"
            >
              <img src={BenefitIntro} alt="BioVitam Science" className="w-full h-auto object-cover" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="bg-biovitam-olive/10 p-3 rounded-full text-biovitam-olive">
                    <Microscope size={28} />
                  </div>
                  <div>
                    <p className="font-bold text-biovitam-dark text-lg">Lab Proven Results</p>
                    <p className="text-sm text-gray-500">Optimized NPK nutrient uptake efficiency</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
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
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                className="p-8 bg-white rounded-organic border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-biovitam-primary/5 hover:border-biovitam-primary/30 transition-all duration-300 group"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="mb-6 p-4 bg-gray-50 rounded-2xl w-fit group-hover:bg-biovitam-primary/10 transition-colors duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-biovitam-dark mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {benefit.description}
                </p>
                <ul className="space-y-3 border-t border-gray-100 pt-4">
                  {benefit.metrics.map((metric) => (
                    <li key={metric} className="flex items-start text-sm text-gray-600">
                      <span className="text-biovitam-primary mr-2 font-bold mt-0.5">•</span>
                      {metric}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Study / Before & After */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-biovitam-dark mb-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Real Results
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
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {/* Before */}
            <motion.div
              className="p-10 bg-white rounded-organic border-2 border-transparent shadow-lg"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <div className="inline-block px-4 py-1 bg-red-50 text-red-600 rounded-full text-sm font-bold mb-6 border border-red-100">Traditional Farming Issues</div>
              <ul className="space-y-4 text-gray-700">
                {[
                  "Heavy dependency on expensive synthetics",
                  "Declining soil fertility and structure degradation",
                  "Lower crop quality and inconsistent yields",
                  "High water usage and chemical runoff",
                  "Increased susceptibility to pests and diseases"
                ].map(item => (
                  <li key={item} className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* After */}
            <motion.div
              className="p-10 bg-white rounded-organic border-2 border-biovitam-primary/20 shadow-xl shadow-biovitam-primary/5 relative overflow-hidden"
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-biovitam-primary/5 rounded-bl-[100px] -z-0"></div>
              <div className="relative z-10">
                <div className="inline-block px-4 py-1 bg-green-50 text-green-600 rounded-full text-sm font-bold mb-6 border border-green-100">The Biovitam Difference</div>
                <ul className="space-y-4 text-gray-700">
                  {[
                    "Significantly reduced input costs",
                    "Restored soil microbiome and organic matter",
                    "20-30% higher yields with premium market value",
                    "Better water retention and drought resistance",
                    "Stronger, resilient plants naturally fighting disease"
                  ].map(item => (
                    <li key={item} className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-biovitam-dark mb-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Farmer Testimonials
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
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
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.author}
                className="p-8 bg-white rounded-organic border border-gray-100 shadow-lg"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-8 relative">
                  <span className="absolute -top-4 -left-2 text-6xl text-gray-100 font-serif leading-none">"</span>
                  {testimonial.quote}
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-biovitam-primary/20 rounded-full flex items-center justify-center text-biovitam-primary font-bold mr-3">
                    {testimonial.author[0]}
                  </div>
                  <div>
                    <p className="font-bold text-biovitam-dark text-sm">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      {testimonial.farm}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-biovitam-primary">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Experience the Difference?
          </motion.h2>
          <motion.p
            className="text-xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Join hundreds of Kenyan farmers who have already transformed their farms with Biovitam biofertilizers.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button variant="secondary" size="lg" className="text-lg px-10 py-6 h-auto shadow-xl hover:shadow-2xl transition-all font-bold">
              Get Started Today
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
