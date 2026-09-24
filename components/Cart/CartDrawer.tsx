"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { CartItemRow } from "./CartItemRow";
import { EmptyCart } from "./EmptyCart";

export function CartDrawer() {
  const { items, isOpen, closeCart, subtotal } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`} aria-hidden={!isOpen}>
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-border bg-background shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="font-heading text-base font-semibold uppercase tracking-wide">
            Tu carrito
          </span>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border"
          >
            <X size={15} />
          </button>
        </div>

        {items.length === 0 ? (
          <EmptyCart onLinkClick={closeCart} />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 divide-y divide-border">
              {items.map((item) => (
                <CartItemRow key={item.sku} item={item} compact />
              ))}
            </div>

            <div className="border-t border-border px-5 py-4">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span className="font-heading text-lg font-semibold">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="grid gap-2">
                <Link
                  href="/carrito"
                  onClick={closeCart}
                  className="inline-flex items-center justify-center rounded-md border border-border px-5 py-3 font-heading text-sm font-semibold uppercase tracking-wide transition-colors hover:border-accent hover:text-accent"
                >
                  Ver carrito
                </Link>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 font-heading text-sm font-semibold uppercase tracking-wide text-accent-foreground"
                >
                  Ir a checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
