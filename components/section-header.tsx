/* Section Header Component */

"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

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
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">

        {/* Title + Icon */}
        <div className="flex items-start sm:items-center gap-3 flex-1">

          {/* Icon */}
          <div className="text-blue-600 dark:text-blue-400 shrink-0">
            {icon}
          </div>

          {/* Text Content */}
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-semibold leading-tight">
              {title}
            </h2>

            <p className="
                text-gray-500 dark:text-gray-400
                text-sm
                mt-1
                leading-relaxed
              ">
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