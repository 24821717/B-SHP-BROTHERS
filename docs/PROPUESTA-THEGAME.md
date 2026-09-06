# PROPUESTA · bshpbrothers.com/thegame
### B-SHP BROTHERS — THE GAME · Las Reglas del Juego

---

## 1. Qué se construyó

Una **sales page de una sola pieza**, 100 % a medida, que baja al pixel el copy master AAA
(`fer.txt`) sobre el territorio visual de la referencia que mandaste
(negro obsidiana + oro, cinematográfico, tipografía luxury).

No es una plantilla de Hotmart maquillada: es HTML/CSS/JS propio, sin frameworks,
que carga rápido y se ve igual de bien en móvil que en escritorio.

**Página:** `web/thegame/index.html`

---

## 2. Estructura (las 22 secciones del copy master)

| # | Sección | Tratamiento visual |
|---|---|---|
| 00 | Header | Sticky, logo B-SHP, nav (The Game · Cómo se juega · RITO7 · FAQ) + CTA siempre visible |
| 01 | Hero | **Video SPLASHERO en loop** de fondo (el descenso → el Gate), wordmark THE GAME dorado, claim, CTA, precio founding, sellos de confianza, lateral "UN MUNDO PARA LOS QUE EJECUTAN" |
| — | Ticker | Cinta dorada en movimiento: *La intención no cuenta · La evidencia cuenta* |
| 02 | Tensión | Split con la oveja canon flotando |
| 03 | **Trailer** | Reproductor con el marco dorado B-SHP superpuesto |
| 04 | El problema real | 3 tarjetas (I · II · III) sobre el fondo del portal |
| 05 | **VSL** | Segundo reproductor + CTA "Estoy listo para jugar" |
| 06 | Mecanismo | El roadmap dorado del Drive + 6 pasos numerados + flujo Mide → … → Demuestra |
| 07 | Product reveal | El showcase AAA (tablet/móvil/laptop) |
| 08 | Qué recibes | Player Setup: 8 ítems con check dorado + la oveja con el control |
| 09 | Coordenadas | Black Sheep Test: las 5 coordenadas FROZEN en tarjetas |
| 10 | Bottleneck → Alter Ego | Split con el altar de la piña |
| 11 | 3 No Negociables | 3 tarjetas con icono (Cuerpo · Mente · Construcción) + los 4 filtros |
| 12 | **RITO7** | Misión 00 + los 7 días en tarjetas tipo "quest" |
| 13 | Evidencia | Marcador visual ✓ / ✕ (Cuerpo · Mente · Construcción) |
| 14 | Price reveal | Bloque de precio $111 vs $333 |
| 15 | Comunidad | Los tres B-SHP + el flujo Entrar → … → Demostrar |
| 16 | Autoselección | "No entres todavía" en 3 tarjetas |
| 17 | Founder | Fernando Longoria + la piña del ojo |
| 18 | Decisión | Bloque centrado, tipografía grande |
| 19 | Oferta final | Lockup THE GAME + segundo bloque de precio |
| 20 | FAQ | Acordeón, se abre uno a la vez |
| 21 | Final CTA | **Master banner** a pantalla completa con "La intención no cuenta / La evidencia cuenta" inclinadas |
| 22 | Footer | Logo, enlaces, legal, redes, *Powered by Agent.IA Labs* |

Extra no pedido pero necesario en móvil: **barra de compra fija abajo** ($111 + botón)
que aparece al pasar el hero.

---

## 3. Pagos — Hotmart

- El widget oficial que mandaste está integrado tal cual en el `<head>`.
- **Los 10 botones de compra** de la página apuntan a
  `https://pay.hotmart.com/K107291428B?checkoutMode=2` con las clases del widget,
  para que abra el checkout en modal sin sacar al usuario de la página.
- Añadí una red de seguridad: si el script de Hotmart no carga (bloqueador de anuncios,
  red caída), a los 3,5 s los botones se convierten en enlaces normales al checkout
  en pestaña nueva. Nunca queda un botón muerto.

