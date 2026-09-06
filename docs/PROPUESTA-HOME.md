# PROPUESTA · bshpbrothers.com — LA HOME
### B-SHP BROTHERS · home institucional

**Página:** `web/index.html` · **CSS:** `assets/css/home.css` · **JS:** `assets/js/home.js`
**Copy master:** el documento **HOME AAA · MASTER COPY FINAL** (11 secciones + footer).
**Dirección visual:** `pagina ppal/BLUEPRINT.jpeg` y los vídeos de `pagina ppal/`.

> El master dice: *NO reescribir. NO parafrasear. NO expandir. NO agregar copy generado por IA.
> NO agregar secciones. NO inventar proof.* **Se implementó al pie de la letra.**
> Comprobado con un script sobre el HTML renderizado: **151 de 151 frases del master están en la
> página, literales.** Y ni una palabra que no esté en el master.

---

## 1. La regla que gobierna esta página

Esta página **no es otra landing de THE GAME**. Vende B-SHP BROTHERS como mundo, cultura,
comunidad y **membership**. THE GAME vive en `/thegame` y aquí aparece como **puerta alternativa
de entrada**.

Recorrido, el del master:
**IDENTIDAD → PERTENENCIA → PERSONAS → LIFESTYLE → POSIBILIDAD → MUNDO → MEMBERSHIP → THE GAME
→ MANIFESTO → DECISIÓN.**

---

## 2. Las once secciones

| # | Sección | CTA | Tratamiento |
|---|---|---|---|
| — | **NAV** | JOIN → | Logo + B-SHP · BROTHERS · WORLD · THE GAME. En móvil: logo + menú + JOIN. |
| 01 | **HERO** | DESCUBRE B-SHP ↓ · VER BRAND FILM ▶ | Viewport completo, vídeo en color de Hermes sobre la ciudad al atardecer: él a la derecha, la ciudad limpia a la izquierda para el HTML. Sin precio, sin membership, sin features, sin cards. |
| 02 | **BRAND FILM** | — | Sección propia justo después del hero, fondo negro. «A BIGGER PLAYER WORLD.» manuscrito, el **TRAILERBRAND completo en 16:9** con póster cinematográfico y play dorado, y debajo **WELCOME TO B-SHP.** No arranca solo y no suena solo. |
| 03 | **THE BLACK SHEEP** | *sin CTA* | Copy a la izquierda, Hermes canon flotando a la derecha sin caja. Las tres líneas en versales con filo de oro. **ESE ES EL PUNTO.** cierra centrado, con mucho aire. |
| 04 | **THE BROTHERS** | *sin CTA* | Banda a sangre con el vídeo del rooftop: **personas reales**, conversación, fuego, risas — y Panchito. Cierra con **PRIMERO NOS CONOCEMOS. DESPUÉS, QUIÉN SABE.** |
| 05 | **LIFESTYLE** | *sin CTA* | Copy + mosaico de **tres vídeos a todo color** (sobremesa, ciudad al atardecer, carretera). Sin pies de foto inventados: las imágenes trabajan solas. Acento manuscrito **BUILD SOMETHING. LIVE SOMETHING.** |
| 06 | **BUSINESS** | *sin CTA* | Banda invertida. Sin palabras flotantes de tipo *oportunidades / dinero / inversiones / deals* — el master lo prohíbe y no están. Cierra con **PEOPLE FIRST. BUSINESS FOLLOWS.** |
| 07 | **THE WORLD** | *sin CTA* | El vídeo del puente de mando con Hermes, Panchito y el planeta. **Cinco cards ligeras** (Community · Business · Lifestyle · Experiences · The Game), sin precio y sin convertirlas en producto. |
| 08 | **MEMBER ACCESS** | ENTRAR A B-SHP BROTHERS → | Cambia la atmósfera: negro, oro, sensación de **pase**, no de infoproducto. Los siete territorios como **etiquetas**, no como siete cursos. El precio en una tarjeta de acceso: **$1,111 MXN / año** o **$333 MXN / mes**, «The Game incluido», y el pie «Precio anual posterior: $3,333 MXN». Sin countdown, sin bonus stack, sin valor ficticio, sin urgencia, sin garantía, sin «primeros 333». |
| 09 | **THE GAME** | ENTRAR A THE GAME → | Universo visual de THE GAME: la puerta al amanecer, el lockup, los cuatro pasos, el sello **7 DÍAS. SIN PROMESAS. SOLO EVIDENCIA.** y **$111 MXN** con «Después $333 MXN». No se explican módulos ni RITO7 ni FAQ: eso es `/thegame`. |
| 10 | **MANIFESTO** | *sin CTA* | Hermes observador a la derecha, negro a la izquierda, tipografía grande, los verbos en columna. **Ningún botón detrás de ENCUENTRA A LOS TUYOS**: el momento respira. |
| 11 | **FINAL CTA** | ENTRAR A B-SHP BROTHERS → · EMPEZAR CON THE GAME — $111 → | El descenso sobre el planeta. La tarjeta de acceso, las dos puertas, la firma **A BIGGER PLAYER WORLD.** y **THE GAME NEVER ENDS.** |
| — | **FOOTER** | — | Logo, **BEYOND THE HERD.**, los seis enlaces del master, redes y © 2026. |

