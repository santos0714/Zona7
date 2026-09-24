/**
 * Modelo de datos de producto.
 *
 * El Excel/CSV de inventario se maneja a NIVEL VARIANTE (una fila = una
 * combinación vendible de talla + color con su propio stock y SKU). El
 * importador (scripts/import-products.ts) agrupa esas filas por
 * `id_producto` y arma un `Product` con un arreglo de `ProductVariant`.
 */

export type ProductVariant = {
  sku: string;
  talla: string;
  color: string;
  /** Código hex opcional, para pintar el swatch de color. */
  colorHex?: string;
  stock: number;
};

export type Product = {
  /** Identificador del producto agrupado (no del SKU de variante). */
  id: string;
  slug: string;
  sku: string;
  marca: string;
  nombre: string;
  categoria: string;
  genero: "hombre" | "mujer" | "unisex";
  descripcion: string;
  precio: number;
  precioAnterior?: number;
  imagenPrincipal: string;
  imagenSecundaria?: string;
  imagenes: string[];
  destacado: boolean;
  proximamente: boolean;
  activo: boolean;

  /** Variantes vendibles (talla + color + stock + sku propio). */
  variantes: ProductVariant[];

  /** Campos derivados, calculados por el importador para facilitar la UI. */
  tallasDisponibles: string[];
  coloresDisponibles: string[];
  stockTotal: number;
  disponible: boolean;
  descuentoPorcentaje?: number;
};

export type SortOption =
  | "relevancia"
  | "precio-asc"
  | "precio-desc"
  | "recientes";

export type ProductFilters = {
  marca?: string[];
  categoria?: string[];
  genero?: string[];
  talla?: string[];
  color?: string[];
  precioMin?: number;
  precioMax?: number;
  disponibilidad?: "todos" | "disponibles";
};
