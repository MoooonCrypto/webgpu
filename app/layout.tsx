import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'グラビアコレクション - 18+ Only',
  description: 'グラビア画像ギャラリー - 18歳以上限定',
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
