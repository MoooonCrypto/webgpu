'use client'

import Link from 'next/link'
import { useState } from 'react'
import { posts, getAllCategories } from '@/data/posts'

export default function Sidebar() {
  const [searchQuery, setSearchQuery] = useState('')
  const categories = getAllCategories()

  // 女優名のユニークリストを取得
  const actresses = Array.from(new Set(posts.map(post => post.actress))).sort()

  return (
    <aside className="space-y-6">
      {/* 検索ボックス */}
      <div className="bg-white border border-cyan-200 rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-3">検索</h3>
        <input
          type="text"
          placeholder="女優名で検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-900"
        />
      </div>

      {/* カテゴリ */}
      <div className="bg-white border border-cyan-200 rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-3">カテゴリ</h3>
        <ul className="space-y-2">
          <li>
            <Link href="/" className="text-cyan-600 hover:text-cyan-700 text-sm">
              すべて ({posts.length})
            </Link>
          </li>
          {categories.map(category => {
            const count = posts.filter(p => p.category === category).length
            return (
              <li key={category}>
                <Link
                  href={`/?category=${category}`}
                  className="text-gray-600 hover:text-cyan-600 text-sm"
                >
                  {category} ({count})
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* 女優索引 */}
      <div className="bg-white border border-cyan-200 rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-3">女優索引</h3>
        <ul className="space-y-2 max-h-64 overflow-y-auto">
          {actresses.map(actress => (
            <li key={actress}>
              <button className="text-gray-600 hover:text-cyan-600 text-sm text-left w-full">
                {actress}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* お問い合わせ */}
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-3">お問い合わせ</h3>
        <p className="text-sm text-gray-600 mb-3">
          削除依頼やご質問はこちらから
        </p>
        <Link
          href="/contact"
          className="block text-center bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition text-sm font-semibold"
        >
          お問い合わせフォーム
        </Link>
      </div>

      {/* 広告スペース */}
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-8 text-center">
        <p className="text-gray-500 text-sm">広告スペース</p>
      </div>
    </aside>
  )
}
