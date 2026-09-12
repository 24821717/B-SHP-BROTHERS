# B-SHP BROTHERS — Web

Sitio de **B-SHP BROTHERS**. Estático: HTML, CSS y JS propios. Sin build, sin dependencias,
sin backend ni base de datos.

| Ruta | Qué es |
|---|---|
| `/` | `bshpbrothers.com` — la home del universo B-SHP |
| `/thegame` | **THE GAME · Las Reglas del Juego** — la sales page |
| `/legal/terminos` · `/legal/privacidad` · `/legal/contacto` | páginas legales |

---

## Ver en local

```bash
cd web
python3 -m http.server 3010
```

→ http://localhost:3010/

Hace falta un servidor: abriendo el HTML con `file://` fallan el vídeo y algunas rutas.

---

## Publicar en Netlify

Ya está todo configurado en `netlify.toml` — **no hay que tocar nada**:

1. Netlify → *Add new site* → *Import an existing project* → GitHub → este repositorio.
2. Netlify lee `netlify.toml` y publica la carpeta `web/`. **Build command: vacío.**
3. *Deploy*.

Cada `git push` a `main` vuelve a desplegar solo.

**Hace falta HTTPS** (Netlify lo da gratis): el checkout de Hotmart no abre su modal sobre `http`.

### En otro hosting

Ver **[DESPLIEGUE.md](DESPLIEGUE.md)**: instrucciones para servidor propio, con los ficheros de
configuración ya listos en `deploy/` (Apache `.htaccess` y Nginx).

---

## Estructura

```
.
├── netlify.toml            configuración de deploy (publica web/)
├── DESPLIEGUE.md           cómo subirlo a un servidor propio
├── deploy/                 configuración lista para Apache y Nginx
└── web/                    ← la raíz del sitio; esto es lo que se publica
    ├── index.html          /
    ├── thegame/index.html  /thegame
    ├── legal/              términos, privacidad y contacto
    └── assets/
        ├── css/  js/
        ├── img/            gráfica de marca optimizada
        └── video/          trailer, VSL y loops (H.264) + pósters
```

---

## Notas técnicas

- **Vídeos** en H.264 optimizado para web (los originales del Drive venían en HEVC/4K, que
  Chrome y Firefox no reproducen). El trailer y el VSL usan `preload="none"`: no descargan
  nada hasta que el usuario da play. Los loops van sin audio y con
  `autoplay muted loop playsinline`, para que reproduzcan en iOS.
- **Caché:** `netlify.toml` sirve los vídeos con caché larga y el resto siempre revalidado.
  Si sustituyes un vídeo, **cámbiale el nombre** — si no, los navegadores que ya lo tengan
  seguirán viendo el antiguo.
- **Checkout:** widget oficial de Hotmart. Si su script no carga, los botones se convierten
  en enlaces directos al checkout — nunca queda un botón muerto.
- Tipografías Poppins + Cinzel desde Google Fonts, con fallbacks de sistema.
- Responsive, navegable con teclado, respeta `prefers-reduced-motion`.

## Paleta oficial

`#0B0B0B` negro obsidiana · `#1A1A1A` carbón · `#D4AF37` oro antiguo · `#B8860B` ámbar ·
`#2ECC71` verde energía

---

Desarrollado por **AGENTIA LABS**
