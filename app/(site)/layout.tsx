import type { ReactNode } from 'react'
import Link from 'next/link'
import { SearchBar } from '@/components/search-bar'

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <Link href="/" className="font-bold text-lg shrink-0">🔧 OpenHub</Link>
          <SearchBar />
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t mt-16 py-8 text-center text-sm text-muted-foreground">
        OpenHub — 发现优质开源工具
      </footer>
    </div>
  )
}
