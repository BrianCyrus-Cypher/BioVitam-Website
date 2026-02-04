import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { X } from 'lucide-react'
import { SEO, updatePageMeta } from '../utils/seo'
import { Lightbox } from '../components/ui/Lightbox'
import ProductImg1 from '../assets/Biovitam products/BIOVITAM ALL GROWTH 3D POUCH - FINAL 25 KGS.png'
import ProductImg2 from '../assets/Biovitam products/BIOVITAM CALCIUM, BORON, ZINC FORMULA.jpeg'
import ProductImg3 from '../assets/Biovitam products/BIOVITAM FLOWER & FRUIT 3D POUCH - FINAL 1 KG.png'
import ProductImg4 from '../assets/Biovitam products/BIOVITAM STRONG PLANT 3D POUCH - FINAL 10 KGS.png'
import { PRODUCT_DATA } from '../data/seed'
import { api } from '../utils/api'

interface Product {
    id: string
    name: string
    formula: string
    npk: string
    description: string
    benefits: string[]
    details?: string
    usage?: string
    packaging?: string
    image?: string
    focus?: string
}

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
                    const mapped = data.map((p: any) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
                        ...p,
                        image: p.id === 'biovitam-all-growth' ? ProductImg1 :
                            p.id === 'biovitam-strong-plant' ? ProductImg4 :
                                p.id === 'biovitam-flower-fruit' ? ProductImg3 :
                                    ProductImg2
                    }))
                    setProducts(mapped)
                } else {
                    // Fallback to local
                    setProducts(PRODUCT_DATA.map(p => ({
                        ...p,
                        image: p.id === 'biovitam-all-growth' ? ProductImg1 :
                            p.id === 'biovitam-strong-plant' ? ProductImg4 :
                                p.id === 'biovitam-flower-fruit' ? ProductImg3 :
                                    ProductImg2
                    })))
                }
            } catch (err) {
                // eslint-disable-next-line no-console
                console.warn('Failed to fetch products, using fallback.', err)
                setProducts(PRODUCT_DATA.map(p => ({
                    ...p,
                    image: p.id === 'biovitam-all-growth' ? ProductImg1 :
                        p.id === 'biovitam-strong-plant' ? ProductImg4 :
                            p.id === 'biovitam-flower-fruit' ? ProductImg3 :
                                ProductImg2
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
        <div className="pt-16 min-h-screen bg-biovitam-light dark:bg-background transition-colors duration-300">
            {/* Header / Hero Section - "Filled" Look like Image 1 */}
            {/* Header / Hero Section - "Filled" Look like Image 1 */}
            <section className="section-framed relative py-6 md:py-12 bg-biovitam-dark dark:bg-card">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-tr from-biovitam-dark/95 via-biovitam-dark/80 to-biovitam-primary/20" />
                    {/* Decorative Blurs */}
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-biovitam-primary/10 rounded-full blur-[120px]" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-biovitam-secondary/10 rounded-full blur-[120px]" />
                </div>

                <div className="content-container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <div className="inline-block mb-3 md:mb-4 px-3 md:px-4 py-1.5 rounded-full bg-biovitam-secondary/20 text-biovitam-secondary font-black text-[10px] md:text-xs tracking-[0.2em] uppercase border border-biovitam-secondary/30">
                            Premium Solutions
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 md:mb-6 tracking-tighter leading-tight">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-biovitam-primary to-biovitam-secondary">Products</span>
                        </h1>
                        <p className="text-base sm:text-xl md:text-2xl text-white font-bold max-w-2xl mx-auto leading-relaxed px-4 md:px-0">
                            Biovitam offers scientifically formulated biofertilizer products, each optimized for specific crop growth stages and nutrient needs.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="content-container py-4 md:py-8 relative">

                {/* Product Grid Section */}
                <section className="mb-8 relative">
                    {/* Background Glow Decorations */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[800px] bg-biovitam-primary/5 dark:bg-biovitam-primary/10 rounded-full blur-[150px] pointer-events-none" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-2 sm:px-4 max-w-7xl mx-auto">
                        {products.map((product, idx) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="group cursor-pointer"
                                onClick={() => setSelectedProduct(product)}
                            >
                                {/* Premium Card with Glow */}
                                <div className="relative">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-biovitam-primary to-biovitam-secondary rounded-[2rem] blur opacity-20 group-hover:opacity-60 transition duration-1000"></div>

                                    <div className="relative bg-white/40 dark:bg-white/5 backdrop-blur-3xl rounded-[2rem] p-4 sm:p-6 border border-white/20 shadow-2xl overflow-hidden ring-1 ring-white/20 hover:scale-105 transition-transform duration-500">
                                        {/* Product Image */}
                                        <div className="relative aspect-square rounded-[1.5rem] overflow-hidden bg-gradient-to-b from-white/10 to-transparent mb-4 sm:mb-6">
                                            <img
                                                src={product.image || ProductImg1}
                                                alt={`${product.name} Formula`}
                                                className="w-full h-full object-contain p-4 sm:p-6 drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)] transform group-hover:scale-110 transition-transform duration-1000"
                                            />
                                        </div>

                                        {/* Product Name with Formula */}
                                        <h3 className="text-lg sm:text-xl font-black text-biovitam-dark dark:text-white mb-2 tracking-tight text-center leading-tight">
                                            {product.name} Formula
                                        </h3>

                                        {/* NPK Ratio Badge */}
                                        <div className="flex justify-center mb-4">
                                            <div className="bg-biovitam-dark dark:bg-white text-white dark:text-biovitam-dark px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-lg">
                                                <p className="text-xs sm:text-sm font-black tracking-wider">{product.npk}</p>
                                            </div>
                                        </div>

                                        {/* Hover Hint */}
                                        <p className="text-sm text-center text-biovitam-secondary font-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                                            Click for details
                                        </p>
                                        <p className="text-xs text-center text-biovitam-secondary font-black sm:hidden opacity-80">
                                            Tap for details
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Feature Comparison */}
                <section className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white dark:bg-card rounded-organic shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden"
                    >
                        <div className="p-8 border-b border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                            <h2 className="text-3xl font-bold text-biovitam-dark dark:text-white text-center">
                                Quick Comparison
                            </h2>
                        </div>
                        {/* Desktop View */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-biovitam-primary/5 dark:bg-biovitam-primary/10">
                                        <th className="px-6 py-4 text-left font-semibold text-biovitam-dark dark:text-white">Product</th>
                                        <th className="px-6 py-4 text-center font-bold text-biovitam-dark dark:text-white uppercase tracking-tighter text-xs">N/Ca Nitrate</th>
                                        <th className="px-6 py-4 text-center font-bold text-biovitam-dark dark:text-white uppercase tracking-tighter text-xs">P/Mg Nitrate</th>
                                        <th className="px-6 py-4 text-center font-bold text-biovitam-dark dark:text-white uppercase tracking-tighter text-xs">K/Boron</th>
                                        <th className="px-6 py-4 text-center font-bold text-biovitam-dark dark:text-white uppercase tracking-tighter text-xs">Zn/Other</th>
                                        <th className="px-6 py-4 text-left font-semibold text-biovitam-dark dark:text-white">Product Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => {
                                        const ratios = product.npk.split('-')
                                        return (
                                            <tr key={product.id} className="hover:bg-biovitam-primary/5 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-white/10 last:border-0">
                                                <td className="px-6 py-4 font-black text-biovitam-dark dark:text-white">{product.name} Formula</td>
                                                {ratios.map((val, idx) => (
                                                    <td key={idx} className="px-6 py-4 text-center font-bold text-biovitam-primary dark:text-biovitam-secondary">{val}</td>
                                                ))}
                                                {ratios.length < 4 && <td className="px-6 py-4 text-center font-bold text-gray-300">-</td>}
                                                <td className="px-6 py-4 text-sm md:text-base text-biovitam-dark dark:text-white font-black line-clamp-2 max-w-xs">{product.description}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile View (Cards) */}
                        <div className="md:hidden space-y-4 p-4">
                            {products.map((product) => {
                                const ratios = product.npk.split('-')
                                return (
                                    <div key={product.id} className="bg-gray-50 dark:bg-card rounded-lg p-4 border border-gray-100 dark:border-white/10 shadow-sm">
                                        <h3 className="text-xl font-bold text-biovitam-primary mb-2">{product.name} Formula</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 italic line-clamp-2">{product.description}</p>

                                        <div className="grid grid-cols-4 gap-2 mb-4 text-center">
                                            {ratios.map((val, idx) => (
                                                <div key={idx} className="bg-white dark:bg-background p-2 rounded-xl border border-gray-200 dark:border-white/10">
                                                    <span className="block font-black text-biovitam-primary dark:text-white">{val}</span>
                                                    <span className="text-[10px] text-biovitam-dark dark:text-white/80 uppercase font-black">{idx === 0 ? 'N/Ca' : idx === 1 ? 'P/Mg' : idx === 2 ? 'K/B' : 'Zn'}</span>
                                                </div>
                                            ))}
                                            {ratios.length < 4 && (
                                                <div className="bg-gray-100/50 dark:bg-white/5 p-2 rounded-xl border border-dashed border-gray-200 dark:border-white/10 flex items-center justify-center">
                                                    <span className="text-gray-400 text-xs">-</span>
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => setSelectedProduct(product)}
                                            className="w-full py-2 text-sm font-bold text-biovitam-secondary border border-biovitam-secondary rounded-lg hover:bg-biovitam-secondary hover:text-white transition-colors"
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
                                className="bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative border border-white/50 dark:border-white/10"
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
                                            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                                        </div>
                                    )}

                                    {/* NPK Ratio */}
                                    <div>
                                        <h3 className="text-lg font-bold text-biovitam-dark dark:text-white mb-4 flex items-center">
                                            <span className="w-1.5 h-6 bg-biovitam-primary rounded-full mr-3"></span>
                                            NPK Ratio
                                        </h3>
                                        <div className="bg-gradient-to-br from-biovitam-primary/5 to-biovitam-secondary/5 dark:from-white/5 dark:to-white/5 p-6 rounded-organic border border-biovitam-primary/10 dark:border-white/10">
                                            <div className="flex items-baseline space-x-2">
                                                <p className="text-4xl font-bold text-biovitam-primary tracking-tight">{selectedProduct.npk}</p>
                                            </div>
                                            <p className="text-sm font-black text-biovitam-dark dark:text-white mt-2 uppercase tracking-widest">
                                                {selectedProduct.npk.split('-').length > 3
                                                    ? 'N/Ca - P/Mg - K/B - Zn/Other'
                                                    : 'Nitrogen (N) - Phosphate (P) - Potassium (K)'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Benefits */}
                                    <div>
                                        <h3 className="text-lg font-bold text-biovitam-dark dark:text-white mb-4 flex items-center">
                                            <span className="w-1.5 h-6 bg-biovitam-secondary rounded-full mr-3"></span>
                                            Key Benefits
                                        </h3>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {selectedProduct.benefits.map((benefit, idx) => (
                                                <li key={idx} className="flex items-start space-x-3 bg-gray-50 dark:bg-white/5 p-3 rounded-lg border border-gray-100 dark:border-white/10">
                                                    <span className="text-biovitam-primary mt-0.5 bg-biovitam-primary/10 rounded-full p-0.5">✓</span>
                                                    <span className="text-gray-700 dark:text-gray-300 font-medium">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Details & Usage Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Details */}
                                        {selectedProduct.details && (
                                            <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-organic border border-gray-100 dark:border-white/10">
                                                <h3 className="text-lg font-bold text-biovitam-dark dark:text-white mb-3">Details</h3>
                                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{selectedProduct.details}</p>
                                            </div>
                                        )}

                                        {/* Usage */}
                                        {selectedProduct.usage && (
                                            <div className="bg-blue-50/50 dark:bg-blue-900/10 p-6 rounded-organic border border-blue-100 dark:border-blue-900/20">
                                                <h3 className="text-lg font-bold text-biovitam-dark dark:text-white mb-3">Application</h3>
                                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{selectedProduct.usage}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Packaging */}
                                    {selectedProduct.packaging && (
                                        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100/50 dark:bg-white/5 px-4 py-2 rounded-full w-fit">
                                            <span className="font-semibold">Packaging:</span>
                                            <span>{selectedProduct.packaging}</span>
                                        </div>
                                    )}

                                    {/* CTA */}
                                    <div className="pt-6 border-t border-gray-100 dark:border-white/10">
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

                {/* Trust Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-4 py-8 px-6 rounded-3xl bg-gradient-to-br from-biovitam-dark to-slate-900 text-white text-center shadow-2xl overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-biovitam-primary/20 rounded-full blur-[100px] -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-biovitam-secondary/20 rounded-full blur-[100px] -ml-32 -mb-32" />

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-biovitam-olive/20 rounded-2xl flex items-center justify-center border border-biovitam-olive/30 backdrop-blur-sm">
                                <svg className="w-8 h-8 text-biovitam-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Certified Performance & Quality</h2>
                        <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                            Every drop of Biovitam is engineered to perform. Our biofertilizers are KEPHIS-approved and manufactured under rigorous quality control standards to ensure maximum yield for your crops.
                        </p>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Simple placeholders for certification logos */}
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">🏛️</span>
                                <span className="font-bold tracking-widest text-xs uppercase">KEPHIS Approved</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">🌱</span>
                                <span className="font-bold tracking-widest text-xs uppercase">Organic Certified</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">🌍</span>
                                <span className="font-bold tracking-widest text-xs uppercase">Eco Friendly</span>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    )
}
