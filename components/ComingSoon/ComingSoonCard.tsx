import Image from "next/image";
import type { Product } from "@/types/product";

export function ComingSoonCard({ product }: { product: Product }) {
  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface">
        <Image
          src={product.imagenPrincipal}
          alt={`${product.marca} ${product.nombre}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover grayscale transition-transform duration-300 ease-out group-hover:scale-[1.02]"
        />
        <span className="absolute inset-0 bg-black/35" />
        <span className="font-heading absolute left-3 top-3 rounded bg-background px-2 py-1 text-xs font-semibold uppercase tracking-wide text-foreground">
          Próximamente
        </span>
      </div>
      <div className="mt-3 space-y-1">
        <p className="font-heading text-xs font-semibold uppercase tracking-wide text-muted">
          {product.marca}
        </p>
        <h3 className="text-sm font-medium leading-snug text-foreground">{product.nombre}</h3>
      </div>
    </div>
  );
}
