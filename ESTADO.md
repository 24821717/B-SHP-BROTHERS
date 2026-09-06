# ESTADO — B-SHP BROTHERS

**Última actualización:** 2026-09-06
**Estado:** las **dos** páginas construidas y **PUBLICADAS** — la HOME (`/`) y la sales page
(`/thegame`). Pendiente: que Marcela las revise y que Fer confirme las reservas.

- **En vivo:** https://b-shopbrothers.netlify.app (home) ·
  https://b-shopbrothers.netlify.app/thegame/
- **Repo:** https://github.com/24821717/B-SHP-BROTHERS (público, rama `main`)
- **Netlify:** conectado y desplegando solo en cada `git push` a `main`.
  **Falta renombrar el sitio**: `b-shopbrothers` → `bshpbrothers` (nota nº 1 de Fer).

---

## Qué hay hoy

### 1. `/thegame` — sales page (construida el 04-sep, corregida el 06-sep)
Las 22 secciones del COPY MASTER de `fer.txt`, con todo el material del Drive integrado.
El **06-sep se aplicaron las siete correcciones** que mandó Fer en `RECOMENDACIONES/`.
El detalle, nota por nota, está en `docs/PROPUESTA-THEGAME.md` §8.

### 2. `/` — HOME institucional (construida el 06-sep) — **NUEVA**
Ya no es un placeholder. Es la home completa del mundo B-SHP, con las **once secciones + footer**
del **HOME AAA · MASTER COPY FINAL** (el que Marcela pasó el 06-sep, que sustituye a
`pagina ppal/pagppal.txt`) y la dirección visual del `BLUEPRINT.jpeg`.
Incluye **Brand Film** justo después del hero y **MEMBER ACCESS** ($1,111/año · $333/mes).
Comprobado: **151/151 frases del master, literales**. El detalle está en
**`docs/PROPUESTA-HOME.md`**.

```
FER PROYECT/
├── ESTADO.md                     ← este archivo
├── fer.txt                       ← copy master de /thegame (original, intacto)
├── RECOMENDACIONES/              ← las notas de Fer sobre /thegame (06-sep)
├── pagina ppal/                  ← material y copy master de la HOME
│   ├── pagppal.txt               ← MASTER COPY de la home
│   ├── BLUEPRINT.jpeg            ← el mockup de referencia
│   └── drive de contenido…/      ← los vídeos originales
├── contenido/ · contenido drive/ ← material original de /thegame (intacto)
├── originales-sustituidos/       ← respaldo de los assets que se cambiaron
├── docs/
│   ├── PROPUESTA-THEGAME.md      ← qué se construyó + §8 la ronda de correcciones
│   └── PROPUESTA-HOME.md         ← qué se construyó en la home + reservas
└── web/                          ← EL SITIO
    ├── index.html                ← LA HOME
    ├── thegame/index.html        ← LA SALES PAGE
    └── assets/{css,js,img,video}
```

---

## Cómo verlas

```bash
cd "/home/camilo23/FER PROYECT/web" && python3 -m http.server 3010
```

- **http://localhost:3010/** — la home
- **http://localhost:3010/thegame/** — la sales page

**Publicar en Netlify** (una sola vez; después se despliega solo en cada `git push`):
1. app.netlify.com → *Add new site* → *Import an existing project* → GitHub
2. Elegir el repo `24821717/B-SHP-BROTHERS`
3. No tocar nada: Netlify lee `netlify.toml` (publica `web/`, sin build) → *Deploy*

---

## Pendiente

### BLOQUEANTE para publicar la home
- [ ] **Falta la URL de alta de la membresía.** Los dos CTA principales de la home
      («ENTRAR A B-SHP BROTHERS», secciones 08 y 11) apuntan a `#` porque no existe checkout
      ni formulario para los **$1,111 MXN / año** ni los **$333 MXN / mes**. Están marcados con
      `data-pendiente="url-de-alta-membership"`. Sin ese enlace, el CTA más importante de la
      página no lleva a ningún sitio.

### Acción de Marcela
- [ ] **Revisar las dos páginas** antes de enviárselas a Fer.
- [ ] **Renombrar el sitio en Netlify: `b-shopbrothers` → `bshpbrothers`.**
      Es la nota nº 1 de Fer (*"Bshop es bshp sin la O"*) y **no se arregla en el código**:
      en el repo no hay ni una aparición de «bshop». Netlify → *Site configuration ›
      Change site name*.

### Respuestas que faltan de Fer
- [ ] Las dos del FAQ de `/thegame` marcadas **POR CONFIRMAR** (qué pasa después de pagar,
      y la política de garantía).
- [ ] ¿Se queda la sección **FOUNDER · Fernando Longoria** de `/thegame`? Su nombre se quitó
      del pie del VSL, que es donde marcó; la sección la pide el copy master.
- [ ] ¿**AGENTIA LABS** o **Agent.IA Lab**? La nota dice «quítale el .» pero escribe el punto.
      Se puso lo que dice el logo oficial: AGENTIA LABS.
- [ ] ¿Se queda **«Powered by AGENTIA LABS»** en el pie de la home? El master final no lo
      incluye en el copy del footer, pero estaba antes y Fer pidió corregirlo, no quitarlo.
- [ ] El clip *"Con este splash para la ppal"* **no se usó como splash**: el master final pide que
      el hero abra directo y prohíbe añadir secciones. Se usa como fondo de la sección THE WORLD.
- [ ] Los dos vídeos de `pagina ppal/` que **no se usaron** (`…23.22.44` y `…23.28.43`,
      este último con el rótulo «HÁBITAT» quemado): ¿son de B-SHP o material de referencia?

### Para publicar
- [ ] Links reales de Términos, Privacidad, Contacto y redes (hoy `#` en las dos páginas).
- [ ] Probar el checkout de Hotmart en el dominio real (el widget abre modal sólo en
      dominio publicado; en localhost cae al enlace directo).
- [ ] Si se quiere versionar el brief (`fer.txt`, `pagina ppal/`), pasar el repo a **privado**
      primero y quitar esas líneas de `.gitignore`.
- [ ] Material vertical (9:16) para hero y manifiesto de la home: el origen es 16:9 y el
      móvil hoy se resuelve con reencuadre, no con composición propia.
