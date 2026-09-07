# HOME · bshpbrothers.com
### Dirección final aplicada · 2026-09-06

Documento fuente: `RECOMENDACIONES/Nuevo Documento de texto.txt`
(“ESTA ES LA DIRECCIÓN FINAL DE HOME”).

Regla que gobierna todo: **HOME = qué es B-SHP + deseo de pertenecer.
THE GAME = conversión. GOODS = identidad. BROTHERS = ascensión futura,
no oferta pública ahora.** No se mezclan funciones.

### El recorrido que tiene que hacer HOME

> ENTRO → ENTIENDO QUÉ ES B-SHP → QUIERO PERTENECER → VEO CÓMO ENTRAR AL UNIVERSO.

HOME **no vende THE GAME completo**: para eso está `/thegame`. Aquí solo se
muestra la puerta. El orden de las secciones se reordenó para que el recorrido
sea exactamente ese, sin volver a explicar después de haber enseñado la puerta:

| Paso | Secciones |
|---|---|
| **ENTRO** | 01 Hero · 02 Brand Film |
| **ENTIENDO QUÉ ES B-SHP** | 03 Black Sheep · 04 The Brothers · 05 Vida · 06 Primero las personas · 07 Un mundo más grande · 08 Experiencias · 09 Goods |
| **QUIERO PERTENECER** | 10 Encuentra a los tuyos · 11 Manifiesto |
| **VEO CÓMO ENTRAR** | 12 La puerta (The Game) · CTA final |

Tres ajustes concretos para que el cuarto paso exista de verdad:

1. **Experiencias y Goods subieron** por delante de “Encuentra a los tuyos”.
   Antes quedaban *después* de la puerta, y la página volvía a explicar el
   universo cuando ya te había enseñado por dónde se entra.
2. **La sección The Game bajó** hasta justo antes del cierre, y su eyebrow pasa
   a **“The Game · La puerta de entrada”**: nombra su función dentro de HOME sin
   añadir ni un claim de venta. El contenido sigue siendo el mínimo que pide el
   documento (titular + “7 días. Sin promesas. Solo evidencia.” + CTA).
3. **El territorio The Game del mosaico ya no salta a `/thegame/`**, lleva a la
   puerta dentro de HOME (`#thegame`). Así nadie sale del recorrido a mitad de
   camino: se sale por la puerta, que es donde toca.

---

## Las 13 instrucciones, una por una

