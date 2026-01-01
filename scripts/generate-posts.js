const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3')

// R2のベースURL
const R2_URL = 'https://pub-38a5803166a44a668002f313b530f97f.r2.dev'

// 環境変数から設定を取得
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || 'adult-pic-media'

/**
 * R2クライアントの初期化
 */
function createR2Client() {
  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
    console.warn('⚠️  R2 credentials not found. Falling back to JSON files.')
    return null
  }

  return new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  })
}

/**
 * R2から指定プレフィックスのオブジェクト一覧を取得
 */
async function listR2Objects(client, prefix = '') {
  const command = new ListObjectsV2Command({
    Bucket: R2_BUCKET_NAME,
    Prefix: prefix,
    Delimiter: '/',
  })

  try {
    const response = await client.send(command)
    return {
      folders: (response.CommonPrefixes || []).map(p => p.Prefix),
      files: (response.Contents || []).map(f => f.Key),
    }
  } catch (error) {
    console.error(`❌ Error listing R2 objects with prefix "${prefix}":`, error.message)
    return { folders: [], files: [] }
  }
}

/**
 * 文字列からハッシュを生成（簡易版）
 */
function generateHash(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36)
}

/**
 * R2のフォルダ構造をスキャンして記事データを生成
 */
async function scanR2Structure(client) {
  console.log('🔍 Scanning R2 folder structure...')

  const posts = []
  const categorySlugMap = {}

  // ルート直下のカテゴリフォルダを取得
  const rootResult = await listR2Objects(client, '')
  const categoryFolders = rootResult.folders.sort() // ソートして一貫性を保つ

  if (categoryFolders.length === 0) {
    console.warn('⚠️  No category folders found in R2')
    return posts
  }

  console.log(`📁 Found ${categoryFolders.length} category folders`)

  // 各カテゴリフォルダを処理
  for (const categoryFolder of categoryFolders) {
    // カテゴリ名を取得（女優A/ → 女優A）
    const categoryName = categoryFolder.replace(/\/$/, '')
    // カテゴリslugをフォルダ名のハッシュから生成（一貫性を保つ）
    const categorySlug = `cat-${generateHash(categoryName)}`
    categorySlugMap[categorySlug] = categoryName

    // カテゴリ配下の記事フォルダを取得
    const articlesResult = await listR2Objects(client, categoryFolder)
    const articleFolders = articlesResult.folders.sort() // ソートして一貫性を保つ

    console.log(`  📂 Category: ${categoryName} (${articleFolders.length} articles)`)

    // 各記事フォルダを処理
    for (const articleFolder of articleFolders) {
      // 記事名を取得（女優A/記事001/ → 記事001）
      const articleName = articleFolder.replace(categoryFolder, '').replace(/\/$/, '')

      // 記事フォルダ内の画像を取得
      const imagesResult = await listR2Objects(client, articleFolder)
      const imageFiles = imagesResult.files.filter(f =>
        f.match(/\.(jpg|jpeg|png|webp|gif)$/i)
      )

      if (imageFiles.length === 0) {
        console.warn(`    ⚠️  No images found in ${articleFolder}`)
        continue
      }

      // 画像URLを生成（ファイル名順にソート）
      // 各パス要素を個別にエンコードして日本語フォルダ名に対応
      const images = imageFiles.sort().map(file => {
        const parts = file.split('/')
        const encodedParts = parts.map(part => encodeURIComponent(part))
        return `${R2_URL}/${encodedParts.join('/')}`
      })
      const thumbnail = images[0]

      // スラッグを記事フォルダパスのハッシュから生成（一貫性を保つ）
      // 例: 与田祐希/与田祐希シリーズA/ → post-abc123
      const slug = `post-${generateHash(articleFolder)}`

      posts.push({
        id: 0, // 後でソート後に振り直す
        slug: slug,
        title: articleName,
        actress: categoryName,
        category: categoryName,
        categorySlug: categorySlug,
        thumbnail: thumbnail,
        images: images,
        date: new Date().toISOString().split('T')[0],
        excerpt: `${categoryName}の${articleName}です。${imageFiles.length}枚の写真をお楽しみください。`,
        tags: [categoryName, articleName],
        popularity: 50,
      })

      console.log(`    ✓ ${articleName} (${imageFiles.length} images)`)
    }
  }

  // slugでソートして一貫性のある順序にする
  posts.sort((a, b) => a.slug.localeCompare(b.slug))

  // IDを振り直す（1から連番）
  posts.forEach((post, index) => {
    post.id = index + 1
  })

  return posts
}

