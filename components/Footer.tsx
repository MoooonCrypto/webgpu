import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative mt-24 border-t border-white/30">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5f5f5] via-[#e5e5e5] to-[#f5f5f5] opacity-60"></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-black text-gradient-bw mb-3">
              グラビア図鑑
            </h3>
            <p className="text-sm text-gray leading-relaxed mb-4">
              厳選された美しいグラビアコレクションをお届けします
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full glass-effect flex items-center justify-center text-[#000000] hover:scale-110 hover:shadow-lg transition-all duration-200"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full glass-effect flex items-center justify-center text-[#000000] hover:scale-110 hover:shadow-lg transition-all duration-200"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-bold text-charcoal mb-4">クイックリンク</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray hover:text-[#000000] transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#000000]"></span>
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray hover:text-[#000000] transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#000000]"></span>
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="text-sm text-gray hover:text-[#000000] transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#000000]"></span>
                  DMCA削除フォーム
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-base font-bold text-charcoal mb-4">法的情報</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-gray hover:text-[#000000] transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#000000]"></span>
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray hover:text-[#000000] transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#000000]"></span>
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <p className="text-sm text-gray flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#000000]"></span>
                  18歳以上限定
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#1a1a1a]/30 to-transparent mb-6"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-gray font-medium">
            © {currentYear} <span className="text-gradient-bw font-bold">グラビア図鑑</span>. All rights reserved.
          </p>
          <p className="text-xs text-gray/70 mt-2">
            このサイトは18歳以上のみを対象としています
          </p>
        </div>
      </div>
    </footer>
  )
}
