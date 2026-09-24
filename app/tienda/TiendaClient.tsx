"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Product, ProductFilters, SortOption } from "@/types/product";
import { filterProducts, sortProducts } from "@/lib/products";
import { FiltersPanel, type Facets } from "@/components/Filters/FiltersPanel";
import { MobileFiltersDrawer } from "@/components/Filters/MobileFiltersDrawer";
import { SortSelect } from "@/components/Filters/SortSelect";
import { ProductGrid } from "@/components/ProductGrid/ProductGrid";

function toArray(value: string | null): string[] | undefined {
  return value ? [value] : undefined;
}

export function TiendaClient({ products, facets }: { products: Product[]; facets: Facets }) {
  // Filtro inicial (ej. ?categoria=playeras) leído en el cliente: así esta
  // página sigue siendo estática y funciona igual en hosting con Node.js o
  // en un export 100% estático.
  const searchParams = useSearchParams();
  const initialFilters = useMemo<ProductFilters>(
    () => ({
      categoria: toArray(searchParams.get("categoria")),
      marca: toArray(searchParams.get("marca")),
    }),
    [searchParams]
  );

  const [filters, setFilters] = useState<ProductFilters>(initialFilters);
  const [sort, setSort] = useState<SortOption>("relevancia");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return sortProducts(filterProducts(products, filters), sort);
  }, [products, filters, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold uppercase tracking-wide">Tienda</h1>
        <p className="mt-2 text-sm text-muted">
          {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 border-b border-border pb-4 lg:hidden">
        <MobileFiltersDrawer
          open={mobileFiltersOpen}
          onOpen={() => setMobileFiltersOpen(true)}
          onClose={() => setMobileFiltersOpen(false)}
          resultCount={filtered.length}
        >
          <FiltersPanel
            facets={facets}
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters({})}
          />
        </MobileFiltersDrawer>
        <SortSelect value={sort} onChange={setSort} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <FiltersPanel
            facets={facets}
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters({})}
          />
        </aside>

        <div>
          <div className="mb-6 hidden justify-end lg:flex">
            <SortSelect value={sort} onChange={setSort} />
          </div>
          <ProductGrid products={filtered} />
        </div>
      </div>
    </div>
  );
}
