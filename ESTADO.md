# ESTADO — B-SHP BROTHERS

**Última actualización:** 2026-09-17
**Estado:** **tres** páginas: la HOME (`/`), la sales page (`/thegame`) y **BLACKBRO
(`/blackbro`) — nueva, 17-sep, en local**. Las dos primeras están publicadas.
BLACKBRO está 🔵 BUILT: falta la `DIFY_API_KEY` de Fer para probar P0 y darla por E2E PASS.
Detalle en **`docs/PROPUESTA-BLACKBRO.md`**.

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
├── secciones nuevas/             ← brief de las 2 secciones que pidió Fer (16-sep)
│   ├── blackbro/                 ← copy master V1.1 + mockup + assets del Drive
│   └── founders333/              ← VACÍA: falta que Fer mande el material
├── netlify/functions/
│   └── blackbro-chat.mjs         ← EL ÚNICO SITIO QUE CONOCE LA API KEY DE DIFY
├── scripts/dev.mjs               ← servidor local que SÍ ejecuta la función
└── web/                          ← EL SITIO
    ├── index.html                ← LA HOME
    ├── thegame/index.html        ← LA SALES PAGE
    ├── blackbro/index.html       ← BLACKBRO
    └── assets/{css,js,img,video}
```

---

## Cómo verlas

```bash
cd "/home/camilo23/FER PROYECT" && node scripts/dev.mjs
```

- **http://localhost:3010/** — la home
- **http://localhost:3010/thegame/** — la sales page
- **http://localhost:3010/blackbro/** — BLACKBRO

> Ojo: para BLACKBRO ya **no sirve** `python3 -m http.server`. El chat necesita que
> alguien ejecute la función que habla con Dify, y eso lo hace `scripts/dev.mjs`.
> Para probar el chat de verdad: `DIFY_API_KEY=app-xxxx node scripts/dev.mjs`.
> Sin key, la página se ve igual y el chat avisa de que aún no está conectado.

**Publicar en Netlify** (una sola vez; después se despliega solo en cada `git push`):
1. app.netlify.com → *Add new site* → *Import an existing project* → GitHub
2. Elegir el repo `24821717/B-SHP-BROTHERS`
3. No tocar nada: Netlify lee `netlify.toml` (publica `web/`, sin build) → *Deploy*

---

## Pendiente

### BLOQUEANTE para que BLACKBRO funcione
- [ ] **La `DIFY_API_KEY`.** La pone **Fer**, en Netlify → *Site configuration →
      Environment variables*, y después *Trigger deploy → Clear cache and deploy*.
      No pasa por el repo, ni por el navegador, ni por WhatsApp. Los tres pasos
      están escritos para él al principio de `docs/PROPUESTA-BLACKBRO.md`.
- [ ] **ACCESS RULE:** ¿BLACKBRO V1 es público, acceso B-SHP, beta o gated?
      No bloquea el build; **sí bloquea LIVE**. Hasta que se decida, no hay FAQ de
      precio, membresía, disponibilidad ni elegibilidad (las tres preguntas están
      escritas y comentadas dentro de `web/blackbro/index.html`).
- [ ] **Production wordmark master** de BLACKBRO (vectorizable + exports). Los PNG
      del Drive se usan como están, sin rediseñar: sirven en negro, tienen halo de
      color en los bordes.
- [ ] **Founders333:** la segunda sección que pidió Fer. La carpeta está vacía.

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
- [x] ~~Redes~~ — hechas el 07-sep (IG, TikTok, YouTube, X, WhatsApp) en las dos páginas.
- [ ] Links reales de Términos, Privacidad y Contacto (hoy páginas `/legal/…` sin contenido).
- [ ] Probar el checkout de Hotmart en el dominio real (el widget abre modal sólo en
      dominio publicado; en localhost cae al enlace directo).
- [ ] Si se quiere versionar el brief (`fer.txt`, `pagina ppal/`), pasar el repo a **privado**
      primero y quitar esas líneas de `.gitignore`.
- [ ] Material vertical (9:16) para hero y manifiesto de la home: el origen es 16:9 y el
      móvil hoy se resuelve con reencuadre, no con composición propia.


---

## Ronda 2026-09-06 (tarde) · sin publicar todavía

Aplicadas **las 6 correcciones de `/thegame`** (las imágenes de `RECOMENDACIONES/`)
y **las 13 instrucciones de la HOME** (`RECOMENDACIONES/Nuevo Documento de texto.txt`,
que es la dirección final de HOME, no de The Game).

Detalle completo en `docs/PROPUESTA-THEGAME.md` §9 y en `docs/PROPUESTA-HOME.md`.

**Todo está en local, SIN commit ni push, para no gastar despliegues de Netlify.**

Para verlo:
```bash
cd "/home/camilo23/FER PROYECT/web" && python3 -m http.server 3010
```
- http://localhost:3010/ → HOME
- http://localhost:3010/thegame/ → THE GAME

### Bugs reales encontrados y corregidos
- **El “texto superpuesto no se ve bien” tenía dos causas.** La franja
  “POWERED BY AGENTIA LABS” venía incrustada en la imagen `gate-banner.jpg`
  (recortada), y sobre todo: `.finale` no es `.sec`, así que su `.wrap` no
  heredaba `z-index:2` y **todo el copy del cierre quedaba debajo del velo
  oscuro**. Corregido.
- El modal de las fichas de GOODS salía abierto al cargar: un `display:grid`
  anulaba el atributo `hidden`. Corregido con `.ficha[hidden]{display:none}`.
- Se retiró una imagen con el logo **HÁBITAT** (otra marca inmobiliaria).

### BLOCKER pendiente del cliente
1. Texto del aviso de privacidad.
2. Texto de términos y condiciones.
3. Datos de contacto reales.
4. ~~URLs de las 5 redes sociales~~ → resueltas el 07-sep.

Las rutas legales ya existen (`/legal/…`) para que ningún enlace quede muerto,
pero **no se redactó contenido legal**: cada página dice que está pendiente.


---

## Ronda 2026-09-07 (noche) · HOME · sin publicar todavía

Aplicadas las **9 instrucciones** del bloc de notas actualizado
(`RECOMENDACIONES/Nuevo Documento de texto.txt`, guardado el 07-sep a las 20:39)
más las imágenes nuevas de esa misma carpeta. **Todo en local, sin commit ni push.**

1. **Black Sheep** — «Ese es el punto.» sube a la columna de texto, justo debajo de
   «No tienes que pensar como nosotros.» Ya no queda partido a media pantalla.
2. **The Brothers** — fuera «Emprendedores. Creativos. Profesionales. Constructores.»;
   la lista de siete viñetas (con «Wins.») pasa a dos líneas:
   «Negocios. Ideas. Viajes. Colaboraciones.» / «Errores. Conversaciones. Y sí, echar cotorreo.»
3. **Los negocios pasan entre personas** — el título pasa a ser
   «Primero las personas. / Después, los negocios.» y desaparece el remate repetido del final.
4. **El ecosistema B-SHP** — título nuevo: «El mundo es más grande afuera.» + una línea:
   «Proyectos, lugares y experiencias construidos para jugar en el mundo real.»
   Las **6 fichas** (Brothers, Business, Lifestyle, Experiences, Goods, The Game) estrenan
   las 6 imágenes con nombre de `RECOMENDACIONES/`.
5. **Esto no vive dentro de una pantalla** — la rejilla de 6 experiencias se sustituye por
   las **9 marcas del ecosistema** (imágenes `1..9`, `assets/img/marcas/`):
   B-SHP Brothers · Founders 333 · Agent.IA Labs · High Rollers Club · Axochi ·
   Signara.AI · Crypto Munch · Transilvania · The Nox Circle.
6. **Sección nueva: BEHIND THE WORLD · Fer Longoria** — justo después de la anterior,
   con la foto `fotoseccionnueva.jpeg` y el texto que mandó el cliente, firma incluida.
7. **The Game** — el botón pasa a «Entrar a The Game — $111 MXN →» (sigue a `/thegame`).
8. **Cierre** — «…Solo necesitabas **un mundo más grande**.»
9. **Redes reales** en las dos páginas (Instagram, TikTok, YouTube, X y WhatsApp).
   El icono de **Spotify se sustituye por WhatsApp**: era el único de los cinco sin enlace
   y WhatsApp era el que faltaba. `/thegame` no tenía X: se le añadió.

**Goods** (respuesta de Marcela, no venía en el bloc): se añade el **termo** como pieza nueva
con `catalogo2.jpeg`, se sustituye la foto de la **sudadera** por `catalogo1.jpeg` y la de la
**gorra** por `catalogo.jpeg` (misma toma, mejor resolución), y el catálogo se reordena a
6 piezas en dos filas de tres: 01 Camiseta · 02 Sudadera · 03 Gorra · 04 Bucket · 05 Termo · 06 Taza.

Las imágenes sustituidas están respaldadas en `originales-sustituidos/ronda-07sep/`.

### Pendiente de esta ronda
- [ ] **Que Marcela lo revise** en local antes de publicar (no se ha hecho push).
- [ ] El subtítulo de la pieza **Termo** («El día largo también se juega») es texto mío:
      todas las demás piezas llevan uno y el cliente no mandó el suyo. Cambiar si no gusta.
- [ ] En «Los negocios pasan entre personas», la frase manuscrita sobre la foto dice lo mismo
      que el título nuevo. Se dejó porque el cliente no pidió quitarla, pero se repite en pantalla.
- [ ] Sigue **sin resolverse la URL de alta de la membresía** (los CTA de $1,111/año y $333/mes).

Para verlo:
```bash
cd "/home/camilo23/FER PROYECT/web" && python3 -m http.server 3010
```
- http://localhost:3010/ → HOME
- http://localhost:3010/thegame/ → THE GAME


---

## Ronda 2026-09-07 (noche, 2ª parte) · /thegame · sin publicar todavía

Aplicadas **solo** las partes nombradas en el bloc de notas y en `RECOMENDACIONES/`.
Nada más se tocó. **Todo en local, sin commit ni push.**

- **Hero** — fuera el botón «Ver el trailer», fuera la frase lateral y fuera «Comunidad B-SHP»
  de la lista de confianza. El texto pasa a «THE GAME es un sistema de ejecución de 7 días…» +
  «Define tu Player…», y los tags a **7 días · 3 No Negociables · 1 Marcador**.
  (La sección 02 — El trailer sigue existiendo; solo desaparece el enlace desde el hero.)
- **01 — La tensión** — copy nuevo completo («Sabes lo que tienes que hacer. / Pero no siempre
  lo haces.» … «Menos consumo. Más evidencia.») e **imagen sustituida** por `remplazar.jpeg`.
- **06 — Product reveal** — copy nuevo; la secuencia pasa a `Observa → Decide → Ejecuta → Registra`.
- **07 — Player Setup** — la lista de 8 entregables se sustituye por los **4 pasos de configuración**
  (Define tu Player · Alter Ego · 3 No Negociables · Marcador) + remate
  «Tu Player no se define por lo que promete…».
- **08 — Black Sheep Test** — cabecera nueva, las 5 coordenadas se quedan solo con emoji + nombre +
  verbo, y el cierre lleva a «¿Qué está frenando mi Juego?».
- **09 — Bottleneck** — copy nuevo completo, ya sin la parte de Alter Ego, e **imagen sustituida**
  por `09 THE BOTTLENECK CAMBIAR IMAGEN.jpeg`.
- **10 — 3 No Negociables** — se mantiene el titular y las 3 cards; **solo cambia el cierre**
  («Nada heroico…», «Cada No Negociable pasa por cuatro filtros», «Eliges lo que tu Player…»).
- **13 — Founding Player Price** — copy reducido al que mandó el cliente.
- **14 — Comunidad** — desaparece la mención a Skool: «La experiencia está diseñada alrededor
  del movimiento».
- **16 — El origen** — cambio único: `Registra → Observa → Ajusta → Vuelve`. Nada más.
- **17 — La decisión** — el fondo fijo pasa a **vídeo en bucle** (`fondoanimado.mp4` →
  `assets/video/decision-loop.mp4`, con póster).
- **18 — Oferta final** — se quita «+ comunidad B-SHP correspondiente al producto» y el lockup
  fijo pasa a **vídeo en bucle** (`imagen final.mp4` → `assets/video/oferta-final.mp4`,
  reencodado a 1120 px sin audio, 7,2 MB → 4,0 MB, con póster).
- **19 — FAQ** — se queda en **5 preguntas**. Se eliminan «¿Dónde se entrega?»,
  «¿Qué pasa justo después de pagar?» y «¿Hay garantía?», y de la primera se quita
  «y la capa de ejecución y comunidad correspondiente».

Respaldo de la imagen sustituida en `originales-sustituidos/ronda-07sep-thegame/`.

### Esto resuelve tres pendientes viejos
- Las dos FAQ marcadas **POR CONFIRMAR** ya no están: Fer decidió eliminarlas.
- La promesa de Skool/comunidad desaparece de hero, 07, 13, 14, 18 y FAQ, que era justo
  lo que estaba abierto mientras no se cierre el journey Hotmart → Skool.

### Criterio aplicado donde el bloc no lo decía letra por letra
- Se conservó la numeración de los antetítulos («01 — La tensión», «09 — Bottleneck»…).
- Se conservaron los botones de compra de cada sección: el bloc daba el copy, no pedía quitarlos.
- En 08 se retiraron las dos tarjetas «Black Sheep Test pregunta / Alter Ego pregunta»: el copy
  nuevo termina en esa misma pregunta y quedaban repetidas.
- En 13 se retiró el precio grande tachado ($111 / $333) porque el copy nuevo ya trae la
  comparativa una sola vez.


---

## Ronda 2026-09-07 (noche, 3ª parte) · GOODS con cobro en USD · sin publicar

La sección **B-SHP Goods** de la home deja de ser un escaparate: queda montada como
tienda, **apagada**, a la espera de los precios y los enlaces de Fer.

- Cada pieza tiene ahora **precio + botón «Comprar»** en lugar del sello «Próximamente»,
  tanto en la rejilla como en la ficha ampliada.
- La pasarela recomendada es **Stripe con Payment Links**: cobra en dólares desde
  México y no necesita servidor, así que el sitio sigue siendo estático en Netlify.
  El razonamiento completo, los requisitos de alta y la alternativa (Mercado Pago,
  si acepta cobrar en pesos) están en **`docs/PAGOS-GOODS.md`**.
- Todo se enciende desde un único bloque `GOODS` al final de `web/assets/js/home-v2.js`.
  **Una pieza sólo sale a la venta si tiene precio Y enlace**: si falta cualquiera de
  los dos sigue mostrando «Próximamente». Imposible publicar un precio sin cobro
  detrás, o al revés.
- Para verlo montado sin datos reales: abrir la home con **`?demo=1`**. Rellena precios
  de ejemplo, avisa en pantalla de que es una prueba y no cobra nada.
- Detalle técnico: el marco de la ficha pasó del `<button>` al `<article>`, porque un
  enlace de compra no puede vivir dentro de un botón. El comportamiento visual es idéntico.

### Bloqueante para vender
- [ ] **Los seis precios en USD y los seis Payment Links** de Fer (tabla en
      `docs/PAGOS-GOODS.md` §3).
- [ ] **Tallas reales** de camiseta, sudadera, gorra y bucket: van como campo
      personalizado dentro de cada Payment Link.
- [ ] **A dónde se envía y a qué precio** (tarifas de envío en Stripe).
- [ ] **Devoluciones, envíos, privacidad, términos y datos fiscales**: vendiendo
      producto físico dejan de ser opcionales y `/legal/…` sigue vacío.


---

## Ronda 2026-09-08 (mediodía) · repaso de Marcela en móvil · sin publicar

Cuatro correcciones sobre el sitio ya publicado, vistas desde el móvil:

1. **AGENTIA LABS, sin punto** — en la ficha de la marca 03 y en el pie de la sección
   de Fer decía «Agent.IA Labs». **Esto ya se había corregido antes**: se coló otra vez
   al copiar el bloc de notas literalmente, que lo escribe con punto.
   Para que no vuelva a pasar se crea **`docs/CORRECCIONES-APLICADAS.md`**: el registro
   de decisiones cerradas, que hay que leer antes de aplicar cada tanda nueva. Si el
   bloc contradice ese registro, gana el registro.
2. **«Hola. Soy Fer Longoria.»** iba todo en una línea y en móvil quedaba pegado.
   Ahora «Hola.» va en su propia línea.
3. **La tira de fotos bajo The Brothers repetía** las imágenes de Brothers y Lifestyle
   del ecosistema. Pasa a usar las fotos de experiencias (viajes, ciudades,
   entrenamiento, encuentros), que quedaron libres al montar las 9 marcas.
   Comprobado: ya no hay ninguna imagen repetida en la home salvo el logo.
4. **/thegame · 03** — «No con más motivación.» y «Con una partida.» iban pegadas
   en la misma línea. Separadas.


---

## Ronda 2026-09-08 (tarde) · sin publicar

1. **Volver a la home desde /thegame.** El enlace existía, pero vivía **dentro del menú
   plegable**: en móvil no se veía sin abrir la hamburguesa, que es justo donde Marcela
   lo echó en falta. Ahora es un botón propio en la barra, **fuera del menú y siempre
   visible**; por debajo de 560 px se queda sólo con la flecha para que quepa.
2. **«The Game» del menú de la home** lleva a la sección `#thegame` en vez de saltar a
   la sales page. A la sales page se sigue entrando por el CTA de esa sección
   («Entrar a The Game — $111 MXN»), que es el embudo correcto. *(El cambio ya estaba
   hecho en el archivo local; queda confirmado y sale con este push: en vivo todavía
   está el enlace viejo.)*
