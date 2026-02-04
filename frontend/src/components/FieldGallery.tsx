import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, MapPin, Camera } from 'lucide-react'

interface GalleryItem {
    id: string
    title: string
    category: string
    description: string
    image: string
    location: string
    stage: string
}

interface FieldGalleryProps {
    items: GalleryItem[]
}

export const FieldGallery = ({ items }: FieldGalleryProps) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(0)

    const nextSlide = () => {
        setDirection(1)
        setCurrentIndex((prev) => (prev + 1) % items.length)
    }

    const prevSlide = () => {
        setDirection(-1)
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
    }

    useEffect(() => {
        const timer = setInterval(nextSlide, 7000)
        return () => clearInterval(timer)
    }, [currentIndex])

    const variants = {
        enter: {
            opacity: 0,
            scale: 1.05
        },
        center: {
            zIndex: 1,
            opacity: 1,
            scale: 1
        },
        exit: {
            zIndex: 0,
            opacity: 0,
            scale: 0.95
        }
    }

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    return (
        <section className="py-8 bg-white dark:bg-background overflow-hidden">
            <div className="content-container">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 gap-6">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-4 text-biovitam-primary font-bold tracking-wider uppercase text-sm">
                            <Camera size={20} /> Success in the Field
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-biovitam-dark dark:text-white mb-4 leading-tight">
                            Real Results, <span className="text-biovitam-secondary">Real Context</span>
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Explore the lifecycle of crops treated with Biovitam. From vibrant flowering to record-breaking harvests, our precision formulas deliver visible excellence.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={prevSlide}
                            className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-biovitam-dark dark:text-white hover:bg-biovitam-primary hover:text-white transition-all shadow-sm border border-gray-100 dark:border-white/10"
                        >
                            <ChevronLeft size={28} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-biovitam-dark dark:text-white hover:bg-biovitam-primary hover:text-white transition-all shadow-sm border border-gray-100 dark:border-white/10"
                        >
                            <ChevronRight size={28} />
                        </button>
                    </div>
                </div>

                <div className="relative h-[500px] md:h-[750px] overflow-hidden rounded-[3rem] shadow-2xl max-w-[1400px] mx-auto">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(_e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);

                                if (swipe < -swipeConfidenceThreshold) {
                                    nextSlide();
                                } else if (swipe > swipeConfidenceThreshold) {
                                    prevSlide();
                                }
                            }}
                            transition={{
                                opacity: { duration: 0.8, ease: "easeInOut" },
                                scale: { duration: 0.8, ease: "easeOut" }
                            }}
                            className="absolute inset-0 cursor-grab active:cursor-grabbing touch-pan-y"
                        >
                            <img
                                src={items[currentIndex].image}
                                alt={items[currentIndex].title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            <div className="absolute bottom-10 left-6 right-6 md:bottom-16 md:left-16 md:right-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-4 py-1 rounded-full bg-biovitam-primary text-white text-xs font-bold uppercase tracking-widest">
                                            {items[currentIndex].category}
                                        </span>
                                        <span className="px-4 py-1 rounded-full bg-biovitam-secondary text-white text-xs font-bold uppercase tracking-widest">
                                            {items[currentIndex].stage}
                                        </span>
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-black text-white leading-tight">
                                        {items[currentIndex].title}
                                    </h3>
                                    <p className="text-lg text-white/80 max-w-xl line-clamp-2 md:line-clamp-none">
                                        {items[currentIndex].description}
                                    </p>
                                </div>

                                <div className="flex flex-col items-start lg:items-end gap-4">
                                    <div className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
                                        <MapPin size={20} className="text-biovitam-secondary" />
                                        <span className="font-bold tracking-wide">{items[currentIndex].location}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Progress Indicators */}
                    <div className="absolute top-10 left-10 flex gap-2 z-20">
                        {items.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1.5 transition-all duration-500 rounded-full ${idx === currentIndex ? 'w-12 bg-white' : 'w-4 bg-white/30'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
