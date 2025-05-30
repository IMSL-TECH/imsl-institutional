'use client'

import { getPixelId } from '@/lib/getPixelId'
import { useEffect } from 'react'
import ReactPixel from 'react-facebook-pixel'


export function MetaPixel() {
  useEffect(() => {
    async function setupPixel() {
      const pixelId = await getPixelId()
      if (pixelId) {
        ReactPixel.init(pixelId)
        ReactPixel.pageView()
      }
    }
    setupPixel()
  }, [])

  return null
}