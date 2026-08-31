# Maestros del Futuro — Landing

Landing page estática. Sin build, sin dependencias.

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
