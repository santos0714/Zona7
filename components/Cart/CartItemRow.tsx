"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import type { CartItem } from "@/types/cart";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { QuantitySelector } from "@/components/ui/QuantitySelector";

export function CartItemRow({ item, compact = false }: { item: CartItem; compact?: boolean }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className={`flex gap-3 ${compact ? "py-3" : "py-4"}`}>
      <Link
        href={`/producto/${item.slug}`}
        className="relative aspect-[4/5] w-16 shrink-0 overflow-hidden rounded-md bg-surface sm:w-20"
      >
        <Image src={item.imagen} alt={item.nombre} fill sizes="80px" className="object-cover" />
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-heading text-xs font-semibold uppercase tracking-wide text-muted">
              {item.marca}
            </p>
            <Link
              href={`/producto/${item.slug}`}
              className="text-sm font-medium leading-snug hover:text-accent"
            >
              {item.nombre}
            </Link>
            <p className="mt-0.5 text-xs text-muted">
              Talla: {item.talla}
              {item.color ? ` · Color: ${item.color}` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.sku)}
            aria-label="Eliminar producto"
            className="text-muted transition-colors hover:text-accent"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <QuantitySelector
            size="sm"
            value={item.cantidad}
            max={item.stockDisponible}
            onChange={(qty) => updateQuantity(item.sku, qty)}
          />
          <span className="text-sm font-semibold">
            {formatPrice(item.precio * item.cantidad)}
          </span>
        </div>
      </div>
    </div>
  );
}
