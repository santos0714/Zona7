"use client";

import { Minus, Plus } from "lucide-react";

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const textSize = size === "sm" ? "text-sm" : "text-base";

  return (
    <div className="inline-flex items-center rounded-md border border-border">
      <button
        type="button"
        aria-label="Disminuir cantidad"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className={`${dim} inline-flex items-center justify-center text-foreground transition-colors hover:text-accent disabled:opacity-30`}
      >
        <Minus size={14} />
      </button>
      <span className={`${textSize} w-8 text-center font-medium tabular-nums`}>{value}</span>
      <button
        type="button"
        aria-label="Aumentar cantidad"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className={`${dim} inline-flex items-center justify-center text-foreground transition-colors hover:text-accent disabled:opacity-30`}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
