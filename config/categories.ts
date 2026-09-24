/**
 * Catálogo de categorías. Ampliable sin tocar componentes: cada categoría
 * nueva es un objeto más en este arreglo.
 */

export type Category = {
  slug: string;
  name: string;
  /** Imagen de portada en /public/categories */
  image: string;
};

export const categories: Category[] = [
  { slug: "playeras", name: "Playeras", image: "/categories/playeras.svg" },
  { slug: "jerseys", name: "Jerseys", image: "/categories/jerseys.svg" },
  { slug: "shorts", name: "Shorts", image: "/categories/shorts.svg" },
  { slug: "pants", name: "Pants", image: "/categories/pants.svg" },
  { slug: "leggings", name: "Leggings", image: "/categories/leggings.svg" },
  { slug: "tops", name: "Tops", image: "/categories/tops.svg" },
  { slug: "sudaderas", name: "Sudaderas", image: "/categories/sudaderas.svg" },
  { slug: "accesorios", name: "Accesorios", image: "/categories/accesorios.svg" },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export const genders = [
  { slug: "hombre", name: "Hombre" },
  { slug: "mujer", name: "Mujer" },
  { slug: "unisex", name: "Unisex" },
];
