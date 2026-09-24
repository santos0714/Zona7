import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <span className="font-heading text-7xl font-bold text-accent">404</span>
      <h1 className="font-heading mt-4 text-2xl font-semibold uppercase tracking-wide">
        Página no encontrada
      </h1>
      <p className="mt-2 text-sm text-muted">
        El producto o la página que buscas ya no está disponible.
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
