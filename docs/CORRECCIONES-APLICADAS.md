# Decisiones que ya están tomadas — no revertir

Registro de las correcciones que el cliente ya pidió y que **ya están aplicadas**.
Existe porque el 08-sep se reintrodujo una que ya se había hecho (el punto de
AGENTIA) al copiar literalmente el bloc de notas.

**Leer este archivo antes de aplicar una tanda nueva.** Si el bloc de notas de Fer
contradice algo de esta lista, gana la lista: es una decisión ya cerrada. Y cuando
se cierre una decisión nueva, se añade aquí.

| # | Decisión | Dónde | Cerrada |
|---|---|---|---|
| 1 | **AGENTIA LABS, sin punto.** Nunca «Agent.IA». Aunque el brief lo escriba con punto. | ficha de marca 03, pie de la sección de Fer, footer | 06-sep, repetida el 08-sep |
| 2 | **«Ese es el punto.»** va pegado debajo de «No tienes que pensar como nosotros», no suelto y centrado. | home · The Black Sheep | 07-sep |
| 3 | **Nada de Spotify.** Las redes son Instagram, TikTok, YouTube, X y WhatsApp. | footer de las dos páginas | 07-sep |
| 4 | **No se promete Skool ni «comunidad»** mientras el journey Hotmart → Skool siga abierto. | /thegame: hero, 07, 13, 14, 18 y FAQ | 07-sep |
| 5 | **El FAQ son 5 preguntas.** Nada de respuestas «Por confirmar» publicadas. | /thegame · 19 | 07-sep |
| 6 | **Ninguna imagen se repite entre secciones.** | toda la home | 08-sep |
| 7 | **Una pieza de Goods sólo se pone a la venta con precio Y enlace.** Si falta uno, «Próximamente». | `GOODS` en `home-v2.js` | 07-sep |
| 8 | **El sitio se llama `bshp`, sin la O.** Pendiente sólo de renombrar en Netlify. | — | 06-sep |
| 9 | **«The Game» del menú de la home lleva a la sección `#thegame`**, no a la sales page. A la sales page se entra por el CTA de esa sección. | home · nav | 08-sep |
| 10 | **Desde /thegame siempre tiene que verse cómo volver a la home**, también en móvil: el botón va fuera del menú plegable. | /thegame · header | 08-sep |
| 11 | **Los textos legales se publican tal cual los entrega el cliente.** Sólo se quitan las notas del redactor dirigidas a él, y se dejan anotadas. | `/legal/` | 08-sep |
| 12 | **Ningún enlace legal apunta a `#`.** Las tres páginas existen y están enlazadas desde las dos webs. | pies de página | 08-sep |
| 13 | **#01 — La tensión va sin CTA.** Sección cerrada. | /thegame · 01 | 08-sep |
| 14 | **El cierre de /thegame**: imagen (lockup) sin fondo, titular «La intención no cuenta. La evidencia cuenta.», **un solo** botón de compra, y el volver en su franja debajo de la sección. | /thegame · closing | 08-sep |
| 15 | **Un vídeo que cambia de contenido cambia de nombre.** `/assets/video/*` se sirve con caché de un año e `immutable`: reutilizar el nombre deja al cliente viendo el vídeo viejo y el navegador ni pregunta. | `assets/video/` | 08-sep |
| 16 | **Founders333 NO tiene formulario** (02-oct tarde): la aplicación a GEN01 va por **WhatsApp** (cards con rol y botón «Quiero entrar a GEN01»). Fuera «¿Qué estás construyendo?», partnership y «Señal recibida». | /founders333 | 02-oct |
| 17 | **En Founders no se publica**: precio Architect, token, % o cifras del Founder Pool, rendimientos, utilidades, equity, revenue share, préstamos/devoluciones. Ni Founder Bible (es de START BUILDING). | /founders333 | 02-oct |
| 18 | ~~eToro: los dos banners~~ (sustituida por la 22) **eToro: los dos banners (decisión de Marcela, que corrige el «elige 1» de Fer), código original sin tocar**, dentro de SKIN IN THE GAME antes de la Lista Genesis. Nunca en el hero ni como beneficio de los $3,333. | /founders333 | 02-oct |
| 19 | **Orden de la home:** THE GAME → BLACKBRO → START BUILDING → FOUNDERS333. | home | 02-oct |
| 20 | **START BUILDING no lleva botón de compra**: cierra con «Acceso para players de THE GAME» y `THE GAME → RITO7 → START BUILDING`. Antetítulo = logo B-SHP BROTHERS. | home | 02-oct |
| 21 | **La casilla THE GAME del mapa enseña la imagen completa** (`terr-thegame-completa.jpg`, sin franjas negras). | home · mapa | 02-oct |
| 22 | **eToro: TRES banners nuevos (tracking `Sbshp`)**: 300×600 a la izquierda, 300×250 + 320×100 a la derecha; código original sin tocar. Los SCXSOL quedan retirados. | /founders333 · SKIN IN THE GAME | 05-oct |
| 23 | **Leyenda de riesgo eToro LITERAL de Fer**, pegada a los banners y a tamaño de lectura (no letra pequeña). No se resume, no se suaviza, no se maquilla. | /founders333 · SKIN IN THE GAME | 05-oct |
| 24 | **Bandas centradas, centradas de verdad**: raíles simétricos y los párrafos con `margin-inline:auto`. No volver a poner un `max-width` con `margin:0` dentro de un cuerpo centrado. | /founders333, /blackbro | 05-oct |
