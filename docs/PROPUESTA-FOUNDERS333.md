# FOUNDERS 333 — qué se construyó

**Fecha:** 18-sep-2026
**Origen:** `secciones nuevas/founders333/` — *FOUNDERS333 — MARCE BUILD HANDOFF AAA V1.0*
(`foundersbloc.txt`), el VISUAL ASSET PLAN de Fer
(`como quiere q se vea founders aprox....jpeg`) y el material del Drive.
**Estado:** 🔵 **BUILT** — no LIVE TEST. Falta conectar la base de leads.

---

## PARA FER · encender la captura de leads

La página está construida y los dos formularios funcionan. Lo único que falta es
**decir a dónde van los leads**. No hay ninguna credencial en el repositorio ni en
el navegador: se carga en el hosting, como la key de BLACKBRO.

Hay dos caminos. **Se elige uno.**

### A) Webhook — Make, Zapier, n8n, o un endpoint propio
```
Netlify → Site configuration → Environment variables → Add a variable
   FOUNDERS_WEBHOOK_URL    = https://hook.eu2.make.com/xxxxxxxx
   FOUNDERS_WEBHOOK_SECRET = (opcional) una contraseña tuya
```

### B) Airtable
```
   FOUNDERS_AIRTABLE_TOKEN = pat...
   FOUNDERS_AIRTABLE_BASE  = app...
   FOUNDERS_AIRTABLE_TABLE = Leads        ← el nombre de la tabla
```

Después: **Deploys → Trigger deploy → Clear cache and deploy site.**

Mientras no haya ninguno de los dos, la página **no miente**: dice en pantalla que
la lista todavía no está conectada y **conserva todo lo escrito**. Nadie se queda
creyendo que mandó algo que no salió.

---

## 1. Dónde está cada cosa

```
web/
├── founders333/index.html            ← LA PÁGINA (9 bandas + pie)
├── index.html                        ← HOME · nav, pie y la casilla del mapa de marcas
├── blackbro/index.html               ← nav y pie (el enlace que estaba comentado)
└── assets/
    ├── css/founders333.css           ← todo lo que FOUNDERS 333 añade
    ├── js/founders333.js             ← taxonomías, estado 04→08, los dos envíos
    ├── img/founders333/              ← lockups con alfa, cinemáticas, pósters, OG
    └── video/founders333/            ← hero · genesis · field · network

netlify/functions/founders-lead.mjs   ← EL ÚNICO SITIO QUE CONOCE EL TOKEN
scripts/dev.mjs                       ← + buzón local de leads (ver §7)
```

## 2. Las nueve bandas y su material

La página sigue el VISUAL ASSET PLAN tal cual: raíl izquierdo con número y nombre,
cuerpo, raíl derecho con el copy ambiente del propio plan. Es **la misma reja de
`/blackbro`**, a propósito: son dos páginas del mismo mundo.

| # | Banda | Asset del Drive | Master del handoff |
|---|-------|-----------------|--------------------|
| 01 | Hero · Genesis | `Builders_sitting_at_table` → `Builders_shaping_architectural` | HERO_TABLE → GENESIS_BUILDING |
| 02 | Esto es Genesis | `Orbital_sunrise_over_Earth` | GENESIS_EARTH_SPACE_MASTER |
| 03 | Dos formas de entrar | lockups `300 BUILDERS` y `33 ARCHITECTS` | *(ver §5)* |
| 04 | ¿Qué estás construyendo? | `Golden_topographic_field_animation` | sin imagen, por plan |
| 05 | La mesa | `e0d07f10…` | THE_TABLE_MASTER |
| 06 | El mundo | `7e11f195…` | WORLD_IN_CONSTRUCTION_MASTER |
| 07 | Construye con nosotros | — | *(ver §5)* |
| 08 | Lista Genesis | `781638b7…` | GENESIS_FINAL_MASTER |
| 09 | Señal recibida | `Network_lights_illuminating` | fondo abstracto, por plan |

**El hero cumple el brief al pie de la letra:** el plan pide *«TABLE → GENESIS
BUILDING, 8–9 s»*. Son dos clips distintos, así que se encadenan con un fundido de
un segundo. Dura **9,0 s** exactos, va en bucle, mudo y sin un solo carácter quemado
dentro del vídeo — el handoff lo prohíbe expreso.

