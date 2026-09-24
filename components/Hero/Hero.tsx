import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-foreground text-background">
      <span
        aria-hidden
        className="font-heading pointer-events-none absolute -right-6 -top-10 select-none text-[16rem] font-bold leading-none text-background/5 sm:text-[22rem]"
      >
        7
      </span>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Under Armour · Vanquish
        </p>
        <h1 className="font-heading mt-3 max-w-xl text-4xl font-semibold uppercase leading-[1.05] sm:text-5xl">
          Ropa deportiva para entrenar en serio
        </h1>
        <p className="mt-4 max-w-md text-sm text-background/70 sm:text-base">
          Telas técnicas, buen precio y entrega en Ensenada y Tlaxiaco.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/tienda"
            className="btn-hero-primary inline-flex items-center rounded-md bg-accent px-6 py-3 font-heading text-sm font-semibold uppercase tracking-wide text-accent-foreground"
          >
            Ver tienda
          </Link>
          <Link
            href="/proximamente"
            className="btn-hero-secondary inline-flex items-center rounded-md border border-background/30 px-6 py-3 font-heading text-sm font-semibold uppercase tracking-wide text-background"
          >
            Próximamente
          </Link>
        </div>
      </div>
    </section>
  );
}
