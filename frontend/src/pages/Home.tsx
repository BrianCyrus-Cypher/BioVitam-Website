import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { OptimizedImage } from '../components/ui/OptimizedImage'
import { useEffect, useRef, useState } from 'react'
import { SEO, updatePageMeta } from '../utils/seo'
import { Activity, Layers, ShieldCheck, Sprout, ArrowUp, TrendingUp, Shield, Clock, Quote, MapPin, ChevronLeft, ChevronRight, Star, Camera } from 'lucide-react'
import { Lightbox } from '../components/ui/Lightbox'
import { PerformanceWrapper } from '../components/PerformanceWrapper'
import { ImpactMetrics } from '../components/ImpactMetrics'
import { api } from '../utils/api'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody } from '../components/ui/Dialog'
import { Input } from '../components/ui/Input'
import CoffeeImg from '../assets/profile/coffee.jpg'
import FlowersImg from '../assets/profile/flowers-at-Sian-Maasai-Flowers.jpg'
import RiftValleyImg from '../assets/profile/rift valley.jpg'
import HeroBgImg from '../assets/profile/Hero page background image.png'
import RedApplesImg from '../assets/profile/red-apples.jpg'
import { YIELD_DATA, CropData } from '../data/yieldData'
import SPRAYING_CALENDAR from '../data/sprayingCalendar.json'
import { FieldGallery } from '../components/FieldGallery'

// Gallery & Crop Images
import TeaGallery from '../assets/cropphotosbiovitam/TEA LEAVES PLANTATION - 5 - 19.11.2025.jpg'
import AvocadoGallery from '../assets/cropphotosbiovitam/AVOCADO TREE FLOWERING.jpg'
import MaizeGallery from '../assets/cropphotosbiovitam/MAIZE TUSSLING STAGE 2.jpg'
import PineappleGallery from '../assets/cropphotosbiovitam/PINEAPPLES MATURE RIPE - 2 (1).jpg'
import RoseGallery from '../assets/cropphotosbiovitam/ROSE FLOWERS - 1.jpeg'
import OnionGallery from '../assets/cropphotosbiovitam/RED ONION BULB HARDENING & SETTING - 4.jpg'
import CoffeeIconImg from '../assets/cropphotosbiovitam/COFFEE PINHEAD.png'

// Product Images
import ProductAllGrowth from '../assets/Biovitam products/BIOVITAM ALL GROWTH 3D POUCH - FINAL 25 KGS.png'
import ProductCalcium from '../assets/Biovitam products/BIOVITAM CALCIUM, BORON, ZINC FORMULA.jpeg'
import ProductFlowerFruit from '../assets/Biovitam products/BIOVITAM FLOWER & FRUIT 3D POUCH - FINAL 1 KG.png'
import ProductStrongPlant from '../assets/Biovitam products/BIOVITAM STRONG PLANT 3D POUCH - FINAL 10 KGS.png'


const CROP_ECOSYSTEM = [
  { name: "Avocado", icon: AvocadoGallery, desc: "Premium oil content and fruit size enhancement." },
  { name: "Tea", icon: TeaGallery, desc: "Superior leaf quality and pluck cycles." },
  { name: "Maize", icon: MaizeGallery, desc: "Drought resilience and grain density." },
  { name: "Flowers", icon: RoseGallery, desc: "Vibrant pigmentation and stem strength." },
  { name: "Coffee", icon: CoffeeIconImg, desc: "Consistent berry ripening and cup quality." },
];

interface ClienteleStory {
  client: string;
  role: string;
  farm: string;
  location: string;
  quote: string;
  stat: string;
  category: string;
  image: string;
}


