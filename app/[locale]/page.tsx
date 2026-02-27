/* Home Page */

"use client"
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import ControlButtons from "@/components/control-buttons";

export default function HomePage() {
  const locale = useLocale()
  const t = useTranslations("Home")

  const primaryButton =
    "bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200"

  const secondaryButton =
    "bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-emerald-700 hover:-translate-y-0.5 transition-all duration-200"

  return (
    <div className="form-modal min-h-screen flex flex-col justify-center items-center p-6 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-12 max-w-2xl w-full text-center"
      >
        {/* Top Controls */}
        <ControlButtons />
        
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