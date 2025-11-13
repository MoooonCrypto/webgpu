import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-200 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <Link href="/" className="text-3xl font-bold text-pink-600 hover:text-pink-700 transition">
          グラビア図鑑
        </Link>
      </div>
    </header>
  )
}
