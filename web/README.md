# web/ — B-SHP BROTHERS

Sitio estático. Sin build, sin dependencias, sin servidor de aplicación.

```
web/
├── index.html          bshpbrothers.com  (placeholder de la home)
├── thegame/index.html  bshpbrothers.com/thegame  ← la sales page
└── assets/
    ├── css/thegame.css
    ├── js/thegame.js
    ├── img/            gráfica del Drive, optimizada
    └── video/          trailer, VSL y loop del hero (H.264 web) + pósters
```

## Verla en local

```bash
cd "web" && python3 -m http.server 3010
```
→ http://localhost:3010/thegame/

(Hace falta un servidor: abriendo el HTML con `file://` el video y algunas rutas fallan.)

## Publicarla

Sube la carpeta `web/` tal cual. Cualquiera de estos sirve:

- **Vercel / Netlify / Cloudflare Pages** — arrastrar la carpeta, sin configuración.
- **Hosting clásico (cPanel/FTP)** — subir el contenido de `web/` a `public_html/`.

Con eso `dominio.com` sirve la home y `dominio.com/thegame` la sales page.

## Notas técnicas

- El trailer y el VSL usan `preload="none"`: no pesan nada hasta que el usuario da play.
- El loop del hero va sin audio, `autoplay muted loop playsinline` (así reproduce en iOS).
- Los videos originales venían en HEVC/4K; se transcodificaron a H.264 porque Chrome y
  Firefox no reproducen HEVC. Los originales siguen intactos en `contenido drive/`.
- Fuentes: Poppins + Cinzel desde Google Fonts, con fallbacks de sistema.
- Accesible con teclado, respeta `prefers-reduced-motion`.
