"use client";

import type { ProductFilters } from "@/types/product";
import { categories } from "@/config/categories";
import { getColorSwatch } from "@/lib/colors";
import { formatPrice } from "@/lib/format";
import { FilterGroup } from "./FilterGroup";
import { CheckboxRow } from "./CheckboxRow";

export type Facets = {
  marcas: string[];
  categorias: string[];
  generos: string[];
  tallas: string[];
  colores: string[];
  precioMin: number;
  precioMax: number;
};

function toggleValue(list: string[] = [], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

const generoLabels: Record<string, string> = {
  hombre: "Hombre",
  mujer: "Mujer",
  unisex: "Unisex",
};

export function FiltersPanel({
  facets,
  filters,
  onChange,
  onReset,
}: {
  facets: Facets;
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
  onReset: () => void;
}) {
  const activeCount =
    (filters.marca?.length ?? 0) +
    (filters.categoria?.length ?? 0) +
    (filters.genero?.length ?? 0) +
    (filters.talla?.length ?? 0) +
    (filters.color?.length ?? 0) +
    (filters.disponibilidad === "disponibles" ? 1 : 0);

  return (
    <div>
      <div className="flex items-center justify-between pb-4">
        <span className="font-heading text-sm font-semibold uppercase tracking-wide">
          Filtros
        </span>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-medium text-muted underline-offset-2 hover:text-accent hover:underline"
          >
            Limpiar ({activeCount})
          </button>
        )}
      </div>

      <FilterGroup title="Marca">
        {facets.marcas.map((marca) => (
          <CheckboxRow
            key={marca}
            label={marca}
            checked={filters.marca?.includes(marca) ?? false}
            onChange={() => onChange({ ...filters, marca: toggleValue(filters.marca, marca) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Categoría">
        {facets.categorias.map((slug) => (
          <CheckboxRow
            key={slug}
            label={categories.find((c) => c.slug === slug)?.name ?? slug}
            checked={filters.categoria?.includes(slug) ?? false}
            onChange={() =>
              onChange({ ...filters, categoria: toggleValue(filters.categoria, slug) })
            }
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Género">
        {facets.generos.map((genero) => (
          <CheckboxRow
            key={genero}
            label={generoLabels[genero] ?? genero}
            checked={filters.genero?.includes(genero) ?? false}
            onChange={() =>
              onChange({ ...filters, genero: toggleValue(filters.genero, genero) })
            }
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Talla">
        <div className="flex flex-wrap gap-2">
          {facets.tallas.map((talla) => {
            const active = filters.talla?.includes(talla) ?? false;
            return (
              <button
                key={talla}
                type="button"
                onClick={() => onChange({ ...filters, talla: toggleValue(filters.talla, talla) })}
                className={`min-w-9 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border text-foreground/80 hover:border-accent"
                }`}
              >
                {talla}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Color">
        <div className="flex flex-wrap gap-3">
          {facets.colores.map((color) => {
            const active = filters.color?.includes(color) ?? false;
            return (
              <button
                key={color}
                type="button"
                title={color}
                onClick={() => onChange({ ...filters, color: toggleValue(filters.color, color) })}
                className={`h-7 w-7 rounded-full border-2 transition-transform ${
                  active ? "border-accent scale-110" : "border-border"
                }`}
                style={{ backgroundColor: getColorSwatch(color) }}
              >
                <span className="sr-only">{color}</span>
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Precio" defaultOpen={false}>
        <div className="flex items-center gap-2 text-sm">
          <input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder={formatPrice(facets.precioMin)}
            value={filters.precioMin ?? ""}
            onChange={(e) =>
              onChange({
                ...filters,
                precioMin: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-sm"
          />
          <span className="text-muted">—</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder={formatPrice(facets.precioMax)}
            value={filters.precioMax ?? ""}
            onChange={(e) =>
              onChange({
                ...filters,
                precioMax: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-sm"
          />
        </div>
      </FilterGroup>

      <FilterGroup title="Disponibilidad" defaultOpen={false}>
        <CheckboxRow
          label="Solo productos disponibles"
          checked={filters.disponibilidad === "disponibles"}
          onChange={(checked) =>
            onChange({ ...filters, disponibilidad: checked ? "disponibles" : "todos" })
          }
        />
      </FilterGroup>
    </div>
  );
}
