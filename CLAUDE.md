# CLAUDE.md — Landing de Maestros del Futuro

Contexto para cualquier sesión que trabaje en este repo. Recoge decisiones que
**no se pueden deducir leyendo el código**, y las razones detrás de ellas.

## Qué es

Landing page estática de una sola página para Maestros del Futuro (MDF).
Sin build, sin dependencias, sin framework: `index.html` + `css/styles.css` +
`js/main.js` + `img/`. Se abre con cualquier servidor estático.

```bash
python3 -m http.server 4173
```

Origen: mock-up creado en agosto de 2026 a partir de un brief de César, usando
como referencia estructural el sitio ronnsquare.fr.

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

### Logotipo

Se usa `img/logo-mdf.png`: el lockup apilado donde **la O final de FUTURO es la
marca**, en versión blanco + púrpura para fondo oscuro. No es el isotipo suelto.

- Mínimo 140 px de ancho. Header 172 px, comprimido 142 px, footer 168 px.
- Esta versión solo funciona sobre fondo oscuro. Si el header pasa a fondo claro
  hay que cambiar al lockup claro (en la skill), donde "MAESTROS DEL" va en Tinta.
- La O no es una letra. Nunca reconstruyas el wordmark tipeando en Sofia Pro.

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

## Pendientes conocidos

- **Derechos de imagen.** Las cinco fotos son capturas de pantalla y en cuatro
  aparecen personas identificables. Confirmar derechos y conseguir los originales
  en buena resolución antes de publicar en un dominio público.
- **Portafolio sin destino.** Las cuatro tarjetas enlazan a `#contacto`. Faltan
  páginas de caso o un modal.
- **Contacto es un `mailto:`**, sin formulario. Expone el correo a scrapers.
- **Favicon provisional**: usa el PNG del logotipo, no un ico/svg dedicado.

## Cosas que parecen bugs y no lo son

- Las imágenes del hero llevan `blur(3px)` y `scale(1.04)` a propósito: traen su
  propio texto incrustado y competían con el H1. El `scale` evita que el blur
  deje borde claro. Por eso desbordan su contenedor — el hero las recorta con
  `overflow:hidden`.
- El crossfade de la palabra rotante está secuenciado (sale en .2s, entra en .34s
  con .2s de retraso) para que nunca se vean dos palabras encimadas.
- "crecer" dura 3600 ms y las demás 1500 ms. Es intencional: es la palabra ancla.
- Solo la primera diapositiva del hero entra en la carga inicial; las otras se
  inyectan tras `load`. `loading="lazy"` no sirve ahí porque todas caen dentro
  del viewport.
