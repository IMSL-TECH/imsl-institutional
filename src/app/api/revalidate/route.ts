

import {revalidatePath, revalidateTag} from 'next/cache'
import {type NextRequest, NextResponse} from 'next/server'
import {parseBody} from 'next-sanity/webhook'

type WebhookPayload = {
  _type: string
}

export async function POST(req: NextRequest) {
  try {
     const secret = req.headers.get('secret')
     const body = await req.json() as WebhookPayload

    if (!process.env.REVALIDATE_SECRET_TOKEN) {
      return new Response('Missing environment variable REVALIDATE_SECRET_TOKEN', {status: 500})
    } 

  if (secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

    // const {isValidSignature, body} = await parseBody<WebhookPayload>(
    //   req,
    //   process.env.REVALIDATE_SECRET_TOKEN,
    // )

    // if (!isValidSignature) {
    //   const message = 'Invalid signature'
    //   return new Response(JSON.stringify({message, isValidSignature, body}), {status: 401})
    // } else if (!body?._type) {
    //   const message = 'Bad Request'
    //   return new Response(JSON.stringify({message, body}), {status: 400})
    // }

    revalidateTag(body._type)
    // console.log(`Revalidating path for type: ${body._type}`)

    return NextResponse.json({body})
  } catch ( err: any) {
    console.error(err)
    return new Response(err.message || "Erro desconhecido", {status: 500})
  }
}
