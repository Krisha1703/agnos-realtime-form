"use client"
import { motion } from "framer-motion"

export default function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
      <motion.div
        className="h-3 bg-blue-600"
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.4 }}
      />
    </div>
  )
}