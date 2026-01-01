'use client'

import Link from 'next/link'
import { Post } from '@/types/Post'

interface EncyclopediaCardProps {
  post: Post
  priority?: boolean  // ファーストビューの画像に true を渡す
}

export default function EncyclopediaCard({ post, priority = false }: EncyclopediaCardProps) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <article className="group relative aspect-[3/4] overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02]">
        {/* Card Background with Glass Effect */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            loading={priority ? "eager" : "lazy"}
          />

          {/* Multi-layer Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#000000]/20 via-transparent to-[#2d2d2d]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* Decorative Border */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20 group-hover:ring-2 group-hover:ring-[#1a1a1a]/50 transition-all duration-300"></div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
          {/* Category Badge */}
          <div className="mb-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide backdrop-blur-md bg-gradient-to-r from-[#000000] to-[#1a1a1a] text-white shadow-lg">
              {post.category}
            </span>
          </div>

          {/* Actress Name */}
          <h3 className="text-white font-bold text-base sm:text-lg mb-2 line-clamp-1 transform transition-all duration-300 group-hover:translate-y-[-4px] drop-shadow-lg">
            {post.actress}
          </h3>

          {/* Title */}
          <p className="text-white/90 text-xs sm:text-sm line-clamp-2 mb-3 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity duration-300">
            {post.title}
          </p>

          {/* Footer Info */}
          <div className="flex items-center justify-between text-white/80 text-xs">
            <div className="flex items-center gap-1.5 backdrop-blur-sm bg-white/10 px-2.5 py-1 rounded-full">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
              </svg>
              <span className="font-semibold">{post.images.length}枚</span>
            </div>

            {/* View More Indicator */}
            <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl shadow-[0_0_40px_rgba(233,30,99,0.4)]"></div>
        </div>
      </article>
    </Link>
  )
}
