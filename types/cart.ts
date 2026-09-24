export type CartItem = {
  /** Clave única de línea de carrito: `${sku}` (una variante = un sku único) */
  sku: string;
  productId: string;
  slug: string;
  marca: string;
  nombre: string;
  imagen: string;
  precio: number;
  talla: string;
  color: string;
  cantidad: number;
  /** Stock disponible de esa variante, para no dejar subir la cantidad de más. */
  stockDisponible: number;
};
