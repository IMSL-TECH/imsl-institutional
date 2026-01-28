import { sanityClient } from '@/lib/sanityClient'
import { NextResponse } from 'next/server'
import PixelFallback from '@/lib/fallbackdata/getPixelId.json';

export async function GET() {

  try {
    const settings = await sanityClient.fetch(`*[_type == "siteSettings"][0]{ metaPixelId }`)
  return NextResponse.json({ metaPixelId: settings?.metaPixelId ?? null })

  } catch (error) {
    console.error("❌ Sanity fetch failed (pixel id)", error);
    return NextResponse.json({ metaPixelId: PixelFallback.metaPixelId })
  }
  

}