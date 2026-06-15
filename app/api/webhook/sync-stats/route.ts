export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { getCloudflareEnv } from '@/lib/cloudflare'
import { verifyHmacSha256 } from '@/lib/hmac'

interface StatUpdate {
  github_full_name: string
  stars: number
  updated_at: string
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('x-webhook-signature') ?? ''
  const secret = process.env.COLLECT_WEBHOOK_SECRET ?? ''

  const valid = await verifyHmacSha256(secret, body, sig)
  if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { updates } = JSON.parse(body) as { updates: StatUpdate[] }
  if (!Array.isArray(updates) || updates.length === 0) {
    return NextResponse.json({ ok: true, updated: 0 })
  }

  const { DB } = getCloudflareEnv()
  const stmt = DB.prepare('UPDATE projects SET stars = ?, updated_at = ? WHERE github_full_name = ?')
  await DB.batch(updates.map(u => stmt.bind(u.stars, u.updated_at, u.github_full_name)))

  return NextResponse.json({ ok: true, updated: updates.length })
}
