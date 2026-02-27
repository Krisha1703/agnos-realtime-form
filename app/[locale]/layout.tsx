import { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from 'next-themes'

const locales = ['en', 'th']

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale)) {
    notFound()
  }

  const messages = (await import(`@/messages/${locale}.json`)).default

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
      </NextIntlClientProvider>
    </ThemeProvider>
  )
}