import { motion } from 'framer-motion'
import { Card } from './ui/Card'
import { Star } from 'lucide-react'

interface TestimonialCardProps {
  name: string
  title: string
  content: string
  rating?: number
  image?: string
}

export function TestimonialCard({
  name,
  title,
  content,
  rating = 5,
  image,
}: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-6 h-full">
        <div className="flex items-center mb-4">
          {image && (
            <img
              src={image}
              alt={name}
              className="w-12 h-12 rounded-full mr-4 object-cover"
            />
          )}
          <div>
            <h3 className="font-semibold text-biovitam-dark">{name}</h3>
            <p className="text-sm text-gray-500">{title}</p>
          </div>
        </div>
        <div className="flex mb-3">
          {Array.from({ length: rating }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className="text-yellow-400 fill-yellow-400"
            />
          ))}
        </div>
        <p className="text-gray-600 text-sm italic">"{content}"</p>
      </Card>
    </motion.div>
  )
}
