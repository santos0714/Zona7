import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { storeConfig } from "@/config/store";
import { categories } from "@/config/categories";
import { ProductGallery } from "@/components/ProductGallery/ProductGallery";
import { AddToCartForm } from "@/components/ProductDetail/AddToCartForm";
import { DeliveryInfo } from "@/components/ProductDetail/DeliveryInfo";
import { ProductGrid } from "@/components/ProductGrid/ProductGrid";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const title = `${product.marca} ${product.nombre}`;
  const description = product.descripcion || `${title} disponible en ${storeConfig.name}.`;

  return {
    title,
    description,
    alternates: { canonical: `/producto/${product.slug}` },
    openGraph: {
      title: `${title} — ${storeConfig.name}`,
      description,
      images: product.imagenPrincipal ? [{ url: product.imagenPrincipal }] : undefined,
    },
  };
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const categoryName = categories.find((c) => c.slug === product.categoria)?.name ?? product.categoria;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.marca} ${product.nombre}`,
    description: product.descripcion,
    image: product.imagenes,
    sku: product.sku,
    brand: { "@type": "Brand", name: product.marca },
    offers: {
      "@type": "Offer",
      url: `${storeConfig.domain}/producto/${product.slug}`,
      priceCurrency: storeConfig.currency,
      price: product.precio,
      availability: product.disponible
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="mb-6 text-xs text-muted">
        <Link href="/tienda" className="hover:text-accent">
          Tienda
        </Link>
        <span className="mx-1.5">/</span>
        <Link href={`/tienda?categoria=${product.categoria}`} className="hover:text-accent">
          {categoryName}
        </Link>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.imagenes} alt={`${product.marca} ${product.nombre}`} />

        <div>
          <p className="font-heading text-sm font-semibold uppercase tracking-wide text-muted">
            {product.marca}
          </p>
          <h1 className="font-heading mt-1 text-3xl font-semibold uppercase tracking-wide">
            {product.nombre}
          </h1>

          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-2xl font-semibold">{formatPrice(product.precio)}</span>
            {product.precioAnterior && (
              <>
                <span className="text-base text-muted line-through">
                  {formatPrice(product.precioAnterior)}
                </span>
                <span className="rounded bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                  -{product.descuentoPorcentaje}%
                </span>
              </>
            )}
          </div>

          {product.descripcion && (
            <p className="mt-5 text-sm leading-relaxed text-muted">{product.descripcion}</p>
          )}

          <div className="mt-6 border-t border-border pt-6">
            <AddToCartForm product={product} />
          </div>

          <div className="mt-6">
            <DeliveryInfo />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 font-heading text-2xl font-semibold uppercase tracking-wide">
            También te puede interesar
          </h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
