import Link from 'next/link'
import { Post } from '@/types/Post'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <article className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row">
        {/* Thumbnail */}
        <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {/* Image Count */}
          <div className="absolute bottom-2 right-2">
            <span className="bg-cyan-600 text-white text-xs font-semibold px-2 py-1 rounded">
              📷 {post.images.length}枚
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1">
          <div className="mb-2">
            <span className="inline-block bg-cyan-100 text-cyan-700 text-xs font-semibold px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">
            {post.title}
          </h2>

          <p className="text-cyan-600 font-semibold text-lg mb-2">{post.actress}</p>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <div className="flex gap-2">
              {post.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="text-cyan-600">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
