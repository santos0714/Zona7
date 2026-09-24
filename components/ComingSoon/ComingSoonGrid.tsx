import type { Product } from "@/types/product";
import { ComingSoonCard } from "./ComingSoonCard";

export function ComingSoonGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-muted">
        Por ahora no hay productos próximos a llegar.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ComingSoonCard key={product.id} product={product} />
      ))}
    </div>
  );
}
