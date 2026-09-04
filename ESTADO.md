# ESTADO — B-SHP BROTHERS · /thegame

**Última actualización:** 2026-09-04
**Estado:** v1 en GitHub, lista para desplegar en Netlify y enseñarle a Fer.

- **Repo:** https://github.com/24821717/B-SHP-BROTHERS (público, rama `main`)
- **Netlify:** pendiente de conectar (ver más abajo). Config ya lista en `netlify.toml`.

---

## Qué se hizo

Landing completa de **bshpbrothers.com/thegame**, construida con el COPY MASTER AAA de
`fer.txt` (las 22 secciones, íntegro) y el look de la referencia visual que mandó el cliente
(`contenido/lo que quiere el cliente aprox.jpeg`): negro obsidiana + oro, cinematográfico,
tipografía luxury.

Todo el material del Drive está integrado: trailer, VSL, splash como fondo del hero,
personajes, logos, marcos y adornos dorados.

## Dónde está

```
FER PROYECT/
├── ESTADO.md                  ← este archivo
├── fer.txt                    ← brief + copy master (original, no se tocó)
├── contenido/                 ← material original (no se tocó)
├── contenido drive/           ← material original del Drive (no se tocó)
├── docs/
│   ├── PROPUESTA-THEGAME.md   ← qué se construyó, decisiones y pendientes para Fer
│   └── referencia-cliente.jpeg
└── web/                       ← EL SITIO
    ├── index.html             ← placeholder de la home (bshpbrothers.com)
    ├── thegame/index.html     ← LA PÁGINA (/thegame)
    ├── assets/{css,js,img,video}
    └── README.md              ← cómo verla y cómo publicarla
```

## Cómo verla

**En local:**
```bash
cd "/home/camilo23/FER PROYECT/web" && python3 -m http.server 3010
```
→ http://localhost:3010/thegame/

**Publicar en Netlify** (una sola vez; después se despliega solo en cada `git push`):
1. app.netlify.com → *Add new site* → *Import an existing project* → GitHub
2. Elegir el repo `24821717/B-SHP-BROTHERS`
3. No tocar nada: Netlify lee `netlify.toml` (publica `web/`, sin build) → *Deploy*
4. La URL para Fer será `https://<nombre>.netlify.app/thegame`

## Pendiente

- [ ] Que **Marcela** la revise antes de enviársela a Fer.
- [ ] Dos respuestas del FAQ marcadas **POR CONFIRMAR** (el copy master lo exige):
      "¿Qué pasa justo después de pagar?" (QA end-to-end) y "¿Hay garantía?" (política real).
- [ ] Links reales de Términos, Privacidad, Contacto y redes sociales (hoy `#`).
- [ ] Probar el checkout de Hotmart en el dominio real (el widget abre modal sólo en
      dominio publicado; en localhost puede caer al fallback de enlace directo).
- [ ] Si se quiere versionar también el brief (`fer.txt`) y los originales del Drive,
      pasar el repo a **privado** primero (Netlify funciona igual con repos privados).
- [ ] Segunda fase: la home `bshpbrothers.com` completa (hoy es un placeholder).
