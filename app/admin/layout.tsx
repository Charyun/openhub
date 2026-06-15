export const runtime = 'edge'

import type { ReactNode } from 'react'
import Link from 'next/link'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/40">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 h-14 flex items-center gap-6">
          <Link href="/admin" className="font-bold">🔧 OpenHub Admin</Link>
          <Link href="/" className="text-sm text-muted-foreground hover:underline">← 前台</Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  )
}
