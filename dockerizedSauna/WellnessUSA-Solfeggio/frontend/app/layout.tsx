import type { Metadata } from 'next'
import './globals.css'
import './fonts.css'
import './colors.css'
import GoogleFonts from '@/components/shared/GoogleFonts'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Sound Player',
  description: 'WellnessUSA Sound Player',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <body style={{ width: '100vw', height: '100vh', overflow: 'hidden', margin: 0, padding: 0 }}>
        <GoogleFonts />
        {children}
      </body>
    </html>
  )
}

