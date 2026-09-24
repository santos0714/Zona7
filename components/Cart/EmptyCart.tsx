import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export function EmptyCart({ onLinkClick }: { onLinkClick?: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 py-16 text-center">
      <ShoppingBag size={32} className="text-muted" strokeWidth={1.5} />
      <p className="font-heading text-base font-semibold uppercase tracking-wide">
        Tu carrito está vacío
      </p>
      <p className="max-w-[220px] text-sm text-muted">
        Agrega productos para verlos aquí.
      </p>
      <Link
        href="/tienda"
        onClick={onLinkClick}
        className="mt-2 inline-flex items-center rounded-md bg-accent px-5 py-2.5 font-heading text-sm font-semibold uppercase tracking-wide text-accent-foreground"
      >
        Ir a la tienda
      </Link>
    </div>
  );
}
