import type { Product } from "@/types/product";
import { ProductCard } from "@/components/ProductCard/ProductCard";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-20 text-center">
        <p className="font-heading text-lg font-semibold uppercase tracking-wide">
          No hay productos con esos filtros
        </p>
        <p className="mt-1 text-sm text-muted">
          Prueba quitando algún filtro para ver más resultados.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
