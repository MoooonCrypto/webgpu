import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Adult Gallery - 18+ Only',
  description: 'Adult content gallery for 18+ viewers',
  robots: 'noindex, nofollow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-900 text-white">{children}</body>
    </html>
  )
}
