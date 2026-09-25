# CLAUDE.md — Landing de Maestros del Futuro

Contexto para cualquier sesión que trabaje en este repo. Recoge decisiones que
**no se pueden deducir leyendo el código**, y las razones detrás de ellas.

## Qué es

Landing page estática para Maestros del Futuro (MDF), **bilingüe**. Sin build, sin
dependencias, sin framework. Se abre con cualquier servidor estático desde la raíz
del repo (las rutas a assets son absolutas: `/css/…`, `/js/…`, `/img/…`).

```bash
python3 -m http.server 4173
```

Origen: mock-up creado en agosto de 2026 a partir de un brief de César, usando
como referencia estructural el sitio ronnsquare.fr. En septiembre de 2026 se añadió
la versión en inglés para el mercado B2B de USA, sin mover el foco Latam.

### Estructura de archivos

```
index.html         ES — raíz, mercado principal
en/index.html      EN — traducción B2B (copy pendiente de revisión de César)
legal.html         ES — aviso legal combinado (privacidad + términos + accesibilidad)
en/legal.html      EN — íd.
css/styles.css     compartido por las 4 páginas
js/main.js         compartido; se adapta al idioma por `document.documentElement.lang`
img/               fotos + logo + isotipo (+ isotipo-favicon.png, fuente de los favicons)
favicon-32.png · icon-192.png · icon-512.png · apple-touch-icon.png   generados con sips
                   desde img/isotipo-favicon.png (isotipo púrpura sobre cuadrado Tinta)
site.webmanifest · robots.txt · sitemap.xml · vercel.json
```

### i18n

No hay framework de i18n. `js/main.js` lee `document.documentElement.lang`
(`es` / `en`) y elige de un objeto `T` los textos que inyecta (palabra rotante,
etiquetas del portafolio, labels de accesibilidad). El H1 y todo el copy estático
viven en cada HTML. El toggle de idioma en el header navega a la página equivalente
(`/` ↔ `/en/`, `/legal.html` ↔ `/en/legal.html`) y en móvil (<520px) se oculta el
botón CTA del header para que quepa.

Todas las URLs absolutas (canonical, hreflang, OG, sitemap, JSON-LD) usan el
dominio de producción **`https://servicios.maestrosdelfuturo.com`**.

## Sistema de diseño — leer esto antes de tocar nada visual

La marca vive en la skill personal **`mdf-design-system`**
(`~/.claude/skills/mdf-design-system/`), que se carga sola en cualquier sesión
de Claude Code. Ahí están la paleta completa, la tabla de contraste medida, la
escala tipográfica y las reglas de logo. Este archivo solo cubre lo específico
de esta landing.

### Tres sustituciones deliberadas respecto al brief original

El brief pedía cosas tomadas de ronnsquare que chocaban con la marca MDF.
Se resolvieron hacia MDF. **No las revientas "arreglándolas":**

1. **Paleta.** El brief pedía crema `#F7E2CC`, chocolate `#1E1508` y lavanda
   `#C9A8F0` — la paleta de ronnsquare, no la de MDF. Se mapeó el mismo *ritmo*
   de tres bloques a colores reales de marca: Blanco Pureza → Tinta de
   Caligrafía → Cerámica. Cerámica `#C3C2FD` cae casi donde su lavanda, así que
   la cadencia de scroll se conserva.

2. **Tipografía.** El brief pedía tres familias (sans condensada + serif + mono).
   La guía de marca prohíbe mezclar Sofia Pro con otra familia de titulares. Se
   usa **solo Sofia Pro**, con mayúsculas + peso 700 + tracking `-.035em` para
   lograr la densidad tipo Archivo Black. JetBrains Mono aparece únicamente en
   etiquetas de sección, nunca en titulares. **No añadas una serif.**

3. **Formas.** El brief pedía círculo/cuadrado/triángulo/rombo, que salen del
   rombo del logo de ronnsquare. El isotipo de MDF da otro vocabulario:
   **círculo, anillo, arco (la sonrisa) y pastilla (el vástago)**. Las clases
   `.sh-circle`, `.sh-ring`, `.sh-arc` y `.sh-pill` son ese sistema. No metas
   iconos de librería genérica.

### Regla de ritmo cromático

Los bloques alternan color con transiciones duras, sin difuminado. **Nunca dos
bloques adyacentes del mismo color.** El orden actual es:

Negro Nike (hero) → Blanco (dos rutas) → Cerámica (oferta) → Tinta (portafolio)
→ Blanco (contacto) → Negro Nike (footer)

Si insertas una sección, recalcula la secuencia completa.

### Logotipo e isotipo

Dos assets, dos usos distintos:

- **`img/logo-mdf.png`** — lockup apilado (wordmark), blanco + púrpura para fondo
  oscuro, donde **la O final de FUTURO es la marca**. Va en el header.
  - Mínimo 140 px de ancho. Header 172 px, comprimido 142 px.
  - Solo funciona sobre fondo oscuro. Si el header pasa a fondo claro hay que
    cambiar al lockup claro (en la skill), donde "MAESTROS DEL" va en Tinta.
  - La O no es una letra. Nunca reconstruyas el wordmark tipeando en Sofia Pro.
- **`img/isotipo-mdf.png`** — el isotipo suelto (anillos concéntricos con vástago y
  sonrisa), versión Cerámica, copiado de `mdf-design-system/assets/isotipo-ceramica.png`.
  Va en el lado derecho del hero (`.sculpt`). Proporción 558:682, **no lo encajes en
  un cuadrado**. Es ráster de resolución limitada; si aparece el vector original,
  sustitúyelo. No lo redibujes a mano.