3. **Camiseta de Goods**: sustituida por la foto correcta (`esta es la playera
   correcta.jpeg`, la del delantero + espalda con «MIS REGLAS. MI JUEGO.»). La anterior
   queda en `originales-sustituidos/ronda-07sep/camiseta-anterior.jpg`.

El enlace «The Game» del **pie** de la home sigue apuntando a la sales page: en un
footer lo normal es enlazar la página, y el bloc sólo hablaba del menú de arriba.


---

## Ronda 2026-09-08 (tarde-noche) · legales publicados · sin publicar todavía

### 1. Aviso de privacidad y Términos y condiciones — **ya no son placeholders**
Publicados íntegros los dos textos que mandó el cliente, maquetados con el lenguaje
visual del sitio: `/legal/privacidad.html` (15 apartados) y `/legal/terminos.html`
(23 apartados). Comprobado apartado por apartado contra el original.

**Se quitaron tres párrafos**, y sólo tres: son notas del redactor dirigidas al
cliente, no articulado que deba leer un usuario. Quedan aquí por si se quieren
recuperar:

1. §1 de Términos — *«Antes de publicación definitiva recomendamos sustituir
   "Fernando L. G." por el nombre legal completo y completar el domicilio con
   municipio, estado y código postal.»*
2. §6 de Términos — *«PROFECO considera el monto total a pagar, precios en moneda
   nacional y formas de pago entre los elementos relevantes de transparencia para una
   tienda virtual.»*
