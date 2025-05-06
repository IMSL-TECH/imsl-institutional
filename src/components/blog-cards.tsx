"use client"

import { motion } from "framer-motion"
import Image, { StaticImageData } from "next/image";

const blogPosts = [
  {
    title: "Suspire por Jesus",
    author: "Pr. Daniel Santos",
    date: "Maio 15, 2023",
    image: "https://picsum.photos/800/600?random=7",
  },
  {
    title: "Mantenha a fé firme",
    author: "Pr. Gustavo Ramos",
    date: "Maio 10, 2023",
    image: "https://picsum.photos/800/600?random=8",
  },
  {
    title: "Em meio às tempestades, pesca abundante",
    author: "Pr. Gabriel Rocha",
    date: "Abril 28, 2023",
    image: "https://picsum.photos/800/600?random=9",
  },
  {
    title: "Por que você não obedece",
    author: "Pr. Matheus Oliveira",
    date: "Abril 20, 2023",
    image: "https://picsum.photos/800/600?random=10",
  },
  {
    title: "Conecte-se com Deus",
    author: "Pr. Gustavo Ramos",
    date: "Abril 15, 2023",
    image: "https://picsum.photos/800/600?random=11",
  },
];

function BlogCardItem({
  title,
  author,
  date,
  image,
}: {
  title: string;
  author: string;
  date: string;
  image: string | StaticImageData;
}) {
  return (
    <div
    
      className={`rounded-lg overflow-hidden relative text-white grid-item-word-summary`}
    >
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        fill
        priority
        className="w-full object-cover"
      />
      <div className="absolute inset-0"></div>
      <div className="absolute bg-linear-to-b from-transparent from-0% to-black to-100% pt-10 bottom-0 left-0 right-0 px-3 py-4">
        <h3 className="text-xl font-bold mb-2 !text-start">{title}</h3>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 min-w-10 rounded-full bg-gray-300"></div>
          <div className="w-[calc(100%-52px)]">
            <p className="text-xs truncate lg:text-sm">{author}</p>
            <p className="text-[10px] lg:text-xs text-gray-300 truncate">
              {date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function BlogCard() {
  return (
    <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9 }}
    viewport={{ once: true }}
    className="grid-word-summary">
      {blogPosts.map((post, index) => (
        <BlogCardItem
          key={index}
          title={post.title}
          author={post.author}
          date={post.date}
          image={post.image}
        />
      ))}
    </motion.div>
  );
}
