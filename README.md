# ZONA 7 — tienda online

Tienda de ropa deportiva construida con Next.js 16 (App Router) + TypeScript + Tailwind CSS.
Catálogo inicial: Under Armour y Vanquish (~18 productos). Entregas en Ensenada, BC y
Tlaxiaco, Oaxaca.

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

Abre http://localhost:3000. El primer `npm run dev` (y `npm run build`) ejecutan
automáticamente `npm run import:products`, que lee el inventario y genera
`data/products/products.json`.

## Scripts

| Script | Qué hace |
|---|---|
| `npm run dev` | Corre el sitio en desarrollo. |
| `npm run build` | Regenera el catálogo desde Excel/CSV y compila para producción. |
| `npm run start` | Sirve el build de producción (después de `npm run build`). |
| `npm run import:products` | Solo regenera `data/products/products.json` desde el Excel/CSV. Ejecútalo cada vez que edites el inventario. |
| `npm run lint` | Revisa el código con ESLint. |

## Lo primero que hay que personalizar

Todo lo específico del negocio vive en `config/store.ts`:

- `whatsappNumber` — número de WhatsApp real (formato `52` + 10 dígitos, sin espacios ni signos).
- `mercadoPagoLink` — link de pago de Mercado Pago (Checkout Pro o link de pago simple).
- `deliveryCities` — ciudades con entrega disponible.
- `socials`, `contactEmail`, `domain` — redes, correo de contacto y dominio real (para SEO/OG).

El catálogo se administra desde `data/inventory/` (ver `data/inventory/README.md` para la
guía completa de columnas y buenas prácticas). Las marcas y categorías activas se controlan
desde `config/brands.ts` y `config/categories.ts` — agregar una marca o categoría nueva es
agregar una línea ahí, sin tocar componentes.

Las imágenes de los ~18 productos de ejemplo son **placeholders generados** (no son fotos
reales de Under Armour ni Vanquish, para no usar material con derechos de esas marcas).
Reemplázalas subiendo las fotos reales a `public/products/<marca>/` con el mismo nombre de
archivo que aparece en `imagen_principal` / `imagen_secundaria` en el Excel.

## Estructura del proyecto

```
app/                  Rutas (App Router): inicio, tienda, producto, próximamente, carrito, checkout, categorías
components/           Componentes de UI, organizados por función
config/               store.ts, brands.ts, categories.ts — toda la configuración del negocio
context/              CartContext (carrito con persistencia en localStorage)
data/inventory/       Excel/CSV de inventario + su documentación
data/products/         products.json generado (no editar a mano)
lib/                  Lógica de datos: productos, filtros, formato, WhatsApp, Mercado Pago
public/products/      Imágenes de producto por marca
scripts/               import-products.ts (Excel/CSV → products.json)
types/                 Tipos de Product, ProductVariant, CartItem, etc.
```

## Subir el sitio a un hosting

Este proyecto es una página web normal (no un programa que corre en tu computadora):
se construye una vez y el resultado se sube a un hosting para que quede publicada en tu
dominio. Cómo lo subes depende del tipo de hosting que tengas o elijas:

### Opción A: Vercel (la más simple, recomendada)

Vercel es de los mismos creadores de Next.js y detecta este proyecto automáticamente.

1. Sube este proyecto a un repositorio de GitHub.
2. Entra a vercel.com, conecta tu cuenta de GitHub e importa el repositorio.
3. Vercel detecta que es Next.js, lo compila y lo publica solo. Cada vez que subas
   cambios al repositorio, se vuelve a publicar automáticamente.
4. Al final conectas tu dominio propio desde el panel de Vercel (Settings → Domains).

No requiere ningún cambio en el código; se usa la configuración tal como está.

### Opción B: otro hosting con soporte para Node.js (Railway, Render, un VPS, etc.)

Igual que arriba pero tú administras el servidor. En resumen: subes el proyecto, corres
`npm install`, luego `npm run build`, y dejas el proceso `npm run start` corriendo
(usualmente detrás de un gestor de procesos como PM2, o lo que indique el hosting).

### Opción C: hosting tradicional / compartido (cPanel, FTP, sin Node.js)

Este es el típico hosting que viene con un dominio (GoDaddy, Hostinger, etc.), donde solo
subes archivos por FTP y no hay forma de "correr" Node.js. Para este caso, el sitio se
puede exportar como archivos HTML/CSS/JS puros:

1. Edita `next.config.ts` y déjalo así:

   ```ts
   import type { NextConfig } from "next";

   const nextConfig: NextConfig = {
     output: "export",
     images: { unoptimized: true },
     trailingSlash: true,
   };

   export default nextConfig;
   ```

2. Corre `npm run build`. Esto genera una carpeta `out/` con el sitio completo ya
   convertido a archivos estáticos (HTML, CSS, JS, imágenes).
3. Sube **el contenido** de la carpeta `out/` (no la carpeta en sí) a la carpeta pública
   de tu hosting (normalmente `public_html` o `www`), por FTP o por el administrador de
   archivos del panel.

Ya probé esta opción end-to-end (compilé con `output: "export"` y serví la carpeta `out/`
como sitio estático) y todas las páginas funcionan correctamente, incluyendo tienda,
producto, carrito y checkout. La dejo documentada aquí en vez de activada por default
porque desactiva la optimización automática de imágenes de Next — solo conviene si de
verdad no vas a tener Node.js disponible.

### ¿Cuál elegir si no estás seguro?

Vercel (Opción A) es lo más simple y no cuesta nada para un sitio de este tamaño. Si ya
pagaste un hosting tradicional y quieres usar ese, la Opción C funciona igual de bien.

## Notas técnicas

- **Inventario**: ver `data/inventory/README.md`. Una fila del Excel = una variante
  vendible (talla + color + stock + SKU propio). El script las agrupa por `id_producto`.
- **Carrito**: Context de React + `localStorage`. No requiere cuentas de usuario.
- **Checkout**: formulario de datos de entrega → dos opciones (Mercado Pago o WhatsApp).
  El mensaje de WhatsApp se arma en `lib/whatsapp.ts` con el detalle completo del pedido.
- **Mercado Pago**: por ahora es un link fijo configurable (`config/store.ts`). Cuando se
  quiera generar una preferencia de pago dinámica vía API, solo se cambia
  `lib/mercadopago.ts` sin tocar el checkout.
- **Tipografías**: Barlow Condensed (títulos) e Inter (texto), autoalojadas con
  `@fontsource` — no dependen de que el navegador del cliente llegue a Google Fonts.
- **Modo claro/oscuro**: `next-themes`, con la preferencia guardada en el navegador del
  usuario y transición suave.
- **`npm audit`** marca una vulnerabilidad conocida en el paquete `xlsx` (sin fix
  disponible todavía). Solo se usa en el script de importación, que corre localmente sobre
  tu propio archivo de inventario — no se ejecuta en el navegador ni procesa datos de
  terceros, así que el riesgo real es bajo.

## Siguientes pasos sugeridos (no implementados a propósito, para no sobre-construir)

- Conectar `scripts/import-products.ts` a una fuente en vivo (Google Sheets/Airtable) en
  vez de leer el archivo local.
- Generar la preferencia de pago de Mercado Pago vía API si se necesita cobrar dentro del
  propio sitio en vez de un link fijo.
- Agregar cuentas de cliente / historial de pedidos si el volumen lo justifica más adelante.
