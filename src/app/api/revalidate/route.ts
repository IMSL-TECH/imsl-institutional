import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.headers.get('secret')

  if (secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }
  

  const body = await req.json()
  const docType = body?._type


  const toRevalidate = [
    "address", 
    "emailEntry",  
    "person", 
    "phoneEntry",  
    "sermonTag", 
    "smed", 
    "supportedSocialMidia", 
    "socialLink"
  ]

  try {

    if (docType === 'contactPage') {
      revalidatePath('/contact')
    }

    if (docType === 'homePage') {
      revalidatePath('/')
    }

    if (docType === 'aboutPage') {
      revalidatePath('/about')
    }

    if (docType === 'ourSmedsPage') {
      revalidatePath('/smeds')
      revalidatePath('/')
    }
    if (docType === 'event') {
      revalidatePath('/events')
      revalidatePath('/')
    }

    if (docType === 'sermonSummary') {
      revalidatePath('/sermon-summary')
      revalidatePath('/')
    }


    if (toRevalidate.includes(docType)) {
      revalidatePath('/')
      revalidatePath('/about')
      revalidatePath('/events')
      revalidatePath('/contact')
      revalidatePath('/smeds')
      revalidatePath('/events')
      revalidatePath('/sermon-summary')

    }




    return NextResponse.json({ revalidated: true })
  } catch (err) {
    return NextResponse.json({ message: 'Erro ao revalidar home' }, { status: 500 })
  }
}
