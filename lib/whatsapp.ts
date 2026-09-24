import { storeConfig } from "@/config/store";
import type { CartItem } from "@/types/cart";
import { formatPrice } from "@/lib/format";

export type CheckoutFormData = {
  nombre: string;
  apellido: string;
  telefono: string;
  ciudad: string;
  direccion: string;
  referencias: string;
  metodoEntrega: string;
};

/**
 * Arma el mensaje de WhatsApp con el pedido completo: datos del cliente,
 * productos (con talla/cantidad/precio), subtotal y total.
 */
export function buildWhatsAppMessage(form: CheckoutFormData, items: CartItem[]): string {
  const cityLabel =
    storeConfig.deliveryCities.find((c) => c.id === form.ciudad)?.label ?? form.ciudad;
  const methodLabel =
    storeConfig.deliveryMethods.find((m) => m.id === form.metodoEntrega)?.label ??
    form.metodoEntrega;

  const subtotal = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  const lineasProductos = items
    .map((item) => {
      return [
        `- ${item.marca} ${item.nombre}`,
        `  Talla: ${item.talla}${item.color ? ` | Color: ${item.color}` : ""}`,
        `  Cantidad: ${item.cantidad}`,
        `  Precio: ${formatPrice(item.precio)}`,
      ].join("\n");
    })
    .join("\n\n");

  const lines = [
    `Hola, quiero realizar el siguiente pedido en ${storeConfig.name}:`,
    "",
    `Nombre: ${form.nombre} ${form.apellido}`.trim(),
    `Teléfono: ${form.telefono}`,
    `Ciudad: ${cityLabel}`,
    `Dirección: ${form.direccion}`,
  ];

  if (form.referencias) {
    lines.push(`Referencias: ${form.referencias}`);
  }

  lines.push(`Método de entrega: ${methodLabel}`, "", "Productos:", lineasProductos, "");
  lines.push(`Subtotal: ${formatPrice(subtotal)}`, `Total: ${formatPrice(subtotal)}`);

  return lines.join("\n");
}

export function buildWhatsAppLink(form: CheckoutFormData, items: CartItem[]): string {
  const message = buildWhatsAppMessage(form, items);
  return `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