> Nota: el modal de Hotmart suele exigir dominio publicado. En local puede caer al
> fallback de enlace directo — es lo esperado; se valida al subir a `bshpbrothers.com`.

---

## 4. Material del Drive usado

**Video** (todo venía en HEVC/4K, que los navegadores no reproducen — se transcodificó a H.264 web):
- `SPLASHERO.mp4` → loop de fondo del hero (sin audio, autoplay)
- `TRAILER.mp4` → sección 03, con póster; **no descarga hasta que le dan play**
- `VSL.mp4` → sección 05, mismo tratamiento
- Además se extrajeron 8 fotogramas del trailer y del splash como fondos atmosféricos
  de sección (el ojo, la ciudad dorada, el Gate, la meditación, la marcha…)

**Gráfica:**
`LOGOTRANSP` (header/footer) · `THE GAME` lettering (hero) · lockup completo (oferta final
y banner) · `PIÑA` (founder) · `C1` (tensión) · `C2` (Player Setup) · `C3` (comunidad) ·
Product Showcase AAA · roadmap dorado (mecanismo) · divisor dorado · marco dorado (trailer) ·
banner del Gate (CTA final).

Paleta tomada del **Personaje Maestro v1.0**:
`#0B0B0B` obsidiana · `#1A1A1A` carbón · `#D4AF37` oro antiguo · `#B8860B` ámbar · `#2ECC71` verde energía.

---

## 5. Decisiones que conviene que Fer confirme

1. **RITO7 = 7 días, no 7 semanas.** La referencia visual decía "7 SEMANAS. UN NUEVO TÚ.";
   el copy master (que es el documento FROZEN) dice siete días y lo repite en el FAQ.
   Se respetó el copy master. Si la versión buena es 7 semanas, se cambia en 5 minutos.

2. **No se puso "Garantía 7 días"** aunque salía en la referencia: el copy master marca
   la garantía como *VERIFY — no publicar una garantía inventada*. En su lugar los sellos
   dicen: Acceso digital · Pago seguro vía Hotmart · Comunidad B-SHP.

3. **No hay testimonios.** La referencia traía una sección "Resultados reales" con caras
   y frases; el copy master no la incluye y no tenemos testimonios reales. No se inventaron.
   Si existen, se añade la sección con el mismo lenguaje visual.

4. **No hay contador de escasez.** Es decisión explícita del copy: *"No necesitamos un
   contador falso. No necesitamos fingir que quedan 3 lugares"*. Se comunica con
   "Primeros 333 Players" y la comparativa $111 → $333.

5. **Dos respuestas del FAQ quedan marcadas "POR CONFIRMAR"** en dorado, tal como pide el
   copy: qué pasa justo después de pagar (necesita QA en vivo del flujo) y la garantía.
   Están visibles a propósito para que no se publiquen por olvido.

6. **Marcador + Checkpoints** se describe sólo como "registra ejecución y conviértela en
   evidencia", sin prometer funcionalidad extra (estado NEEDS WORK del build).

---

## 6. Lo que falta para publicar

- Textos definitivos de las 2 respuestas del FAQ.
- URLs reales: Términos, Aviso de privacidad, Contacto y las 4 redes (hoy `#`).
- Confirmar el copy legal del footer y el año.
- Dominio + hosting. La página es estática: sube `web/` a Vercel, Netlify, Cloudflare
  Pages o cualquier hosting y funciona sin build ni servidor.

---

## 7. Segunda fase (ya mapeada, no construida)

`bshpbrothers.com` — la home del universo B-SHP: Hero · Manifiesto · Sistema · THE GAME ·
World / Culture · Brothers / Community · Products · CTA "ENTRA AL JUEGO" → `/thegame`.
Hoy hay un placeholder con el mismo lenguaje visual en `web/index.html`, y la referencia
que mandaste (`WhatsApp Image 2026-09-03`) ya está incorporada al criterio de diseño.

---

## 8. Ronda de correcciones del cliente · 2026-09-06

Las siete notas que Fer mandó en `RECOMENDACIONES/`, una por una, y qué se hizo con cada una.

