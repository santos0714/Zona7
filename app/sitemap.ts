import type { MetadataRoute } from "next";
import { storeConfig } from "@/config/store";
import { getAllProducts } from "@/lib/products";

// Necesario para que este archivo se pueda generar en un export estático
// (`output: "export"`), además de funcionar igual en hosting con Node.js.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/tienda", "/proximamente", "/categorias", "/carrito"].map(
    (path) => ({
      url: `${storeConfig.domain}${path}`,
      lastModified: new Date(),
    })
  );

  const productRoutes = getAllProducts().map((product) => ({
    url: `${storeConfig.domain}/producto/${product.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes];
}
