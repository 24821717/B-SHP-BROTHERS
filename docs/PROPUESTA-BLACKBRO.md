# BLACKBRO — qué se construyó

**Fecha:** 17-sep-2026
**Origen:** `secciones nuevas/blackbro/` — *BLACKBRO LANDING COPY + BUILD MASTER V1.1*,
el mockup de Fer (`como quiere fer que se vea aprox blckbro.jpeg`) y las notas
manuscritas (*«2 secciones nuevas: 1. BlackBro · 2. Founders333 → salen de la ppal»*).
**Estado:** 🔵 **BUILT** — no E2E PASS. Falta la API Key para poder probar P0.

---

## PARA FER · encender BLACKBRO en 3 pasos

La web ya está construida y esperando. La API Key **no está** en el repositorio,
no está en el navegador y nadie tuvo que recibirla por WhatsApp: la cargas tú
directamente en el hosting.

1. **Netlify → Site configuration → Environment variables → Add a variable**
   ```
   DIFY_API_KEY = app-xxxxxxxxxxxxxxxxxxxxxxxx
   ```
   (Sólo si el Chatflow no vive en la nube pública de Dify, añade también
   `DIFY_API_BASE = https://tu-instancia/v1`. Si usas api.dify.ai, no hace falta.)

2. **Deploys → Trigger deploy → Clear cache and deploy site.**

3. Abre `/blackbro`, escribe una pregunta real y manda un segundo mensaje.
   Si el segundo continúa la misma conversación, **P0 está cumplido**.

Hasta que cargues la key, el chat no se rompe: avisa en pantalla de que
todavía no está conectado.

---

## 1. Dónde está cada cosa

```
web/
├── index.html                     ← HOME · sección nueva 07b + nav + mapa + pie
├── blackbro/index.html            ← LA PÁGINA (7 bloques + chat)
└── assets/
    ├── css/blackbro.css           ← todo lo que BLACKBRO añade
    ├── css/home-v2.css            ← + el bloque «la puerta desde la home»
    ├── js/blackbro.js             ← el cliente del chat (CONFIG arriba del todo)
    ├── img/blackbro/              ← wordmark, avatar, retratos, pósters
    ├── img/home/terr-blackbro.jpg ← la casilla del mapa de la home
    └── video/blackbro/            ← hero.mp4 · final.mp4 (del Drive, optimizados)

netlify/functions/blackbro-chat.mjs  ← EL ÚNICO SITIO QUE CONOCE LA API KEY
netlify.toml                         ← functions + /api/blackbro/* → la función
scripts/dev.mjs                      ← servidor local CON la función (ver §6)
```

## 2. Dónde entra en la página principal

Entre **07 · «Un mundo más grande»** y **08 · Experiencias**, con el `id="blackbro"`.

El razonamiento: el mapa de territorios acaba de enseñar de qué está hecho el
mundo B-SHP; BLACKBRO es la única pieza de ese mundo con la que se puede
**hablar**, así que aparece justo cuando el visitante está explorando qué hay
dentro. Queda a mitad de página —por encima de Goods, de la membresía y del
manifiesto—, que es donde todavía hay tráfico, y no toca el arranque de la home:
el hero sigue abriendo directo, como pide el master.

Además:
- **Nav:** «BlackBro» es el primer enlace, como en el blueprint de Fer.
- **Mapa de territorios:** BLACKBRO ocupa la casilla que estaba vacía en la rejilla.
- **Pie:** enlace nuevo.
- Las **6 jugadas** también están en la home: cada una entra a `/blackbro/?play=…`
  y llega con la intención ya precargada en el chat.

## 3. La página `/blackbro`

Los siete bloques del mockup, con el copy del BUILD MASTER V1.1 donde el patch
lo reemplaza:

| # | Bloque | Notas |
|---|--------|-------|
| 01 | Hero — *Your AI brother in the game* | vídeo `HERO1.mp4` del Drive |
| 02 | Qué es — Pregunta · Aclara · Decide · Ejecuta · Prueba | |
| 03 | Las 6 jugadas | textos **FROZEN**, literales |
| 04 | **El chat** | el producto |
| 05 | Para quién es | headline del patch V1.1 · 05 |
| 06 | FAQ | ver §5 · ACCESS RULE |
| 07 | Cierre — *The game has already started* | vídeo `HEROFINAL.mp4` |

**ENTER BLACKBRO** (nav, hero, cierre, barra de móvil) lleva **siempre al mismo
destino**: el chat, con el cursor dentro del input. En escritorio hace scroll
suave; en móvil salta directo y además hay una barra fija abajo, para que el
Player nunca tenga que recorrer secciones intermedias para llegar al producto.

**Estados del chat:** INITIAL → INPUT ACTIVE → THINKING → RESPONSE → FOLLOW-UP →
ERROR → RETRY. El estado INITIAL es literalmente el del patch:
*BLACKBRO ONLINE · ¿QUÉ ESTÁ FRENANDO TU JUEGO? · Puedes empezar escribiendo o
elegir una jugada.*

**Las 6 jugadas no envían mensaje.** Tocar una activa el chat y **precarga** la
intención; el Player completa y envía. Así un toque accidental no gasta una
llamada a la API. Los textos que se precargan están en `JUGADAS`, arriba del todo
de `assets/js/blackbro.js`: si el backend espera otra forma de iniciar cada
intención, se cambia ahí y en ningún otro sitio.

## 4. La integración con Dify