**Los cuatro lockups** (`FOUNDERS 333`, `GEN 01 — GENESIS`, `300 BUILDERS`,
`33 ARCHITECTS`) llegaron en PNG sobre negro sólido. Se les dio canal alfa y se
recortaron a su caja real, para que apoyen sobre el vídeo sin arrastrar un rectángulo
negro ni márgenes falsos. **No se rehicieron con tipografía**: son masters aprobados.

**Peso:** los cinco vídeos del Drive sumaban 21 MB a 7,4 Mbps, que es muchísimo para
720p. Reencodados suman **7,1 MB** sin pérdida visible. El hero carga con `metadata`;
los otros tres son perezosos y hasta que se acercan sólo se ve su póster.

## 3. Los dos journeys, separados

El handoff es tajante: *«No mezclar los formularios»*. No se mezclan en ningún punto
del recorrido, y tampoco en la base.

```
GENESIS      04 (guarda) → 08 (completa y envía) → 09 Señal recibida
PARTNERSHIP  07 «Hablemos» → formulario propio → confirmación en su sitio
```

Los dos entran por el mismo endpoint y salen etiquetados por `lead_type`. El servidor
valida cada tipo con sus campos obligatorios: si llega un `lead_type` que no existe,
se rechaza.

| GENESIS | PARTNERSHIP |
|---|---|
| `name` · `email` · `country` | `name` · `email` |
| `builder_category` · `what_are_you_building` | `company_project` · `what_do_you_want_to_build` |
| `bottleneck` (si existe) · `whatsapp` | `whatsapp` |
| `source` · `campaign` · `created_at` | `source` · `campaign` · `created_at` |

**El formulario de partnership nace cerrado** y lo abre «Hablemos». Quien viene a la
Lista Genesis no se lo tropieza por el camino. Y **no se manda a WhatsApp**: primero se
captura el lead, después el follow-up lo hace una persona.

## 4. El estado entre la 04 y la 08

Es la pieza que pide el handoff y la que más fácil se rompe, así que va explícita:

- La **Section 04 no envía nada**. Guarda categoría, respuesta y bottleneck en
  `sessionStorage` y sigue el scroll. Acompaña la visita y se va con ella: no es un
  perfil guardado en el navegador de nadie.
- La **Section 08 los recupera** y los enseña: *ESTÁS CONSTRUYENDO → [CATEGORÍA]*,
  la respuesta, y un **EDITAR** que devuelve a la 04 con todo relleno.
- **Si alguien se salta la 04**, la 08 pide categoría y respuesta como obligatorias,
  en su sitio. Nunca se envía un lead a medias.
- **Un error no borra nada.** Ni de la 04, ni de la 08, ni del de partnership.
  Se dice qué falta, se señala el campo y lo escrito sigue donde estaba.

## 5. Decisiones que tomé — y por qué

**Los dos masters cinematográficos que faltan.** `300_BUILDERS_MASTER` y
`33_ARCHITECTS_MASTER` no venían en el Drive, y la banda 07 no tiene master asignado
en el handoff (el plan visual sí enseña una imagen). El handoff manda: *«Si falta
alguno al empezar, usar placeholder limpio y continuar build. No bloquear
estructura/forms por un derivative visual.»* Así que:
- La **03** monta cada rol sobre el sistema oscuro con su lockup aprobado. Entra la
  foto el día que exista, sin tocar nada más.
- La **07** va sin imagen. Se sostiene: es la banda más textual de la página.

**No inventé imágenes.** Podría haber sacado fotogramas de los vídeos para rellenar
esos huecos, pero el handoff dice *«No crear nuevas imágenes»* y un fotograma de otro
clip es exactamente eso.

**La confirmación de partnership.** El handoff escribe el success de GENESIS
(«SEÑAL RECIBIDA · TU INTERÉS EN GEN 01 HA SIDO REGISTRADO») pero no el de
partnership, y ese texto no sirve: quien escribe por ahí no está pidiendo entrar a
GEN 01. Se usa el mismo registro, con la frase mínima adaptada
(*«Revisaremos lo que quieres construir con nosotros»*). **Es la única línea de la
página que no sale literal del handoff.** Se cambia en una línea de `founders333.js`.

