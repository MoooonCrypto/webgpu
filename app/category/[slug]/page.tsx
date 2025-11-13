import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'
import CategoryContent from '@/components/CategoryContent'
import ScrollToTop from '@/components/ScrollToTop'
import { posts, getAllCategories } from '@/data/posts'

interface CategoryPageProps {
  params: { slug: string }
}

// 静的パス生成
export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({
    slug: encodeURIComponent(category),
  }))
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = decodeURIComponent(params.slug)

  // カテゴリーでフィルタリング
  const categoryPosts = posts.filter(p => p.category === category)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="flex-1">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm text-gray-600">
              <Link href="/" className="hover:text-pink-600 transition">
                ホーム
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-semibold">{category}</span>
            </nav>

            {/* Category Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{category}</h1>
              <p className="text-gray-600">
                人気順に表示 • 全{categoryPosts.length}件
              </p>
            </div>

            {/* Posts Grid */}
            <CategoryContent categoryPosts={categoryPosts} />
          </main>

          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-4">
              <Sidebar />
            </div>
          </aside>
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
