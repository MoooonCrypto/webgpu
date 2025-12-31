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
    <div className="min-h-screen flex flex-col relative">
      <Header />

      <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="flex-1">
            {/* Breadcrumb */}
            <nav className="mb-8 text-sm font-medium text-gray animate-fadeInUp opacity-0">
              <Link href="/" className="hover:text-[#000000] transition-colors duration-200">
                ホーム
              </Link>
              <span className="mx-2">/</span>
              <span className="text-charcoal font-bold">{category}</span>
            </nav>

            {/* Category Header */}
            <div className="mb-12 animate-fadeInUp opacity-0 stagger-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-charcoal mb-3 tracking-tight">
                    {category}
                  </h1>
                  <div className="h-1 w-24 bg-gradient-to-r from-[#000000] to-[#2d2d2d] rounded-full"></div>
                </div>
                <div className="flex items-center gap-2 text-gray text-sm font-medium backdrop-blur-sm bg-white/60 px-4 py-2 rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                  </svg>
                  人気順 • 全{categoryPosts.length}件
                </div>
              </div>
              <p className="text-lg text-gray max-w-2xl">
                {category}カテゴリーの投稿一覧です
              </p>
            </div>

            {/* Posts Grid */}
            <div className="animate-fadeInUp opacity-0 stagger-2">
              <CategoryContent categoryPosts={categoryPosts} />
            </div>
          </main>

          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-28">
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
