const fs = require('fs')
const path = require('path')

// R2のベースURL
const R2_URL = 'https://pub-38a5803166a44a668002f313b530f97f.r2.dev'

function generatePosts() {
  console.log('🚀 Generating posts from actress metadata...')

  const actressDir = path.join(__dirname, '../data/actresses')
  const files = fs.readdirSync(actressDir).filter(f => f.endsWith('.json'))

  if (files.length === 0) {
    console.warn('⚠️  No actress metadata files found in data/actresses/')
    return
  }

  const posts = []
  let postId = 1

  files.forEach(file => {
    const filePath = path.join(actressDir, file)
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    // 画像URLを自動生成
    const images = []
    for (let i = 1; i <= data.imageCount; i++) {
      images.push(`${R2_URL}/actresses/${data.folder}/${i}.jpg`)
    }

    // 最初の画像をサムネイルに
    const thumbnail = images[0]

    posts.push({
      id: postId++,
      slug: data.slug,
      title: data.title,
      actress: data.name,
      category: data.category,
      thumbnail: thumbnail,
      images: images,
      date: data.date,
      excerpt: data.excerpt,
      tags: data.tags,
      popularity: data.popularity || 50
    })

    console.log(`  ✓ Generated post: ${data.name} (${images.length} images)`)
  })

  // 人気順にソート（高い順）
  posts.sort((a, b) => b.popularity - a.popularity)

  // TypeScriptファイルを生成
  const output = `import { Post } from '@/types/Post'

const R2_URL = '${R2_URL}'

export const posts: Post[] = ${JSON.stringify(posts, null, 2)}

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
`

  const outputPath = path.join(__dirname, '../data/posts.ts')
  fs.writeFileSync(outputPath, output, 'utf8')

  console.log(`\n✅ Generated ${posts.length} posts → data/posts.ts`)
  console.log(`📊 Total images: ${posts.reduce((sum, p) => sum + p.images.length, 0)}`)
}

// 実行
try {
  generatePosts()
} catch (error) {
  console.error('❌ Error generating posts:', error)
  process.exit(1)
}
