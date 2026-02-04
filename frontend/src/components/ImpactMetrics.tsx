import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Users, LucideIcon } from 'lucide-react'
import CountUp from 'react-countup'
import IMPACT_STATS from '../data/impactStats.json'

interface MetricProps {
    icon: LucideIcon
    label: string
    value: number
    suffix?: string
    delay?: number
}

const MetricCard = ({ icon: Icon, label, value, suffix = "", delay = 0 }: MetricProps) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    return (
        <div ref={ref} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 mx-auto mb-4 bg-biovitam-primary/10 rounded-full flex items-center justify-center text-biovitam-primary">
                <Icon size={24} />
            </div>
            <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
                {isInView ? <CountUp end={value} duration={2.5} delay={delay} /> : 0}{suffix}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 font-bold uppercase text-xs tracking-wider">{label}</p>
        </div>
    )
}

export function ImpactMetrics() {
    // Sort regions by farm count descending for better display
    const topRegions = [...IMPACT_STATS.region_stats].sort((a, b) => b.farm_count - a.farm_count).slice(0, 5)

    return (
        <section className="py-8 bg-white dark:bg-card">
            <div className="content-container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                    <MetricCard
                        icon={Users}
                        label="Partner Farms"
                        value={IMPACT_STATS.total_farms}
                        suffix="+"
                    />
                    <MetricCard
                        icon={MapPin}
                        label="Hectares Covered"
                        value={IMPACT_STATS.total_hectares}
                        suffix=" Ha"
                        delay={0.2}
                    />
                    <div className="bg-biovitam-secondary/10 dark:bg-biovitam-secondary/5 p-6 rounded-2xl border border-biovitam-secondary/20">
                        <h4 className="font-bold text-biovitam-secondary mb-4 flex items-center gap-2">
                            <MapPin size={18} /> Top Regions
                        </h4>
                        <div className="space-y-3">
                            {topRegions.map((region, idx) => (
                                <div key={region.region} className="flex justify-between items-center text-sm">
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">{region.region}</span>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 bg-biovitam-secondary/20 rounded-full w-24 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${(region.farm_count / IMPACT_STATS.total_farms) * 100}%` }}
                                                transition={{ duration: 1, delay: 0.5 + (idx * 0.1) }}
                                                className="h-full bg-biovitam-secondary"
                                            />
                                        </div>
                                        <span className="font-bold text-biovitam-dark dark:text-white text-xs">{region.farm_count}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ticker or list of trusted farms */}
                <div className="text-center">
                    <p className="text-sm font-bold text-gray-400 uppercase mb-4 tracking-widest">Trusted by leading growers across Kenya</p>
                    <div className="flex flex-wrap justify-center gap-3 opacity-60">
                        {IMPACT_STATS.client_list.slice(0, 15).map((client, i) => ( // Show first 15 as sample
                            <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-400">
                                {client}
                            </span>
                        ))}
                        <span className="px-3 py-1 text-xs font-semibold text-gray-400">and {IMPACT_STATS.total_farms - 15} more...</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
