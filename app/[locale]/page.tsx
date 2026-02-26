"use client"

import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const locale = useLocale()
  const router = useRouter()
  const t = useTranslations("Home")
  const tCommon = useTranslations("Common")
  const { theme, setTheme } = useTheme()

   const switchLanguage = (lang: string) => {
    router.push(`/${lang}`)
  }

  const primaryButton =
    "bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200"

  const secondaryButton =
    "bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-emerald-700 hover:-translate-y-0.5 transition-all duration-200"

  return (
    <div className="form-modal min-h-screen flex flex-col justify-center items-center p-6 transition-colors duration-300">

       

      {/* Main Card (Matches Staff/Patient structure) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-12 max-w-2xl w-full text-center"
      >
        {/* Top Controls */}
        <div className="flex justify-between items-center mb-6">
          {/* Theme Toggle */}
          <button
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm shadow"
          >
            {theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>

          {/* Language Switch */}
          <div className="space-x-2">
            <button
              onClick={() => switchLanguage("en")}
              className={`px-3 py-1 rounded text-sm ${
                locale === "en"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              EN
            </button>

            <button
              onClick={() => switchLanguage("th")}
              className={`px-3 py-1 rounded text-sm ${
                locale === "th"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              TH
            </button>
          </div>
        </div>
        
        <h1 className="text-3xl font-semibold mb-6 info-label">
          {t("title")}
        </h1>

        <p className="info-label mb-10 leading-relaxed">
          {t("description")}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href={`/${locale}/patient`} className={primaryButton}>
            {t("patientButton")}
          </Link>

          <Link href={`/${locale}/staff`} className={secondaryButton}>
            {t("staffButton")}
          </Link>
        </div>
      </motion.div>
    </div>
  )
}