'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'
import EncyclopediaCard from '@/components/EncyclopediaCard'
import ScrollToTop from '@/components/ScrollToTop'
import { posts, getCategorySlugMap } from '@/data/posts'

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 120 // 6列 × 20行

  // ページネーション
  const totalPages = Math.ceil(posts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const paginatedPosts = posts.slice(startIndex, startIndex + postsPerPage)

  // カテゴリー別の投稿（各カテゴリー6件まで表示）
  const categoryMap = getCategorySlugMap()
  const categoryPosts = Object.entries(categoryMap).map(([categorySlug, categoryName]) => ({
    categorySlug,
    category: categoryName,
    posts: posts.filter(p => p.categorySlug === categorySlug).slice(0, 6)
  }))

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />

      <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="flex-1">
            {/* Category Sections */}
            {categoryPosts.map(({ categorySlug, category, posts: categoryPostsList }, idx) => (
              <section
                key={categorySlug}
                className="mb-16 animate-fadeInUp opacity-0"
                style={{ animationDelay: `${0.1 + idx * 0.05}s` }}
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-2">
                      {category}
                    </h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-[#000000] to-[#2d2d2d] rounded-full"></div>
                  </div>
                  <Link
                    href={`/category/${categorySlug}`}
                    className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#000000] to-[#1a1a1a] text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    もっと見る
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
                  {categoryPostsList.map(post => (
                    <EncyclopediaCard key={post.id} post={post} priority={idx < 2} />
                  ))}
                </div>
              </section>
            ))}

            {/* All Posts Section */}
            <section className="mt-24">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-2">
                    すべての投稿
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-[#000000] to-[#2d2d2d] rounded-full"></div>
                </div>
                <div className="flex items-center gap-2 text-gray text-sm font-medium backdrop-blur-sm bg-white/60 px-4 py-2 rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                  </svg>
                  人気順 • 全{posts.length}件
                </div>
              </div>

              {/* Posts Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 mb-12">
                {paginatedPosts.map((post, index) => (
                  <EncyclopediaCard
                    key={post.id}
                    post={post}
                    priority={currentPage === 1 && index < 18}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-12">
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                      currentPage === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#000000] to-[#1a1a1a] text-white hover:shadow-lg hover:scale-105'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    前へ
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
                          className={`w-10 h-10 rounded-full font-bold text-sm transition-all duration-300 ${
                            page === currentPage
                              ? 'bg-gradient-to-r from-[#000000] to-[#1a1a1a] text-white shadow-lg scale-110'
                              : 'glass-effect text-gray hover:scale-105 hover:text-[#000000]'
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
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                      currentPage === totalPages
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#000000] to-[#1a1a1a] text-white hover:shadow-lg hover:scale-105'
                    }`}
                  >
                    次へ
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </section>
          </main>

          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-28">
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