3. §13 de Términos — *«Este punto es importante: no recomiendo publicar una cláusula
   genérica de "NO HAY REEMBOLSOS BAJO NINGUNA CIRCUNSTANCIA"…»*

### 2. Contacto
`/legal/contacto.html` deja de ser un placeholder: lleva el correo, los datos del
responsable, los tres asuntos de solicitud («Solicitud ARCO», «Limitación de datos
personales», «Revocación de consentimiento») y las redes. **No venía en el bloc**: se
montó con los datos que el propio bloc aporta, para que ningún enlace del pie siga
muerto. Fácil de revertir si no se quiere.

### 3. Enlaces legales
En `/thegame` los tres enlaces del pie apuntaban a `#`. Ya van a las páginas reales.
En la home ya estaban bien. **Ningún enlace legal queda muerto en el sitio.**

### 4. Las cuatro fotos de la tira
Sustituidas por `remplazo1..4` (`assets/img/home/tira-1..4.jpg`). Comprobado: sigue sin
haber ninguna imagen repetida en la home salvo el logo. Las seis `exp-*.jpg` quedan sin
uso pero no se borran, por si se quieren recuperar.

### 5. Tres espaciados
El highlight de Black Sheep, la lista de Lifestyle y la escalera de los negocios iban
pegados a la frase que los introduce. Ahora respiran más que un párrafo normal: son un
cambio de registro, no la línea siguiente. Una sola regla para los tres.

