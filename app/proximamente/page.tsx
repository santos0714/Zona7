import type { Metadata } from "next";
import { getComingSoonProducts } from "@/lib/products";
import { ComingSoonGrid } from "@/components/ComingSoon/ComingSoonGrid";

export const metadata: Metadata = {
  title: "Próximamente",
  description: "Productos que están por llegar a ZONA 7.",
};

export default function ProximamentePage() {
  const products = getComingSoonProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold uppercase tracking-wide">
          Próximamente
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Estos productos todavía no están disponibles para comprar. Vuelve pronto o síguenos
          en redes para enterarte cuando lleguen.
        </p>
      </div>
      <ComingSoonGrid products={products} />
    </div>
  );
}
