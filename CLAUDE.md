# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es este repositorio

Landing page estática de Sistemas Torres (desarrollo de software y soporte técnico). Sin build, sin dependencias, sin gestor de paquetes: los archivos que están en el repo son exactamente los que se sirven.

## Comandos

No hay build, lint ni tests. El flujo real es:

```bash
# Previsualizar (basta con abrir index.html, pero un servidor evita rarezas de file://)
python -m http.server 8000

# Publicar: la rama main es producción (GitHub Pages)
git push sistemastorres main
```

El remoto se llama `sistemastorres` (no `origin`). El archivo `CNAME` fija el dominio propio `sistemastorres.com`; no borrarlo ni renombrarlo en un commit que toque Pages.

## Arquitectura

Cuatro archivos fuente y una carpeta de imágenes:

- `index.html` — portada con secciones ancladas: `#servicios`, `#productos`, `#proyectos`, `#tecnologias`, `#perfil`, `#contacto`.
- `p2eti.html` — página de producto (P2Eti ST). Se entra desde la tarjeta `.p2-destacado` de `#productos`.
- `styles.css` y `script.js` — **compartidos por ambas páginas**. Un cambio acá afecta a todo el sitio.

### `script.js` es un único IIFE con contrato por selectores

Todos los bloques hacen guard por existencia (`if (el)`), así que el mismo script corre sin errores en cualquier página. La consecuencia práctica: **el HTML nuevo solo se "enciende" si usa los ganchos que el script espera**:

| Gancho en el HTML | Comportamiento |
|---|---|
| `#random-quote p` | Frase al azar de un array de 10 citas dentro del script |
| `#year` | Año actual en el footer |
| `.nav-toggle` + `#nav-menu` | Menú móvil (alterna `aria-expanded` y `hidden`) |
| `.reveal` / `.reveal-stagger` | IntersectionObserver agrega `.is-visible` al entrar en viewport |
| `.gallery-trigger[data-img][data-caption]` | Alimenta el lightbox; el orden en el DOM define el orden de navegación |
| `<dialog id="lightbox">` + `#lightbox-img/-caption/-prev/-next` | Visor con flechas, teclado y bloqueo de scroll (`position: fixed` sobre `body`) |

Cuidado con `.reveal`: el CSS le pone `opacity: 0` y es el JS quien la revela. Si se agrega un bloque con `.reveal` a una página que no carga `script.js`, queda invisible. Hay fallback para navegadores sin IntersectionObserver, no para JS deshabilitado.

Para agregar capturas al lightbox alcanza con sumar botones `.gallery-trigger`; no hay que tocar el JS.

### `styles.css`

- Tokens de diseño en `:root` (colores, `--font-sans/-mono/-logo`, `--radius`, `--container`). Usar las variables, no valores literales: el tema es oscuro y todo depende de esa paleta.
- Mobile-first: las media queries son `min-width` salvo un par de excepciones puntuales.
- Ritmo visual por secciones alternadas: `.section` y `.section-alt`.
- El bloque **"Producto P2Eti ST"** (al final del archivo, tras el separador de comentario) agrega solo lo específico de esa página —visor de peso, franja de código de barras, grilla de prestaciones— reutilizando los tokens del sitio. Estilos nuevos de una página de producto van ahí, no mezclados con los genéricos de arriba.

### Páginas de producto nuevas

Partir de `p2eti.html`: comparte header, footer y el `<dialog>` del lightbox con la portada. La diferencia es que su `<nav>` apunta a `index.html#ancla` (absoluto a la portada) mientras `index.html` usa `#ancla`. Mantener esa distinción o el menú se rompe.

## Convenciones

- Todo el contenido va en español rioplatense (voseo), con acentos correctos. Los comentarios de `styles.css` están en español; los mensajes de commit también.
- Las imágenes llevan `width` y `height` explícitos y `loading="lazy"` para reservar espacio y evitar saltos de layout.
- El sitio se apoya en atributos ARIA ya presentes (`aria-expanded`, `aria-controls`, `aria-label`) y respeta `prefers-reduced-motion`. Al agregar interacción, seguir ese estándar.
- Las únicas dependencias externas son las fuentes de Google (DM Sans, JetBrains Mono, Syne), enlazadas con `preconnect` en el `<head>` de cada página.
