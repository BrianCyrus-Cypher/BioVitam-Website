import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { updatePageMeta } from '../utils/seo'
import { OptimizedImage } from '../components/ui/OptimizedImage'
import { Camera, MapPin, ChevronLeft, ChevronRight, Calendar, X, Lock, Save, Upload, Trash2, GripVertical, Loader2, Edit3, Check, RotateCcw } from 'lucide-react'
import { api } from '../utils/api'
import { FieldEvent } from '../types'
import { toast } from 'sonner'

// DND Kit
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    horizontalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// Robust dynamic image loading for Vite - Scanning multiple asset streams
const cropImages = import.meta.glob('../assets/cropphotosbiovitam/*.{jpg,jpeg,png,webp,JPEG,PNG}', { eager: true, query: '?url', import: 'default' })
const attachmentImages = import.meta.glob('../assets/attachment/*.{jpg,jpeg,png,webp,JPEG,PNG}', { eager: true, query: '?url', import: 'default' })

const IMAGE_MAPPING: Record<string, string> = {}

// Process crop photos
Object.entries(cropImages).forEach(([path, url]) => {
    const filename = (path.split('/').pop() || '').trim()
    IMAGE_MAPPING[filename] = url as string
})

// Process attachment photos
Object.entries(attachmentImages).forEach(([path, url]) => {
    const filename = (path.split('/').pop() || '').trim()
    IMAGE_MAPPING[filename] = url as string
})

const ALL_IMAGE_NAMES = Object.keys(IMAGE_MAPPING).sort()

