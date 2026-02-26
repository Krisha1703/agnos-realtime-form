"use client"

import { useEffect, useState } from "react"
import { useSocket } from "@/context/socket-context"
import { PatientData } from "@/types/patient"
import StatusIndicator from "./status-indicator"

import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { useLocale } from "next-intl"
import { motion } from "framer-motion"

export default function StaffDashboard() {
  const { socket } = useSocket()
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const locale = useLocale()

  const [patient, setPatient] = useState<PatientData | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string>("")
  const [submittedAt, setSubmittedAt] = useState<string | null>(null)

  useEffect(() => {
    if (!socket) return

    socket.on("staff-update", (data) => {
      setPatient(data)
      setLastUpdated(new Date().toLocaleTimeString())

      if (data.status === "submitted") {
        setSubmittedAt(new Date().toLocaleTimeString())
      }
    })

    return () => {
      socket.off("staff-update")
    }
  }, [socket])

  const switchLanguage = (lang: string) => {
    router.push(`/${lang}/staff`)
  }

// Loading State
if (!patient) {
  return (
    <div className="form-modal min-h-screen flex items-center justify-center p-6 transition-colors duration-300">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="
          bg-white 
          dark:bg-slate-800
          shadow-xl 
          rounded-3xl 
          p-10 
          max-w-md 
          w-full 
          text-center
        "
      >

        {/* Animated Status Dot */}
        <div className="flex justify-center mb-6">
          <span className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-3 text-slate-800 dark:text-white">
          Waiting for Patient
        </h2>

        {/* Description */}
        <p className="text-slate-600 info-label dark:text-slate-300 mb-6">
          Patient information will appear here in real-time.
        </p>

        {/* Subtle Skeleton Preview */}
        <div className="space-y-3">
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse w-5/6 mx-auto"></div>
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse w-3/4 mx-auto"></div>
        </div>

      </motion.div>
    </div>
  )
}

  // Completion %
  const totalFields = Object.keys(patient).filter(k => k !== "status").length
  const filledFields = Object.entries(patient).filter(
    ([key, value]) => key !== "status" && value
  ).length
  const completion = Math.round((filledFields / totalFields) * 100)

  return (
    <div className="dashboard min-h-screen p-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">

        {/* Top Controls */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm shadow"
          >
            {theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>

          <div className="space-x-2">
            <button
              onClick={() => switchLanguage("en")}
              className={`px-3 py-1 rounded text-sm ${
                locale === "en"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              EN
            </button>

            <button
              onClick={() => switchLanguage("th")}
              className={`px-3 py-1 rounded text-sm ${
                locale === "th"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              TH
            </button>
          </div>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:justify-between md:items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-semibold">
              Staff Monitoring Dashboard
            </h1>
            <p className="mt-1">
              Live patient input tracking
            </p>
          </div>

        </motion.div>

        {/* Session Info Panel */}
       <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white patient-data rounded-2xl shadow-lg p-8 mb-12 grid grid-cols-1 md:grid-cols-4 gap-8"
        >

          {/* Status */}
          <div className="flex flex-col items-start">
            <p className="text-xs info-label uppercase tracking-wide mb-4 opacity-70">
              Current Status
            </p>
            <StatusIndicator status={patient.status} />
          </div>

          {/* Last Updated */}
          <div>
            <p className="text-xs info-label uppercase tracking-wide mb-4 opacity-70">
              Last Updated
            </p>
            <div className="inline-flex items-center px-4 py-1 rounded-full bg-blue-50 text-blue-700 font-medium text-sm">
              {lastUpdated}
            </div>
          </div>

          {/* Completion */}
          <div>
            <p className="text-xs info-label uppercase tracking-wide mb-4 opacity-70">
              Completion
            </p>

            <div className="inline-flex items-center px-4 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium text-sm">
              {completion}%
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completion}%` }}
                className="bg-emerald-500 h-2 rounded-full"
              />
            </div>
          </div>

          {/* Submitted */}
          <div>
            <p className="text-xs info-label uppercase tracking-wide mb-4 opacity-70">
              Submitted At
            </p>

            <div
              className={`inline-flex items-center px-4 py-1 rounded-full font-medium text-sm ${
                submittedAt
                  ? "bg-indigo-50 text-indigo-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {submittedAt || "Not submitted"}
            </div>
          </div>
        </motion.div>

        {/* Patient Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(patient).map(([key, value]) => {
            if (key === "status") return null

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[150px]"
              >
                {/* VALUE (Big) */}
                <div className="text-xl font-semibold break-words text-center">
                  {value || "—"}
                </div>

                {/* LABEL (Bottom Center) */}
                <div className="mt-6 text-sm font-medium text-center uppercase opacity-60">
                  {key.replace(/([A-Z])/g, " $1")}
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </div>
  )
}