/* Section Header Component */

"use client"
import { motion } from "framer-motion"
import { ReactNode } from "react"

interface SectionHeaderProps {
  step: number
  title: string
  description: string
  icon: ReactNode
}

export default function SectionHeader({
  step,
  title,
  description,
  icon
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      <div className="flex items-center gap-4">

        {/* Step Circle */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full 
                        bg-blue-600 text-white font-semibold text-lg
                        shadow-md">
          {step}
        </div>

        {/* Title + Icon */}
        <div className="flex items-center gap-3">
          <div className="text-blue-600 dark:text-blue-400 text-2xl">
            {icon}
          </div>
          <div>
            <h2 className="text-2xl font-semibold">
              {title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              {description}
            </p>
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="mt-6 border-b border-gray-200 dark:border-gray-700" />
    </motion.div>
  )
}