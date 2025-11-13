'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'
import EncyclopediaCard from '@/components/EncyclopediaCard'
import ScrollToTop from '@/components/ScrollToTop'
import { posts, getAllCategories } from '@/data/posts'

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 120 // 6列 × 20行

  // ページネーション
  const totalPages = Math.ceil(posts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const paginatedPosts = posts.slice(startIndex, startIndex + postsPerPage)

  // カテゴリー別の投稿（各カテゴリー6件まで表示）
  const categories = getAllCategories()
  const categoryPosts = categories.map(category => ({
    category,
    posts: posts.filter(p => p.category === category).slice(0, 6)
  }))

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="flex-1">
            {/* Category Sections */}
            {categoryPosts.map(({ category, posts: categoryPostsList }) => (
              <section key={category} className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">{category}</h2>
                  <Link
                    href={`/category/${encodeURIComponent(category)}`}
                    className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition font-semibold text-sm"
                  >
                    もっと見る →
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {categoryPostsList.map(post => (
                    <EncyclopediaCard key={post.id} post={post} />
                  ))}
                </div>
              </section>
            ))}

            {/* All Posts Section */}
            <section className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800">すべての投稿</h2>
                <span className="text-gray-600 text-sm">
                  人気順に表示 • 全{posts.length}件
                </span>
              </div>

              {/* Posts Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
                {paginatedPosts.map(post => (
                  <EncyclopediaCard key={post.id} post={post} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10">
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg transition ${
                      currentPage === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-pink-600 text-white hover:bg-pink-700'
                    }`}
                  >
                    ← 前へ
                  </button>

                  {/* Page Numbers */}
                  <div className="flex gap-2">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let page
                      if (totalPages <= 5) {
                        page = i + 1
                      } else if (currentPage <= 3) {
                        page = i + 1
                      } else if (currentPage >= totalPages - 2) {
                        page = totalPages - 4 + i
                      } else {
                        page = currentPage - 2 + i
                      }
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-lg font-semibold transition ${
                            page === currentPage
                              ? 'bg-pink-600 text-white'
                              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg transition ${
                      currentPage === totalPages
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-pink-600 text-white hover:bg-pink-700'
                    }`}
                  >
                    次へ →
                  </button>
                </div>
              )}
            </section>
          </main>

          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-4">
              <Sidebar />
            </div>
          </aside>
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
