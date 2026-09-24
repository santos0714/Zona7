import type { Product, ProductFilters, SortOption } from "@/types/product";
import productsData from "@/data/products/products.json";

const allProducts = productsData as Product[];

/** Productos activos (activo = true), sin importar si son "próximamente". */
export function getAllProducts(): Product[] {
  return allProducts.filter((p) => p.activo);
}

/** Productos visibles en tienda: activos y NO marcados como próximamente. */
export function getShopProducts(): Product[] {
  return getAllProducts().filter((p) => !p.proximamente);
}

/** Productos marcados como "próximamente". */
export function getComingSoonProducts(): Product[] {
  return getAllProducts().filter((p) => p.proximamente);
}

export function getFeaturedProducts(limit = 4): Product[] {
  return getShopProducts()
    .filter((p) => p.destacado)
    .slice(0, limit);
}

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug && p.activo);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return getShopProducts()
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.categoria === product.categoria || p.marca === product.marca)
    )
    .slice(0, limit);
}

export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  return products.filter((p) => {
    if (filters.marca?.length && !filters.marca.includes(p.marca)) return false;
    if (filters.categoria?.length && !filters.categoria.includes(p.categoria)) return false;
    if (filters.genero?.length && !filters.genero.includes(p.genero)) return false;
    if (filters.talla?.length && !p.tallasDisponibles.some((t) => filters.talla!.includes(t)))
      return false;
    if (filters.color?.length && !p.coloresDisponibles.some((c) => filters.color!.includes(c)))
      return false;
    if (filters.precioMin != null && p.precio < filters.precioMin) return false;
    if (filters.precioMax != null && p.precio > filters.precioMax) return false;
    if (filters.disponibilidad === "disponibles" && !p.disponible) return false;
    return true;
  });
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const copy = [...products];
  switch (sort) {
    case "precio-asc":
      return copy.sort((a, b) => a.precio - b.precio);
    case "precio-desc":
      return copy.sort((a, b) => b.precio - a.precio);
    case "recientes":
      return copy.sort((a, b) => Number(b.id) - Number(a.id));
    case "relevancia":
    default:
      return copy.sort((a, b) => Number(b.destacado) - Number(a.destacado));
  }
}

/** Valores únicos disponibles para armar las opciones de filtro dinámicamente. */
export function getFilterFacets(products: Product[]) {
  const marcas = new Set<string>();
  const categoriasSet = new Set<string>();
  const generos = new Set<string>();
  const tallas = new Set<string>();
  const colores = new Set<string>();
  let precioMin = Infinity;
  let precioMax = 0;

  for (const p of products) {
    marcas.add(p.marca);
    categoriasSet.add(p.categoria);
    generos.add(p.genero);
    p.tallasDisponibles.forEach((t) => tallas.add(t));
    p.coloresDisponibles.forEach((c) => colores.add(c));
    precioMin = Math.min(precioMin, p.precio);
    precioMax = Math.max(precioMax, p.precio);
  }

  return {
    marcas: [...marcas].sort(),
    categorias: [...categoriasSet].sort(),
    generos: [...generos].sort(),
    tallas: [...tallas].sort(),
    colores: [...colores].sort(),
    precioMin: precioMin === Infinity ? 0 : precioMin,
    precioMax,
  };
}
