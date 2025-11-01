import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-pink-500">
            Gallery 18+
          </Link>

          <nav className="flex gap-6">
            <Link href="/" className="hover:text-pink-500 transition">
              Home
            </Link>
            <Link href="/categories" className="hover:text-pink-500 transition">
              Categories
            </Link>
            <Link href="/contact" className="hover:text-pink-500 transition">
              Contact
            </Link>
            <Link href="/terms" className="hover:text-pink-500 transition">
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
