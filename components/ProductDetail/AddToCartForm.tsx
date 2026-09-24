"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { getColorSwatch } from "@/lib/colors";
import { QuantitySelector } from "@/components/ui/QuantitySelector";

export function AddToCartForm({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();

  const colors = useMemo(
    () => [...new Set(product.variantes.map((v) => v.color).filter(Boolean))],
    [product.variantes]
  );

  const [selectedColor, setSelectedColor] = useState<string | undefined>(colors[0]);
  const [selectedTalla, setSelectedTalla] = useState<string | undefined>(undefined);
  const [cantidad, setCantidad] = useState(1);
  const [added, setAdded] = useState(false);

  const tallasForColor = useMemo(() => {
    return product.variantes.filter((v) => !selectedColor || v.color === selectedColor);
  }, [product.variantes, selectedColor]);

  const selectedVariant = useMemo(() => {
    return product.variantes.find(
      (v) => v.talla === selectedTalla && (!selectedColor || v.color === selectedColor)
    );
  }, [product.variantes, selectedTalla, selectedColor]);

  const canAdd = Boolean(selectedVariant && selectedVariant.stock > 0) && !product.proximamente;

  function handleAdd() {
    if (!selectedVariant || !canAdd) return;
    addItem({
      sku: selectedVariant.sku,
      productId: product.id,
      slug: product.slug,
      marca: product.marca,
      nombre: product.nombre,
      imagen: product.imagenPrincipal,
      precio: product.precio,
      talla: selectedVariant.talla,
      color: selectedVariant.color,
      cantidad,
      stockDisponible: selectedVariant.stock,
    });
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-6">
      {colors.length > 1 && (
        <div>
          <p className="font-heading text-xs font-semibold uppercase tracking-wide text-muted">
            Color{selectedColor ? `: ${selectedColor}` : ""}
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                title={color}
                onClick={() => {
                  setSelectedColor(color);
                  setSelectedTalla(undefined);
                }}
                className={`h-8 w-8 rounded-full border-2 transition-transform ${
                  selectedColor === color ? "border-accent scale-110" : "border-border"
                }`}
                style={{ backgroundColor: getColorSwatch(color) }}
              >
                <span className="sr-only">{color}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="font-heading text-xs font-semibold uppercase tracking-wide text-muted">
          Talla{selectedTalla ? `: ${selectedTalla}` : ""}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {tallasForColor.map((variant) => {
            const disabled = variant.stock <= 0;
            const active = selectedTalla === variant.talla;
            return (
              <button
                key={variant.sku}
                type="button"
                disabled={disabled}
                onClick={() => setSelectedTalla(variant.talla)}
                className={`min-w-11 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "border-accent bg-accent text-accent-foreground"
                    : disabled
                      ? "border-border text-muted line-through opacity-50"
                      : "border-border text-foreground hover:border-accent"
                }`}
              >
                {variant.talla}
              </button>
            );
          })}
        </div>
        {!selectedTalla && (
          <p className="mt-2 text-xs text-muted">Selecciona una talla.</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <p className="font-heading text-xs font-semibold uppercase tracking-wide text-muted">
          Cantidad
        </p>
        <QuantitySelector
          value={cantidad}
          onChange={setCantidad}
          max={selectedVariant?.stock ?? 10}
        />
      </div>

      {product.proximamente ? (
        <button
          type="button"
          disabled
          className="flex w-full items-center justify-center rounded-md bg-surface-strong px-6 py-3.5 font-heading text-sm font-semibold uppercase tracking-wide text-muted"
        >
          Próximamente
        </button>
      ) : (
        <button
          type="button"
          onClick={handleAdd}
          disabled={!canAdd}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-accent px-6 py-3.5 font-heading text-sm font-semibold uppercase tracking-wide text-accent-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          {added ? (
            <>
              <Check size={16} /> Agregado
            </>
          ) : selectedVariant && selectedVariant.stock <= 0 ? (
            "Agotado en esta talla"
          ) : (
            "Agregar al carrito"
          )}
        </button>
      )}
    </div>
  );
}
