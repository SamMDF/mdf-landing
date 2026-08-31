# Maestros del Futuro — Landing

Landing page de una sola página para los servicios de **Maestros del Futuro (MDF)**:
estrategia y producción de contenido —video, texto, cursos y sistemas gamificados—
para que un producto o servicio sí se use.

La página presenta las dos rutas de trabajo (Estrategia y Producción), las tres
formas de empezar (Diagnóstico MDF, Sprint de Contenido, Maestros del Contenido),
un portafolio por tipo de proyecto y el contacto.

Sitio estático, sin build ni dependencias: `index.html` + `css/styles.css` +
`js/main.js` + `img/`.

## Correrla

```bash
python3 -m http.server 4173
```

Y abrir <http://localhost:4173>. Cualquier servidor estático sirve; abrir
`index.html` con doble clic también funciona, aunque algunos navegadores
bloquean rutas relativas bajo `file://`.

## Estructura

```
index.html        marcado y metadatos
css/styles.css    tokens de marca, color-blocking, componentes
js/main.js        carrusel, palabra rotante, revelado por scroll, header sticky
img/              logo + fotos en WebP y JPEG, a 700 y 1400 px
CLAUDE.md         decisiones de diseño y contexto — leer antes de editar
```

## Publicar en GitHub Pages

Settings → Pages → Source: `main` / root. Queda servido en un par de minutos.
No hay paso de build.

## Antes de publicar

Ver la sección "Pendientes conocidos" de [CLAUDE.md](CLAUDE.md). Lo más
importante: **confirmar derechos de uso de las cinco fotografías**, que son
capturas de pantalla con personas identificables.
