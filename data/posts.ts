import { Post } from '@/types/Post'

const R2_URL = 'https://pub-38a5803166a44a668002f313b530f97f.r2.dev'

export const posts: Post[] = [
  {
    "id": 1,
    "slug": "actress-gravure-001",
    "title": "美麗グラビア Vol.1",
    "actress": "サンプル女優A",
    "category": "グラビア",
    "thumbnail": "https://pub-38a5803166a44a668002f313b530f97f.r2.dev/actresses/actress-001/1.jpg",
    "images": [
      "https://pub-38a5803166a44a668002f313b530f97f.r2.dev/actresses/actress-001/1.jpg",
      "https://pub-38a5803166a44a668002f313b530f97f.r2.dev/actresses/actress-001/2.jpg",
      "https://pub-38a5803166a44a668002f313b530f97f.r2.dev/actresses/actress-001/3.jpg",
      "https://pub-38a5803166a44a668002f313b530f97f.r2.dev/actresses/actress-001/4.jpg",
      "https://pub-38a5803166a44a668002f313b530f97f.r2.dev/actresses/actress-001/5.jpg"
    ],
    "date": "2024-01-15",
    "excerpt": "最新グラビア撮影の美麗な写真をお届けします。",
    "tags": [
      "グラビア",
      "水着",
      "ビーチ"
    ]
  },
  {
    "id": 2,
    "slug": "actress-gravure-002",
    "title": "夏の水着特集 Vol.2",
    "actress": "サンプル女優B",
    "category": "水着",
    "thumbnail": "https://pub-38a5803166a44a668002f313b530f97f.r2.dev/actresses/actress-002/1.jpg",
    "images": [
      "https://pub-38a5803166a44a668002f313b530f97f.r2.dev/actresses/actress-002/1.jpg",
      "https://pub-38a5803166a44a668002f313b530f97f.r2.dev/actresses/actress-002/2.jpg",
      "https://pub-38a5803166a44a668002f313b530f97f.r2.dev/actresses/actress-002/3.jpg",
      "https://pub-38a5803166a44a668002f313b530f97f.r2.dev/actresses/actress-002/4.jpg"
    ],
    "date": "2024-01-14",
    "excerpt": "夏の海辺で撮影された水着グラビア。",
    "tags": [
      "水着",
      "夏",
      "ビーチ"
    ]
  },
  {
    "id": 3,
    "slug": "actress-gravure-003",
    "title": "清楚系グラビア Vol.3",
    "actress": "サンプル女優C",
    "category": "グラビア",
    "thumbnail": "https://pub-38a5803166a44a668002f313b530f97f.r2.dev/actresses/actress-003/1.jpg",
    "images": [
      "https://pub-38a5803166a44a668002f313b530f97f.r2.dev/actresses/actress-003/1.jpg",
      "https://pub-38a5803166a44a668002f313b530f97f.r2.dev/actresses/actress-003/2.jpg",
      "https://pub-38a5803166a44a668002f313b530f97f.r2.dev/actresses/actress-003/3.jpg",
      "https://pub-38a5803166a44a668002f313b530f97f.r2.dev/actresses/actress-003/4.jpg",
      "https://pub-38a5803166a44a668002f313b530f97f.r2.dev/actresses/actress-003/5.jpg",
      "https://pub-38a5803166a44a668002f313b530f97f.r2.dev/actresses/actress-003/6.jpg"
    ],
    "date": "2024-01-13",
    "excerpt": "清楚な雰囲気が魅力的なグラビア撮影。",
    "tags": [
      "グラビア",
      "清楚系"
    ]
  }
]

// ヘルパー関数
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(post => post.slug === slug)
}

export function getPostById(id: number): Post | undefined {
  return posts.find(post => post.id === id)
}

export function getPostsByCategory(category: string): Post[] {
  return posts.filter(post => post.category === category)
}

export function getPaginatedPosts(page: number, perPage: number = 9): {
  posts: Post[]
  totalPages: number
  currentPage: number
} {
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  const paginatedPosts = posts.slice(startIndex, endIndex)

  return {
    posts: paginatedPosts,
    totalPages: Math.ceil(posts.length / perPage),
    currentPage: page,
  }
}

export function getAdjacentPosts(currentId: number): {
  prev: Post | null
  next: Post | null
} {
  const currentIndex = posts.findIndex(post => post.id === currentId)

  return {
    prev: currentIndex > 0 ? posts[currentIndex - 1] : null,
    next: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
  }
}

export function getAllCategories(): string[] {
  const categories = new Set(posts.map(post => post.category))
  return Array.from(categories)
}
