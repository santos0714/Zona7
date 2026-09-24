import { CategoryTiles } from "./CategoryTiles";

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <h2 className="mb-6 font-heading text-2xl font-semibold uppercase tracking-wide">
        Categorías
      </h2>
      <CategoryTiles />
    </section>
  );
}
