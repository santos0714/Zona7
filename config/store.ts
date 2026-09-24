/**
 * Configuración central de la tienda ZONA 7.
 *
 * Todo lo que pueda cambiar con el negocio (WhatsApp, Mercado Pago, ciudades,
 * redes sociales, moneda) vive aquí. Ningún componente debe tener estos
 * valores "hardcodeados": siempre se importan desde este archivo.
 */

export const storeConfig = {
  name: "ZONA 7",
  legalName: "ZONA 7",
  shortDescription: "Ropa deportiva y de gimnasio.",
  domain: "https://zona7.mx", // Ajustar cuando se tenga dominio definitivo.
  currency: "MXN",
  currencySymbol: "$",
  locale: "es-MX",

  /**
   * Número de WhatsApp donde llegan los pedidos, en formato internacional
   * SIN signos ni espacios (ej. 52 + 10 dígitos para México).
   * Este es un valor de ejemplo, se debe reemplazar por el número real.
   */
  whatsappNumber: "5216461234567",

  /**
   * Link de pago de Mercado Pago (Checkout Pro / link de pago simple).
   * Se deja preparado como variable: cuando se genere el link real en el
   * panel de Mercado Pago, solo se reemplaza este valor. Si en el futuro
   * se necesita un link dinámico por pedido, se sustituye esta constante
   * por una llamada a la API de Mercado Pago desde `lib/mercadopago.ts`.
   */
  mercadoPagoLink: "https://mpago.la/REEMPLAZAR-CON-LINK-REAL",

  socials: {
    instagram: "https://instagram.com/zona7",
    tiktok: "https://tiktok.com/@zona7",
    facebook: "",
  },

  contactEmail: "contacto@zona7.mx",

  /**
   * Ciudades donde por ahora hay entrega. El checkout solo permite elegir
   * entre estas opciones. Agregar una ciudad nueva es agregar un objeto
   * aquí, no requiere tocar componentes.
   */
  deliveryCities: [
    {
      id: "ensenada",
      label: "Ensenada, Baja California",
      state: "Baja California",
      etaDays: "1-2 días hábiles",
      shippingNote: "Entrega local y paquetería.",
    },
    {
      id: "tlaxiaco",
      label: "Tlaxiaco, Oaxaca",
      state: "Oaxaca",
      etaDays: "3-5 días hábiles",
      shippingNote: "Entrega vía paquetería.",
    },
  ],

  /**
   * Métodos de entrega disponibles en el checkout.
   */
  deliveryMethods: [
    { id: "domicilio", label: "Entrega a domicilio" },
    { id: "punto-encuentro", label: "Punto de encuentro a coordinar" },
  ] as const,
} as const;

export type DeliveryCityId = (typeof storeConfig.deliveryCities)[number]["id"];
export type DeliveryMethodId = (typeof storeConfig.deliveryMethods)[number]["id"];
