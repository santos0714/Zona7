import Image from "next/image";
import Link from "next/link";
import { categories } from "@/config/categories";

export function CategoryTiles() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/tienda?categoria=${category.slug}`}
          className="group relative aspect-[3/2] overflow-hidden rounded-lg"
        >
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/25" />
          <span className="font-heading absolute bottom-3 left-3 text-base font-semibold uppercase tracking-wide text-white">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
