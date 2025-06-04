export async function getPixelId(): Promise<string | null> {
  try {
    const res = await fetch('/api/pixel-id')
    if (!res.ok) return null
    const data = await res.json()
    return data.metaPixelId ?? null
  } catch (err) {
    return null
  }
}