### Pendiente del cliente sobre los legales
- [ ] **El nombre legal completo** en lugar de «Fernando L. G.», y el **domicilio con
      municipio, estado y código postal**. Lo pedía la propia nota del redactor.
- [ ] Ojo: el Aviso de Privacidad §5 y los Términos §8 **mencionan Skool** como posible
      proveedor. No contradice la decisión de no prometer comunidad en la página de
      venta —una cosa es divulgar proveedores en un texto legal y otra prometer una
      capa de producto—, pero conviene que Fer lo sepa.
- [ ] Falta **política de envíos y devoluciones para producto físico** (los Goods).
      Los Términos actuales están escritos para producto digital.


---

## Ronda 2026-09-08 (18:00) · /thegame · sin publicar todavía

- **#01 — La tensión** — fuera el CTA «Empezar a demostrarlo». La sección queda
  cerrada sin llamada a la acción, como pidió el cliente.
- **#03 — El problema real** — el remate viejo («Ahí está la distancia…») se sustituye
  por el nuevo: «Y ahí está el problema. / Puedes saber exactamente qué hacer y seguir
  sin hacerlo. / THE GAME no existe para darte más información. Existe para convertir
  una decisión en ejecución. / Porque saber no cuenta. Hacer sí.»
- **#18 — Oferta final** — el loop de la explosión se sustituye por el de la **nave
  espacial** (`nave espacial.mp4`, reencodado sin audio a su tamaño nativo: 3,9 → 3,0 MB).
