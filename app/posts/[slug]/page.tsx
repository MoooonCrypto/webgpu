import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdSlot from '@/components/AdSlot'
import Breadcrumb from '@/components/Breadcrumb'
import PostNavigation from '@/components/PostNavigation'
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
    title: `${post.title} - ${post.actress} | グラビアコレクション`,
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Top Ad */}
      <AdSlot position="top" />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: post.category, href: `/?category=${post.category}` },
            { label: post.title },
          ]}
        />

        {/* Post Header */}
        <article>
          <header className="mb-8">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="bg-pink-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                {post.category}
              </span>
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-800 text-pink-400 text-sm px-4 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-pink-400 font-semibold">{post.actress}</span>
              </div>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>📷 {post.images.length}枚</span>
            </div>
          </header>

          {/* Post Content - Images */}
          <div className="space-y-6 mb-12">
            {post.images.map((image, index) => (
              <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
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
          <div className="my-8">
            <AdSlot position="middle" />
          </div>

          {/* Post Info */}
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-3">作品情報</h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-gray-400 mb-1">女優名</dt>
                <dd className="text-white font-semibold">{post.actress}</dd>
              </div>
              <div>
                <dt className="text-gray-400 mb-1">カテゴリ</dt>
                <dd className="text-white">{post.category}</dd>
              </div>
              <div>
                <dt className="text-gray-400 mb-1">公開日</dt>
                <dd className="text-white">
                  {new Date(post.date).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </dd>
              </div>
              <div>
                <dt className="text-gray-400 mb-1">画像枚数</dt>
                <dd className="text-white">{post.images.length}枚</dd>
              </div>
            </dl>
          </div>
        </article>

        {/* Post Navigation */}
        <PostNavigation prev={prev} next={next} />

        {/* Back to List */}
        <div className="text-center">
          <a
            href="/"
            className="inline-block bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-pink-500 transition"
          >
            一覧に戻る
          </a>
        </div>
      </main>

      {/* Bottom Ad */}
      <AdSlot position="bottom" />

      <Footer />
    </div>
  )
}
