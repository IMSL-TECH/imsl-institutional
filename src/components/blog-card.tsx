import Image, { StaticImageData } from "next/image";

export default function BlogCard({
  title,
  author,
  date,
  image,
  className,
  panelist,
}: {
  title: string;
  author: string;
  date: string;
  image: string | StaticImageData;
  className?: string;
  panelist: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-lg relative text-white ${className}`}
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
        <h3 className="lg:text-xl text-base font-bold mb-2 !text-start">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 min-w-10 overflow-hidden relative rounded-full bg-gray-300">
            <Image
              fill
              priority
              className="w-full object-cover"
              src={panelist}
              alt={`Palestrante da palavra ${author}`}
            />
          </div>
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
