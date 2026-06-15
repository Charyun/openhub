'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function SearchBar({ defaultValue = '' }: { defaultValue?: string }) {
  const [q, setQ] = useState(defaultValue)
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-xl">
      <Input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="搜索开源工具，如「项目管理」「记账」..."
        className="flex-1"
      />
      <Button type="submit">
        <Search className="w-4 h-4 mr-2" />
        搜索
      </Button>
    </form>
  )
}
