import Link from 'next/link'
import { Post } from '@/types/Post'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <article className="group bg-gray-800 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        {/* Thumbnail */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-700">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>
          {/* Image Count */}
          <div className="absolute bottom-3 right-3">
            <span className="bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded">
              📷 {post.images.length}枚
            </span>
          </div>
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-sm text-gray-200 line-clamp-2">{post.excerpt}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h2 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-pink-400 transition-colors">
            {post.title}
          </h2>
          <p className="text-gray-400 text-sm mb-3">{post.actress}</p>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <div className="flex gap-1">
              {post.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="text-pink-400">
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
