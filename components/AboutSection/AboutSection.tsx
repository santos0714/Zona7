export function AboutSection() {
  return (
    <section className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-1">
          <h2 className="font-heading text-2xl font-semibold uppercase tracking-wide">
            Sobre ZONA 7
          </h2>
        </div>
        <div className="space-y-4 text-sm leading-relaxed text-muted lg:col-span-2">
          <p>
            ZONA 7 es una tienda enfocada en ropa deportiva y de gimnasio. Trabajamos con
            marcas como Under Armour y Vanquish, y seguimos sumando catálogo con el tiempo.
          </p>
          <p>
            Elegimos las prendas por la calidad de la tela y buscamos mantener precios justos,
            sin dejar de lado el diseño. Por ahora entregamos en Ensenada, Baja California y
            Tlaxiaco, Oaxaca.
          </p>
        </div>
      </div>
    </section>
  );
}
