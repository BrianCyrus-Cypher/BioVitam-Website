import { motion } from 'framer-motion'
import { Card } from './ui/Card'

interface ProductCardProps {
  id: string
  name: string
  formula: string
  npk: string
  description: string
  benefits: string[]
  image?: string
  onClick?: () => void
}

export function ProductCard({
  name,
  formula,
  npk,
  description,
  benefits,
  image,
  onClick,
}: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ translateY: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className="cursor-pointer h-full"
    >
      <Card className="h-full p-6 hover:shadow-xl transition-shadow duration-300">
        {image && (
          <motion.div
            className="w-full h-40 bg-biovitam-primary/10 rounded-organic mb-4 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
        <h3 className="text-xl font-bold text-biovitam-dark mb-1">{name}</h3>
        <p className="text-sm text-biovitam-secondary font-semibold mb-2">
          {formula}
        </p>
        <motion.p
          className="text-xs bg-biovitam-primary/10 text-biovitam-primary inline-block px-3 py-1 rounded-full mb-4"
          whileHover={{ backgroundColor: "rgba(76, 175, 80, 0.2)" }}
        >
          NPK: {npk}
        </motion.p>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-biovitam-dark">Benefits:</h4>
          <ul className="space-y-1">
            {benefits.map((benefit, idx) => (
              <motion.li
                key={idx}
                className="text-xs text-gray-600 flex items-start"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <span className="text-biovitam-primary mr-2 mt-1">✓</span>
                <span>{benefit}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </Card>
    </motion.div>
  )
}
