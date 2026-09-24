import Link from "next/link";
import { getComingSoonProducts } from "@/lib/products";
import { ComingSoonGrid } from "./ComingSoonGrid";

export function ComingSoonPreview() {
  const products = getComingSoonProducts().slice(0, 4);
  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="font-heading text-2xl font-semibold uppercase tracking-wide">
          Próximamente
        </h2>
        <Link
          href="/proximamente"
          className="font-heading text-sm font-semibold uppercase tracking-wide text-muted transition-colors hover:text-accent"
        >
          Ver todo
        </Link>
      </div>
      <ComingSoonGrid products={products} />
    </section>
  );
}
