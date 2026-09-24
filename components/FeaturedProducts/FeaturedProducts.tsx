import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import { ProductGrid } from "@/components/ProductGrid/ProductGrid";

export function FeaturedProducts() {
  const products = getFeaturedProducts(8);

  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="font-heading text-2xl font-semibold uppercase tracking-wide">
          Destacados
        </h2>
        <Link
          href="/tienda"
          className="font-heading text-sm font-semibold uppercase tracking-wide text-muted transition-colors hover:text-accent"
        >
          Ver todo
        </Link>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