const INITIAL_EVENTS: FieldEvent[] = [
    {
        "id": 1,
        "title": "Highland Tea Symposium",
        "date": "November 2025",
        "location": "Kericho, Kenya",
        "image": "TEA LEAVES PLANTATION - 5 - 19.11.2025.jpg",
        "description": "Showcasing the impact of precision bio-science on high-altitude tea plantations."
    },
    {
        "id": 2,
        "title": "Avocado Growth Workshop",
        "date": "October 2025",
        "location": "Murang'a, Kenya",
        "image": "AVOCADO TREE FLOWERING.jpg",
        "description": "Interactive session on maximizing flower set and minimizing fruit abortion in Hass avocados."
    },
    {
        "id": 3,
        "title": "Cereal Productivity Field Day",
        "date": "September 2025",
        "location": "Uasin Gishu, Kenya",
        "image": "MAIZE TUSSLING STAGE 2.jpg",
        "description": "Demonstrating uniform cob set and structural integrity in large-scale maize production."
    },
    {
        "id": 4,
        "title": "Soil Health Testing Campaign",
        "date": "December 2025",
        "location": "National Coverage",
        "image": "1000145607.jpg",
        "description": "Launching our nationwide soil pathology and nutrient analysis services for vibrant crop growth."
    },
    {
        "id": 5,
        "title": "Smallholder Training Intensive",
        "date": "November 2025",
        "location": "Kiambu, Kenya",
        "image": "1000234208.jpg",
        "description": "On-site educational workshop empowering local farmers with modern agronomic protocols."
    },
    {
        "id": 6,
        "title": "Annual Strategic Review",
        "date": "January 2026",
        "location": "Headquarters, Nairobi",
        "image": "1000235795.jpg",
        "description": "The BioVitam technical core team aligning 2026 roadmaps for regional agricultural transformation."
    },
    {
        "id": 7,
        "title": "Bungoma Outreach Forum",
        "date": "October 2025",
        "location": "Bungoma, Kenya",
        "image": "1000236954.jpg",
        "description": "Direct engagement with community leaders to integrate bio-stimulants into traditional cycles."
    },
    {
        "id": 8,
        "title": "Canopy Education Series",
        "date": "September 2025",
        "location": "Meru, Kenya",
        "image": "1000236966.jpg",
        "description": "Outdoor classroom sessions focusing on pest resilience and nutrient uptake during the rainy season."
    },
    {
        "id": 9,
        "title": "Pineapple Quality Expo",
        "date": "August 2025",
        "location": "Thika, Kenya",
        "image": "PINEAPPLES MATURE RIPE - 2 (1).jpg",
        "description": "Focusing on Brix level enhancement and uniform ripening for export-grade pineapples."
    },
    {
        "id": 10,
        "title": "Floriculture Excellence Summit",
        "date": "July 2025",
        "location": "Naivasha, Kenya",
        "image": "ROSE FLOWERS - 1.jpeg",
        "description": "Specialized protocols for stem strength and petal intensity in export roses."
    },
    {
        "id": 11,
        "title": "Agronomy Training Board",
        "date": "August 2025",
        "location": "Nakuru, Kenya",
        "image": "1000238427.jpg",
        "description": "Reviewing crop diagnostic techniques with our regional agronomy leads."
    },
    {
        "id": 12,
        "title": "Regional Managers Briefing",
        "date": "February 2026",
        "location": "Nairobi, Kenya",
        "image": "1000239598.jpg",
        "description": "Coordinating distribution logistics for the upcoming planting season across East Africa."
    },
    {
        "id": 13,
        "title": "Community Seedling Drive",
        "date": "March 2026",
        "location": "Vihiga, Kenya",
        "image": "1000244247.jpg",
        "description": "Distributing high-vigor seedlings treated with BioVitam starter protocols to local cooperatives."
    },
    {
        "id": 14,
        "title": "Technical Lab Certification",
        "date": "April 2026",
        "location": "Quality Control Lab",
        "image": "1000246393.jpg",
        "description": "Our researchers undergoing final audits for ISO-compliant diagnostic procedures."
    },
    {
        "id": 15,
        "title": "Coffee Early Fruiting Stage",
        "date": "March 2026",
        "location": "Nyeri, Kenya",
        "image": "COFFEE PINHEAD.png",
        "description": "Precision nutrient management during the critical pinhead retention stage for Arabica coffee."
    },
    {
        "id": 16,
        "title": "Macadamia Bloom Synchronization",
        "date": "February 2026",
        "location": "Embu, Kenya",
        "image": "MACADAMIA NUTS 5 - FLOWERING.jpg",
        "description": "Improving commercial nut set and synchronization in large-scale macadamia orchards."
    },
    {
        "id": 17,
        "title": "Pixie Citrus Flowering Protocol",
        "date": "January 2026",
        "location": "Makueni, Kenya",
        "image": "PIXIE CITRUS FRUIT TREE FLOWERING.jpg",
        "description": "Specialized bio-stimulant protocols for high-yield, seedless pixie orange production."
    },
    {
        "id": 18,
        "title": "Coastal Farmers Dialogue",
        "date": "May 2026",
        "location": "Mombasa, Kenya",
        "image": "1000257808.jpg",
        "description": "Addressing soil salinity and technical challenges in coastal horticultural clusters."
    },
    {
        "id": 19,
        "title": "Executive Leadership Summit",
        "date": "June 2026",
        "location": "BioVitam Plaza",
        "image": "1000255964.jpg",
        "description": "Defining the corporate vision for sustainable Agri-Intelligence across the continent."
    },
    {
        "id": 20,
        "title": "Apple Orchard Flowering",
        "date": "April 2025",
        "location": "Nanyuki, Kenya",
        "image": "APPLE TREE FLOWERING.jpg",
        "description": "Chilling requirement management and flower-set enhancement for temperate fruits in Kenya."
    },
    {
        "id": 21,
        "title": "Potato Canopy Optimization",
        "date": "December 2025",
        "location": "Nyandarua, Kenya",
        "image": "POTATOES VEGETATIVE STAGE.jpg",
        "description": "Building a robust photosynthetic canopy to drive tuber size and uniformity in Irish potatoes."
    },
    {
        "id": 22,
        "title": "Legume Productivity Showcase",
        "date": "November 2025",
        "location": "Machakos, Kenya",
        "image": "LEGUME BEAN PLANT FLOWERING.jpg",
        "description": "Enhancing nitrogen fixation and flower formation in dryland bean varieties."
    },
    {
        "id": 23,
        "title": "Coastal Citrus Excellence",
        "date": "October 2025",
        "location": "Kilifi, Kenya",
        "image": "CITRUS FRUITS GREEN FRUITS ON TREES.jpg",
        "description": "Managing tree health and fruit development in high-humidity coastal environments."
    },
    {
        "id": 24,
        "title": "Cereal Maturation Phase Expo",
        "date": "September 2025",
        "location": "Narok, Kenya",
        "image": "RICE, WHEAT, BARLEY RIPENING STAGE.jpg",
        "description": "Ensuring peak grain weight and nutritional profile during the final maturation stage."
    },
    {
        "id": 25,
        "title": "Rice Intensification Phase",
        "date": "August 2025",
        "location": "Ahero, Kenya",
        "image": "TRANSPLANTING RICE.jpg",
        "description": "Modern transplanting techniques for higher yield and water efficiency in heavy clay soils."
    },
    {
        "id": 26,
        "title": "Macadamia Maturity Forum",
        "date": "July 2025",
        "location": "Meru, Kenya",
        "image": "MACADAMIA NUTS ON TREE 3.jpg",
        "description": "Monitoring nut development for optimal oil content and kernel grade in commercial orchards."
    },
    {
        "id": 27,
        "title": "Onion Bulbing Intensive",
        "date": "June 2025",
        "location": "Isinya, Kenya",
        "image": "RED ONION BULBING PHOTO -3.jpg",
        "description": "Nutrient protocols to ensure uniform bulb sizing and intense purple coloration."
    },
    {
        "id": 28,
        "title": "Fodder & Legume Health Day",
        "date": "May 2025",
        "location": "Bomet, Kenya",
        "image": "LEGUMES - VEGETATIVE STAGE.jpg",
        "description": "Supporting early-stage vegetative vigor for high-protein fodder and bean production."
    },
    {
        "id": 29,
        "title": "Seedling Nursery Audit",
        "date": "June 2026",
        "location": "Eldoret, Kenya",
        "image": "1000239596.jpg",
        "description": "Inspecting germination rates and structural vigor in our regional seedling propagation centers."
    },
    {
        "id": 30,
        "title": "Agricultural Policy Briefing",
        "date": "July 2026",
        "location": "Nairobi, Kenya",
        "image": "1000239965.jpg",
        "description": "Dialogue with policy markers on incentivizing organic fertilizer adoption for national food security."
    },
    {
        "id": 31,
        "title": "Distribution Channel Expo",
        "date": "August 2026",
        "location": "BioVitam Logistics Center",
        "image": "1000239968.jpg",
        "description": "Showcasing our streamlined supply chain from production to the smallholder's gate."
    },
    {
        "id": 32,
        "title": "Horticultural Outreach",
        "date": "September 2026",
        "location": "Narok, Kenya",
        "image": "1000246272.jpg",
        "description": "Field outreach programs targeting high-value horticultural crops in the Rift Valley."
    },
    {
        "id": 33,
        "title": "Commercial Farmer Seminar",
        "date": "October 2026",
        "location": "Nanyuki, Kenya",
        "image": "1000249336.jpg",
        "description": "Technical seminar for large-scale farmers on maximizing return on investment with Bio-stimulants."
    },
    {
        "id": 34,
        "title": "Field Data Review",
        "date": "November 2026",
        "location": "Nairobi HQ",
        "image": "1000255951.jpg",
        "description": "Analyzing experimental yield data from our 2026 trial plots to refine 2027 formulations."
    },
    {
        "id": 35,
        "title": "Innovation Symposium",
        "date": "December 2026",
        "location": "Science Park",
        "image": "1000257789.jpg",
        "description": "Presenting our latest findings on microbial soil rejuvenation at the annual innovation symposium."
    },
    {
        "id": 36,
        "title": "HORTI-TEC Africa Expo",
        "date": "January 2026",
        "location": "KICC, Nairobi",
        "image": "1000257804.jpg",
        "description": "Representing the future of organic inputs at Africa's largest horticultural technology exhibition."
    },
    {
        "id": 37,
        "title": "Product Launch Gala",
        "date": "February 2026",
        "location": "Nairobi, Kenya",
        "image": "1000257807.jpg",
        "description": "Unveiling our 2026 professional-grade bio-stimulant line to our valued distributors and partners."
    },
    {
        "id": 38,
        "title": "Rice Pinnacle Initiation",
        "date": "April 2025",
        "location": "Mwea, Kenya",
        "image": "RICE PINNACLE INITIATION STAGE.jpg",
        "description": "Boosting panicle initiation and grain filling stages in irrigation schemes."
    }
]

