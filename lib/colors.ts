/** Mapa de nombres de color en español a un hex aproximado, para pintar swatches. */
export const colorSwatchMap: Record<string, string> = {
  negro: "#111111",
  blanco: "#f5f5f3",
  gris: "#9c9c9c",
  "gris jaspe": "#8a8a8a",
  "gris oscuro": "#4b4b4b",
  vino: "#6e1423",
  rojo: "#c8102e",
  azul: "#1d4ed8",
  "azul marino": "#1e293b",
  verde: "#166534",
  beige: "#d9cdb8",
  arena: "#c9b691",
};

export function getColorSwatch(colorName: string): string {
  return colorSwatchMap[colorName.trim().toLowerCase()] ?? "#9c9c9c";
}
