import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'life-system-template',
  description:
    'A file-based life and work system that you and your AI agents share',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
        {children}
      </body>
    </html>
  )
}
