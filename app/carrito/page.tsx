"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { CartItemRow } from "@/components/Cart/CartItemRow";
import { EmptyCart } from "@/components/Cart/EmptyCart";

export default function CarritoPage() {
  const { items, subtotal } = useCart();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-semibold uppercase tracking-wide">
        Tu carrito
      </h1>

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="divide-y divide-border border-y border-border">
            {items.map((item) => (
              <CartItemRow key={item.sku} item={item} />
            ))}
          </div>

          <div className="h-fit rounded-lg border border-border p-5">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wide">
              Resumen
            </h2>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-muted">Envío</span>
              <span className="text-muted">Se calcula en checkout</span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="font-heading text-sm font-semibold uppercase tracking-wide">
                Total
              </span>
              <span className="font-heading text-lg font-semibold">{formatPrice(subtotal)}</span>
            </div>

            <Link
              href="/checkout"
              className="mt-5 flex items-center justify-center rounded-md bg-accent px-5 py-3 font-heading text-sm font-semibold uppercase tracking-wide text-accent-foreground"
            >
              Ir a checkout
            </Link>
            <Link
              href="/tienda"
              className="mt-2 flex items-center justify-center rounded-md border border-border px-5 py-3 font-heading text-sm font-semibold uppercase tracking-wide transition-colors hover:border-accent hover:text-accent"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