```
navegador → /api/blackbro/chat → api.dify.ai/v1/chat-messages
            (Netlify Function,    (Chatflow BLACKBRO,
             aquí vive la key)     ya construido, no se toca)
```

- La key **nunca** llega al navegador: el front no la conoce ni puede pedirla.
- `response_mode: streaming` — la respuesta se escribe en pantalla según llega.
  Además de verse mejor, evita el timeout de las funciones.
- El `conversation_id` que devuelve Dify se guarda y se reenvía en cada mensaje:
  eso es lo que mantiene el contexto. Sobrevive a un F5, muere al cerrar la
  pestaña, y «Nuevo chat» lo cierra a mano.
- Si Dify dice que la conversación ya no existe, el front abre una nueva y
  reintenta el mismo mensaje **una vez**, sin molestar al Player.
- El `user` que se manda a Dify es un identificador anónimo aleatorio guardado en
  el navegador. Sin PII.
- Errores traducidos a pantalla: sin key, key rechazada, límite de peticiones,
  Dify caído, red caída. Todos con **Reintentar** cuando reintentar tiene sentido.

**Probado hasta donde se puede sin la key:** con una key falsa, la petición sale
de la función, llega a `api.dify.ai` y vuelve rechazada; el front lo interpreta y
lo enseña. El circuito está completo: sólo falta la credencial buena.

## 5. Decisiones que tomé — y por qué

**FAQ · ACCESS RULE.** El mockup trae seis preguntas. Tres de ellas
—«¿Tiene un costo?», «¿Necesito ser parte de B-SHP?», «¿En qué idioma está
disponible?»— son exactamente lo que el patch V1.1 · 06 prohíbe publicar hasta
que Fer decida si BLACKBRO V1 es público / acceso B-SHP / beta / gated. **No las
inventé.** Están escritas y comentadas dentro de `blackbro/index.html`, listas
para entrar con su respuesta aprobada. En su sitio hay una cuarta pregunta que sí
se puede responder sin decidir nada (qué pasa con tu conversación).

**El logo.** Se usa el wordmark del Drive tal cual, sin rediseñarlo ni
reconstruirlo. Sigue faltando el master vectorizable: los PNG actuales tienen un
halo de color en los bordes que se nota si algún día se imprime o se pone sobre
fondo claro. En negro, que es donde va, no molesta.

**FOUNDERS333.** El blueprint la pone en el menú, pero todavía no existe. El
enlace está escrito y comentado en la nav: se descomenta el día que se construya.
No dejé un enlace muerto.

**Los temas de la barra lateral** (Estrategia, Disciplina, Negocio…) funcionan
igual que las jugadas: precargan, no inventan intenciones de backend.

**Las acciones bajo cada respuesta** (Copiar, Profundiza, Dame ejemplos,
Siguiente jugada) también precargan. Copiar es puro navegador, no gasta API.

## 6. Cómo verlo en local

El chat necesita que alguien ejecute la función, así que `python3 -m http.server`
**ya no basta** para revisar BLACKBRO:

```bash
cd "/home/camilo23/FER PROYECT"

# sólo mirar el diseño:
node scripts/dev.mjs

# probar el chat de verdad:
DIFY_API_KEY=app-xxxxxxxx node scripts/dev.mjs
```

- http://localhost:3010/ — la home, con la sección nueva
- http://localhost:3010/blackbro/ — BLACKBRO
- http://localhost:3010/blackbro/?vista=1 — un intercambio **de muestra**,
  marcado como tal, para revisar el diseño del chat sin llamar a ninguna API
- http://localhost:3010/blackbro/?play=board — llegada desde la home con jugada

## 7. Tracking (V1.1 · 07)

Se empuja a `dataLayer` (GTM) y se emite `bshp:track`, como el resto del sitio.
Sin PII, sin contenido de conversaciones, sin keys.

| Evento | Metadata |
|---|---|
| `blackbro_view` | — |
| `blackbro_enter` | `source_cta`, `device_type` |
| `blackbro_quick_action` | `action_name`, `conversation_id` |
| `blackbro_message_sent` | `conversation_id`, `message_number` |
| `blackbro_response_received` | `conversation_id`, `message_number`, `response_time_ms` |
| `blackbro_cta_click` | `cta_name`, `cta_location` |
| `blackbro_error` | `error_type`, `conversation_id` |

## 8. Lo que falta para poder decir «terminado»

El BUILD MASTER es explícito: no vale que esté maquetado, ni que se vea AAA, ni
que el chat aparezca. La prueba es un Player desconocido haciendo el recorrido
completo. Estado real de esa lista:

- [x] `/blackbro` construida · arquitectura, copy y 6 jugadas congelados
- [x] Frontend → endpoint propio → Dify, con contexto de conversación
- [x] Quick Actions conectadas al flujo, sin auto-enviar
- [x] Hero + cierre + responsive + barra de móvil
- [x] Tracking completo instrumentado
- [ ] **P0 real: una pregunta enviada recibe la respuesta correcta de BLACKBRO**
      → necesita `DIFY_API_KEY`
- [ ] Segundo mensaje continúa la misma conversación → misma dependencia
- [ ] 2–3 regression cases desde producción
- [ ] 🟠 **ACCESS RULE** — decisión de Fer. No bloquea build; **sí bloquea LIVE**
- [ ] 🔴 **Production wordmark master** — vectorizable + exports

## 9. Founders333

La segunda sección nueva. La carpeta `secciones nuevas/founders333/` está vacía:
todavía no hay material ni copy. Pendiente de que Fer lo mande.
