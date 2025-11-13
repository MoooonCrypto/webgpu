import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'グラビア図鑑 - 18+ Only',
  description: 'グラビア画像図鑑 - 18歳以上限定',
  robots: 'noindex, nofollow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  )
}