| # | Instrucción | Qué se hizo |
|---|---|---|
| 01 | HERO — KEEP | Se mantiene “NO SIGAS EL CAMINO. DISEÑA EL TUYO.” Cambiado `Business · Lifestyle · Community` → **NEGOCIOS · VIDA · HERMANDAD**. El CTA `Join` pasa a **DESCUBRE B-SHP →** y ahora navega dentro de HOME, a la sección del ecosistema (`#mundo`). |
| 02 | BLACK SHEEP — KEEP | Intacta. No se añadió información. |
| 03 | THE BROTHERS — KEEP + elevar | Copy intacto. Debajo se añadió una **tira editorial a sangre de personas reales** (rooftop, mesas, terrazas, encuentros) para quitarle la lectura de “comunidad digital”. |
| 04 | VIDA | Eyebrow `Life is part of the game` → **“La vida también es parte del juego”**. El titular se mantiene. |
| 05 | PEOPLE FIRST | `People first. Business follows.` → **“Primero las personas. Después, los negocios.”** en los dos sitios donde aparecía. Eyebrow al español. Narrativa intacta. |
| 06 | BIGGER PLAYER WORLD → reconstruir | Era una lista de 5 tarjetas con iconos. Ahora es **“UN MUNDO MÁS GRANDE”**: un mosaico visual de los **seis territorios** — Brothers·Hermandad, Business·Construcción, Lifestyle·Vida, Experiences·Experiencias, The Game·El juego, Goods·Identidad. Imágenes grandes, cero explicación. |
| 07 | MEMBER ACCESS — DELETE | **Eliminado por completo:** $1,111/año, $333/mes, $3,333 posterior, “The Game incluido”, el listado de territorios tipo currículum y el botón de alta. Sustituido por **“ENCUENTRA A LOS TUYOS”** + “No se trata de acumular miembros. Se trata de encontrar a los correctos.” Sin precio, sin plan, sin checkout. |
| 08 | THE GAME — REDUCIR | Fuera los 4 pasos, el precio $111 y el “después $333”. Queda: **THE GAME · “El juego real comienza ahora.” · “7 días. Sin promesas. Solo evidencia.”** + la imagen MASTER PRODUCT REVEAL + CTA a `/thegame/`. HOME ya no explica 3NN, Alter Ego, Bottleneck ni RITO7. |
| 09 | B-SHP GOODS — nueva | Sección nueva **“PORTA LA SEÑAL” · PRÓXIMAMENTE**, con las 5 piezas en catálogo editorial (01 Camiseta · 02 Gorra · 03 Bucket · 04 Sudadera · 05 Pieza especial). Cada una abre su ficha (imagen grande + nombre + PRÓXIMAMENTE). **Sin precios, carrito, tallas, stock ni fechas.** |
| 10 | EXPERIENCIAS — elevar | Sección nueva **“Esto no vive dentro de una pantalla”** con los seis territorios visuales: viajes · mesas · ciudades · entrenamiento · construcción · encuentros. Visión de marca: no se inventó ni un evento, ni una fecha, ni una ubicación. |
| 11 | PLAYERS / EVIDENCIA | **No publicada**, como pide el documento. La arquitectura queda escrita y comentada en el HTML y el CSS (`.players`, `.player-card`) ya existe: cuando haya proof real se descomenta y se rellena. |
| 12 | CIERRE — simplificar | Se mantiene “SER OVEJA NEGRA NUNCA SIGNIFICÓ ESTAR SOLO” y cierra con “ENCUENTRA A LOS TUYOS”. **Fuera el bloque de $1,111/año** y la lista de beneficios. CTA final: **ENTRAR AL MUNDO B-SHP →**, que lleva a la sección THE GAME de HOME (la puerta transaccional real). |
| 13 | FOOTER — simplificar | Navegación reducida a **THE GAME · BROTHERS · GOODS · CONTACTO** y una fila legal propia con **AVISO DE PRIVACIDAD · TÉRMINOS Y CONDICIONES**. |

---

## Arquitectura de GOODS (para cuando llegue el merch)

Cada pieza es un `<article class="pieza" data-pieza="…" data-img="">`.
Hoy `data-img` está vacío y se muestra el sello de la piña sobre trama.
**Cuando lleguen las fotos, basta con rellenar `data-img` con la ruta**:
la tarjeta y la ficha ampliada las muestran solas. No hay que tocar CSS ni JS,
ni reconstruir HOME para convertir esto en ecommerce.

---

## BLOCKER · enlaces legales

El documento dice: *“Ningún enlace legal puede apuntar a #. Si todavía no existe
el contenido/ruta legal definitiva, marcarlo como BLOCKER y avisar. No inventarlo.”*

Hecho así:

- Se crearon rutas reales — `/legal/privacidad.html`, `/legal/terminos.html`
  y `/legal/contacto.html` — para que ningún enlace quede muerto.
- **No se redactó contenido legal.** Cada página dice explícitamente que el texto
  definitivo está pendiente de entrega y validación por B-SHP.

**Lo que hace falta de parte del cliente:**

1. Texto del **aviso de privacidad**.
2. Texto de los **términos y condiciones**.
3. **Datos de contacto** reales (correo, formulario o WhatsApp).
4. **URLs de las 5 redes sociales** — hoy siguen en `#` (Instagram, YouTube,
   TikTok, X, Spotify). El documento solo prohíbe `#` en los enlaces legales,
   pero conviene cerrarlo antes de publicar.

---

## Lo que NO se hizo, a propósito

- No se inventaron precios, planes, claims, testimonios, eventos ni fechas.
- No se sustituyó el Member Access por “$55 USD” ni por ningún otro precio.
- No se publicó la sección de Players.
- Se retiró una imagen que llevaba incrustado el logo **“HÁBITAT”**, de otra
  marca inmobiliaria: no debe aparecer en la web de B-SHP. Se cambió por
  material propio del universo.