const FALLBACK_STORIES: ClienteleStory[] = [
  {
    image: RiftValleyImg,
    client: "Samuel Okech",
    role: "Farm Manager",
    farm: "Rift Valley Horticulture",
    location: "Nakuru, Kenya",
    quote: "BioVitam has transformed our approach to soil health. Our vegetable yields have increased by 35% in just one season.",
    stat: "+35% Yield Increase",
    category: "Vegetables"
  },
  {
    image: FlowersImg,
    client: "Sarah Wanjiku",
    role: "Proprietor",
    farm: "Highland Flower Farms",
    location: "Naivasha, Kenya",
    quote: "The stem strength and color intensity of our roses have improved drastically. Our export rejection rate fell to nearly zero.",
    stat: "99% Export Grade",
    category: "Floriculture"
  },
  {
    image: RedApplesImg,
    client: "Peter Kamau",
    role: "Owner",
    farm: "Central Highlands Orchards",
    location: "Nyeri, Kenya",
    quote: "Our fruit trees are more resilient to seasonal changes. The quality of our produce has opened up new export markets.",
    stat: "+30% Weight Premium",
    category: "Fruit"
  },
  {
    image: CoffeeImg,
    client: "James Mwangi",
    role: "Head Agronomist",
    farm: "Kiambu Coffee Estate",
    location: "Kiambu, Kenya",
    quote: "Since switching to BioVitam, our coffee cherries are more uniform in size and the trees are much hardier against pests.",
    stat: "+45% Yield Increase",
    category: "Coffee"
  }
];

const FIELD_GALLERY_DATA = [
  {
    id: 'tea-plantation',
    title: 'Emerald Vigor in the Highlands',
    category: 'Tea',
    description: 'A thriving tea plantation showing enhanced shoot density and leaf quality after 3 months of Biovitam All Growth treatment.',
    image: TeaGallery,
    location: 'Kericho County, Kenya',
    stage: 'Vegetative Growth'
  },
  {
    id: 'maize-tussling',
    title: 'Precision Tussling & Cob Set',
    category: 'Maize',
    description: 'Uniform growth and massive cob formation. Biovitam Strong Plant ensures structural integrity during critical height gains.',
    image: MaizeGallery,
    location: 'Uasin Gishu, Kenya',
    stage: 'Reproductive Stage'
  },
  {
    id: 'avocado-flowering',
    title: 'Massive Flowering, Zero Abortion',
    category: 'Avocado',
    description: 'Hass Avocado trees showing extreme flowering density. Flower & Fruit formula minimizes abortion and maximizes fruit set.',
    image: AvocadoGallery,
    location: 'Murang\'a County, Kenya',
    stage: 'Flowering'
  },
  {
    id: 'pineapple-ripening',
    title: 'Uniform Ripening & Sweetness',
    category: 'Pineapple',
    description: 'Export-grade pineapples with superior Brix levels and weight. Calcium Boron Zinc formula ensures cell-wall strength.',
    image: PineappleGallery,
    location: 'Thika, Kenya',
    stage: 'Maturity'
  },
  {
    id: 'rose-blooms',
    title: 'Export Grade Petal Intensity',
    category: 'Floriculture',
    description: 'Vibrant color and long-stem strength. Our specialized floriculture protocol reduces rejection rates by up to 90%.',
    image: RoseGallery,
    location: 'Naivasha, Kenya',
    stage: 'Prime Bloom'
  },
  {
    id: 'onion-bulbing',
    title: 'Bulb Hardening & Size',
    category: 'Onions',
    description: 'Red onions showing rapid bulb expansion and firm skin development. Enhanced with Biovitam mineral blends.',
    image: OnionGallery,
    location: 'Kajiado County, Kenya',
    stage: 'Bulbing'
  }
]

