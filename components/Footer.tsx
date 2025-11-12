export default function Footer() {
  return (
    <footer className="bg-pink-50 border-t border-pink-200 mt-12">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} グラビアコレクション. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
