'use client'

import { useState } from 'react'
import { getAllCategories } from '@/data/posts'

interface PostForm {
  id: string
  slug: string
  name: string
  title: string
  category: string
  date: string
  excerpt: string
  tags: string
  imageCount: number
  folder: string
  popularity: number
}

export default function AdminPage() {
  const existingCategories = getAllCategories()
  const [posts, setPosts] = useState<PostForm[]>([{
    id: Date.now().toString(),
    slug: '',
    name: '',
    title: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    excerpt: '',
    tags: '',
    imageCount: 1,
    folder: '',
    popularity: 50
  }])

  const [newCategory, setNewCategory] = useState('')

  const addPost = () => {
    setPosts([...posts, {
      id: Date.now().toString(),
      slug: '',
      name: '',
      title: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      excerpt: '',
      tags: '',
      imageCount: 1,
      folder: '',
      popularity: 50
    }])
  }

  const removePost = (id: string) => {
    setPosts(posts.filter(p => p.id !== id))
  }

  const updatePost = (id: string, field: keyof PostForm, value: any) => {
    setPosts(posts.map(p => p.id === id ? { ...p, [field]: value } : p))
  }

  const generateJSON = (post: PostForm) => {
    return {
      slug: post.slug,
      name: post.name,
      title: post.title,
      category: post.category,
      date: post.date,
      excerpt: post.excerpt,
      tags: post.tags.split(',').map(t => t.trim()).filter(t => t),
      imageCount: post.imageCount,
      folder: post.folder,
      popularity: post.popularity
    }
  }

  const downloadJSON = (post: PostForm, filename: string) => {
    const json = JSON.stringify(generateJSON(post), null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadAllJSON = () => {
    posts.forEach((post, index) => {
      const filename = post.folder ? `${post.folder}.json` : `actress-${String(index + 1).padStart(3, '0')}.json`
      setTimeout(() => downloadJSON(post, filename), index * 100)
    })
  }

  const copyAllInstructions = () => {
    const instructions = posts.map((post, index) => {
      const filename = post.folder ? `${post.folder}.json` : `actress-${String(index + 1).padStart(3, '0')}.json`
      const json = JSON.stringify(generateJSON(post), null, 2)
      return `# ${index + 1}. ${post.name}\n\nファイル名: data/actresses/${filename}\n\n\`\`\`json\n${json}\n\`\`\`\n\nR2パス: actresses/${post.folder}/1.jpg ~ ${post.imageCount}.jpg\n`
    }).join('\n\n---\n\n')

    navigator.clipboard.writeText(instructions)
    alert('コピーしました！')
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            📝 コンテンツ管理画面
          </h1>
          <p className="text-gray-600 mb-6">
            複数の記事を一括で登録できます。入力後、JSONファイルをダウンロードして <code className="bg-gray-100 px-2 py-1 rounded">data/actresses/</code> に配置してください。
          </p>

          {/* 一括操作ボタン */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={addPost}
              className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition font-semibold"
            >
              ➕ 記事を追加
            </button>
            <button
              onClick={downloadAllJSON}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              💾 全てダウンロード ({posts.length}件)
            </button>
            <button
              onClick={copyAllInstructions}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              📋 手順をコピー
            </button>
          </div>
        </div>

        {/* 記事フォーム */}
        <div className="space-y-6">
          {posts.map((post, index) => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  記事 #{index + 1}
                </h2>
                {posts.length > 1 && (
                  <button
                    onClick={() => removePost(post.id)}
                    className="text-red-600 hover:text-red-700 font-semibold"
                  >
                    🗑️ 削除
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 女優名 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    女優名・記事名 *
                  </label>
                  <input
                    type="text"
                    value={post.name}
                    onChange={(e) => updatePost(post.id, 'name', e.target.value)}
                    placeholder="例: 女優A①"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                {/* タイトル */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    記事タイトル *
                  </label>
                  <input
                    type="text"
                    value={post.title}
                    onChange={(e) => updatePost(post.id, 'title', e.target.value)}
                    placeholder="例: 女優A① 写真集"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                {/* スラッグ */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    スラッグ（URL用） *
                  </label>
                  <input
                    type="text"
                    value={post.slug}
                    onChange={(e) => updatePost(post.id, 'slug', e.target.value)}
                    placeholder="例: actress-a-001"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">半角英数字とハイフンのみ</p>
                </div>

                {/* フォルダ名 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    R2フォルダ名 *
                  </label>
                  <input
                    type="text"
                    value={post.folder}
                    onChange={(e) => updatePost(post.id, 'folder', e.target.value)}
                    placeholder="例: actress-a-001"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">R2のactresses/{'{'}この名前{'}'}/</p>
                </div>

                {/* カテゴリ */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    カテゴリ *
                  </label>
                  <select
                    value={post.category}
                    onChange={(e) => updatePost(post.id, 'category', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="">選択してください</option>
                    {existingCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    <option value="__new__">➕ 新しいカテゴリ</option>
                  </select>
                  {post.category === '__new__' && (
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => {
                        setNewCategory(e.target.value)
                        updatePost(post.id, 'category', e.target.value)
                      }}
                      placeholder="新しいカテゴリ名を入力"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent mt-2"
                    />
                  )}
                </div>

                {/* 画像枚数 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    画像枚数 *
                  </label>
                  <input
                    type="number"
                    value={post.imageCount}
                    onChange={(e) => updatePost(post.id, 'imageCount', parseInt(e.target.value) || 1)}
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                {/* 人気度 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    人気度スコア
                  </label>
                  <input
                    type="number"
                    value={post.popularity}
                    onChange={(e) => updatePost(post.id, 'popularity', parseInt(e.target.value) || 50)}
                    min="1"
                    max="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">1-100 (高いほど上位表示)</p>
                </div>

                {/* 公開日 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    公開日
                  </label>
                  <input
                    type="date"
                    value={post.date}
                    onChange={(e) => updatePost(post.id, 'date', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                {/* 説明文 */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    説明文
                  </label>
                  <textarea
                    value={post.excerpt}
                    onChange={(e) => updatePost(post.id, 'excerpt', e.target.value)}
                    placeholder="記事の簡単な説明"
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                {/* タグ */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    タグ（カンマ区切り）
                  </label>
                  <input
                    type="text"
                    value={post.tags}
                    onChange={(e) => updatePost(post.id, 'tags', e.target.value)}
                    placeholder="例: グラビア, 水着, ビーチ"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* R2パス表示 */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-2">📁 R2アップロードパス:</p>
                <code className="text-sm text-gray-800">
                  actresses/{post.folder || '???'}/<br />
                  {Array.from({ length: post.imageCount }, (_, i) => (
                    <span key={i} className="ml-4">
                      {i + 1}.jpg<br />
                    </span>
                  ))}
                </code>
              </div>

              {/* ダウンロードボタン */}
              <div className="mt-4">
                <button
                  onClick={() => downloadJSON(post, post.folder ? `${post.folder}.json` : `actress-${String(index + 1).padStart(3, '0')}.json`)}
                  disabled={!post.name || !post.slug || !post.folder}
                  className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  💾 この記事のJSONをダウンロード
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 使い方 */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-800 mb-2">📖 使い方</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-900">
            <li>必要な記事数だけフォームを追加</li>
            <li>各記事の情報を入力</li>
            <li>「全てダウンロード」で全JSONファイルをダウンロード</li>
            <li>ダウンロードしたJSONを <code className="bg-blue-100 px-2 py-1 rounded">data/actresses/</code> に配置</li>
            <li>R2に画像をアップロード（表示されたパスに従って）</li>
            <li><code className="bg-blue-100 px-2 py-1 rounded">git add → commit → push</code></li>
          </ol>
        </div>
      </div>
    </div>
  )
}
