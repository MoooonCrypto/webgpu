import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdSlot from '@/components/AdSlot'
import Breadcrumb from '@/components/Breadcrumb'
import PostNavigation from '@/components/PostNavigation'
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: post.category, href: `/?category=${post.category}` },
            { label: post.title },
          ]}
        />

        {/* Post Header */}
        <article className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <header className="mb-8">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="bg-pink-600 text-white text-sm font-semibold px-4 py-1 rounded-full">
                {post.category}
              </span>
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-pink-100 text-pink-700 text-sm px-4 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-pink-600 font-bold text-lg">{post.actress}</span>
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

          {/* Post Content - Images - Single Column */}
          <div className="space-y-4 mb-12">
            {post.images.map((image, index) => (
              <div key={index} className="w-full">
                <img
                  src={image}
                  alt={`${post.title} - ${index + 1}`}
                  className="w-full h-auto rounded-lg"
                  loading={index < 2 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>

          {/* Ad between content */}
          <div className="my-8">
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-8 text-center">
              <p className="text-gray-500 text-sm">広告スペース</p>
            </div>
          </div>

          {/* Post Info */}
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">作品情報</h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-gray-600 mb-1">女優名</dt>
                <dd className="text-gray-900 font-semibold text-lg">{post.actress}</dd>
              </div>
              <div>
                <dt className="text-gray-600 mb-1">カテゴリ</dt>
                <dd className="text-gray-900">{post.category}</dd>
              </div>
              <div>
                <dt className="text-gray-600 mb-1">公開日</dt>
                <dd className="text-gray-900">
                  {new Date(post.date).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </dd>
              </div>
              <div>
                <dt className="text-gray-600 mb-1">画像枚数</dt>
                <dd className="text-gray-900">{post.images.length}枚</dd>
              </div>
            </dl>
          </div>
        </article>

        {/* Post Navigation */}
        <PostNavigation prev={prev} next={next} />

        {/* Back to List */}
        <div className="text-center my-8">
          <a
            href="/"
            className="inline-block bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition font-semibold"
          >
            一覧に戻る
          </a>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
