import type { Metadata } from "next";
import { CategoryTiles } from "@/components/CategoryGrid/CategoryTiles";

export const metadata: Metadata = {
  title: "Categorías",
  description: "Explora la ropa deportiva de ZONA 7 por categoría.",
};

export default function CategoriasPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-semibold uppercase tracking-wide">
        Categorías
      </h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Elige una categoría para ver los productos disponibles.
      </p>
      <div className="mt-6">
        <CategoryTiles />
      </div>
    </div>
  );
}
