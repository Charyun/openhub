import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import type { Industry } from '@/types'

export function IndustryGrid({ industries }: { industries: Industry[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {industries.map(ind => (
        <Link key={ind.id} href={`/${ind.id}`}>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-2">{ind.icon}</div>
              <div className="font-medium text-sm">{ind.name_zh}</div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
