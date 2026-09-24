import Image from "next/image";
import type { CartItem } from "@/types/cart";
import { formatPrice } from "@/lib/format";

export function OrderSummary({ items, subtotal }: { items: CartItem[]; subtotal: number }) {
  return (
    <div className="h-fit rounded-lg border border-border p-5">
      <h2 className="font-heading text-sm font-semibold uppercase tracking-wide">
        Tu pedido
      </h2>
      <div className="mt-4 max-h-80 space-y-3 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.sku} className="flex gap-3">
            <div className="relative aspect-[4/5] w-12 shrink-0 overflow-hidden rounded-md bg-surface">
              <Image src={item.imagen} alt={item.nombre} fill sizes="48px" className="object-cover" />
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-semibold text-background">
                {item.cantidad}
              </span>
            </div>
            <div className="flex-1 text-xs">
              <p className="font-medium leading-snug">{item.nombre}</p>
              <p className="text-muted">Talla {item.talla}</p>
            </div>
            <span className="text-xs font-semibold">{formatPrice(item.precio * item.cantidad)}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-1.5 border-t border-border pt-4 text-sm">
        <div className="flex justify-between">
          <span className="text-muted">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between font-heading text-base font-semibold uppercase tracking-wide">
          <span>Total</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
      </div>
    </div>
  );
}
