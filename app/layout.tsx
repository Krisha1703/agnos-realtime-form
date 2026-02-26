import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Realtime Patient System',
  description: 'Realtime multilingual patient intake dashboard'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground transition-colors">
        {children}
      </body>
    </html>
  )
}