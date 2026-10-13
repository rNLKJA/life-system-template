import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'

// Self-hosted fonts from @fontsource-variable (OFL; licences in ./fonts)
const display = localFont({
  src: './fonts/fraunces-latin-opsz-normal.woff2',
  variable: '--font-display',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
})

const body = localFont({
  src: './fonts/geist-latin-wght-normal.woff2',
  variable: '--font-body',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
})

const mono = localFont({
  src: './fonts/jetbrains-mono-latin-wght-normal.woff2',
  variable: '--font-code',
  weight: '100 800',
  style: 'normal',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'life-system-template',
    template: '%s · life-system-template',
  },
  description:
    'A file-based life and work system that you and your AI agents share',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF7F3' },
    { media: '(prefers-color-scheme: dark)', color: '#21222c' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en-AU"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-primary px-3 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}

