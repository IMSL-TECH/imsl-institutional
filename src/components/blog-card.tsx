import Image, { StaticImageData } from "next/image";

import userPlaceholder from "@/assets/thumbs/placeholder-image-user.png"
import imagePlaceholder from "@/assets/thumbs/placeholder-image-square.png"
import { formatDateBr } from "@/utils";
import { urlFor } from "@/lib/sanityImage";

export default function BlogCard({
  title,
  author,
  date,
  background,
  className,
  panelist,
  cardLink
}: {
  title: string | null;
  author: string;
  date: string | null;
  background: any;
  className?: string;
  panelist: any;
  cardLink:string
}) {
  return (
    <div
      className={`overflow-hidden rounded-lg relative text-white ${className}`}
    >
      <a href={cardLink}>
      <Image
        src={urlFor(background).url() || imagePlaceholder}
        alt={title || ""}
        fill
        priority
        className="w-full object-cover"
      />
      <div className="absolute inset-0"></div>
      <div className="absolute bg-linear-to-b from-transparent from-0% to-black to-100% pt-10 bottom-0 left-0 right-0 px-3 py-4">
        {title && <h3 className="lg:text-xl text-base font-bold mb-2 !text-start">
          {title}
        </h3>}
        
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 min-w-10 overflow-hidden relative rounded-full bg-gray-300">
            <Image
              fill
              priority
              className="w-full object-cover"
              src={urlFor(panelist).url() || userPlaceholder}
              alt={`Palestrante da palavra ${author}`}
            />
          </div>
          <div className="w-[calc(100%-52px)]">
            <p className="text-xs truncate lg:text-sm">{author}</p>
            <p className="text-[10px] lg:text-xs text-gray-300 truncate">
              {date && `${formatDateBr(date).dd} de ${formatDateBr(date).month}, ${formatDateBr(date).aaaa}`}
            </p>
          </div>
        </div>
      </div>
      </a>
    </div>
  );
}
