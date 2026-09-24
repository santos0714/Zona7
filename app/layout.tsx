import type { Metadata } from "next";
import { storeConfig } from "@/config/store";
import { ThemeProvider } from "@/components/ThemeToggle/ThemeProvider";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { CartDrawer } from "@/components/Cart/CartDrawer";
// Tipografías autoalojadas vía @fontsource (en vez de next/font/google) para
// no depender de la disponibilidad de fonts.googleapis.com en tiempo de build.
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/barlow-condensed/500.css";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(storeConfig.domain),
  title: {
    default: `${storeConfig.name} — Ropa deportiva`,
    template: `%s — ${storeConfig.name}`,
  },
  description:
    "Ropa deportiva y de gimnasio Under Armour y Vanquish. Entregas en Ensenada y Tlaxiaco.",
  openGraph: {
    type: "website",
    siteName: storeConfig.name,
    locale: "es_MX",
  },
  icons: {
    icon: "/logo/favicon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
