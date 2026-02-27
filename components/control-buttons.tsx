/* Control Buttons Component */

import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";

export default function ControlButtons({}) {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()
    const t = useTranslations("Common")
    const { theme, setTheme } = useTheme()
    
    const switchLanguage = (newLocale: string) => {
      const segments = pathname.split("/")
      segments[1] = newLocale 
      const newPath = segments.join("/")
      router.push(newPath)
    }

  return (
    <div className="flex justify-between items-center mb-6">
          {/* Theme Toggle */}
          <button
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            className="px-4 py-2 cursor-pointer rounded-lg bg-blue-600 text-white text-sm shadow"
          >
            {theme === "dark" ? `☀ ${t("lightMode")}` : `🌙 ${t("darkMode")}`}
          </button>

          {/* Language Switch */}
          <div className="space-x-2">
            <button
              onClick={() => switchLanguage("en")}
              className={`px-3 py-1 cursor-pointer rounded text-sm ${
                locale === "en"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              EN
            </button>

            <button
              onClick={() => switchLanguage("th")}
              className={`px-3 py-1 cursor-pointer rounded text-sm ${
                locale === "th"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              TH
            </button>
        </div>
    </div>
  )
}