/**
 * JSONファイルから記事を生成（フォールバック）
 */
function generateFromJSON() {
  const fs = require('fs')
  const path = require('path')

  console.log('📄 Generating posts from JSON files...')

  const actressDir = path.join(__dirname, '../data/actresses')

  if (!fs.existsSync(actressDir)) {
    console.warn('⚠️  No data/actresses/ directory found')
    return []
  }

  const files = fs.readdirSync(actressDir).filter(f => f.endsWith('.json'))

  if (files.length === 0) {
    console.warn('⚠️  No actress metadata files found in data/actresses/')
    return []
  }

  const posts = []
  let postId = 1

  files.forEach(file => {
    const filePath = path.join(actressDir, file)
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    // 画像URLを自動生成
    // folderフィールドは "カテゴリ/記事名" の形式を想定
    const images = []
    const folderParts = data.folder.split('/')
    const encodedFolder = folderParts.map(part => encodeURIComponent(part)).join('/')
    for (let i = 1; i <= data.imageCount; i++) {
      images.push(`${R2_URL}/${encodedFolder}/${encodeURIComponent(`${i}.jpg`)}`)
    }

    posts.push({
      id: postId++,
      slug: data.slug,
      title: data.title,
      actress: data.name,
      category: data.category,
      thumbnail: images[0],
      images: images,
      date: data.date,
      excerpt: data.excerpt,
      tags: data.tags,
      popularity: data.popularity || 50,
    })

    console.log(`  ✓ Generated post: ${data.name} (${images.length} images)`)
  })

  return posts
}

/**
 * posts.tsファイルを生成
 */
function generatePostsFile(posts) {
  const fs = require('fs')
  const path = require('path')

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

export function getCategorySlugMap(): Record<string, string> {
  const map: Record<string, string> = {}
  posts.forEach(post => {
    if (!map[post.categorySlug]) {
      map[post.categorySlug] = post.category
    }
  })
  return map
}

export function getPostsByCategorySlug(categorySlug: string): Post[] {
  return posts.filter(post => post.categorySlug === categorySlug)
}
`

  const outputPath = path.join(__dirname, '../data/posts.ts')
  fs.writeFileSync(outputPath, output, 'utf8')

  console.log(`\n✅ Generated ${posts.length} posts → data/posts.ts`)
  console.log(`📊 Total images: ${posts.reduce((sum, p) => sum + p.images.length, 0)}`)
}

/**
 * メイン処理
 */
async function main() {
  console.log('🚀 Starting post generation...\n')

  let posts = []

  // R2スキャンを試行
  const client = createR2Client()

  if (client) {
    console.log('📡 Using R2 API to scan folder structure...')
    posts = await scanR2Structure(client)
  }

  // R2スキャンで記事が見つからない場合はJSONフォールバック
  if (posts.length === 0) {
    console.log('\n⚠️  No posts found in R2, falling back to JSON files...')
    posts = generateFromJSON()
  }

  if (posts.length === 0) {
    console.error('\n❌ No posts generated. Please check your R2 setup or JSON files.')
    process.exit(1)
  }

  // posts.tsを生成
  generatePostsFile(posts)
}

// 実行
main().catch(error => {
  console.error('❌ Error generating posts:', error)
  process.exit(1)
})
