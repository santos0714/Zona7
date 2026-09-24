import Link from "next/link";
import { storeConfig } from "@/config/store";
import { categories } from "@/config/categories";
import { Logo } from "@/components/Header/Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted">
            Ropa deportiva y de gimnasio. Entregas en Ensenada, Baja California y Tlaxiaco,
            Oaxaca.
          </p>
          <div className="mt-5 flex gap-4 text-sm">
            {storeConfig.socials.instagram && (
              <a
                href={storeConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-accent"
              >
                Instagram
              </a>
            )}
            {storeConfig.socials.tiktok && (
              <a
                href={storeConfig.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-accent"
              >
                TikTok
              </a>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide">
            Tienda
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              <Link href="/tienda" className="transition-colors hover:text-accent">
                Todos los productos
              </Link>
            </li>
            <li>
              <Link href="/proximamente" className="transition-colors hover:text-accent">
                Próximamente
              </Link>
            </li>
            <li>
              <Link href="/categorias" className="transition-colors hover:text-accent">
                Categorías
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide">
            Categorías
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/tienda?categoria=${c.slug}`}
                  className="transition-colors hover:text-accent"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide">
            Entregas
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {storeConfig.deliveryCities.map((city) => (
              <li key={city.id}>{city.label}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">{storeConfig.contactEmail}</p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {year} {storeConfig.name}. Todos los derechos reservados.
          </p>
          <p>Precios en pesos mexicanos (MXN).</p>
        </div>
      </div>
    </footer>
  );
}
