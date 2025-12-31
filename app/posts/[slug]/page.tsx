import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdSlot from '@/components/AdSlot'
import Breadcrumb from '@/components/Breadcrumb'
import PostNavigation from '@/components/PostNavigation'
import EncyclopediaCard from '@/components/EncyclopediaCard'
import ScrollToTop from '@/components/ScrollToTop'
import { posts, getPostBySlug, getAdjacentPosts } from '@/data/posts'
import type { Metadata } from 'next'

interface PostPageProps {
  params: { slug: string }
}

// メタデータ生成
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'ページが見つかりません',
    }
  }

  return {
    title: `${post.title} - ${post.actress} | グラビア図鑑`,
    description: post.excerpt,
    robots: 'noindex, nofollow',
  }
}

// 静的パス生成
export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const { prev, next } = getAdjacentPosts(post.id)

  // 同じカテゴリーのおすすめ投稿（現在の投稿を除く、最大6件）
  const recommendedPosts = posts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 6)

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 max-w-5xl relative z-10">
        {/* Breadcrumb */}
        <div className="mb-8 animate-fadeInUp opacity-0">
          <Breadcrumb
            items={[
              { label: post.category, href: `/?category=${post.category}` },
              { label: post.title },
            ]}
          />
        </div>

        {/* Post Header */}
        <article className="glass-effect-strong rounded-3xl p-6 sm:p-10 mb-8 shadow-strong animate-fadeInUp opacity-0 stagger-1">
          <header className="mb-10">
            <div className="mb-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold tracking-wide bg-gradient-to-r from-[#000000] to-[#1a1a1a] text-white shadow-lg">
                {post.category}
              </span>
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-white/80 text-[#000000] border border-[#1a1a1a]/20"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-charcoal mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#000000] to-[#2d2d2d] flex items-center justify-center text-white font-bold">
                  {post.actress.charAt(0)}
                </div>
                <span className="text-gradient-bw font-bold text-xl">{post.actress}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <time dateTime={post.date} className="text-sm font-medium">
                  {new Date(post.date).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2 backdrop-blur-sm bg-white/60 px-3 py-1.5 rounded-full">
                <svg className="w-5 h-5 text-[#000000]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                </svg>
                <span className="text-sm font-bold text-[#000000]">{post.images.length}枚</span>
              </div>
            </div>
          </header>

          {/* Post Content - Images - Single Column */}
          <div className="space-y-6 mb-12">
            {post.images.map((image, index) => (
              <div
                key={index}
                className="w-full overflow-hidden rounded-2xl shadow-medium hover:shadow-strong transition-shadow duration-300"
              >
                <img
                  src={image}
                  alt={`${post.title} - ${index + 1}`}
                  className="w-full h-auto"
                  loading={index < 2 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>

          {/* Ad between content */}
          <div className="my-12">
            <div className="glass-effect rounded-2xl p-12 text-center border-2 border-dashed border-[#1a1a1a]/20">
              <svg className="w-16 h-16 mx-auto mb-3 text-gray/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray/60 text-sm font-medium">広告スペース</p>
            </div>
          </div>

          {/* Post Info */}
          <div className="relative overflow-hidden rounded-2xl shadow-medium mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f5f5f5] via-[#e5e5e5] to-[#f5f5f5] opacity-60"></div>
            <div className="relative p-8">
              <h2 className="text-2xl font-bold text-charcoal mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-[#000000]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                作品情報
              </h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="glass-effect rounded-xl p-4">
                  <dt className="text-gray text-sm font-semibold mb-2">女優名</dt>
                  <dd className="text-charcoal font-bold text-xl">{post.actress}</dd>
                </div>
                <div className="glass-effect rounded-xl p-4">
                  <dt className="text-gray text-sm font-semibold mb-2">カテゴリ</dt>
                  <dd className="text-charcoal font-bold text-xl">{post.category}</dd>
                </div>
                <div className="glass-effect rounded-xl p-4">
                  <dt className="text-gray text-sm font-semibold mb-2">公開日</dt>
                  <dd className="text-charcoal font-bold text-xl">
                    {new Date(post.date).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </dd>
                </div>
                <div className="glass-effect rounded-xl p-4">
                  <dt className="text-gray text-sm font-semibold mb-2">画像枚数</dt>
                  <dd className="text-charcoal font-bold text-xl">{post.images.length}枚</dd>
                </div>
              </dl>
            </div>
          </div>
        </article>

        {/* Post Navigation */}
        <div className="animate-fadeInUp opacity-0 stagger-2">
          <PostNavigation prev={prev} next={next} />
        </div>

        {/* Recommended Posts */}
        {recommendedPosts.length > 0 && (
          <div className="my-16 animate-fadeInUp opacity-0 stagger-3">
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-2">
                同じカテゴリーのおすすめ
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-[#000000] to-[#2d2d2d] rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
              {recommendedPosts.map(recommendedPost => (
                <EncyclopediaCard key={recommendedPost.id} post={recommendedPost} />
              ))}
            </div>
          </div>
        )}

        {/* Back to List */}
        <div className="text-center my-12 animate-fadeInUp opacity-0 stagger-4">
          <a
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#000000] to-[#1a1a1a] text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            一覧に戻る
          </a>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
