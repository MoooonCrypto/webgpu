import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-cyan-200 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <Link href="/" className="text-3xl font-bold text-cyan-600 hover:text-cyan-700 transition">
          グラビアコレクション
        </Link>
      </div>
    </header>
  )
}
