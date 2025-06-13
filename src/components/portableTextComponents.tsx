// components/portableTextComponents.tsx
import Image from 'next/image'
import { PortableTextComponents } from '@portabletext/react'

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null

      const imageUrl = value.asset.url || ''
      const alt = value.alt || 'Imagem'

      return (
        <div className="my-4">
          <Image
            src={imageUrl}
            alt={alt}
            width={800}
            height={600}
            className="rounded-lg mx-auto"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      )
    },
  },
  block: {
    h1: ({ children }) => <h1 className="!text-4xl font-bold my-4">{children}</h1>,
    h2: ({ children }) => <h2 className="!text-3xl font-semibold my-3">{children}</h2>,
    h3: ({ children }) => <h3 className="!text-2xl font-medium my-2">{children}</h3>,
    h4: ({ children }) => <h4 className="!text-xl font-medium my-2">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#179389] pl-4 italic my-4 text-gray-700">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="my-2 pb-4 leading-relaxed">{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    link: ({ value, children }) => {
      const target = value?.href?.startsWith('http') ? '_blank' : undefined
      return (
        <a
          href={value.href}
          target={target}
          rel={target ? 'noopener noreferrer' : undefined}
          className="underline hover:text-[#179389]"
        >
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 my-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 my-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
    number: ({ children }) => <li className="mb-1">{children}</li>,
  },
}
