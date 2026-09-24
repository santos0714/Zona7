/**
 * Catálogo de marcas.
 *
 * Agregar una marca nueva (YoungLA, Gymshark, Dfyne, etc.) es agregar un
 * objeto a este arreglo. Ningún componente debe modificarse para soportar
 * una marca nueva: los filtros, el importador de Excel y las páginas de
 * producto leen esta lista dinámicamente.
 */

export type Brand = {
  slug: string;
  name: string;
  /** Carpeta dentro de /public/products donde viven las imágenes de la marca */
  folder: string;
  active: boolean;
};

export const brands: Brand[] = [
  { slug: "under-armour", name: "Under Armour", folder: "under-armour", active: true },
  { slug: "vanquish", name: "Vanquish", folder: "vanquish", active: true },
  { slug: "youngla", name: "YoungLA", folder: "youngla", active: false },
  { slug: "gymshark", name: "Gymshark", folder: "gymshark", active: false },
  { slug: "dfyne", name: "Dfyne", folder: "dfyne", active: false },
  { slug: "pirma", name: "Pirma", folder: "pirma", active: true },
  { slug: "nike", name: "Adidas", folder: "adidas", active: true },
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

export function getActiveBrands(): Brand[] {
  return brands.filter((b) => b.active);
}
