import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="ZONA 7 — inicio"
      className={`font-heading inline-flex items-baseline gap-[2px] leading-none tracking-tight ${className}`}
    >
      <span className="text-2xl font-semibold uppercase">ZONA</span>
      <span className="text-2xl font-bold text-accent">7</span>
    </Link>
  );
}
