'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'
import PostCard from '@/components/PostCard'
import ScrollToTop from '@/components/ScrollToTop'
import { posts } from '@/data/posts'

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10

  // ページネーション
  const totalPages = Math.ceil(posts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const paginatedPosts = posts.slice(startIndex, startIndex + postsPerPage)

  // おすすめ記事（ランダムに3件）
  const recommendedPosts = posts.slice(0, 3)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="flex-1">
            <div className="space-y-6">
              {paginatedPosts.map(post => (
                <PostCard key={post.id} post={post} />
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

            {/* Recommended Posts */}
            <div className="mt-12 bg-white border border-pink-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">おすすめの女優</h2>
              <div className="space-y-4">
                {recommendedPosts.map(post => (
                  <a
                    key={post.id}
                    href={`/posts/${post.slug}`}
                    className="group flex items-center gap-4 p-3 rounded-lg hover:bg-pink-50 transition"
                  >
                    <div className="relative w-24 h-24 overflow-hidden rounded-lg flex-shrink-0">
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-pink-600 transition">
                        {post.actress}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{post.title}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0">
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
