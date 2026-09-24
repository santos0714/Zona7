# Inventario por Excel/CSV

Este es el archivo que controla **todo el catálogo**: productos, variantes,
precios, stock, y qué aparece en "Próximamente". No se edita nada en el
código para agregar o cambiar un producto — solo este archivo.

## Regla principal: una fila = una variante vendible

Cada fila representa **una combinación única de talla + color** de un
producto, con su propio SKU y su propio stock. Si un producto tiene 4 tallas,
son 4 filas. Si además tiene 2 colores, son 8 filas (4 tallas × 2 colores).

Todas las filas que pertenecen al mismo producto comparten el mismo
`id_producto` y deben tener los mismos datos de producto (nombre, marca,
descripción, precio, imágenes, etc.) — esos valores se toman de la
**primera fila** de cada `id_producto` al importar.

```
id_producto | sku          | marca   | nombre                | talla | color | stock
ua-1        | UA-1-S       | Under.. | Playera HeatGear...   | S     | Negro | 10
ua-1        | UA-1-M       | Under.. | Playera HeatGear...   | M     | Negro | 14
ua-1        | UA-1-L       | Under.. | Playera HeatGear...   | L     | Negro | 12
ua-1        | UA-1-XL      | Under.. | Playera HeatGear...   | XL    | Negro | 6
```

## Columnas

| Columna | Obligatoria | Descripción |
|---|---|---|
| `id_producto` | Sí | Agrupa las filas de un mismo producto. Debe repetirse igual en todas sus variantes (ej. `ua-1`). |
| `sku` | Sí | Identificador **único** de la variante (talla+color). Nunca se repite entre filas. |
| `marca` | Sí | Debe coincidir exactamente con el nombre de una marca activa (ver `config/brands.ts`). |
| `nombre` | Sí | Nombre del producto (sin la marca, ej. "Playera HeatGear Manga Corta"). |
| `categoria` | Sí | Slug de categoría existente (`playeras`, `shorts`, `pants`, `leggings`, `tops`, `sudaderas`, `jerseys`, `accesorios`). Ver `config/categories.ts`. |
| `genero` | Sí | `hombre`, `mujer` o `unisex`. |
| `descripcion` | Sí | Texto corto y directo, sin frases de marketing genéricas. |
| `precio` | Sí | Precio actual, solo número (sin `$` ni comas). |
| `precio_anterior` | No | Solo si hay descuento. Debe ser mayor que `precio`; si no, se ignora. |
| `talla` | Sí | Talla de esa variante (`S`, `M`, `L`, `XL`, o `Única` para accesorios). |
| `color` | No | Nombre del color. Puede ir vacío si el producto no maneja color. |
| `color_hex` | No | Código hex (`#111111`) para pintar el swatch de color en la ficha de producto. |
| `stock` | Sí | Stock disponible de **esa** variante puntual. |
| `imagen_principal` | Sí | Ruta de la imagen principal, ej. `/products/under-armour/ua-1-1.svg`. Debe existir en `public/products/<marca>/`. |
| `imagen_secundaria` | No | Segunda imagen (la que aparece al pasar el cursor en la tarjeta de producto). |
| `imagenes` | No | Fotos adicionales para la galería del producto, separadas por `\|` (ej. `foto3.jpg\|foto4.jpg`). |
| `destacado` | No | `true`/`false`. Si es `true`, aparece en "Productos destacados" del inicio. |
| `proximamente` | No | `true`/`false`. Si es `true`, el producto aparece en `/proximamente` y no se puede agregar al carrito. |
| `activo` | No | `true`/`false` (por defecto `true`). Ponerlo en `false` oculta el producto de toda la tienda sin borrar la fila. |

## Buenas prácticas para evitar errores

1. **El SKU nunca se repite.** Es la llave de cada variante y del carrito.
   Sugerencia: `MARCA-IDPRODUCTO-TALLA` (o `-COLOR-TALLA` si hay varios
   colores), como se ve en `inventory.csv`.
2. **El `id_producto` sí se repite** entre las filas de un mismo producto —
   es lo que las agrupa.
3. Los datos "de producto" (nombre, descripción, precio, imágenes...) deben
   ser **idénticos** en todas las filas de un mismo `id_producto`. El
   importador toma esos valores de la primera fila que encuentre.
4. Si un producto no maneja color, deja `color` vacío pero mantén una fila
   por talla igual.
5. Antes de subir el archivo, revisa que no haya filas vacías intermedias ni
   columnas movidas de lugar.
6. Después de editar el Excel, corre `npm run import:products` (o simplemente
   `npm run build`, que ya lo ejecuta automáticamente) para regenerar
   `data/products/products.json`.
7. El importador valida SKUs duplicados y columnas obligatorias faltantes, y
   se detiene con un mensaje claro si algo no cuadra — así no se sube al
   sitio un catálogo con errores.

## Formatos aceptados

El script busca primero `inventory.xlsx` y, si no existe, usa
`inventory.csv`. Ambos archivos deben tener exactamente las mismas columnas.
Se incluyen los dos como ejemplo con los ~18 productos iniciales de
Under Armour y Vanquish.

## Siguientes pasos (automatización)

Esta estructura está pensada para conectarse después a una fuente en vivo
(Google Sheets publicado como CSV, Airtable, etc.) sin rediseñar nada: basta
con que `scripts/import-products.ts` descargue el archivo desde esa fuente
en lugar de leerlo de esta carpeta, antes de generar `products.json`.
