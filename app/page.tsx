'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdSlot from '@/components/AdSlot'
import PostCard from '@/components/PostCard'
import Pagination from '@/components/Pagination'
import { posts, getAllCategories } from '@/data/posts'

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = getAllCategories()
  const postsPerPage = 9

  // フィルタリングされた投稿
  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts
    return posts.filter(post => post.category === selectedCategory)
  }, [selectedCategory])

  // ページネーション
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  // カテゴリ変更時はページを1に戻す
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Top Ad */}
      <AdSlot position="top" />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            グラビアコレクション
          </h1>
          <p className="text-gray-400">最新のグラビア画像を毎日更新中</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => handleCategoryChange(null)}
            className={`px-4 py-2 rounded-lg transition ${
              !selectedCategory
                ? 'bg-pink-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            すべて
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-lg transition ${
                selectedCategory === category
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paginatedPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 my-8">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg transition ${
                currentPage === 1
                  ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                  : 'bg-gray-800 text-white hover:bg-pink-500'
              }`}
            >
              ← 前へ
            </button>

            {/* Page Numbers */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    page === currentPage
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg transition ${
                currentPage === totalPages
                  ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                  : 'bg-gray-800 text-white hover:bg-pink-500'
              }`}
            >
              次へ →
            </button>
          </div>
        )}
      </main>

      {/* Bottom Ad */}
      <AdSlot position="bottom" />

      <Footer />
    </div>
  )
}
