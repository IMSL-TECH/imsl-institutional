import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.headers.get('secret')

  if (secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

  const body = await req.json()
  const docType = body?._type

  try {

      if (docType === 'contactPage') {
        revalidatePath('/contat')
      }

      if (docType === 'footer') {
        revalidatePath('/')
        revalidatePath('/about')
        revalidatePath('/events')
        revalidatePath('/contact')
      }

      if (docType === 'homePage') {
        revalidatePath('/')
      }

      if (docType === 'address') {
        revalidatePath('/')
        revalidatePath('/about')
        revalidatePath('/events')
        revalidatePath('/contact')
      }

    return NextResponse.json({ revalidated: true })
  } catch (err) {
    return NextResponse.json({ message: 'Erro ao revalidar home' }, { status: 500 })
  }
}
