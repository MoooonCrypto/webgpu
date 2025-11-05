import Link from 'next/link'
import { Post } from '@/types/Post'

interface PostNavigationProps {
  prev: Post | null
  next: Post | null
}

export default function PostNavigation({ prev, next }: PostNavigationProps) {
  return (
    <nav className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 mb-8">
      {/* Previous Post */}
      <div>
        {prev ? (
          <Link
            href={`/posts/${prev.slug}`}
            className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition group"
          >
            <div className="text-sm text-gray-600 mb-2 flex items-center gap-2">
              <span>←</span>
              <span>前の記事</span>
            </div>
            <div className="flex gap-4">
              <img
                src={prev.thumbnail}
                alt={prev.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-gray-900 font-semibold line-clamp-2 group-hover:text-cyan-600 transition">
                  {prev.title}
                </h3>
                <p className="text-sm text-cyan-600 mt-1 font-semibold">{prev.actress}</p>
              </div>
            </div>
          </Link>
        ) : (
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 text-gray-500 text-center">
            前の記事はありません
          </div>
        )}
      </div>

      {/* Next Post */}
      <div>
        {next ? (
          <Link
            href={`/posts/${next.slug}`}
            className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition group"
          >
            <div className="text-sm text-gray-600 mb-2 flex items-center justify-end gap-2">
              <span>次の記事</span>
              <span>→</span>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 text-right">
                <h3 className="text-gray-900 font-semibold line-clamp-2 group-hover:text-cyan-600 transition">
                  {next.title}
                </h3>
                <p className="text-sm text-cyan-600 mt-1 font-semibold">{next.actress}</p>
              </div>
              <img
                src={next.thumbnail}
                alt={next.title}
                className="w-20 h-20 object-cover rounded"
              />
            </div>
          </Link>
        ) : (
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 text-gray-500 text-center">
            次の記事はありません
          </div>
        )}
      </div>
    </nav>
  )
}
