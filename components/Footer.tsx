import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">About</h3>
            <p className="text-gray-400 text-sm">
              Adult content gallery for 18+ viewers only.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-pink-500">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-pink-500">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="text-gray-400 hover:text-pink-500">
                  DMCA / Removal Request
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Disclaimer</h3>
            <p className="text-gray-400 text-sm">
              All models are 18 years or older. This website contains adult content.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Gallery 18+. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