- **CLOSING FINAL** — reconstruido:
  - Fuera el fondo fijo (`gate-banner.jpg`) y fuera el lockup: en su lugar, el **loop de
    la explosión** de fondo. Es el mismo vídeo que estaba en el §18, así que se reutiliza
    el archivo ya optimizado; no se sube peso nuevo.
  - Titular central nuevo: **«La intención no cuenta. La evidencia cuenta.»**
  - **Se retiran los dos textos inclinados** de los lados, que decían exactamente esa
    misma frase. *Decisión consultada con Marcela*: con el titular puesto, la frase
    salía dos veces en móvil y tres en escritorio.
  - **Botón de volver a la home** al final de la sección.
  - Se queda todo lo demás: «7 días · Sin promesas · Solo evidencia», el botón de compra,
    el Founding Player Price y «Si no entras, que sea porque decidiste no entrar».


---

## Ronda 2026-09-08 (18:30) · limpieza de assets

Se retiran del repo los 14 archivos que ya no usa ninguna página: **8,2 MB menos**.
`web/` pasa de 116 a 108 MB.

Qué se fue y por qué:

| Archivo | Por qué sobra |
|---|---|
| `lockup-thegame-v2.png` | el cierre y el §18 son vídeo desde hoy |
| `sheep-gamer.png` | lo sustituyó `bottleneck.jpg` en el §09 |
| `bg-earth.jpg` | el §17 pasó a fondo animado |
| `exp-{viajes,mesas,ciudades,entrenamiento,construccion,encuentros}.jpg` | la rejilla es de marcas y la tira estrenó fotos |
| `splash.mp4` + `splash-poster.jpg` | el clip de splash nunca se usó |
| `altar-pina.{jpg,png}`, `product-showcase.jpg` | restos de la v1 de /thegame |

