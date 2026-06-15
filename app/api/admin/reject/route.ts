export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { getCloudflareEnv } from '@/lib/cloudflare'
import { rejectPendingProject } from '@/lib/db'

export async function POST(req: NextRequest) {
  const { github_full_name } = await req.json() as { github_full_name?: string }
  if (!github_full_name) {
    return NextResponse.json({ error: 'github_full_name required' }, { status: 400 })
  }

  const { DB } = getCloudflareEnv()
  await rejectPendingProject(DB, github_full_name)

  return NextResponse.json({ ok: true })
}