// Sortable Thumbnail Component
function SortableThumbnail({ id, event, isActive, onClick }: { id: number, event: FieldEvent, isActive: boolean, onClick: () => void }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 100 : 1,
    }

    const mapped = IMAGE_MAPPING[event.image.trim()]
    const displayImage = mapped || (event.image.startsWith('http') || event.image.startsWith('blob:') ? event.image : '')

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl md:rounded-[1.5rem] overflow-hidden border-4 transition-all duration-300 snap-center shadow-2xl cursor-pointer ${isActive ? 'border-biovitam-secondary scale-110 z-10 shadow-biovitam-secondary/30' : 'border-neutral-800 opacity-40 hover:opacity-100'
                }`}
            onClick={onClick}
        >
            {displayImage ? (
                <img src={displayImage} alt={event.title} className="w-full h-full object-cover" />
            ) : (
                <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                    <Camera size={20} className="text-neutral-600" />
                </div>
            )}
            <div
                {...attributes}
                {...listeners}
                className="absolute top-1 right-1 p-1 bg-black/40 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
            >
                <GripVertical size={14} className="text-white/70" />
            </div>
        </div>
    )
}

export default function Events() {
    const [events, setEvents] = useState<FieldEvent[]>(INITIAL_EVENTS)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(0)
    const [isAdminOpen, setIsAdminOpen] = useState(false)
    const [badgeClicks, setBadgeClicks] = useState(0)
    const [isAutoPlay] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const containerRef = useRef<HTMLDivElement>(null)
    const reorderTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

    // Admin form state
    const [adminKey, setAdminKey] = useState(() => localStorage.getItem('biovitam_admin_key') || '')
    const [newEvent, setNewEvent] = useState({
        title: '',
        date: '',
        location: '',
        image: ALL_IMAGE_NAMES[0] || '',
        description: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Sync admin key to localStorage
    useEffect(() => {
        localStorage.setItem('biovitam_admin_key', adminKey)
    }, [adminKey])

    /**
     * Auto-play Transition Engine
     * Automatically cycles through field stories every 8 seconds.
     * Pauses when the Admin panel is open to allow focused editing.
     */
    useEffect(() => {
        if (isAutoPlay && !isAdminOpen) {
            autoPlayRef.current = setInterval(() => {
                handleNext()
            }, 8000)
        }
        return () => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current)
        }
    }, [isAutoPlay, isAdminOpen, events.length])

    // Edit state
    const [editingId, setEditingId] = useState<number | null>(null)
    const [editForm, setEditForm] = useState<FieldEvent | null>(null)

    // Upload state
    const [uploadFile, setUploadFile] = useState<File | null>(null)
    const [uploadPreview, setUploadPreview] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)

    // DND Sensors
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    )

    useEffect(() => {
        updatePageMeta('Field Events & Exhibitions | BioVitam', 'Explore our recent field events and agricultural exhibitions.', 'agriculture events, farmer workshops')
        fetchEvents()
    }, [])

    const fetchEvents = async () => {
        setIsLoading(true)
        try {
            const data = await api.getEvents()
            // Only update if data is substantially different or larger
            if (data && data.length > 0) {
                setEvents(data)
            }
        } catch (err) {
            console.error('Error fetching events:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        setMousePos({ x, y })
    }

    const handleBadgeClick = () => {
        const newCount = badgeClicks + 1
        setBadgeClicks(newCount)
        if (newCount === 3) {
            setIsAdminOpen(true)
            setBadgeClicks(0)
            toast.info('Admin authentication required')
        }
        setTimeout(() => setBadgeClicks(0), 1000)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > 10 * 1024 * 1024) return toast.error('File too large (max 10MB)')
            setUploadFile(file)
            setUploadPreview(URL.createObjectURL(file))
        }
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (over && active.id !== over.id) {
            const oldIndex = events.findIndex((e) => e.id === active.id)
            const newIndex = events.findIndex((e) => e.id === over.id)
            const newArray = arrayMove(events, oldIndex, newIndex)
            setEvents(newArray)

            // Debounced server sync
            if (reorderTimeoutRef.current) clearTimeout(reorderTimeoutRef.current)

            reorderTimeoutRef.current = setTimeout(async () => {
                if (adminKey) {
                    try {
                        await api.reorderEvents(newArray, adminKey)
                        toast.success('Sequence permanentized on server')
                    } catch (err) {
                        toast.error('Failed to sync sequence with server')
                    }
                } else {
                    toast.info('Sequence updated locally. Provide admin key to persist.')
                }
            }, 1000)
        }
    }

    const handleAddEvent = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!adminKey) return toast.error('Authority Signature required')

        setIsSubmitting(true)
        try {
            let imageUrl = newEvent.image

            if (uploadFile) {
                setIsUploading(true)
                try {
                    const uploadResult = await api.uploadFile(uploadFile, adminKey)
                    imageUrl = uploadResult.url
                } catch (err) {
                    toast.error('Asset upload failed')
                    setIsSubmitting(false)
                    setIsUploading(false)
                    return
                }
                setIsUploading(false)
            }

            const payload = { ...newEvent, image: imageUrl };

            try {
                const added = await api.addEvent(payload, adminKey)
                setEvents(prev => [added, ...prev]);
                setCurrentIndex(0);
                setIsAdminOpen(false);
                toast.success('Story committed to server history');
            } catch (err) {
                toast.error('Server rejected commitment. Check Authority Signature.');
            }

            setNewEvent({ title: '', date: '', location: '', image: ALL_IMAGE_NAMES[0] || '', description: '' })
            setUploadFile(null)
            setUploadPreview(null)
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Event submission encountered an error:', err)
        } finally {
            setIsSubmitting(false)
            setIsUploading(false)
        }
    }

    const handleEditClick = (event: FieldEvent) => {
        setEditingId(event.id)
        setEditForm({ ...event })
    }

    const handleUpdateEvent = async () => {
        if (!adminKey || !editForm) return toast.error('Authority Signature required')

        setIsSubmitting(true)
        try {
            const updated = await api.updateEvent(editForm.id, editForm, adminKey)
            setEvents(prev => prev.map(e => e.id === updated.id ? updated : e))
            setEditingId(null)
            setEditForm(null)
            toast.success('Metadata updated successfully')
        } catch (err) {
            toast.error('Failed to synchronize updates')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDeleteEvent = async (id: number) => {
        if (!adminKey) return toast.error('Authority Signature required')
        if (!confirm('Irreversible Action: Permanently delete this event?')) return

        try {
            await api.deleteEvent(id, adminKey)
            setEvents(prev => prev.filter(e => e.id !== id))
            if (currentIndex >= events.length - 1) setCurrentIndex(Math.max(0, events.length - 2))
            toast.success('Story expunged from records')
        } catch (err) {
            toast.error('Encountered error during deletion')
        }
    }

    const handleNext = useCallback(() => {
        setDirection(1)
        setCurrentIndex((prev) => (prev + 1) % events.length)
    }, [events.length])

    const handlePrev = useCallback(() => {
        setDirection(-1)
        setCurrentIndex((prev) => (prev - 1 + events.length) % events.length)
    }, [events.length])

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-biovitam-dark">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-biovitam-secondary"></div>
        </div>
    )

    const currentEvent = events[currentIndex]

    const getResolvedImage = (imageName: string) => {
        if (!imageName) return ''
        const trimmed = imageName.trim()
        const mapped = IMAGE_MAPPING[trimmed]
        if (mapped) return mapped
        if (imageName.startsWith('http') || imageName.startsWith('blob:')) return imageName
        return ''
    }

    const displayImage = currentEvent ? getResolvedImage(currentEvent.image) : ''

    return (
        <div className="pt-16 min-h-screen bg-biovitam-dark text-white overflow-hidden pb-20" onMouseMove={handleMouseMove}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-6">
                <div className="text-center mb-6 md:mb-10">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleBadgeClick}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-biovitam-secondary/20 text-biovitam-secondary font-black text-[10px] md:text-xs mb-4 border border-biovitam-secondary/30 cursor-default select-none tracking-[0.2em]"
                    >
                        <Camera size={14} /> FIELD EVENTS & EXHIBITIONS
                    </motion.button>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-9xl font-black mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600"
                    >
                        Field <span className="text-biovitam-secondary">Stories</span>
                    </motion.h1>
                </div>

                <div ref={containerRef} className="relative h-[450px] md:h-[700px] flex items-center justify-center perspective-[2500px] mb-10 px-4 md:px-0">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        {events.length > 0 ? (
                            <motion.div
                                key={currentEvent?.id}
                                custom={direction}
                                initial={{ x: direction > 0 ? 1000 : -1000, opacity: 0, scale: 0.8 }}
                                animate={{ x: 0, opacity: 1, scale: 1 }}
                                exit={{ x: direction < 0 ? 1000 : -1000, opacity: 0, scale: 0.8 }}
                                transition={{
                                    x: { type: "spring", stiffness: 120, damping: 20 },
                                    opacity: { duration: 0.8 },
                                    scale: { duration: 0.8 }
                                }}
                                style={{
                                    rotateX: mousePos.y * 3,
                                    rotateY: mousePos.x * 3,
                                    x: mousePos.x * 5,
                                    y: mousePos.y * 5,
                                }}
                                className="absolute w-full h-full md:aspect-[16/9] md:h-auto md:max-w-6xl rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.9)] border border-white/10 group bg-neutral-900"
                            >
                                <motion.div
                                    key={`img-${currentIndex}`}
                                    initial={{ scale: 1.1 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 15, ease: "linear" }}
                                    className="w-full h-full"
                                >
                                    <OptimizedImage
                                        src={displayImage}
                                        alt={currentEvent?.title || ''}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>

                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className="absolute bottom-8 left-8 right-8 md:bottom-16 md:left-16 md:right-16"
                                >
                                    <div className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-8">
                                        <span className="flex items-center gap-2 bg-biovitam-secondary/30 backdrop-blur-3xl border border-biovitam-secondary/50 px-3 py-1.5 md:px-5 md:py-2.5 rounded-xl md:rounded-2xl text-biovitam-secondary font-black text-[10px] md:text-xs tracking-widest uppercase shadow-2xl">
                                            <Calendar size={14} /> {currentEvent?.date}
                                        </span>
                                        <span className="flex items-center gap-2 bg-white/10 backdrop-blur-3xl border border-white/20 px-3 py-1.5 md:px-5 md:py-2.5 rounded-xl md:rounded-2xl text-white font-black text-[10px] md:text-xs tracking-widest uppercase shadow-2xl">
                                            <MapPin size={14} /> {currentEvent?.location}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl md:text-7xl lg:text-8xl font-black text-white mb-4 md:mb-6 tracking-tighter leading-[1] md:leading-[0.9] drop-shadow-2xl">
                                        {currentEvent?.title}
                                    </h2>
                                    <p className="text-sm md:text-xl lg:text-2xl text-gray-300 max-w-4xl leading-relaxed font-bold opacity-80 line-clamp-3 md:line-clamp-none">
                                        {currentEvent?.description}
                                    </p>
                                </motion.div>
                            </motion.div>
                        ) : (
                            <div className="text-center opacity-50">
                                <Camera size={64} className="mx-auto mb-4" />
                                <p>No stories found.</p>
                            </div>
                        )}
                    </AnimatePresence>

                    {events.length > 1 && (
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-12 z-20 pointer-events-none">
                            <button
                                onClick={handlePrev}
                                className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-black/50 hover:bg-biovitam-secondary text-white hover:text-biovitam-dark border border-white/10 flex items-center justify-center transition-all group backdrop-blur-3xl shadow-2xl pointer-events-auto active:scale-90"
                            >
                                <ChevronLeft size={24} className="md:w-9 md:h-9 group-hover:-translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-black/50 hover:bg-biovitam-secondary text-white hover:text-biovitam-dark border border-white/10 flex items-center justify-center transition-all group backdrop-blur-3xl shadow-2xl pointer-events-auto active:scale-90"
                            >
                                <ChevronRight size={24} className="md:w-9 md:h-9 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    )}
                </div>

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <div className="flex gap-4 px-4 overflow-x-auto py-4 md:py-8 scrollbar-hide snap-x items-center justify-start md:justify-center max-w-6xl mx-auto group">
                        <SortableContext
                            items={events.map(e => e.id)}
                            strategy={horizontalListSortingStrategy}
                        >
                            {events.map((event, idx) => (
                                <SortableThumbnail
                                    key={event.id}
                                    id={event.id}
                                    event={event}
                                    isActive={idx === currentIndex}
                                    onClick={() => {
                                        setDirection(idx > currentIndex ? 1 : -1)
                                        setCurrentIndex(idx)
                                    }}
                                />
                            ))}
                        </SortableContext>
                    </div>
                </DndContext>
            </div>

            <AnimatePresence>
                {isAdminOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsAdminOpen(false)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 100 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 100 }}
                            className="relative w-full max-w-6xl bg-neutral-900 rounded-[2rem] md:rounded-[3.5rem] border border-white/10 shadow-[0_100px_200px_rgba(0,0,0,1)] overflow-hidden h-[95vh] md:max-h-[90vh] flex flex-col"
                        >
                            {isSubmitting && (
                                <div className="absolute inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center">
                                    <div className="flex flex-col items-center gap-4">
                                        <Loader2 size={48} className="text-biovitam-secondary animate-spin" />
                                        <p className="text-biovitam-secondary font-black tracking-widest uppercase">Committing to Global History...</p>
                                    </div>
                                </div>
                            )}

                            <div className="p-6 md:p-10 border-b border-white/10 flex justify-between items-center bg-white/5">
                                <div className="flex items-center gap-4 md:gap-6 text-white">
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-biovitam-secondary/20 flex items-center justify-center text-biovitam-secondary shadow-inner">
                                        <Lock size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl md:text-3xl font-black tracking-tighter uppercase italic line-clamp-1">Media Command Center</h2>
                                        <p className="text-[8px] md:text-[10px] text-neutral-500 font-black tracking-[0.3em] uppercase">Authenticated Owner Access</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsAdminOpen(false)} className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/5 hover:bg-neutral-800 flex items-center justify-center transition-all text-white">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-12 md:space-y-20 custom-scrollbar">
                                <section>
                                    <h3 className="text-xs md:text-sm font-black text-neutral-500 tracking-[0.4em] md:tracking-[0.5em] uppercase mb-8 pl-4 border-l-4 border-biovitam-secondary">Publish New Story</h3>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                                        <form id="admin-event-form" onSubmit={handleAddEvent} className="space-y-6 md:space-y-8">
                                            <div>
                                                <label className="block text-[10px] font-black text-biovitam-secondary tracking-[0.4em] uppercase mb-3 opacity-70">Designation</label>
                                                <input
                                                    required
                                                    value={newEvent.title}
                                                    onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                                                    className="w-full bg-neutral-800/50 border border-white/5 rounded-2xl px-6 py-4 md:px-8 md:py-5 focus:ring-2 ring-biovitam-secondary/40 outline-none transition-all font-black text-base md:text-lg text-white"
                                                    placeholder="EXPO TITLE"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                                <div>
                                                    <label className="block text-[10px] font-black text-neutral-400 tracking-[0.4em] uppercase mb-3 opacity-70">Date</label>
                                                    <input
                                                        required
                                                        value={newEvent.date}
                                                        onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                                                        className="w-full bg-neutral-800/50 border border-white/5 rounded-2xl px-6 py-4 md:px-8 md:py-5 focus:ring-2 ring-biovitam-secondary/40 outline-none transition-all font-black text-base md:text-lg text-white"
                                                        placeholder="OCT 2025"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-black text-neutral-400 tracking-[0.4em] uppercase mb-3 opacity-70">Location</label>
                                                    <input
                                                        required
                                                        value={newEvent.location}
                                                        onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
                                                        className="w-full bg-neutral-800/50 border border-white/5 rounded-2xl px-6 py-4 md:px-8 md:py-5 focus:ring-2 ring-biovitam-secondary/40 outline-none transition-all font-black text-base md:text-lg text-white"
                                                        placeholder="LOCATION"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black text-neutral-400 tracking-[0.4em] uppercase mb-3 opacity-70">Narrative</label>
                                                <textarea
                                                    required
                                                    rows={3}
                                                    value={newEvent.description}
                                                    onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                                                    className="w-full bg-neutral-800/50 border border-white/5 rounded-2xl px-6 py-4 md:px-8 md:py-5 focus:ring-2 ring-biovitam-secondary/40 outline-none transition-all font-black text-base md:text-lg text-white resize-none"
                                                    placeholder="DESCRIPTION"
                                                />
                                            </div>
                                        </form>

                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-[10px] font-black text-biovitam-secondary tracking-[0.4em] uppercase mb-3 opacity-70">Field Photo</label>
                                                <div className={`relative border-2 border-dashed rounded-3xl transition-all h-40 md:h-48 flex flex-col items-center justify-center gap-2 group/upload overflow-hidden ${uploadPreview ? 'border-biovitam-secondary bg-biovitam-secondary/5' : 'border-neutral-700 hover:border-neutral-500 bg-black/20'}`}>
                                                    {uploadPreview ? (
                                                        <>
                                                            <img src={uploadPreview} className="absolute inset-0 w-full h-full object-cover opacity-30 select-none" />
                                                            <div className="relative flex flex-col items-center gap-2">
                                                                <span className="text-white font-black text-xs bg-black/60 px-4 py-2 rounded-xl backdrop-blur-md text-center max-w-[80%] line-clamp-1">{uploadFile?.name}</span>
                                                                <button onClick={() => { setUploadFile(null); setUploadPreview(null); }} className="text-red-500 font-bold text-[10px] uppercase flex items-center gap-1 hover:underline">
                                                                    <Trash2 size={12} /> Remove
                                                                </button>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Upload size={24} className="text-neutral-500" />
                                                            <p className="text-white font-black text-xs">ADD PHOTO</p>
                                                        </>
                                                    )}
                                                    <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                                </div>
                                                {isUploading && (
                                                    <div className="mt-2 text-[10px] font-black text-biovitam-secondary animate-pulse flex items-center gap-2">
                                                        <Loader2 size={12} className="animate-spin" /> UPLOADING & OPTIMIZING...
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-black text-neutral-400 tracking-[0.4em] uppercase mb-3 opacity-70">Universal Library ({ALL_IMAGE_NAMES.length})</label>
                                                <div className="grid grid-cols-4 gap-2 max-h-[160px] overflow-y-auto p-3 bg-black/40 rounded-2xl border border-white/5 custom-scrollbar">
                                                    {ALL_IMAGE_NAMES.map(img => (
                                                        <button key={img} type="button" onClick={() => { setNewEvent({ ...newEvent, image: img }); setUploadFile(null); setUploadPreview(null); }} className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${newEvent.image === img && !uploadFile ? 'border-biovitam-secondary scale-90' : 'border-transparent opacity-40'}`}>
                                                            <img src={IMAGE_MAPPING[img]} className="w-full h-full object-cover" />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <button form="admin-event-form" disabled={isSubmitting || isUploading} type="submit" className="w-full md:w-auto px-10 py-4 bg-biovitam-secondary text-biovitam-dark font-black rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50">
                                            {isSubmitting || isUploading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                                            <span className="uppercase tracking-widest text-sm">Publish Story</span>
                                        </button>
                                    </div>
                                </section>

                                <section>
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                                        <h3 className="text-xs md:text-sm font-black text-neutral-500 tracking-[0.4em] uppercase pl-4 border-l-4 border-red-500">Inventory Management</h3>
                                        <button onClick={fetchEvents} className="flex items-center gap-2 text-[10px] font-black text-biovitam-secondary hover:underline tracking-widest uppercase">
                                            <RotateCcw size={14} /> Refresh
                                        </button>
                                    </div>

                                    <div className="hidden lg:block bg-black/40 rounded-[2.5rem] border border-white/5 overflow-hidden">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-white/5 text-[10px] font-black text-neutral-500 tracking-[0.3em] uppercase">
                                                    <th className="px-8 py-6">Visual</th>
                                                    <th className="px-8 py-6">Identity</th>
                                                    <th className="px-8 py-6">Details</th>
                                                    <th className="px-8 py-6 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5 text-white">
                                                {events.map((event) => (
                                                    <tr key={event.id} className="group hover:bg-white/[0.02]">
                                                        <td className="px-8 py-6">
                                                            <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10">
                                                                <img src={getResolvedImage(event.image)} className="w-full h-full object-cover" />
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6 max-w-xs">
                                                            {editingId === event.id ? (
                                                                <input className="w-full bg-neutral-800 border-none rounded-lg px-3 py-2 text-white font-bold" value={editForm?.title} onChange={e => setEditForm(prev => prev ? { ...prev, title: e.target.value } : null)} />
                                                            ) : (
                                                                <h4 className="font-black truncate">{event.title}</h4>
                                                            )}
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <div className="flex gap-4 text-[10px] font-bold text-neutral-400">
                                                                <span className="flex items-center gap-1.5"><Calendar size={12} className="text-biovitam-secondary" /> {event.date}</span>
                                                                <span className="flex items-center gap-1.5"><MapPin size={12} /> {event.location}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6 text-right">
                                                            <div className="flex justify-end gap-2">
                                                                {editingId === event.id ? (
                                                                    <button onClick={handleUpdateEvent} className="p-2.5 bg-green-500 text-white rounded-lg"><Check size={18} /></button>
                                                                ) : (
                                                                    <button onClick={() => handleEditClick(event)} className="p-2.5 bg-white/5 text-biovitam-secondary rounded-lg"><Edit3 size={18} /></button>
                                                                )}
                                                                <button onClick={() => handleDeleteEvent(event.id)} className="p-2.5 bg-white/5 text-red-500 rounded-lg"><Trash2 size={18} /></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="lg:hidden space-y-4">
                                        {events.map((event) => (
                                            <div key={event.id} className="bg-black/40 rounded-3xl border border-white/5 p-4 space-y-4">
                                                <div className="flex gap-4">
                                                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/5">
                                                        <img src={getResolvedImage(event.image)} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="text-white font-black text-sm">{event.title}</h4>
                                                        <p className="text-[10px] text-neutral-500 mt-1">{event.date} • {event.location}</p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => handleEditClick(event)} className="p-2 bg-white/5 text-biovitam-secondary rounded-lg"><Edit3 size={16} /></button>
                                                    <button onClick={() => handleDeleteEvent(event.id)} className="p-2 bg-white/5 text-red-500 rounded-lg"><Trash2 size={16} /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>

                            <div className="p-6 md:p-10 border-t border-white/10 bg-white/5">
                                <label className="block text-[8px] font-black text-red-500 tracking-[0.4em] uppercase mb-4">Authority Signature</label>
                                <div className="relative max-w-md">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-600" size={16} />
                                    <input type="password" required value={adminKey} onChange={e => setAdminKey(e.target.value)} className="w-full bg-neutral-900 border border-white/10 rounded-xl pl-14 pr-6 py-4 outline-none transition-all font-black text-lg tracking-widest text-white" placeholder="••••••••" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
