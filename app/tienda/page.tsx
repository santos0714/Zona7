import type { Metadata } from "next";
import { Suspense } from "react";
import { getShopProducts, getFilterFacets } from "@/lib/products";
import { TiendaClient } from "./TiendaClient";

export const metadata: Metadata = {
  title: "Tienda",
  description: "Playeras, shorts, pants, leggings y más de Under Armour y Vanquish.",
};

// Nota: los filtros iniciales (?categoria=... desde los links de categoría)
// se leen en el cliente (TiendaClient, con useSearchParams) y no aquí en el
// servidor. Así esta página se puede pre-renderizar como HTML estático y el
// proyecto queda compatible tanto con hosting Node.js (Vercel, etc.) como
// con exportación estática (`output: "export"`) para hosting tradicional.
export default function TiendaPage() {
  const products = getShopProducts();
  const facets = getFilterFacets(products);

  return (
    <Suspense fallback={null}>
      <TiendaClient products={products} facets={facets} />
    </Suspense>
  );
}
