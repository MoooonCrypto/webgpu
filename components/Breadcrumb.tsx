import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-pink-600 transition">
        ホーム
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="text-gray-400">›</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-pink-600 transition">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-800 font-semibold">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
