'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-effect-strong shadow-[0_8px_32px_rgba(199,23,78,0.12)]'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link
            href="/"
            className="group relative"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              <span className="text-gradient-bw relative inline-block transform transition-all duration-300 group-hover:scale-105">
                グラビア図鑑
                <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-[#000000] to-[#2d2d2d] transition-all duration-300 group-hover:w-full rounded-full"></span>
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-gray mt-1 font-medium tracking-wide">
              GRAVURE GALLERY
            </p>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/contact"
              className="text-sm font-semibold text-gray hover:text-[#000000] transition-colors duration-200 relative group"
            >
              お問い合わせ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#000000] transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              href="/dmca"
              className="text-sm font-semibold text-gray hover:text-[#000000] transition-colors duration-200 relative group"
            >
              DMCA
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#000000] transition-all duration-200 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/50 transition-colors"
            aria-label="メニュー"
          >
            <svg className="w-6 h-6 text-[#000000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Decorative gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1a1a1a] to-transparent opacity-30"></div>
    </header>
  )
}
