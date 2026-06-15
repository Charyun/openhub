export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { getCloudflareEnv } from '@/lib/cloudflare'
import { upsertPendingProjects } from '@/lib/db'
import { verifyHmacSha256 } from '@/lib/hmac'
import type { PendingProject } from '@/types'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('x-webhook-signature') ?? ''
  const secret = process.env.COLLECT_WEBHOOK_SECRET ?? ''

  const valid = await verifyHmacSha256(secret, body, sig)
  if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { items } = JSON.parse(body) as { items: PendingProject[] }
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'items must be a non-empty array' }, { status: 400 })
  }

  const { DB } = getCloudflareEnv()
  await upsertPendingProjects(DB, items)

  return NextResponse.json({ ok: true, inserted: items.length })
}