### Tema único, a propósito

La skill pide siempre dos temas. Esta página es una excepción deliberada: el
color-blocking *es* el diseño e invertirlo lo destruiría. Todos los colores se
pintan explícitamente para que la página se sostenga sobre cualquier fondo.

## Tipografía en producción

Sofia Pro se carga desde `fonts.cdnfonts.com`, un tercero de fiabilidad
desconocida. **Para producción real hay que auto-hospedarla con licencia
comprada.** (Dentro de Artifacts de Claude ese host está bloqueado por CSP y
hay que caer a Poppins de Google Fonts — de ahí que siga en el stack.)

## Contenido

Todo el copy viene de César y es definitivo salvo donde se indique.

**El mapeo de imágenes a clientes es una inferencia, no un dato.** Se asignaron
por lo que se ve en cada captura:

| Archivo | Cliente asignado | Base de la inferencia |
|---|---|---|
| `banregio` | Banregio | educación financiera |
| `goyn` | GOYN CDMX | "CV sin sesgos", Empresas con la Juventud |
| `pilot` | Pilot | pieza tipo Meridian |
| `ocho20` | 8020 | marca 8020 visible en el video |
| `laura` | — | solo en el carrusel del hero |

Confirmar con César antes de publicar.

## Estructura del código

Sin framework ni build:

- **HTML** — cada página lleva todas sus secciones y su copy, salvo dos contenedores
  vacíos (`#slides` y `#work`) que rellena el JS. Las 4 páginas comparten el mismo
  `<head>` de favicons/OG y el mismo header (con toggle de idioma). Las páginas
  interiores usan `<body class="interior">` + `<header class="solid">` (fondo Tinta
  opaco, sin hero oscuro detrás).
- **`css/styles.css`** — tokens en `:root`, sistema de formas (`.sh-*`), fondos por
  bloque (`.bg-*`), animaciones ligadas a clases `.on`, más `.sr-only`/`.skip`,
  `.lang`, `.legal`, y variantes del lightbox (`.lb-frame.site` para sitios,
  `.lb-frame.tall` para Calendly).
- **`js/main.js`** — vanilla, sin dependencias. Piezas independientes, todas con
  guardas `if` para poder cargarse también en las páginas legales: carrusel del hero,
  palabra rotante (`#rot`), revelado por scroll (`#stmt .ln`), compresión del header,
  correo ensamblado por JS (`[data-email]`, anti-scraping), y el lightbox
  (`role="dialog"` con trampa de foco, `Esc`, y foco devuelto al disparador).

El helper `pic(slug, alt, lazy)` genera el `<picture>` responsive (webp+jpg, 700/1400,
rutas `/img/…`). La fuente de verdad de qué se muestra vive en el objeto `T` de
`main.js`, por idioma:

- Slides del hero: lista fija de slugs (`banregio, goyn, pilot, ocho20, laura`), `alt=""`.
- `T[lang].work` (4 entradas) → tarjetas del portafolio. Cada entrada es
  `[slug, etiqueta, fuente]` donde `fuente` es `{vimeo:"<id>"}` o `{site:"<url>"}`.
  La tarjeta es un `<a>` real (href al link de review de Vimeo o al sitio, abre en
  pestaña nueva sin JS); con JS, `preventDefault()` y abre la fuente en el lightbox.
- El botón `#bookCall` de la sección contacto abre `CALENDLY` en el lightbox.

Para añadir/quitar un cliente o cambiar Calendly se edita `main.js`, no el HTML.

## Pendientes conocidos

- **Copy EN — visto bueno de tono.** La versión de `en/` la redactó y pulió Claude
  como inglés B2B (no traducción literal); falta que César la lea una vez para el
  tono. El fondo del mensaje es suyo.
- **Páginas legales por revisar.** `legal.html` y `en/legal.html` llevan texto
  estándar redactado por Claude, no revisado por abogado. Asumen jurisdicción
  **México** en ambos idiomas — confirmar. Llevan un aviso visible y `noindex`.
- **Fuentes desde CDN de terceros.** Sofia Pro se sirve desde `fonts.cdnfonts.com`.
  Para producción real conviene auto-hospedarla con licencia comprada.
- Sin analítica ni banner de cookies (decisión deliberada, septiembre 2026).

Confirmado (sept 2026): dominio de producción `https://servicios.maestrosdelfuturo.com`;
los tres embeds de Vimeo del portafolio sí se reproducen en el lightbox.

## Cosas que parecen bugs y no lo son

- Las imágenes del hero llevan `blur(3px)` y `scale(1.04)` a propósito: traen su
  propio texto incrustado y competían con el H1. El `scale` evita que el blur
  deje borde claro. Por eso desbordan su contenedor — el hero las recorta con
  `overflow:hidden`. El `.scrim` se vuelve casi opaco a partir del ~52% de alto
  para tapar ese texto incrustado (una campaña de Banregio) que si no se leía por
  debajo del subtítulo — sobre todo molesto en la versión en inglés.
- El crossfade de la palabra rotante está secuenciado (sale en .2s, entra en .34s
  con .2s de retraso) para que nunca se vean dos palabras encimadas.
- "crecer" dura 3600 ms y las demás 1500 ms. Es intencional: es la palabra ancla.
- Solo la primera diapositiva del hero entra en la carga inicial; las otras se
  inyectan tras `load`. `loading="lazy"` no sirve ahí porque todas caen dentro
  del viewport.