**Comprobación:** 82 archivos en disco, 82 referenciados, cero huérfanos y cero
referencias rotas. Además se pidió cada uno de los 82 al servidor local: todos 200.

Dos apuntes:

- **No se reescribió la historia de git.** Los archivos siguen recuperables con
  `git show <commit>:<ruta>`, y además hay copia local en
  `originales-sustituidos/retirados-08sep/`. Reescribir la historia habría hecho falta
  para bajar el tamaño de `.git`, pero eso rompe el clon de quien administra el servidor
  de Fer, que ya tiene el repo. No compensa.
- El peso real del sitio sigue estando en `vsl.mp4` (28 MB) y `trailer.mp4` (19 MB).
  Si hace falta adelgazar de verdad, ahí está el margen: se reencodan sin que se note.


---

## Ronda 2026-09-08 (19:00) · corrección del cierre + medición de los vídeos

### El cierre, bien entendido esta vez
La orden era **quitar el fondo y sustituir la imagen por el loop**, no poner el loop
de fondo. Corregido: la sección **ya no tiene fondo** y el loop de la explosión ocupa
**el sitio exacto que tenía el lockup** (mismo ancho: `min(84%,640px)`), centrado sobre
el negro. El titular, el botón de volver y todo lo demás se quedan como estaban.

### Reencodar `vsl.mp4` y `trailer.mp4`: **no se hace**, y está medido
Yo mismo lo había propuesto suponiendo que estaban gordos. No lo están:
1920×1080 a 60 fps con **2,9 y 3,5 Mbps**. Para 1080p60 eso ya es un encode ajustado
(lo habitual son 6–12 Mbps).

Prueba sobre un tramo de 15 s del VSL:

| | Tamaño | Contra el original |
|---|---|---|
| Original | 5,15 MB | — |
| Reencodado CRF 23 | 5,56 MB | **+8 %** |
| Reencodado CRF 20 | 7,21 MB | **+40 %** |

Reencodar sin perder calidad **engorda el archivo**, porque sería una segunda pasada
con pérdidas encima de una primera ya apretada. Para que adelgazara habría que bajar
de CRF 23, y ahí sí se degrada. Se quedan como están.

Lo único que los bajaría de verdad es reducir la resolución a 1280 —los reproductores
no pasan de 1060 px de ancho—, pero eso se nota en pantalla completa. Queda anotado por
si algún día pesa más la velocidad que el detalle.


---

## Ronda 2026-09-08 (20:00) · dos correcciones

### 1. El §18 sí tenía la nave, pero nadie la veía: era la caché
El archivo del servidor era el correcto —comprobado extrayendo un fotograma: la nave
sobre la Tierra—, pero seguía llamándose `oferta-final.mp4`, el mismo nombre que antes
tenía la explosión. Y `/assets/video/*` se sirve con
`Cache-Control: max-age=31536000, immutable`: con `immutable` el navegador **ni
siquiera pregunta**, así que todo el que hubiera abierto la página antes seguía viendo
la explosión, y Ctrl+F5 no siempre basta.

Es exactamente el caso que advierte el comentario del `netlify.toml`: *«los vídeos van
con caché larga porque, cuando cambian, cambian de nombre»*. Yo reutilicé el nombre.

**Arreglado renombrando**: `oferta-final.mp4` → **`nave-espacial.mp4`** (y su póster).
URL nueva, caché nueva, se ve al instante.

Queda como regla nº 15 en `docs/CORRECCIONES-APLICADAS.md`.

### 2. El cierre tenía dos veces «Entrar al juego»
Al mover el botón de volver y poner un CTA en su hueco, quedó duplicado con el que ya
había. Se retira **el último**, el añadido. El cierre queda con un único botón de compra,
en su sitio de siempre.


---

## Ronda 2026-09-17 · BLACKBRO · sin publicar todavía

Fer pidió **dos secciones nuevas** que salen de la página principal: **BlackBro** y
**Founders333**. Mandó el material de la primera (`secciones nuevas/blackbro/`):
el *LANDING COPY + BUILD MASTER V1.1*, el mockup de cómo quiere que se vea y los
assets del Drive.

Construido:

1. **`/blackbro`** — los siete bloques del mockup con el copy congelado del V1.1,
   y el chat real conectado al Chatflow de Dify a través de una función propia.
   Las 6 Quick Actions precargan la intención en vez de auto-enviarla, como manda
   el patch. Los siete eventos de tracking, instrumentados.