---

## 3. Dirección visual

- **El vídeo se ve en color.** En `/thegame` los fondos van al 34 % de opacidad; aquí no. El negro
  entra sólo donde va el texto, en degradado lateral. Siete secciones a todo color; negro+oro en
  Black Sheep, Member Access, The Game y Manifesto — que es exactamente donde el master lo pide.
- **Hermes conserva su ADN.** No se generó ni un personaje, ni un logo, ni una imagen nueva: todo
  sale de los vídeos y assets oficiales del Drive.
- **Lujo como atmósfera, no como argumento.** No hay lluvia de dinero, ni cripto, ni cadenas. El
  coche aparece un momento dentro del mosaico de lifestyle, entre una sobremesa y una ciudad.
- **Sin CTA cada 200 px.** Seis puntos de conversión en toda la página, y seis secciones sin
  ninguno, tal como manda el master.
- **Poco texto simultáneo, mucho aire.** Los remates de sección («ESE ES EL PUNTO.», «PEOPLE
  FIRST. BUSINESS FOLLOWS.») están separados del cuerpo por un espacio deliberado.

---

## 4. Lo que NO se puso, a propósito

Cero testimonios · cero nombres de miembros · cero métricas · cero eventos · cero resultados ·
cero productos futuros presentados como LIVE · sin countdown · sin bonus · sin valor ficticio ·
sin urgencia falsa · sin garantía inventada · sin «primeros 333» en la membresía · sin Solana ·
sin roadmap. **Comprobado con un script: ninguno de esos términos aparece en la página.**

---

## 5. Medición

Tracking cableado **sin asumir proveedor**: cada evento se empuja a `window.dataLayer` (listo para
Google Tag Manager) y se emite como `CustomEvent('bshp:track')`. Cero scripts de terceros, cero
cookies.

`home_view` · `brothers_view` · `lifestyle_view` · `business_view` · `access_view` ·
`thegame_view` · `brandfilm_play` · `join_click` (con origen) · `thegame_click` (con origen) ·
`final_join_click`.

---

## 6. Rendimiento

- Los originales pesan **~700 MB**; en la página van **12 MB** de vídeo de sección.
- El **TRAILERBRAND venía en HEVC 4K** (611 MB) — un formato que **Chrome y Firefox no
  reproducen**. Está transcodificado a H.264 720p (24 MB) y **sólo se descarga si alguien pulsa
  play**.
- Los vídeos de sección son **perezosos**: no se piden hasta que la sección se acerca; hasta
  entonces se ve su póster. Si el navegador bloquea el autoplay, **la página se queda en pósters
  estáticos y sigue siendo perfectamente legible**.
