import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'グラビア図鑑 - 最高のグラビアコレクション | 18+ Only',
  description: '厳選された美しいグラビアコレクションをお届けします。モダンで洗練されたデザインで、最高のグラビア画像をお楽しみください。18歳以上限定。',
  keywords: 'グラビア, アイドル, 写真集, ギャラリー, 18+',
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'グラビア図鑑 - 最高のグラビアコレクション',
    description: '厳選された美しいグラビアコレクションをお届けします',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  )
}
