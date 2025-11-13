import Link from 'next/link'
import { Post } from '@/types/Post'

interface EncyclopediaCardProps {
  post: Post
}

export default function EncyclopediaCard({ post }: EncyclopediaCardProps) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <article className="group relative aspect-[3/4] overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          {/* Category Badge */}
          <span className="inline-block w-fit bg-pink-600 text-white text-xs font-semibold px-2 py-1 rounded mb-2">
            {post.category}
          </span>

          {/* Actress Name */}
          <h3 className="text-white font-bold text-lg mb-1 line-clamp-1 group-hover:text-pink-300 transition-colors">
            {post.actress}
          </h3>

          {/* Title */}
          <p className="text-white/90 text-sm line-clamp-2 mb-2">
            {post.title}
          </p>

          {/* Image Count */}
          <div className="flex items-center gap-2 text-white/80 text-xs">
            <span>📷 {post.images.length}枚</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
