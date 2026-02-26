"use client"

import { useRouter, usePathname } from "next/navigation"

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (locale: string) => {
    const segments = pathname.split("/")
    segments[1] = locale
    router.push(segments.join("/"))
  }

  return (
    <div className="flex gap-2">
      <button onClick={() => switchLocale("en")}>EN</button>
      <button onClick={() => switchLocale("th")}>TH</button>
    </div>
  )
}