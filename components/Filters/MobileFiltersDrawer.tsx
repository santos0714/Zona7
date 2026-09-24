"use client";

import { useEffect, type ReactNode } from "react";
import { SlidersHorizontal, X } from "lucide-react";

export function MobileFiltersDrawer({
  open,
  onOpen,
  onClose,
  resultCount,
  children,
}: {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  resultCount: number;
  children: ReactNode;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium lg:hidden"
      >
        <SlidersHorizontal size={15} />
        Filtros
      </button>

      <div className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}>
        <div
          onClick={onClose}
          className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-border bg-background p-5 transition-transform duration-300 ${
            open ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="font-heading text-base font-semibold uppercase tracking-wide">
              Filtros
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar filtros"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border"
            >
              <X size={15} />
            </button>
          </div>
          {children}
          <button
            type="button"
            onClick={onClose}
            className="mt-4 w-full rounded-md bg-accent py-3 text-center font-heading text-sm font-semibold uppercase tracking-wide text-accent-foreground"
          >
            Ver {resultCount} {resultCount === 1 ? "producto" : "productos"}
          </button>
        </div>
      </div>
    </>
  );
}
