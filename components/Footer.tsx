import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">About</h3>
            <p className="text-gray-600 text-sm">
              18歳以上限定のグラビア画像サイトです。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-cyan-600">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-cyan-600">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="text-gray-600 hover:text-cyan-600">
                  削除依頼
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Disclaimer</h3>
            <p className="text-gray-600 text-sm">
              掲載されているモデルは全て18歳以上です。
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} グラビアコレクション. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
