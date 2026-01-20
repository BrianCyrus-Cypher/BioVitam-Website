import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { X, Sprout } from 'lucide-react'
import { OptimizedImage } from '../components/ui/OptimizedImage'
import { SEO, updatePageMeta } from '../utils/seo'
import { Lightbox } from '../components/ui/Lightbox'
import ProductImg1 from '../assets/profile/3.jpg'
import ProductImg2 from '../assets/profile/4.jpg'
import ProductImg3 from '../assets/profile/11.jpg'

import { PRODUCT_DATA } from '../data/seed'
import { api } from '../utils/api'
import { Product } from '../types'

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [lightbox, setLightbox] = useState({ isOpen: false, src: '', alt: '' })
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const openLightbox = (src: string, alt: string) => {
    setLightbox({ isOpen: true, src, alt })
  }

  useEffect(() => {
    updatePageMeta(SEO.products.title, SEO.products.description, SEO.products.keywords)

    const fetchProducts = async () => {
      try {
        const data = await api.getProducts()
        if (data && data.length > 0) {
          const mapped = data.map((p: any) => ({
            ...p,
            image: p.id === 'all-growth' ? ProductImg1 :
              p.id === 'strong-plant' ? ProductImg2 :
                p.id === 'bloom-booster' ? ProductImg3 :
                  ProductImg1
          }))
          setProducts(mapped)
        } else {
          // Fallback to local
          setProducts(PRODUCT_DATA.map(p => ({
            ...p,
            image: p.id === 'all-growth' ? ProductImg1 :
              p.id === 'strong-plant' ? ProductImg2 :
                p.id === 'bloom-booster' ? ProductImg3 :
                  ProductImg1
          })))
        }
      } catch (err) {
        console.warn('Failed to fetch products, using fallback.', err)
        setProducts(PRODUCT_DATA.map(p => ({
          ...p,
          image: p.id === 'all-growth' ? ProductImg1 :
            p.id === 'strong-plant' ? ProductImg2 :
              p.id === 'bloom-booster' ? ProductImg3 :
                ProductImg1
        })))
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-biovitam-light dark:bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-biovitam-olive"></div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-biovitam-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-biovitam-olive/10 text-biovitam-olive font-medium text-sm tracking-wide border border-biovitam-olive/20">
            Premium Solutions
          </div>
          <h1 className="text-5xl font-bold text-biovitam-dark mb-6">Our Products</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Biovitam offers four scientifically formulated biofertilizer products, each optimized for specific crop growth stages and nutrient needs.
          </p>
        </motion.div>

        {/* Product Spotlight: Bloom Booster (11.jpg) */}
        <section className="mb-24">
          <div className="bg-biovitam-dark rounded-organic-lg overflow-hidden shadow-2xl relative">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-[500px] lg:h-auto group cursor-crosshair">
                <img src={ProductImg3} alt="Bloom Booster Scan" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Scanning Effect Overlay */}
                <div className="absolute top-0 left-0 w-full h-1 bg-biovitam-secondary/50 shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-[scan_3s_linear_infinite]" />

                {/* Interaction Hints */}
                <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur px-4 py-2 rounded-full text-white text-xs font-mono border border-white/20">
                  SYSTEM: ANALYZING FLOWERING COMPOUNDS...
                </div>
              </div>

              <div className="p-8 lg:p-16 flex flex-col justify-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-biovitam-olive/20 rounded-full blur-3xl pointer-events-none" />

                <h2 className="text-4xl font-extrabold mb-2 text-biovitam-secondary">BLOOM BOOSTER</h2>
                <p className="text-sm font-mono text-gray-400 mb-8 tracking-widest">PRODUCT ID: BB-003 // HIGH-PHOSPHATE</p>

                <div className="space-y-8 relative z-10">
                  <div className="bg-white/5 p-6 rounded-lg border-l-4 border-biovitam-secondary backdrop-blur-sm">
                    <h3 className="font-bold text-lg mb-2">Targeted Action</h3>
                    <p className="text-gray-300">Stimulates reproductive hormones to maximize flower count and fruit set.</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white/10 rounded-lg">
                      <div className="text-3xl font-bold">4%</div>
                      <div className="text-[10px] text-gray-400 uppercase">Nitrogen</div>
                    </div>
                    <div className="text-center p-4 bg-biovitam-secondary text-biovitam-dark rounded-lg shadow-lg transform scale-110">
                      <div className="text-3xl font-bold">6%</div>
                      <div className="text-[10px] text-biovitam-dark uppercase font-bold">Phosphate</div>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-lg">
                      <div className="text-3xl font-bold">4%</div>
                      <div className="text-[10px] text-gray-400 uppercase">Potassium</div>
                    </div>
                  </div>

                  <Button className="w-full bg-white text-biovitam-dark hover:bg-gray-100 font-bold tracking-wide" onClick={() => setSelectedProduct(products[2])}>
                    INITIATE TREATMENT PROTOCOL
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {products.map((product) => {
            // Skip displaying Bloom Booster in the main grid if we want to de-duplicate, 
            // BUT user might want it in both or just "update homepage".
            // User said "for all images upon hover...". Usually implies the list.
            // I'll leave it in the grid too, but apply the requested styles.
            return (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                onClick={() => setSelectedProduct(product)}
                className="cursor-pointer group h-full"
              >
                <div className="bg-white rounded-organic overflow-hidden shadow-sm hover:shadow-xl hover:shadow-biovitam-olive/20 transition-all duration-300 border border-gray-100 h-full flex flex-col relative">
                  <div className="h-64 overflow-hidden relative bg-gray-900">
                    {product.image ? (
                      <>
                        {/* Default State: Faded/Hidden (Opacity 0 or low) */}
                        <div className="absolute inset-0 bg-biovitam-dark z-10 opacity-60 group-hover:opacity-0 transition-opacity duration-500" />

                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-40 group-hover:opacity-100 filter grayscale group-hover:grayscale-0"
                        />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-biovitam-olive/5">
                        <Sprout className="text-biovitam-olive w-12 h-12" />
                      </div>
                    )}

                    {/* Overlay text shown when image is faded */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                      <span className="text-white/80 font-bold uppercase tracking-widest border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm">Reveal</span>
                    </div>

                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-biovitam-dark shadow-sm z-30">
                      {product.npk}
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-biovitam-dark mb-2">{product.name}</h3>
                    <p className="text-sm text-biovitam-olive font-medium mb-4">{product.formula}</p>
                    <p className="text-gray-600 text-sm mb-6 flex-grow">{product.description}</p>
                    <div className="mt-auto">
                      <span className="text-xs font-bold text-biovitam-secondary uppercase tracking-wider flex items-center group-hover:translate-x-2 transition-transform">
                        View Details <span className="ml-1">→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Feature Comparison */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-organic shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="p-6 lg:p-10 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-3xl font-bold text-biovitam-dark text-center">
                Quick Comparison
              </h2>
            </div>
            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-biovitam-primary/5">
                    <th className="px-6 py-4 text-left font-semibold text-biovitam-dark">Product</th>
                    <th className="px-6 py-4 text-center font-semibold text-biovitam-dark">Nitrogen</th>
                    <th className="px-6 py-4 text-center font-semibold text-biovitam-dark">Phosphate</th>
                    <th className="px-6 py-4 text-center font-semibold text-biovitam-dark">Potassium</th>
                    <th className="px-6 py-4 text-left font-semibold text-biovitam-dark">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => {
                    const [n, p, k] = product.npk.split('-')
                    return (
                      <tr key={product.id} className="hover:bg-biovitam-primary/5 transition-colors border-b border-gray-100 last:border-0">
                        <td className="px-6 py-4 font-semibold text-biovitam-dark">{product.name}</td>
                        <td className="px-6 py-4 text-center font-medium text-gray-600">{n}%</td>
                        <td className="px-6 py-4 text-center font-medium text-gray-600">{p}%</td>
                        <td className="px-6 py-4 text-center font-medium text-gray-600">{k}%</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{product.description}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile View (Enhanced Cards) */}
            <div className="md:hidden space-y-6 p-4">
              {products.map((product) => {
                const [n, p, k] = product.npk.split('-')
                return (
                  <div key={product.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-biovitam-olive/10 rounded-bl-full -z-0" />

                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-biovitam-dark mb-1">{product.name}</h3>
                      <p className="text-xs font-bold text-biovitam-olive uppercase mb-4 tracking-widest">{product.formula}</p>
                      <p className="text-gray-600 text-sm mb-6 leading-relaxed">{product.description}</p>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                          <span className="block text-lg font-black text-biovitam-dark">{n}%</span>
                          <span className="text-[9px] text-gray-500 uppercase font-bold">Nitrogen</span>
                        </div>
                        <div className="bg-biovitam-olive/10 p-3 rounded-xl border border-biovitam-olive/20 text-center">
                          <span className="block text-lg font-black text-biovitam-olive">{p}%</span>
                          <span className="text-[9px] text-biovitam-olive uppercase font-bold">Phosphate</span>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                          <span className="block text-lg font-black text-biovitam-dark">{k}%</span>
                          <span className="text-[9px] text-gray-500 uppercase font-bold">Potassium</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="mt-6 w-full py-3 text-sm font-bold text-biovitam-secondary border border-biovitam-secondary rounded-xl hover:bg-biovitam-secondary hover:text-white transition-colors shadow-sm hover:shadow-md"
                    >
                      View Details
                    </button>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </section>

        {/* Product Details Modal - Glassmorphism */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative border border-white/50"
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-biovitam-primary/95 backdrop-blur-md p-6 text-white flex justify-between items-center border-b border-white/10 z-10">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight">{selectedProduct.name}</h2>
                    <p className="text-white/80 font-medium mt-1">{selectedProduct.formula}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-8 space-y-8">
                  {/* Image in Modal */}
                  {selectedProduct.image && (
                    <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden cursor-zoom-in" onClick={() => openLightbox(selectedProduct.image!, selectedProduct.name)}>
                      <OptimizedImage src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                    </div>
                  )}

                  {/* NPK Ratio */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-bold text-biovitam-dark mb-4 flex items-center">
                        <span className="w-1.5 h-6 bg-biovitam-primary rounded-full mr-3"></span>
                        NPK Ratio
                      </h3>
                      <div className="bg-gradient-to-br from-biovitam-primary/5 to-biovitam-secondary/5 p-6 rounded-organic border border-biovitam-primary/10">
                        <div className="flex items-baseline space-x-2">
                          <p className="text-4xl font-bold text-biovitam-primary tracking-tight">{selectedProduct.npk}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-500 mt-2 uppercase tracking-wider">Nitrogen - Phosphate - Potassium</p>
                      </div>
                    </div>

                    {selectedProduct.idealFor && (
                      <div>
                        <h3 className="text-lg font-bold text-biovitam-dark mb-4 flex items-center">
                          <span className="w-1.5 h-6 bg-biovitam-olive rounded-full mr-3"></span>
                          Ideal For
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProduct.idealFor.map((item, idx) => (
                            <span key={idx} className="px-4 py-2 bg-biovitam-olive/10 text-biovitam-olive rounded-full text-sm font-bold border border-biovitam-olive/20">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 className="text-lg font-bold text-biovitam-dark mb-4 flex items-center">
                      <span className="w-1.5 h-6 bg-biovitam-secondary rounded-full mr-3"></span>
                      Key Benefits
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedProduct.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start space-x-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <span className="text-biovitam-primary mt-0.5 bg-biovitam-primary/10 rounded-full p-0.5">✓</span>
                          <span className="text-gray-700 font-medium">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Details & Usage Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Details */}
                    {selectedProduct.description && (
                      <div className="bg-gray-50 p-6 rounded-organic border border-gray-100">
                        <h3 className="text-lg font-bold text-biovitam-dark mb-3">Scientific Summary</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">{selectedProduct.description}</p>
                      </div>
                    )}

                    {/* Usage */}
                    {selectedProduct.usage && (
                      <div className="bg-blue-50/50 p-6 rounded-organic border border-blue-100">
                        <h3 className="text-lg font-bold text-biovitam-dark mb-3">Application</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">{selectedProduct.usage}</p>
                      </div>
                    )}
                  </div>

                  {/* Packaging */}
                  {selectedProduct.packaging && (
                    <div className="flex items-center space-x-2 text-sm text-gray-500 bg-gray-100/50 px-4 py-2 rounded-full w-fit">
                      <span className="font-semibold">Packaging:</span>
                      <span>{selectedProduct.packaging}</span>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="pt-6 border-t border-gray-100">
                    <Button size="lg" className="w-full text-lg py-6 shadow-lg shadow-biovitam-primary/20 hover:shadow-xl hover:shadow-biovitam-primary/30 transition-all">
                      Request Quote for {selectedProduct.name}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Lightbox
          isOpen={lightbox.isOpen}
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(prev => ({ ...prev, isOpen: false }))}
        />
      </div>
    </div>
  )
}
