import { getRequestContext } from '@cloudflare/next-on-pages'
import type { D1Database, R2Bucket } from '@cloudflare/workers-types'

interface CloudflareEnv {
  DB: D1Database
  R2: R2Bucket
}

export function getCloudflareEnv(): CloudflareEnv {
  const { env } = getRequestContext()
  return env as unknown as CloudflareEnv
}
