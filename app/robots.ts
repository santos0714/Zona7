import type { MetadataRoute } from "next";
import { storeConfig } from "@/config/store";

// Necesario para que este archivo se pueda generar en un export estático
// (`output: "export"`), además de funcionar igual en hosting con Node.js.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/carrito", "/checkout"],
    },
    sitemap: `${storeConfig.domain}/sitemap.xml`,
  };
}
