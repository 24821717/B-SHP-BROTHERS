# B-SHP BROTHERS — Web

Sitio de **B-SHP BROTHERS**. Estático: HTML, CSS y JS propios. Sin build, sin dependencias.

| Ruta | Qué es | Estado |
|---|---|---|
| `/` | `bshpbrothers.com` — la home del universo B-SHP | Placeholder (fase 2) |
| `/thegame` | **THE GAME · Las Reglas del Juego** — la sales page | ✅ v1 lista para revisión |

---

## Ver en local

```bash
cd web
python3 -m http.server 3010
```

→ http://localhost:3010/thegame/

Hace falta un servidor: abriendo el HTML con `file://` fallan el video y algunas rutas.

## Deploy en Netlify

Ya está configurado en `netlify.toml` — **no hay que tocar nada**:

1. Netlify → *Add new site* → *Import an existing project* → GitHub → este repo.
2. Netlify lee `netlify.toml` y publica la carpeta `web/`. Build command: vacío.
3. *Deploy*.

Cada `git push` a `main` vuelve a desplegar solo.

---

## Estructura

```
.
├── netlify.toml            configuración de deploy
├── ESTADO.md               estado del proyecto y pendientes
├── docs/
│   ├── PROPUESTA-THEGAME.md    qué se construyó, decisiones y pendientes
│   ├── referencia-cliente.jpeg referencia visual que mandó el cliente
│   ├── referencia-home-bshp.jpeg
│   └── character-master-bshp.jpg  canon del personaje (paleta y reglas de marca)
└── web/
    ├── index.html          /
    ├── thegame/index.html  /thegame
    └── assets/
        ├── css/thegame.css
        ├── js/thegame.js
        ├── img/            gráfica de marca optimizada
        └── video/          trailer, VSL y loop del hero (H.264) + pósters
```

## Notas técnicas

- **Videos:** los originales venían en HEVC/4K, que Chrome y Firefox no reproducen. En el repo
  están las versiones H.264 optimizadas para web. Los archivos fuente se quedan fuera del repo
  (`.gitignore`) porque superan el límite de 100 MB de GitHub.
- El trailer y el VSL usan `preload="none"`: no descargan nada hasta que el usuario da play.
- El loop del hero va sin audio y con `autoplay muted loop playsinline`, para que reproduzca en iOS.
- **Checkout:** widget oficial de Hotmart (`pay.hotmart.com/K107291428B`). Si el script de Hotmart
  no carga, los botones se convierten en enlaces directos al checkout — nunca queda un botón muerto.
- Tipografías Poppins + Cinzel desde Google Fonts, con fallbacks de sistema.
- Diseño responsive, navegable con teclado y respeta `prefers-reduced-motion`.

## Paleta oficial

`#0B0B0B` negro obsidiana · `#1A1A1A` carbón · `#D4AF37` oro antiguo · `#B8860B` ámbar · `#2ECC71` verde energía
