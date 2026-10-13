import type { Metadata } from 'next'
import { Geist, Geist_Mono, EB_Garamond } from 'next/font/google'
import './globals.css'

const geist = Geist({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-code',
  subsets: ['latin'],
  display: 'swap',
})

const display = EB_Garamond({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'Life System Template',
    template: '%s | Life System Template',
  },
  description:
    'A file-based life and work system that you and your AI agents share. One Obsidian vault, one behaviour contract, areas as the backbone.',
  openGraph: {
    title: 'Life System Template',
    description:
      'A file-based life and work system that you and your AI agents share',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${display.variable} dark`}
    >
      <body>{children}</body>
    </html>
  )
}