| # | Nota del cliente | Qué se hizo |
|---|---|---|
| 1 | *"Bshop es bshp sin la O"* | En el código no había ni una sola aparición de «bshop»: el error está **en el nombre del sitio de Netlify** (`b-shopbrothers.netlify.app`). Se renombra en Netlify → *Site configuration › Change site name* → `bshpbrothers`. **No es algo que se arregle en el repo.** |
| 2 | *"…y dejaría este completo con el logo"* (círculo sobre el emblema oveja+mundo) | Se sustituyó `logo-emblem.png` —que estaba **recortado por abajo**— por el asset oficial completo `LOGOTRANSP.png` (oveja + mundo + lockup «B-SHP BROTHERS»), ya transparente. Es el favicon y el logo grande del splash de la home. |
| 3 | *"Si puedes quítale el fondo"* (logo del nav) | El `logo-wordmark.png` traía una **caja negra pegada**. Se regeneró desde `TIPOGRAFIA.png`, que sí es transparente. De paso se quitó el `mix-blend-mode:screen` del CSS, que era el apaño que existía sólo para disimular esa caja. |
| 4 | *"estos en teoría son transp — si no REMOVE FONDO"* | Comprobados uno a uno con `ffprobe`: `LOGOTRANSP.png` y `TIPOGRAFIA.png` **sí** tenían alfa; `LOGOBSHP.png` no (por eso se descartó). Y apareció uno que nadie había visto: **`lockup-thegame.png` llevaba el cuadriculado gris de transparencia *pintado encima*** — se veía como un tablero de ajedrez detrás del logo en dos sitios de la página. Se recortó el fondo por luminancia + saturación. |
| 5 | *"Este… centrar bien el video dentro del marco"* | El marco dorado se dibujaba **por encima** del vídeo con un desbordamiento fijo, así que sus varillas tapaban ~10 % del vídeo por cada lado y ~20 % arriba. Se midió la ventana real de `frame.png` (1600×900 → hueco en 10,5 % / 19,6 % / 80 % / 66,2 %) y ahora **el vídeo se coloca dentro de esa ventana**, centrado y entero (`object-fit:contain`). En móvil, donde el marco no se pinta, el reproductor vuelve a ser una caja 16:9 normal. Además se limpió el **halo rojo** que traía el PNG del marco (resto del recorte del fondo). |
| 6 | *"Este igual no debería tener fondo"* (el altar de la piña) | Era un JPG con fondo marrón-dorado: en la página se leía como un **rectángulo pegado**. Se generó `altar-pina.png` con alfa: fondo hundido a negro y bordes fundidos, así que ahora flota sobre el negro de la página. También se le quitó el marco y la sombra de caja (`shot--libre`). |
| 7 | *"quitar el nombre de Fernando Longoria"* | Quitado del pie del reproductor del VSL, que ahora dice **«B-SHP Brothers · The Game»**. |
| 8 | *"Hasta abajo en powered by AGENTIA quítale el ."* | El pie decía «Powered by Agent.IA Labs». Ahora dice **«Powered by / AGENTIA LABS»** en dos líneas y sin punto, que es como está escrita la marca en el logo oficial (`d7685114…png`) y en el banner del Drive. |

### Dos cosas que conviene que Fer confirme de esta ronda

- **El nombre en la sección FOUNDER se ha dejado.** La nota decía *"quitar el nombre de
  Fernando Longoria"* y la marca verde estaba sobre el pie del vídeo, así que se quitó ahí.
  Pero el copy master (`fer.txt`, documento FROZEN) tiene una sección entera —la 17— titulada
  **FERNANDO LONGORIA**, y quitarla sería quitar el «por qué existe B-SHP». **Sigue en la
  página.** Si también hay que borrarla, es un minuto.
- **«AGENTIA» sin punto.** La nota dice «quítale el .» y a la vez escribe «Agent.IA Lab»
  con punto. Se optó por lo que dice el logo oficial: **AGENTIA LABS**, sin punto. Si la
  marca es «Agent.IA Lab», se cambia igual de rápido.