2. **La puerta en la home** — sección nueva entre «Un mundo más grande» y
   «Experiencias» (`#blackbro`), más el enlace en la nav, la casilla en el mapa de
   territorios y el enlace del pie.
3. **La cañería para la key** — `netlify/functions/blackbro-chat.mjs`. La API Key
   vive sólo ahí, como variable de entorno del sitio. Fer la carga y BLACKBRO
   empieza a responder sin tocar una línea de código.

**No está probado de punta a punta** y no se puede estar hasta que exista la key:
lo que sí se comprobó es que la petición sale de la función, llega a `api.dify.ai`
y vuelve interpretada correctamente (con una key falsa, Dify la rechaza y el chat
lo enseña en pantalla). Eso es 🔵 BUILT, no E2E PASS.

Todo en local, **sin commit ni push**.

---

## Ronda 2026-09-18 · BLACKBRO · las notas de Fer · sin publicar

El material llegó en `secciones nuevas/blackbro/`: siete imágenes anotadas y
**`blocblackbro.txt`**, el QA de Fer. Las imágenes tienen el nombre escrito como
instrucción («ESTA MARCE LE PUEDES QUITAR EL FONDO», «Centrado tmb el texto»…).

### Maquetación — lo que pedían las imágenes
1. **01 Hero** — el wordmark baja y se mueve a la izquierda, a la altura de los
   lentes. Va con `transform`, para que no empuje al titular ni al botón.
2. **03 · ¿En qué puedo ayudarte hoy?** — el cuerpo, centrado. Quedaba media
   pantalla vacía a la derecha.
3. **06 · Preguntas frecuentes** — centrado. La **respuesta** del acordeón se
   queda alineada a la izquierda: centrar un párrafo que se lee lo vuelve decorativo.
4. **07 · El cierre** — centrado entero: titular, pregunta, botón y firma.

Los raíles laterales (`01`, `Play/Build/Discipline/Freedom`) **no se tocan**:
son apoyo, van anclados a sus bordes.

### Las dos imágenes con el fondo quitado
- **02** — `strategist.jpg` → **`strategist.webp`**
- **05** — `skyline.jpg` → **`player.webp`**

Las dos llegaron en JPEG, que no guarda transparencia: una con fondo gris liso y
la otra con el **damero quemado dentro del archivo**. El recorte se hizo en dos
pasadas, y el criterio importa porque Fer lo dijo expreso —*«quitar solo el fondo
blanco o gris, no las imágenes que están flotando»*:

1. **Relleno desde los bordes.** Sólo se borra lo que está conectado con el borde
   del lienzo. Por eso los cuatro paneles HUD y su texto se quedan enteros: un
   umbral de color global se los habría comido.
2. **Manchas encerradas, por tamaño.** El globo es semitransparente, así que había
   damero *dentro* de él que la pasada 1 no alcanza. Se borran las manchas grandes
   (8 manchas, 18.275 px); las pequeñas se quedan, porque una letra de los paneles
   nunca llega a ese tamaño.

Van en **WebP** —el único formato del sitio con transparencia— y por eso pesan
207 KB y 290 KB en vez de 1,7 MB y 2,2 MB en PNG. `scripts/dev.mjs` ya servía
`.webp`. Al perder el fondo dejan de ser foto-con-marco: se les quita el borde, el
velo oscuro y el `object-fit:cover`, que les cortaría los paneles.

Respaldo de las dos originales en `originales-sustituidos/ronda-18sep-blackbro/`.

### Del QA de Fer (`blocblackbro.txt`): tres cosas ya estaban bien
- 🔴 **«ENTER BLACKBRO no lleva al producto»** — **no es un fallo de destino.**
  Los cuatro botones (nav, hero, cierre, barra de móvil) llevan `href="#chat"`, y
  el JS hace `preventDefault` → scroll a la sección del chat → foco en el input.
  Fer lo dedujo leyendo el HTML publicado: vio un ancla de la misma página y
  entendió que no iba a ningún sitio. **Lo que sí estaba roto cuando él lo revisó
  era el chat**, por el redirect forzado del `netlify.toml` (corregido en `98dd98e`).
  Esa es la razón real de que el recorrido no se demostrara.
- 🟠 **«Section 04 tiene demasiado preámbulo»** — ya no: el bloque quedó en el
  titular y directo al chat, como pide el bloc.
- 🟠 **Jerarquía del hero** — «Más preguntas. Mejores jugadas.» ya vive en el raíl
  lateral como *ambient copy*. No compite con la promesa principal.

### Verificado
- Las 6 jugadas de la sección 03 **sí son launcher**: llevan al chat y precargan la
  intención, sin enviar mensaje.
