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
    <aside className="space-y-4 animate-fadeInUp opacity-0 stagger-2">
      {/* 検索ボックス */}
      <div className="glass-effect-strong rounded-xl p-4 shadow-[0_8px_32px_rgba(199,23,78,0.08)] hover:shadow-[0_12px_40px_rgba(199,23,78,0.12)] transition-all duration-300">
        <h3 className="text-base font-bold text-charcoal mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-[#000000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          検索
        </h3>
        <div className="relative">
          <input
            type="text"
            placeholder="女優名で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 bg-white/80 border-2 border-white/40 rounded-xl focus:outline-none focus:border-[#1a1a1a] text-charcoal placeholder:text-gray/50 transition-all duration-300 text-sm"
          />
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* カテゴリ */}
      <div className="glass-effect-strong rounded-xl p-4 shadow-[0_8px_32px_rgba(199,23,78,0.08)] hover:shadow-[0_12px_40px_rgba(199,23,78,0.12)] transition-all duration-300">
        <h3 className="text-base font-bold text-charcoal mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-[#000000]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
          </svg>
          カテゴリ
        </h3>
        <ul className="space-y-2">
          <li>
            <Link
              href="/"
              className="group flex items-center justify-between px-3 py-2.5 rounded-lg bg-gradient-to-r from-[#000000] to-[#1a1a1a] text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              <span>すべて</span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{posts.length}</span>
            </Link>
          </li>
          {categories.map(category => {
            const count = posts.filter(p => p.category === category).length
            return (
              <li key={category}>
                <Link
                  href={`/?category=${category}`}
                  className="group flex items-center justify-between px-3 py-2.5 rounded-lg text-gray hover:bg-white/60 hover:text-[#000000] font-medium text-sm transition-all duration-200"
                >
                  <span>{category}</span>
                  <span className="text-xs text-gray/60 group-hover:text-[#000000]/80">{count}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* 女優索引 */}
      <div className="glass-effect-strong rounded-xl p-4 shadow-[0_8px_32px_rgba(199,23,78,0.08)] hover:shadow-[0_12px_40px_rgba(199,23,78,0.12)] transition-all duration-300">
        <h3 className="text-base font-bold text-charcoal mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-[#000000]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
          女優索引
        </h3>
        <ul className="space-y-1.5 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
          {actresses.map(actress => (
            <li key={actress}>
              <button className="w-full text-left px-3 py-2 rounded-lg text-gray hover:bg-white/60 hover:text-[#000000] text-sm font-medium transition-all duration-200">
                {actress}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* お問い合わせ */}
      <div className="relative overflow-hidden rounded-2xl shadow-[0_8px_32px_rgba(199,23,78,0.12)] hover:shadow-[0_12px_40px_rgba(199,23,78,0.18)] transition-all duration-300">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#1a1a1a] to-[#2d2d2d]"></div>

        {/* Content */}
        <div className="relative p-5">
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            お問い合わせ
          </h3>
          <p className="text-sm text-white/90 mb-4 leading-relaxed">
            削除依頼やご質問はこちらから
          </p>
          <Link
            href="/contact"
            className="block text-center bg-white text-[#000000] px-4 py-2.5 rounded-xl hover:bg-white/95 transition-all duration-200 text-sm font-bold hover:scale-105 shadow-lg"
          >
            フォームへ移動
          </Link>
        </div>
      </div>

      {/* 広告スペース */}
      <div className="glass-effect rounded-2xl p-8 text-center border-2 border-dashed border-[#1a1a1a]/20">
        <svg className="w-12 h-12 mx-auto mb-2 text-gray/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-gray/60 text-sm font-medium">広告スペース</p>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #000000, #1a1a1a);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #a01441, #000000);
        }
      `}</style>
    </aside>
  )
}
