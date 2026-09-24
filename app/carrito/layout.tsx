import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carrito",
  description: "Revisa los productos en tu carrito de ZONA 7.",
};

export default function CarritoLayout({ children }: LayoutProps<"/carrito">) {
  return children;
}
