'use client'

import { useState } from 'react'
import Image from 'next/image'

// R2 Cloudflare Storage URL
const R2_URL = 'https://pub-38a5803166a44a668002f313b530f97f.r2.dev'

// 画像データ（実際の画像URLを使用）
const sampleImages = [
  {
    id: 1,
    title: 'Test Image 1',
    category: 'Gallery',
    thumbnail: `${R2_URL}/test_001.png`,
    full: `${R2_URL}/test_001.png`,
  },
  {
    id: 2,
    title: 'Test Image 2',
    category: 'Gallery',
    thumbnail: `${R2_URL}/test_001.png`,
    full: `${R2_URL}/test_001.png`,
  },
  {
    id: 3,
    title: 'Test Image 3',
    category: 'Gallery',
    thumbnail: `${R2_URL}/test_001.png`,
    full: `${R2_URL}/test_001.png`,
  },
  {
    id: 4,
    title: 'Test Image 4',
    category: 'Gallery',
    thumbnail: `${R2_URL}/test_001.png`,
    full: `${R2_URL}/test_001.png`,
  },
  {
    id: 5,
    title: 'Test Image 5',
    category: 'Gallery',
    thumbnail: `${R2_URL}/test_001.png`,
    full: `${R2_URL}/test_001.png`,
  },
  {
    id: 6,
    title: 'Test Image 6',
    category: 'Gallery',
    thumbnail: `${R2_URL}/test_001.png`,
    full: `${R2_URL}/test_001.png`,
  },
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [filter, setFilter] = useState<string>('All')

  const categories = ['All', ...Array.from(new Set(sampleImages.map(img => img.category)))]

  const filteredImages = filter === 'All'
    ? sampleImages
    : sampleImages.filter(img => img.category === filter)

  return (
    <div>
      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-lg transition ${
              filter === cat
                ? 'bg-pink-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className="group relative aspect-square overflow-hidden rounded-lg bg-gray-800 cursor-pointer"
            onClick={() => setSelectedImage(image.id)}
          >
            <img
              src={image.thumbnail}
              alt={image.title}
              className="w-full h-full object-cover transition group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-semibold text-white">{image.title}</h3>
                <p className="text-sm text-gray-300">{image.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-pink-500"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <img
            src={sampleImages.find(img => img.id === selectedImage)?.full}
            alt="Full size"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  )
}