const productScience = [
  {
    title: "All Growth",
    ratio: "30:9:12",
    focus: "Overall Vigor",
    icon: <Activity className="w-8 h-8 text-green-500 glow-all-growth" />,
    color: "bg-biovitam-primary/10",
    image: ProductAllGrowth,
    desc: "Balanced nutrition for vegetative growth and general health."
  },
  {
    title: "Strong Plant",
    ratio: "10:25:15",
    focus: "Structural Integrity",
    icon: <Layers className="w-8 h-8 text-[#7FFFD4] glow-strong-plant" />,
    color: "bg-biovitam-secondary/10",
    image: ProductStrongPlant,
    desc: "Fortifies stems and roots for robust, resilient plants."
  },
  {
    title: "Calcium+Boron+Zinc Formula",
    ratio: "20:4:6:3",
    focus: "Cell Strength & Immunity",
    icon: <ShieldCheck className="w-8 h-8 text-[#C0C0C0] glow-calcium" />,
    color: "bg-slate-100 dark:bg-slate-800",
    image: ProductCalcium,
    desc: "Premium blend of Calcium Nitrate, Magnesium Nitrate, Boron, and Zinc."
  },
  {
    title: "Flower & Fruit",
    ratio: "15:10:45",
    focus: "Reproductive Yields",
    icon: <Sprout className="w-8 h-8 text-[#FFD700] glow-fruit" />,
    color: "bg-orange-50",
    image: ProductFlowerFruit,
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

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function Home() {
  const [successStories, setSuccessStories] = useState(FALLBACK_STORIES)
  const [isLoading, setIsLoading] = useState(true)
  const [currentStory, setCurrentStory] = useState(0)
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; src: string; alt: string }>({
    isOpen: false,
    src: '',
    alt: '',
  })
  const [estimateModal, setEstimateModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>(YIELD_DATA[0].id)
  const [selectedCropName, setSelectedCropName] = useState<string>(YIELD_DATA[0].crops[0].name)
  const [acreage, setAcreage] = useState<number>(1)
  const [unit, setUnit] = useState<'Acres' | 'Hectares'>('Acres')
  const [currentYield, setCurrentYield] = useState<number>(0)
  const [calculationResult, setCalculationResult] = useState<{
    crop: CropData,
    totalQuantity: number,
    projectedYieldIncrease: number
  } | null>(null)

  const handleCalculate = () => {
    const category = YIELD_DATA.find(c => c.id === selectedCategory)
    let crop = category?.crops.find(c => c.name === selectedCropName)

    if (crop) {
      // Find matching schedule from new JSON
      // Normalize names for comparison (remove special chars, lowercase)
      const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
      const targetName = normalize(selectedCropName);

      const schedule = SPRAYING_CALENDAR.find((s: any) => {
        const sName = normalize(s.name);
        return sName.includes(targetName) || targetName.includes(sName);
      });

      if (schedule) {
        // Extract extra fields (excluding standard ones)
        const standardKeys = ['name', 'duration_of_application', 'application_intervals', 'application_rate', 'schedule_details'];
        const extras: Record<string, string> = {};
        const scheduleObj = schedule as Record<string, any>;
        const scheduleDetails = scheduleObj.schedule_details || [];

        Object.keys(scheduleObj).forEach(key => {
          if (!standardKeys.includes(key)) {
            // Format key for display (replace underscores with spaces, capitalize)
            const displayKey = key.replace(/_/g, ' ').replace(/\//g, ' / ').replace(/\b\w/g, l => l.toUpperCase());
            extras[displayKey] = String(scheduleObj[key]);
          }
        });

        // Create a new crop object with overridden values for display
        crop = {
          ...crop,
          rate: (schedule as any).application_rate || crop.rate,
          interval: (schedule as any).application_intervals || crop.interval,
          duration: (schedule as any).duration_of_application || crop.duration,
          // Attach extras to crop object (casting to any to allow dynamic property)
          ...({ extras, scheduleDetails } as any)
        };
      }

      let quantityMultiplier = 5; // Default for Acres
      if (unit === 'Hectares') {
        quantityMultiplier = selectedCategory === 'floriculture' ? 8 : 12.5;
      }

      const totalQuantity = Math.ceil(acreage * quantityMultiplier);
      const projectedIncrease = Math.round(currentYield * 0.3); // Consistent 30% increase heuristic

      setCalculationResult({
        crop: crop!,
        totalQuantity: totalQuantity,
        projectedYieldIncrease: projectedIncrease
      })
    }
  }

  // Effect to reset crop when category changes
  useEffect(() => {
    const category = YIELD_DATA.find(c => c.id === selectedCategory)
    if (category && category.crops.length > 0) {
      setSelectedCropName(category.crops[0].name)
    }
  }, [selectedCategory])


  useEffect(() => {
    updatePageMeta(SEO.home.title, SEO.home.description, SEO.home.keywords)

    const fetchStories = async () => {
      try {
        const data = await api.getClientele()
        if (data && data.length > 0) {
          setSuccessStories(data.map((item: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
            // Map images by category to ensure correct assignment
            let categoryImage = CoffeeImg; // safe default

            if (item.category === 'Coffee') {
              categoryImage = CoffeeImg;
            } else if (item.category === 'Floriculture') {
              categoryImage = FlowersImg;
            } else if (item.category === 'Vegetables') {
              categoryImage = RiftValleyImg;
            } else if (item.category === 'Fruit') {
              categoryImage = RedApplesImg;
            }

            return {
              client: item.name,
              role: item.category,
              farm: item.location,
              location: item.location,
              quote: item.feedback || item.content,
              stat: item.stat || item.title,
              category: item.category,
              image: categoryImage
            }
          }))
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('Failed to fetch home stories, using fallback.', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchStories()
  }, [])

  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-biovitam-light dark:bg-background text-biovitam-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-biovitam-primary"></div>
      </div>
    )
  }

  return (
    <PerformanceWrapper componentName="HomePage">
      <div className="pt-16 min-h-screen bg-biovitam-light dark:bg-background overflow-hidden font-sans text-biovitam-dark dark:text-gray-100">
        {/* A. Hero Section */}
        <section ref={targetRef} className="section-framed relative min-h-[75vh] flex items-center">
          <motion.div
            style={{ y: parallaxY }}
            className="absolute inset-0 z-0"
          >
            <img
              src={HeroBgImg}
              alt="BioVitam Agricultural Landscape"
              className="w-full h-full object-cover brightness-[1.0] contrast-[1.1]"
              loading="eager"
            />
            {/* Minimal overlays for readability without sacrificing clarity */}
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-biovitam-dark/40 to-transparent" />
          </motion.div>

          {/* Floating Detail Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-biovitam-primary/20 rounded-full blur-[120px]"
            />
            <motion.div
              animate={{ y: [0, 20, 0], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-biovitam-secondary/10 rounded-full blur-[150px]"
            />
          </div>

          <div className="content-container w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/5 dark:bg-black/20 backdrop-blur-2xl p-4 sm:p-6 md:p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 shadow-2xl"
            >
              <div className="inline-block mb-4 px-4 py-2 rounded-full bg-biovitam-secondary text-white font-bold text-xs tracking-widest uppercase shadow-lg shadow-biovitam-secondary/20">
                Next-Gen Organic Bio-Science
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white mb-3 sm:mb-4 leading-[1.1] tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-biovitam-secondary">Biovitam</span> <br />
                Organic Biofertilizers
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 max-w-2xl leading-relaxed">
                Transforming soil health and crop yields with our precision bio-fortified organic formulas. Pure. Potent. Proven.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <Button size="lg" className="bg-biovitam-secondary hover:bg-white hover:text-biovitam-secondary text-white text-base sm:text-lg font-bold h-14 sm:h-16 px-8 sm:px-10 rounded-xl sm:rounded-2xl shadow-2xl transition-all duration-300" onClick={() => setEstimateModal(true)}>
                  Explore Yield Potential
                </Button>
                <Button variant="outline" size="lg" className="border-2 border-white/40 hover:border-white text-white text-base sm:text-lg font-bold h-14 sm:h-16 px-8 sm:px-10 rounded-xl sm:rounded-2xl backdrop-blur-md transition-all duration-300" onClick={() => window.location.href = '/products'}>
                  Our Formulas
                </Button>
              </div>

              {/* Crop Icons Integration */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-white font-black text-sm uppercase tracking-[0.2em] mb-6">Works with all ecosystems</p>
                <div className="flex flex-wrap gap-6 items-center">
                  {CROP_ECOSYSTEM.map((crop) => (
                    <motion.div
                      key={crop.name}
                      whileHover={{ scale: 1.1, y: -5 }}
                      className="group relative flex flex-col items-center gap-2"
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20 bg-white/10 backdrop-blur-md transition-all group-hover:border-biovitam-secondary group-hover:bg-white/20 shadow-xl">
                        <img src={crop.icon} alt={crop.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] font-bold text-white/70 uppercase tracking-tighter group-hover:text-white">{crop.name}</span>

                      {/* Hover Tooltip/Tooltip-like card */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-40 p-3 bg-white/95 dark:bg-biovitam-dark/95 backdrop-blur-xl rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/20 z-50">
                        <p className="text-xs font-bold text-biovitam-dark dark:text-white mb-1">{crop.name}</p>
                        <p className="text-[10px] text-gray-500 leading-tight">{crop.desc}</p>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white/95 dark:border-t-biovitam-dark/95" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 group cursor-pointer" onClick={() => window.location.href = '/products'}>
                {/* Premium Card Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-biovitam-primary to-biovitam-secondary rounded-[3rem] blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>

                <div className="relative bg-white/10 backdrop-blur-3xl rounded-[3rem] p-4 border border-white/20 shadow-2xl overflow-hidden ring-1 ring-white/20">
                  <div className="relative h-[650px] w-full bg-gradient-to-b from-white/10 to-transparent rounded-[2.5rem] overflow-hidden">
                    <img
                      src={ProductAllGrowth}
                      alt="BioVitam All Growth"
                      className="absolute inset-0 w-full h-full object-contain p-12 drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] transform group-hover:scale-110 transition-transform duration-1000"
                    />

                    {/* Minimalistic Benefits Overlay */}
                    <div className="absolute inset-0 p-12 flex flex-col justify-end">
                      <div className="space-y-4 bg-black/20 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                        <h3 className="text-white font-black text-2xl tracking-tighter mb-2">Maximum Crop Potential</h3>
                        <div className="flex flex-col gap-3">
                          {[
                            { icon: <TrendingUp size={16} />, text: "Enhanced Yield Performance" },
                            { icon: <Shield size={16} />, text: "Boosted Natural Resistance" },
                            { icon: <Sprout size={16} />, text: "Restored Soil Fertility" }
                          ].map((b, i) => (
                            <div key={i} className="flex items-center gap-3 text-white/80">
                              <div className="text-biovitam-secondary">{b.icon}</div>
                              <span className="text-base font-black tracking-tight">{b.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Metric Badge */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 right-10 bg-biovitam-secondary p-6 rounded-3xl shadow-2xl border border-white/20 backdrop-blur-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 p-3 rounded-2xl text-white">
                        <Activity size={24} />
                      </div>
                      <div className="text-white">
                        <p className="text-[10px] font-black uppercase tracking-widest mb-0.5">Potency</p>
                        <p className="text-2xl font-black tracking-tighter">100% Bio</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-framed py-8 lg:py-12 relative overflow-hidden bg-white dark:bg-card">
          <div className="content-container">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-biovitam-dark dark:text-white mb-2 tracking-tight">Our Bio-Fortified Formulas</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light px-4">
                Scientifically engineered ratios to target every stage of crop development with precision and potency.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20px" }}
            >
              {productScience.map((item) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className="group relative bg-white dark:bg-gray-800/40 p-4 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl transition-all hover:-translate-y-3 hover:shadow-2xl hover:bg-gray-50 dark:hover:bg-gray-800/60 overflow-hidden"
                >
                  {/* Decorative Background Image Blur */}
                  {item.image && (
                    <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 opacity-0 group-hover:opacity-20 transition-opacity">
                      <img src={item.image} alt="" className="w-full h-full object-contain blur-sm" />
                    </div>
                  )}

                  <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-inherit/20 group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-[10px] sm:text-xs font-bold text-biovitam-secondary mb-6 uppercase tracking-[0.2em]">{item.focus}</p>

                  <div className="relative mb-4">
                    <div className="bg-gray-50 dark:bg-black/20 p-3 sm:p-4 rounded-2xl border border-gray-100 dark:border-white/5 text-center group-hover:border-biovitam-primary/30 transition-colors">
                      <span className="text-2xl sm:text-3xl font-black text-biovitam-dark dark:text-white tracking-tighter">{item.ratio}</span>
                      <span className="block text-[10px] text-gray-400 uppercase font-black mt-2 tracking-widest">NPK Ratio</span>
                    </div>
                    <p className="text-biovitam-dark dark:text-white leading-relaxed text-base font-black">{item.desc}</p>

                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="mt-6 flex items-center gap-2 text-biovitam-secondary font-bold text-xs cursor-pointer"
                      onClick={() => window.location.href = '/products'}
                    >
                      View Product Details <ChevronRight size={14} />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Standalone Impact Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-br from-biovitam-primary/5 to-biovitam-secondary/5 backdrop-blur-sm p-8 md:p-12 rounded-[3rem] border border-biovitam-primary/10 relative overflow-hidden text-center group">
                <Quote className="absolute top-8 left-8 w-16 h-16 text-biovitam-primary/10 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                <p className="text-xl md:text-3xl font-medium text-biovitam-dark dark:text-white italic leading-relaxed relative z-10 mb-6">
                  &quot;Switching to BioVitam protocols transformed our export rejects into premium grade fruit. The results didn&apos;t just show in the yield, but in our balance sheet.&quot;
                </p>
                <div className="h-1 w-20 bg-biovitam-secondary mx-auto rounded-full" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Global Impact Metrics */}
        <div className="section-framed">
          <ImpactMetrics />
        </div>

        <div className="section-framed">
          <FieldGallery items={FIELD_GALLERY_DATA} />
        </div>

        {/* C. Key Benefits Hub - REFINED WITH 3D & GLASSMORPHISM */}
        <section className="section-framed py-8 sm:py-12 lg:py-16 relative group/benefits">
          {/* Background Image Layer with Heavy Blur for focus */}
          <div className="absolute inset-0 z-0">
            <OptimizedImage
              src={TeaGallery}
              alt="Highland Tea Plantation"
              className="w-full h-full object-cover scale-110 group-hover/benefits:scale-100 transition-transform duration-[3000ms] ease-out brightness-[0.4]"
            />
            <div className="absolute inset-0 bg-biovitam-dark/60 dark:bg-black/80 backdrop-blur-[2px]" />
            <div className="absolute inset-0 bg-gradient-to-br from-biovitam-primary/10 via-transparent to-biovitam-secondary/5" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="content-container relative z-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-biovitam-secondary font-black text-[10px] tracking-[0.3em] uppercase">
                  Proven Ecosystem Impact
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-[1.05] tracking-tighter">
                  Why Leading Farms <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-biovitam-secondary to-green-400">Switch</span> to Biovitam
                </h2>
                <p className="text-xl text-white font-bold mb-8 leading-relaxed max-w-xl">
                  Our bio-organic technology doesn&apos;t just feed plants—it restores soil health and maximizes the full genetic potential of your crops.
                </p>

              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 perspective-1000">
                {benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{
                      y: -10,
                      rotateY: idx % 2 === 0 ? 8 : -8,
                      scale: 1.02
                    }}
                    className="bg-white/5 backdrop-blur-3xl p-6 rounded-[2rem] border border-white/10 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)] group/card flex flex-col items-center text-center"
                  >
                    <div className="bg-white/10 w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-4 group-hover/card:bg-biovitam-secondary group-hover/card:scale-110 transition-all duration-500">
                      <div className="text-biovitam-secondary group-hover/card:text-white transition-colors scale-125">
                        {benefit.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-black text-white mb-2 tracking-tight">{benefit.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed font-medium">{benefit.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* D. Proof of Results (RESTORED) */}
        <section className="section-framed py-8 lg:py-12 bg-gray-50/50 dark:bg-background/80">
          <div className="content-container">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-biovitam-secondary/10 text-biovitam-secondary font-bold text-sm mb-4">
                <Star size={16} fill="currentColor" /> SUCCESS STORIES
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-biovitam-primary mb-2 dark:text-white">Impact in the Field</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Real results from farmers who have transformed their productivity.
              </p>
            </div>

            <div className="relative bg-white dark:bg-card rounded-[3rem] shadow-2xl border border-white/40 dark:border-white/10 overflow-hidden mx-auto max-w-[1400px]">
              <AnimatePresence mode='wait'>
                <motion.div
                  key={currentStory}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(_e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      setCurrentStory((prev) => (prev + 1) % successStories.length);
                    } else if (swipe > swipeConfidenceThreshold) {
                      setCurrentStory((prev) => (prev - 1 + successStories.length) % successStories.length);
                    }
                  }}
                  transition={{
                    opacity: { duration: 0.7, ease: "easeInOut" },
                    scale: { duration: 0.7, ease: "easeOut" }
                  }}
                  className="relative min-h-[500px] flex items-center justify-center p-4 md:p-10 cursor-grab active:cursor-grabbing touch-pan-y"
                >
                  {/* Background Layer */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={successStories[currentStory].image}
                      alt={successStories[currentStory].farm}
                      className="w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-black/70 md:bg-black/65" />
                  </div>

                  {/* Content Overlay */}
                  <div className="relative z-10 w-full max-w-4xl bg-white/10 dark:bg-black/30 p-8 md:p-12 rounded-[2.5rem] border border-white/30 shadow-2xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-biovitam-primary/20 backdrop-blur-md border border-white/20 flex items-center justify-center font-black text-white text-xl">
                          {successStories[currentStory].client[0]}
                        </div>
                        <div>
                          <h4 className="font-black text-white text-xl tracking-tight">{successStories[currentStory].client}</h4>
                          <p className="text-biovitam-secondary font-bold text-sm uppercase tracking-widest">{successStories[currentStory].role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-white self-start">
                        <MapPin size={18} className="text-biovitam-secondary" />
                        <span className="font-bold text-sm">{successStories[currentStory].location}</span>
                      </div>
                    </div>

                    <Quote className="w-12 h-12 text-biovitam-secondary/30 mb-6" />
                    <blockquote className="text-2xl md:text-3xl font-heading font-medium text-white leading-relaxed italic mb-10">
                      &quot;{successStories[currentStory].quote}&quot;
                    </blockquote>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
                      <div className="flex flex-col">
                        <p className="text-xs font-bold text-white/50 uppercase tracking-[0.2em] mb-1">Key Growth Metric</p>
                        <p className="text-3xl font-black text-biovitam-secondary">{successStories[currentStory].stat}</p>
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={(e) => { e.stopPropagation(); setLightbox({ isOpen: true, src: successStories[currentStory].image, alt: successStories[currentStory].farm }) }}
                          className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-colors border border-white/10 flex items-center gap-2"
                        >
                          <Camera size={18} /> View Field Photo
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-6 right-6 flex gap-4">
                <button onClick={() => setCurrentStory((prev) => (prev - 1 + successStories.length) % successStories.length)} className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center text-biovitam-primary hover:bg-biovitam-primary hover:text-white transition-all">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={() => setCurrentStory((prev) => (prev + 1) % successStories.length)} className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center text-biovitam-primary hover:bg-biovitam-primary hover:text-white transition-all">
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            <div className="mt-20 flex flex-wrap justify-center items-center gap-16 opacity-40 grayscale hover:grayscale-0 transition-opacity">
              {['KEPHIS Approved', 'Organic Standard', 'ISO 9001'].map((cert) => (
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

        {/* Yield Estimate Modal */}
        <Dialog open={estimateModal} onOpenChange={setEstimateModal}>
          <DialogContent className="sm:max-w-md dark:bg-gray-900 dark:border-white/10">
            <DialogHeader>
              <DialogTitle className="text-biovitam-primary dark:text-white flex items-center gap-2">
                <TrendingUp /> Yield Growth Estimator
              </DialogTitle>
            </DialogHeader>
            <DialogBody className="space-y-6 py-8">
              {!calculationResult ? (
                <>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Select your crop to view the recommended BioVitam application schedule and projected results.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Crop Category</label>
                      <select
                        className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-white/10 dark:text-white text-gray-900 bg-white"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        {YIELD_DATA.map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Specific Crop</label>
                      <select
                        className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-white/10 dark:text-white text-gray-900 bg-white"
                        value={selectedCropName}
                        onChange={(e) => setSelectedCropName(e.target.value)}
                      >
                        {YIELD_DATA.find(c => c.id === selectedCategory)?.crops.map((crop) => (
                          <option key={crop.name} value={crop.name}>{crop.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Farm Size</label>
                        <Input
                          type="number"
                          value={acreage}
                          onChange={(e) => setAcreage(Number(e.target.value))}
                          min={1}
                          className="text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Unit</label>
                        <select
                          className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-white/10 dark:text-white text-gray-900 bg-white"
                          value={unit}
                          onChange={(e) => setUnit(e.target.value as 'Acres' | 'Hectares')}
                        >
                          <option value="Acres">Acres</option>
                          <option value="Hectares">Hectares</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Current Yield (Kgs)</label>
                      <Input
                        type="number"
                        value={currentYield}
                        onChange={(e) => setCurrentYield(Number(e.target.value))}
                        min={0}
                        className="text-gray-900"
                      />
                    </div>
                  </div>
                  <Button className="w-full py-6 font-bold text-lg" onClick={handleCalculate}>
                    View Schedule & Potential
                  </Button>
                </>
              ) : (
                <div className="text-center py-4">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-4 h-20 w-20 bg-biovitam-primary/10 rounded-full flex items-center justify-center mx-auto"
                  >
                    <Sprout size={40} className="text-biovitam-primary" />
                  </motion.div>

                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{calculationResult.crop.name} Schedule</h4>

                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-6 border border-gray-100 dark:border-white/5 text-left space-y-3">
                    <div className="flex justify-between items-center border-b border-dashed border-gray-200 dark:border-gray-700 pb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Application Rate</span>
                      <span className="font-bold text-biovitam-dark dark:text-white">{calculationResult.crop.rate}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-dashed border-gray-200 dark:border-gray-700 pb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Interval</span>
                      <span className="font-bold text-biovitam-dark dark:text-white">{calculationResult.crop.interval}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Duration</span>
                      <span className="font-bold text-biovitam-dark dark:text-white">{calculationResult.crop.duration}</span>
                    </div>
                    {/* Display extra schedule details if available */}
                    {(calculationResult.crop as any).extras && Object.entries((calculationResult.crop as any).extras).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center border-t border-dashed border-gray-200 dark:border-gray-700 pt-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{key}</span>
                        <span className="font-bold text-biovitam-dark dark:text-white text-right ml-4">{(value as string)}</span>
                      </div>
                    ))}

                    {/* Display monthly formula schedule */}
                    {(calculationResult.crop as any).scheduleDetails && (calculationResult.crop as any).scheduleDetails.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <h5 className="text-sm font-bold text-biovitam-primary mb-2 uppercase tracking-wider">Application Formula</h5>
                        <div className="space-y-2">
                          {(calculationResult.crop as any).scheduleDetails.map((detail: any, idx: number) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-300 font-medium">{detail.stage}</span>
                              <span className="font-bold text-biovitam-secondary text-right">{detail.formula}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-biovitam-primary font-bold bg-biovitam-primary/5 py-2 px-4 rounded-full inline-block mb-4">
                    Target: +30% Yield Increase
                  </p>

                  {currentYield > 0 && (
                    <div className="mb-6">
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Estimated New Yield</p>
                      <p className="text-4xl font-black text-biovitam-secondary">
                        {Math.round(currentYield * 1.3)} <span className="text-lg">Kgs</span>
                      </p>
                      <p className="text-xs text-green-600 font-bold">+{calculationResult.projectedYieldIncrease} Kgs gain</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Button variant="outline" className="w-full" onClick={() => setCalculationResult(null)}>
                      Back
                    </Button>
                    <Button className="w-full bg-biovitam-secondary dark:text-white" onClick={() => window.location.href = '/contact'}>
                      Order Now
                    </Button>
                  </div>

                  <p className="mt-4 text-xs text-gray-400">
                    *Results vary by soil conditions. Contact our agronomists for a tailored plan.
                  </p>
                </div>
              )}
            </DialogBody>
          </DialogContent>
        </Dialog>
      </div>

    </PerformanceWrapper>
  )
}
