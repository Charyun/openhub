import { describe, it, expect } from 'vitest'
import { verifyHmacSha256 } from './hmac'

describe('verifyHmacSha256', () => {
  it('returns true for correct signature', async () => {
    // HMAC-SHA256 of "hello" with key "secret"
    // Verified: echo -n "hello" | openssl dgst -sha256 -hmac "secret"
    const expected = '88aab3ede8d3adf94d26ab90d3bafd4a2083070c3bcce9c014ee04a443847c0b'
    expect(await verifyHmacSha256('secret', 'hello', expected)).toBe(true)
  })

  it('returns false for wrong signature', async () => {
    expect(await verifyHmacSha256('secret', 'hello', 'wrongsig')).toBe(false)
  })
})
