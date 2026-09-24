import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const secondImage = product.imagenes[1] ?? product.imagenPrincipal;

  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group block"
      aria-label={`${product.marca} ${product.nombre}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface">
        <Image
          src={product.imagenPrincipal}
          alt={`${product.marca} ${product.nombre}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="product-card-media object-cover group-hover:opacity-0 md:group-hover:scale-[1.03]"
          priority={false}
        />
        <Image
          src={secondImage}
          alt=""
          aria-hidden
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="product-card-media absolute inset-0 object-cover opacity-0 group-hover:opacity-100 md:group-hover:scale-[1.03]"
        />

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.descuentoPorcentaje && (
            <span className="rounded bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground">
              -{product.descuentoPorcentaje}%
            </span>
          )}
          {!product.disponible && (
            <span className="rounded bg-foreground/80 px-2 py-1 text-xs font-semibold text-background">
              Agotado
            </span>
          )}
        </div>

        <div className="product-card-overlay pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-2 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 md:block">
          <p className="text-xs font-medium text-white">
            Tallas: {product.tallasDisponibles.join(" · ") || "Agotado"}
          </p>
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <p className="font-heading text-xs font-semibold uppercase tracking-wide text-muted">
          {product.marca}
        </p>
        <h3 className="text-sm font-medium leading-snug text-foreground line-clamp-2">
          {product.nombre}
        </h3>
        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="text-sm font-semibold text-foreground">
            {formatPrice(product.precio)}
          </span>
          {product.precioAnterior && (
            <span className="text-xs text-muted line-through">
              {formatPrice(product.precioAnterior)}
            </span>
          )}
        </div>
        <p className="text-xs text-muted md:hidden">
          Tallas: {product.tallasDisponibles.join(" · ") || "Agotado"}
        </p>
      </div>
    </Link>
  );
}