**Dónde entra en el sitio.** La nota original de Fer decía que las dos secciones
nuevas *«salen de la ppal»*. En la home, **Founders 333 ya existía** como una de las
nueve marcas del ecosistema: esa casilla era decorativa y ahora es la puerta. Más el
enlace de la nav y el del pie. En `/blackbro` se descomentó el enlace que quedó
escrito el 17-sep esperando justo este día.

**`sessionStorage`, no `localStorage`.** El handoff deja elegir. Session es lo
correcto: es el hilo de una visita, no un perfil que deba sobrevivir en el navegador
de un ordenador compartido.

## 6. Tracking

Los seis eventos del handoff, al mismo canal que el resto del sitio (`dataLayer` +
`bshp:track`).

| Evento | Cuándo | Metadata |
|---|---|---|
| `founders_view` | la página entra en pantalla | — |
| `founders_waitlist_start` | CTA a la lista, y al guardar la 04 | `cta_location`, `entry_section`, `builder_category`, `device_type` |
| `founders_waitlist_submit` | lead GENESIS aceptado | `builder_category`, `country`, `source`, `campaign`, `device_type` |
| `founders_partner_click` | se abre el formulario de la 07 | `cta_location`, `device_type` |
| `founders_partner_submit` | lead PARTNERSHIP aceptado | `source`, `campaign`, `device_type` |
| `founders_form_error` | cualquier fallo de envío | `error_type`, `device_type` |

**Nada personal sale hacia analítica.** Ni nombre, ni email, ni WhatsApp, ni una sola
palabra del texto libre. Sólo categoría, país, origen y tipo de dispositivo, que es
justo lo que el handoff autoriza.

## 7. Cómo verlo en local

```bash
cd "/home/camilo23/FER PROYECT" && node scripts/dev.mjs
```

- **http://localhost:3010/founders333/**

Sin base configurada, `scripts/dev.mjs` apunta la función a un **buzón local**: el
formulario se puede recorrer entero —validación, envío, estado de éxito— y los leads
de prueba caen en **`.dev-leads.jsonl`**, que no se versiona. Así se prueba el journey
completo sin conectar nada ni gastar una fila de la base real.

Para probar contra la base de verdad, basta con exportar las variables antes de
arrancar (o ponerlas en `.env`, que tampoco se versiona).

## 8. QA hecho

- **55 de 55 frases** del copy congelado, presentes y literales.
- **Lista NO PUBLICAR, limpia**: ni precios, ni equity, ni ownership, ni revenue
  share, ni Founder Pool, ni governance, ni token/NFT, ni countdown, ni «spots
  remaining». **«300 FOUNDERS» no aparece**: el rol es BUILDER.
  Tampoco se cuelan Agent.IA, Axochi ni HRC en la banda 06.
- Las palabras prohibidas del success —«WELCOME FOUNDER», «FELICIDADES», «YA ERES
  PARTE», «TU LUGAR ESTÁ RESERVADO»— **no existen en la página**.
- Los dos journeys, probados de punta a punta contra el buzón local, y comprobado
  que llegan **etiquetados por separado**.
- Rechazos comprobados: email inválido, `lead_type` inventado, método GET, y el freno
  por IP (6 envíos por minuto).
- HTML sin etiquetas sin cerrar ni anidados rotos. **Todo elemento que nace oculto
  tiene su regla `[hidden]`**: es el fallo exacto que se coló con el modal de GOODS.
- Ni un asset ni un enlace roto, ni en `/founders333` ni en las páginas que toqué.

## 9. Lo que falta para LIVE TEST

- [ ] **A dónde van los leads.** Es lo único que separa la página de funcionar de
      verdad. §0 de este documento.
- [ ] **QA en desktop y móvil de verdad**, con dedos y con navegador. El handoff lo
      pide expreso después del build.
- [ ] `300_BUILDERS_MASTER`, `33_ARCHITECTS_MASTER` y el visual de la 07.
- [ ] Si Fer quiere aviso por email en cada lead: lo da el propio webhook (Make,
      Zapier) o una automatización de Airtable. No hace falta tocar código.
