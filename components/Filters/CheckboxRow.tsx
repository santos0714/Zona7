"use client";

export function CheckboxRow({
  label,
  checked,
  onChange,
  swatch,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  swatch?: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground/90">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-border accent-[var(--accent)]"
      />
      {swatch && (
        <span
          className="h-3.5 w-3.5 rounded-full border border-border"
          style={{ backgroundColor: swatch }}
          aria-hidden
        />
      )}
      <span>{label}</span>
    </label>
  );
}