- La respuesta del FAQ **«se mantiene mientras la pestaña esté abierta»** es cierta:
  el `conversation_id` vive en `sessionStorage` (sobrevive a F5, muere al cerrar la
  pestaña) y «Nuevo chat» lo borra. **KEEP**, no hay que corregir el copy.
- Ni un solo enlace ni asset roto en `/blackbro`. El de Founders333 sigue comentado.

### Sigue pendiente
- [ ] La `DIFY_API_KEY`: sin ella no hay P0 ni E2E. Es lo único que separa a
      BLACKBRO de dejar de estar 🟠 NEEDS WORK.
- [ ] Si aparecen los **PNG originales** de las dos imágenes (con transparencia de
      verdad), el recorte sale más limpio: el que se hizo parte de un JPEG y deja
      algo de mota en los bordes de los paneles.
- [ ] **Founders333**: el material ya llegó (`secciones nuevas/founders333/`, con
      `foundersbloc.txt` — *MARCE BUILD HANDOFF AAA V1.0* — y el material del Drive).
      Es la siguiente tanda, todavía sin empezar.

---

## Ronda 2026-09-18 (tarde) · FOUNDERS 333 · sin publicar

La segunda sección que pidió Fer el 16-sep. Llegó el material completo:
`foundersbloc.txt` (*MARCE BUILD HANDOFF AAA V1.0*, copy y taxonomía **FROZEN**),
el VISUAL ASSET PLAN y cinco vídeos + siete imágenes del Drive.

Construido: **`/founders333`**, las nueve bandas del plan visual con la misma reja
de `/blackbro` —raíl, cuerpo, raíl—, porque son dos páginas del mismo mundo.
El detalle está en **`docs/PROPUESTA-FOUNDERS333.md`**.

### Lo que hay que saber en dos minutos
- **Dos journeys separados, y no se mezclan nunca:** `GENESIS` (04 guarda → 08 envía
  → 09 señal recibida) y `PARTNERSHIP` (07, formulario propio que nace cerrado).
- **La Section 04 no envía nada.** Guarda en `sessionStorage` y la 08 lo recupera con
  opción de editar. Si alguien se salta la 04, la 08 pide lo que falta.
- **Un error no borra lo escrito.** En ninguno de los tres formularios.
- **El hero cumple el brief literal:** «TABLE → GENESIS BUILDING, 8–9 s». Son dos
  clips distintos encadenados con un fundido; dura **9,0 s**, mudo, en bucle y sin
  texto quemado dentro del vídeo.
- Los cuatro lockups venían sobre negro sólido: se les dio alfa y se recortaron a su
  caja real. No se rehicieron con tipografía — son masters aprobados.
- Los vídeos del Drive pesaban **21 MB**; reencodados, **7,1 MB**.
- **Entra desde la home**: la casilla «Founders 333» del mapa de las nueve marcas
  era decorativa y ahora es la puerta, más nav y pie. En `/blackbro` se descomentó
  el enlace que quedó escrito el 17-sep esperando este día.

### QA
55/55 frases del copy congelado, literales. La lista **NO PUBLICAR** del handoff,
limpia: sin precios, equity, ownership, revenue share, Founder Pool, governance,
token/NFT, countdown ni «spots remaining»; **«300 FOUNDERS» no aparece** y las
cuatro frases prohibidas del success tampoco. Los dos journeys probados de punta a
punta y comprobado que llegan etiquetados por separado. HTML sin anidados rotos y
**todo elemento que nace oculto lleva su regla `[hidden]`** — el fallo exacto que se
coló con el modal de GOODS. Ni un asset ni un enlace roto.

### BLOQUEANTE para que FOUNDERS 333 funcione
- [ ] **A dónde van los leads.** La función `netlify/functions/founders-lead.mjs` está
      escrita y validando; sólo falta decirle el destino, con **una** de estas dos:
      `FOUNDERS_WEBHOOK_URL` (Make/Zapier/n8n) **o** `FOUNDERS_AIRTABLE_TOKEN` +
      `FOUNDERS_AIRTABLE_BASE`. Se cargan en Netlify, no en el repo.
      Hasta entonces la página **no miente**: avisa en pantalla y conserva lo escrito.
- [ ] **QA en desktop y móvil de verdad**, que el handoff pide después del build.
- [ ] Faltan `300_BUILDERS_MASTER`, `33_ARCHITECTS_MASTER` y el visual de la 07.
      El handoff manda continuar con placeholder limpio antes que bloquear el build,
      y eso se hizo: entran el día que existan, sin tocar nada más.

### Para probarlo sin conectar nada
`node scripts/dev.mjs` apunta la función a un buzón local: el formulario se recorre
entero y los leads de prueba caen en `.dev-leads.jsonl` (no se versiona).
