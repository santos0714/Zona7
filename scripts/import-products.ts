/**
 * Importador de inventario: Excel/CSV -> data/products/products.json
 *
 * Uso:
 *   npm run import:products
 *
 * Lee (en este orden de preferencia) uno de estos archivos:
 *   data/inventory/inventory.xlsx
 *   data/inventory/inventory.csv
 *
 * Cada FILA del archivo es una VARIANTE vendible (una combinación única de
 * talla + color, con su propio SKU y stock). El script agrupa las filas por
 * `id_producto` y arma los productos con su arreglo de variantes, calculando
 * campos derivados (tallas disponibles, stock total, disponibilidad, %
 * de descuento, etc.).
 *
 * Ver /data/inventory/README.md para la guía completa de columnas y buenas
 * prácticas para evitar errores al editar el Excel.
 */
import fs from "node:fs";
import path from "node:path";
import * as XLSX from "xlsx";

const INVENTORY_DIR = path.join(process.cwd(), "data", "inventory");
const OUTPUT_PATH = path.join(process.cwd(), "data", "products", "products.json");

const XLSX_PATH = path.join(INVENTORY_DIR, "inventory.xlsx");
const CSV_PATH = path.join(INVENTORY_DIR, "inventory.csv");

type Row = Record<string, string | number | undefined>;

function readRows(): Row[] {
  const filePath = fs.existsSync(XLSX_PATH) ? XLSX_PATH : CSV_PATH;
  if (!fs.existsSync(filePath)) {
    throw new Error(
      `No se encontró inventory.xlsx ni inventory.csv en ${INVENTORY_DIR}`
    );
  }
  const workbook = XLSX.readFile(filePath, { raw: false });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<Row>(sheet, { defval: "" });
  console.log(`Leyendo ${rows.length} filas de ${path.basename(filePath)}`);
  return rows;
}

function toBool(value: unknown): boolean {
  const v = String(value).trim().toLowerCase();
  return v === "true" || v === "1" || v === "si" || v === "sí" || v === "x";
}

function toNumber(value: unknown): number {
  if (value === "" || value == null) return 0;
  const n = Number(String(value).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function splitList(value: unknown): string[] {
  if (!value) return [];
  return String(value)
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
}

function main() {
  const rows = readRows();

  const requiredColumns = ["id_producto", "sku", "marca", "nombre", "precio", "talla", "stock"];
  const grouped = new Map<string, Row[]>();

  rows.forEach((row, index) => {
    for (const col of requiredColumns) {
      if (row[col] === undefined || row[col] === "") {
        throw new Error(
          `Fila ${index + 2}: falta la columna obligatoria "${col}". Revisa el Excel.`
        );
      }
    }
    const id = String(row.id_producto).trim();
    if (!grouped.has(id)) grouped.set(id, []);
    grouped.get(id)!.push(row);
  });

  const seenSkus = new Set<string>();
  const seenSlugs = new Set<string>();
  const products = [];

  for (const [id, variantRows] of grouped) {
    const first = variantRows[0];
    const marca = String(first.marca).trim();
    const nombre = String(first.nombre).trim();

    const baseSlug = slugify(`${marca}-${nombre}`) || `producto-${id}`;
    let slug = baseSlug;
    let n = 2;
    while (seenSlugs.has(slug)) {
      slug = `${baseSlug}-${n++}`;
    }
    seenSlugs.add(slug);

    const variantes = variantRows.map((row) => {
      const sku = String(row.sku).trim();
      if (seenSkus.has(sku)) {
        throw new Error(`SKU duplicado: "${sku}" (producto ${id}). Cada variante necesita un SKU único.`);
      }
      seenSkus.add(sku);
      return {
        sku,
        talla: String(row.talla ?? "").trim(),
        color: String(row.color ?? "").trim(),
        colorHex: row.color_hex ? String(row.color_hex).trim() : undefined,
        stock: toNumber(row.stock),
      };
    });

    const tallasDisponibles = [
      ...new Set(variantes.filter((v) => v.stock > 0).map((v) => v.talla).filter(Boolean)),
    ];
    const coloresDisponibles = [
      ...new Set(variantes.filter((v) => v.stock > 0).map((v) => v.color).filter(Boolean)),
    ];
    const stockTotal = variantes.reduce((sum, v) => sum + v.stock, 0);

    const precio = toNumber(first.precio);
    const precioAnteriorRaw = toNumber(first.precio_anterior);
    const precioAnterior = precioAnteriorRaw > precio ? precioAnteriorRaw : undefined;
    const descuentoPorcentaje = precioAnterior
      ? Math.round(((precioAnterior - precio) / precioAnterior) * 100)
      : undefined;

    const imagenPrincipal = String(first.imagen_principal ?? "").trim();
    const imagenSecundaria = first.imagen_secundaria
      ? String(first.imagen_secundaria).trim()
      : undefined;
    const imagenesExtra = splitList(first.imagenes);
    const imagenes = [imagenPrincipal, imagenSecundaria, ...imagenesExtra].filter(
      (v): v is string => Boolean(v)
    );

    products.push({
      id,
      slug,
      sku: variantes[0]?.sku ?? id,
      marca,
      nombre,
      categoria: String(first.categoria ?? "").trim(),
      genero: String(first.genero ?? "unisex").trim().toLowerCase(),
      descripcion: String(first.descripcion ?? "").trim(),
      precio,
      precioAnterior,
      imagenPrincipal,
      imagenSecundaria,
      imagenes: [...new Set(imagenes)],
      destacado: toBool(first.destacado),
      proximamente: toBool(first.proximamente),
      activo: first.activo === "" || first.activo === undefined ? true : toBool(first.activo),
      variantes,
      tallasDisponibles,
      coloresDisponibles,
      stockTotal,
      disponible: stockTotal > 0,
      descuentoPorcentaje,
    });
  }

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(products, null, 2) + "\n", "utf-8");
  console.log(`✔ ${products.length} productos escritos en ${path.relative(process.cwd(), OUTPUT_PATH)}`);
}

main();
