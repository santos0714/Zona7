import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Completa tus datos de entrega y finaliza tu pedido en ZONA 7.",
};

export default function CheckoutLayout({ children }: LayoutProps<"/checkout">) {
  return children;
}
