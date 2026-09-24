import { storeConfig } from "@/config/store";

/**
 * Punto único para obtener el link de pago de Mercado Pago.
 *
 * Hoy regresa el link fijo configurado en `config/store.ts`. Cuando se
 * quiera generar una preferencia de pago dinámica (con el total real y los
 * items del carrito) mediante la API de Mercado Pago, esta función es la
 * que se reemplaza por una llamada a un endpoint propio (por ejemplo
 * `app/api/mercadopago/route.ts`) sin tener que tocar el checkout.
 */
export function getMercadoPagoLink(): string {
  return storeConfig.mercadoPagoLink;
}
