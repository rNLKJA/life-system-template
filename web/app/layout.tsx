import type { Metadata } from 'next'
import { Geist, Geist_Mono, EB_Garamond } from 'next/font/google'
import './globals.css'

const geist = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
})

const display = EB_Garamond({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'Life System Template',
    template: '%s | Life System Template',
  },
  description:
    'A file-based life and work system that you and your AI agents share',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable} ${display.variable}`}>
      <body className="bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-50">
        {children}
      </body>
    </html>
  )
}
