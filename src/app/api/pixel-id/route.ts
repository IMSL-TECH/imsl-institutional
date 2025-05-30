import { sanityClient } from '@/lib/sanityClient'
import { NextResponse } from 'next/server'

export async function GET() {
  const settings = await sanityClient.fetch(`*[_type == "siteSettings"][0]{ metaPixelId }`)
  return NextResponse.json({ metaPixelId: settings?.metaPixelId ?? null })
}