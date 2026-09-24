import { storeConfig } from "@/config/store";

export function formatPrice(value: number): string {
  return new Intl.NumberFormat(storeConfig.locale, {
    style: "currency",
    currency: storeConfig.currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function calcDiscount(precio: number, precioAnterior?: number): number | undefined {
  if (!precioAnterior || precioAnterior <= precio) return undefined;
  return Math.round(((precioAnterior - precio) / precioAnterior) * 100);
}

export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
