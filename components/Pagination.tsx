'use client'

import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath?: string
}

export default function Pagination({ currentPage, totalPages, basePath = '' }: PaginationProps) {
  const pages: (number | string)[] = []

  // ページ番号の生成ロジック
  if (totalPages <= 7) {
    // 7ページ以下なら全て表示
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    // 8ページ以上の場合
    if (currentPage <= 3) {
      // 最初の方
      pages.push(1, 2, 3, 4, '...', totalPages)
    } else if (currentPage >= totalPages - 2) {
      // 最後の方
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
    } else {
      // 中間
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
    }
  }

  const getPageUrl = (page: number) => {
    if (page === 1) {
      return basePath || '/'
    }
    return `${basePath}?page=${page}`
  }

  return (
    <nav className="flex justify-center items-center gap-2 my-8" aria-label="Pagination">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-pearl0 transition"
        >
          ← 前へ
        </Link>
      ) : (
        <span className="px-4 py-2 bg-gray-800/50 text-gray-600 rounded-lg cursor-not-allowed">
          ← 前へ
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex gap-2">
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                ...
              </span>
            )
          }

          const pageNum = page as number
          const isActive = pageNum === currentPage

          return (
            <Link
              key={pageNum}
              href={getPageUrl(pageNum)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                isActive
                  ? 'bg-pearl0 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNum}
            </Link>
          )
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-pearl0 transition"
        >
          次へ →
        </Link>
      ) : (
        <span className="px-4 py-2 bg-gray-800/50 text-gray-600 rounded-lg cursor-not-allowed">
          次へ →
        </span>
      )}
    </nav>
  )
}