- Sin frameworks, sin build, sin dependencias.

---

## 7. Verificación hecha

Se renderizó la página con Chrome, sección por sección, en **escritorio (1440 px)** y en
**móvil**, y se revisaron los fotogramas uno a uno. Tres defectos encontrados y corregidos así:

1. El botón **«Ver Brand Film» no aparecía**: el observador de revelado no lo alcanzaba por el
   margen inferior. Ahora hay una red de seguridad que fuerza visible cualquier elemento que esté
   en pantalla a los 1,2 s.
2. En móvil, el indicador **«Scroll» se montaba encima de los botones** del hero. Oculto por
   debajo de 900 px.
3. El texto **se pegaba al borde** de la pantalla en las bandas a sangre y en el manifiesto.
   Corregidos los márgenes laterales.

Comprobaciones automáticas que pasan: 151/151 frases del master, cero clases sin CSS, cero rutas
rotas, cero anclas rotas, cero etiquetas desbalanceadas, JS sin errores de sintaxis.

---

## 8. Lo que hace falta para publicar — y una cosa es bloqueante

1. **BLOQUEANTE · falta la URL de alta de la membresía.** Los dos CTA principales de la página
   —«ENTRAR A B-SHP BROTHERS» en la sección 08 y en el cierre— apuntan hoy a `#` porque
   **no existe todavía checkout ni formulario para los $1,111 / $333 MXN**. Están marcados en el
   código con `data-pendiente="url-de-alta-membership"`. En cuanto Fer dé el enlace (Hotmart,
   Stripe, formulario o lista de espera), es un cambio de un minuto. **Hasta entonces la página no
   puede publicarse: el CTA más importante no lleva a ningún sitio.**
2. **Enlaces reales** de Privacidad, Términos, Contacto y las cinco redes (hoy `#`).
3. **Renombrar el sitio en Netlify**: `b-shopbrothers` → `bshpbrothers` (nota nº 1 de Fer).

---

## 9. Decisiones que conviene que Fer confirme

1. **El splash quedó fuera.** Fer mandó un clip nombrado *"Con este splash para la ppal"*, pero el
   master final dice que el hero **abre directamente dentro del universo B-SHP** y que **no se
   agreguen secciones**. Se respetó el master: ese clip **sí se usa**, como fondo de la sección 07
   THE WORLD, que es donde salen Hermes, Panchito y el planeta juntos.
2. **Panchito no está en el hero.** El master lo pide ahí, pero el plano que cumple lo demás
   —Hermes a un lado y ciudad limpia al otro para el texto— es de Hermes solo. Panchito sí sale en
   THE BROTHERS, en LIFESTYLE y en THE WORLD. Si aparece un plano de los dos con aire a la
   izquierda, se cambia el hero.
3. **Móvil: composición propia, sí; material vertical, todavía no.** Cambia el orden, el encuadre,
   la dirección del degradado y el mosaico por debajo de 900 px. Pero **todo el material de origen
   es 16:9**: para un 9:16 de verdad hacen falta versiones verticales del hero y del manifiesto.
4. **«Powered by AGENTIA LABS» se mantiene en el pie.** El master no lo incluye en el copy del
   footer, pero estaba en la home anterior y en `/thegame`, y Fer pidió corregirlo (no quitarlo).
   Si debe desaparecer de la home, se quita.
5. **Dos vídeos de `pagina ppal/` no se usaron**: `WhatsApp Video 2026-09-04 at 23.22.44` (62 s,
   sobrevuelo de un río) y `…23.28.43` (41 s, un anuncio inmobiliario con el rótulo **«HÁBITAT»**
   quemado en imagen). **No son material B-SHP** y meter una marca ajena en la home habría sido un
   error. Si en realidad sí son del proyecto, se integran.

---

## 10. Cómo verla

```bash
cd "/home/camilo23/FER PROYECT/web" && python3 -m http.server 3010
```

→ **http://localhost:3010/** (la home) · **http://localhost:3010/thegame/** (la sales page)
