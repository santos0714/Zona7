"use client";

import { MessageCircle, CreditCard, Pencil } from "lucide-react";
import type { CartItem } from "@/types/cart";
import type { CheckoutFormData } from "@/lib/whatsapp";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { getMercadoPagoLink } from "@/lib/mercadopago";
import { formatPrice } from "@/lib/format";
import { storeConfig } from "@/config/store";

export function CheckoutOptions({
  form,
  items,
  subtotal,
  onEdit,
}: {
  form: CheckoutFormData;
  items: CartItem[];
  subtotal: number;
  onEdit: () => void;
}) {
  const cityLabel =
    storeConfig.deliveryCities.find((c) => c.id === form.ciudad)?.label ?? form.ciudad;
  const whatsappLink = buildWhatsAppLink(form, items);
  const mercadoPagoLink = getMercadoPagoLink();

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border p-4">
        <div className="flex items-center justify-between">
          <p className="font-heading text-xs font-semibold uppercase tracking-wide text-muted">
            Datos de entrega
          </p>
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center gap-1 text-xs font-medium text-muted hover:text-accent"
          >
            <Pencil size={12} /> Editar
          </button>
        </div>
        <p className="mt-2 text-sm">
          {form.nombre} {form.apellido} · {form.telefono}
        </p>
        <p className="text-sm text-muted">
          {form.direccion}, {cityLabel}
        </p>
      </div>

      <div>
        <p className="mb-3 font-heading text-sm font-semibold uppercase tracking-wide">
          Elige cómo finalizar tu pedido
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href={mercadoPagoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-start gap-2 rounded-lg border border-border p-4 transition-colors hover:border-accent"
          >
            <CreditCard size={20} className="text-accent" />
            <span className="font-heading text-sm font-semibold uppercase tracking-wide">
              Pagar
            </span>
            <span className="text-xs text-muted">
              Continúa al pago seguro con Mercado Pago.
            </span>
          </a>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-start gap-2 rounded-lg border border-border p-4 transition-colors hover:border-accent"
          >
            <MessageCircle size={20} className="text-accent" />
            <span className="font-heading text-sm font-semibold uppercase tracking-wide">
              Finalizar pedido por WhatsApp
            </span>
            <span className="text-xs text-muted">
              Te confirmamos el pedido y coordinamos el pago directamente.
            </span>
          </a>
        </div>
      </div>

      <p className="text-xs text-muted">
        Total del pedido: <span className="font-semibold text-foreground">{formatPrice(subtotal)}</span>
      </p>
    </div>
  );
}
