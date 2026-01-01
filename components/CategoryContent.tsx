'use client'

import { useState } from 'react'
import EncyclopediaCard from './EncyclopediaCard'
import { Post } from '@/types/Post'

interface CategoryContentProps {
  categoryPosts: Post[]
}

export default function CategoryContent({ categoryPosts }: CategoryContentProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 120 // 6列 × 20行

  // ページネーション
  const totalPages = Math.ceil(categoryPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const paginatedPosts = categoryPosts.slice(startIndex, startIndex + postsPerPage)

  return (
    <>
      {/* Posts Grid */}
      {categoryPosts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
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
            <div className="flex justify-center items-center gap-2 mt-10">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg transition ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-charcoal'
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
                          ? 'bg-black text-white'
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
                    : 'bg-black text-white hover:bg-charcoal'
                }`}
              >
                次へ →
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">このカテゴリーには投稿がありません</p>
        </div>
      )}
    </>
  )
}
