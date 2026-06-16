import { getCloudflareContext } from '@opennextjs/cloudflare'
import type { D1Database, R2Bucket } from '@cloudflare/workers-types'

declare global {
  interface CloudflareEnv {
    DB: D1Database
    R2: R2Bucket
  }
}

export function getCloudflareEnv(): CloudflareEnv {
  const { env } = getCloudflareContext()
  return env as unknown as CloudflareEnv
}
