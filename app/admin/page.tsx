'use client'

import { useState } from 'react'
import { getAllCategories } from '@/data/posts'

interface PostForm {
  id: string
  category: string
  name: string
  folder: string
  imageCount: number
}

export default function AdminPage() {
  const existingCategories = getAllCategories()
  const [posts, setPosts] = useState<PostForm[]>([{
    id: Date.now().toString(),
    category: '',
    name: '',
    folder: '',
    imageCount: 1
  }])

  const [newCategory, setNewCategory] = useState('')

  const addPost = () => {
    setPosts([...posts, {
      id: Date.now().toString(),
      category: '',
      name: '',
      folder: '',
      imageCount: 1
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
      slug: post.folder,
      name: post.name,
      title: post.name,
      category: post.category,
      date: new Date().toISOString().split('T')[0],
      excerpt: `${post.name}の写真集です。`,
      tags: [post.category, post.name],
      imageCount: post.imageCount,
      folder: post.folder,
      popularity: 50
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
      const filename = `${post.folder}.json`
      setTimeout(() => downloadJSON(post, filename), index * 100)
    })
  }

  const copyAllInstructions = () => {
    const instructions = `# 📦 一括登録手順

## 1. ダウンロードしたJSONファイルを配置

以下のファイルを \`data/actresses/\` に配置してください：

${posts.map((post, index) => `- ${post.folder}.json`).join('\n')}

## 2. R2に画像をアップロード

${posts.map((post, index) => {
  return `### ${index + 1}. ${post.name}
\`\`\`
actresses/${post.folder}/1.jpg
actresses/${post.folder}/2.jpg
${post.imageCount > 2 ? `actresses/${post.folder}/3.jpg` : ''}
${post.imageCount > 3 ? '...' : ''}
actresses/${post.folder}/${post.imageCount}.jpg
\`\`\`
`
}).join('\n')}

## 3. GitHubにプッシュ

\`\`\`bash
git add data/actresses/
git commit -m "Add ${posts.length} new posts"
git push
\`\`\`

→ 自動デプロイされます！
`

    navigator.clipboard.writeText(instructions)
    alert('手順をコピーしました！')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* ヘッダー */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-pink-600 mb-2">
            📝 コンテンツ管理画面
          </h1>
          <p className="text-gray-600 text-lg">
            必要な情報を入力してJSONをダウンロード → R2に画像配置 → Git push
          </p>
        </div>

        {/* 一括操作ボタン */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={addPost}
              className="flex-1 min-w-[200px] bg-pink-600 text-white px-8 py-4 rounded-lg hover:bg-pink-700 transition font-bold text-lg shadow-md hover:shadow-lg"
            >
              ➕ 記事を追加
            </button>
            <button
              onClick={downloadAllJSON}
              disabled={posts.length === 0}
              className="flex-1 min-w-[200px] bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition font-bold text-lg shadow-md hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              💾 全JSONダウンロード ({posts.length}件)
            </button>
            <button
              onClick={copyAllInstructions}
              disabled={posts.length === 0}
              className="flex-1 min-w-[200px] bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition font-bold text-lg shadow-md hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              📋 手順をコピー
            </button>
          </div>
        </div>

        {/* 記事フォーム */}
        <div className="space-y-6">
          {posts.map((post, index) => (
            <div key={post.id} className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  記事 #{index + 1}
                </h2>
                {posts.length > 1 && (
                  <button
                    onClick={() => removePost(post.id)}
                    className="text-red-600 hover:text-red-700 font-bold text-lg hover:bg-red-50 px-4 py-2 rounded-lg transition"
                  >
                    🗑️ 削除
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* カテゴリ */}
                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-3">
                    1️⃣ カテゴリ名 *
                  </label>
                  <select
                    value={post.category === '__new__' ? '__new__' : post.category}
                    onChange={(e) => {
                      if (e.target.value === '__new__') {
                        updatePost(post.id, 'category', '__new__')
                      } else {
                        updatePost(post.id, 'category', e.target.value)
                        setNewCategory('')
                      }
                    }}
                    className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    <option value="">選択してください</option>
                    {existingCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    <option value="__new__">➕ 新しいカテゴリを作成</option>
                  </select>
                  {post.category === '__new__' && (
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => {
                        setNewCategory(e.target.value)
                        updatePost(post.id, 'category', e.target.value)
                      }}
                      placeholder="新しいカテゴリ名を入力（例：女優A、乃木坂）"
                      className="w-full px-6 py-4 text-lg border-2 border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 mt-3"
                    />
                  )}
                </div>

                {/* 記事名 */}
                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-3">
                    2️⃣ 記事名 *
                  </label>
                  <input
                    type="text"
                    value={post.name}
                    onChange={(e) => updatePost(post.id, 'name', e.target.value)}
                    placeholder="例: 女優A 記事①、齋藤飛鳥①"
                    className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>

                {/* フォルダ名 */}
                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-3">
                    3️⃣ R2フォルダ名 *
                  </label>
                  <input
                    type="text"
                    value={post.folder}
                    onChange={(e) => updatePost(post.id, 'folder', e.target.value)}
                    placeholder="例: actress-a-001、nogizaka-asuka-001"
                    className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                  <p className="text-sm text-gray-500 mt-2">半角英数字とハイフンのみ</p>
                </div>

                {/* 画像枚数 */}
                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-3">
                    4️⃣ 画像枚数 *
                  </label>
                  <input
                    type="number"
                    value={post.imageCount}
                    onChange={(e) => updatePost(post.id, 'imageCount', parseInt(e.target.value) || 1)}
                    min="1"
                    className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
              </div>

              {/* R2パス表示 */}
              <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg">
                <p className="text-lg font-bold text-blue-800 mb-3">📁 R2にアップロードする場所:</p>
                <div className="bg-white p-4 rounded-lg">
                  <code className="text-sm text-gray-800 block">
                    <span className="text-blue-600 font-bold">actresses/{post.folder || '???'}/</span><br />
                    {post.folder && Array.from({ length: post.imageCount }, (_, i) => (
                      <span key={i} className="ml-4 block">
                        {i + 1}.jpg
                      </span>
                    ))}
                  </code>
                </div>
              </div>

              {/* ダウンロードボタン */}
              <div className="mt-6">
                <button
                  onClick={() => downloadJSON(post, `${post.folder}.json`)}
                  disabled={!post.name || !post.folder || !post.category || post.category === '__new__'}
                  className="w-full bg-pink-600 text-white px-8 py-4 rounded-lg hover:bg-pink-700 transition font-bold text-lg shadow-md hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  💾 この記事のJSONをダウンロード
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 使い方 */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">📖 使い方</h3>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 text-lg">
            <li><strong>4項目を入力</strong>（カテゴリ、記事名、フォルダ名、画像枚数）</li>
            <li><strong>JSONダウンロード</strong> → <code className="bg-gray-100 px-2 py-1 rounded">data/actresses/</code> に配置</li>
            <li><strong>R2に画像アップロード</strong>（表示されたパスに従って）</li>
            <li><strong>Git push</strong> → 自動デプロイ！</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
