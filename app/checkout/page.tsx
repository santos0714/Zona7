"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { CheckoutFormData } from "@/lib/whatsapp";
import { CheckoutForm } from "@/components/Checkout/CheckoutForm";
import { CheckoutOptions } from "@/components/Checkout/CheckoutOptions";
import { OrderSummary } from "@/components/Checkout/OrderSummary";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [form, setForm] = useState<CheckoutFormData | null>(null);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="font-heading text-2xl font-semibold uppercase tracking-wide">
          Tu carrito está vacío
        </h1>
        <p className="mt-2 text-sm text-muted">
          Agrega productos antes de continuar al checkout.
        </p>
        <Link
          href="/tienda"
          className="mt-6 inline-flex items-center rounded-md bg-accent px-6 py-3 font-heading text-sm font-semibold uppercase tracking-wide text-accent-foreground"
        >
          Ir a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-semibold uppercase tracking-wide">Checkout</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          {form ? (
            <CheckoutOptions
              form={form}
              items={items}
              subtotal={subtotal}
              onEdit={() => setForm(null)}
            />
          ) : (
            <CheckoutForm onSubmit={setForm} />
          )}
        </div>

        <OrderSummary items={items} subtotal={subtotal} />
      </div>
    </div>
  );
}
