# Para Fer · lo que falta configurar en Netlify

**Fecha:** 02-oct-2026
**Para:** Fer (lo hace él; las claves no pasan por Marcela, ni por el repositorio, ni por WhatsApp).

Se hace en el sitio de Netlify **de producción** (el que publica `bshpbrothers-web`).
Hoy sólo falta **una variable**: la del agente BLACKBRO.

---

## 1. BLACKBRO · la API Key de Dify

### Cómo se obtiene (en Dify)
1. Entra en **https://cloud.dify.ai** con la cuenta donde vive el Chatflow de BLACKBRO.
2. **Studio** → abre la app **BLACKBRO** (la que responde en `udify.app/chat/WXA5s8ln0mG3jrOe`).
3. Comprueba que la última versión está **publicada**: botón **Publish** arriba a la derecha.
   La API sólo responde con lo publicado, no con el borrador.
4. Menú de la izquierda → **API Access** (en algunas versiones: **Access API**).
5. Arriba a la derecha → **API Key** → **+ Create new Secret key**.
6. Copia la clave. Empieza por **`app-`**. **Sólo se enseña una vez**: si se pierde, se crea otra.

> Si el Chatflow NO está en la nube pública de Dify (una instancia propia), copia también
> la **API Server** que aparece en esa misma pantalla de API Access (termina en `/v1`).

### Dónde se pone (en Netlify)
1. **app.netlify.com** → el sitio de producción de B-SHP.
2. **Site configuration** → **Environment variables** → **Add a variable** → *Add a single variable*.
3. Rellena:

   | Key | Value |
   |---|---|
   | `DIFY_API_KEY` | `app-…` (la clave del paso 6) |
   | `DIFY_API_BASE` | **sólo** si es instancia propia: la API Server que termina en `/v1`. Si usas cloud.dify.ai, **no la crees**. |

   Scopes: deja **All scopes**. Values: el mismo para todos los contextos.
4. **Create variable**.
5. **Deploys** → **Trigger deploy** → **Clear cache and deploy site**.
   Sin este paso la variable no entra: Netlify sólo la lee al desplegar.

### Cómo comprobar que funciona
- Abre `/blackbro/`, escribe algo en el chat → debe contestar BLACKBRO.
- Si dice que **aún no está conectado** → la variable no está o no se redesplegó (paso 5).
- Si da **error de autorización** → la clave está mal copiada o se borró en Dify: crea otra.

---

## 2. FOUNDERS333 · el formulario → ya no hace falta nada

Por decisión del 02-oct («mejor sin formulario y botón a WhatsApp, más rápido, menos
fricción»), **Founders333 ya no tiene formulario**. Los tres botones
(«Quiero ser Builder», «Quiero ser Architect» y «Quiero entrar a GEN01») abren
**WhatsApp al +52 1 55 7480 2651** con el mensaje ya escrito y el rol indicado.

**No hay que configurar nada en Netlify para Founders.** Lo único que conviene:
- Que alguien atienda ese WhatsApp: ahí llegan las aplicaciones a GEN01.
- Si el número que debe recibirlas es otro, decírselo a Marcela (es un cambio de una línea).

La función que guardaba leads (`netlify/functions/founders-lead.mjs`) sigue en el
proyecto pero **no la usa ninguna página**. Si algún día se vuelve al formulario, las
variables para encenderla están explicadas al principio de ese archivo
(`FOUNDERS_WEBHOOK_URL` o `FOUNDERS_AIRTABLE_*`).

---

## 3. Resumen

| Qué | Variable | ¿Obligatoria? |
|---|---|---|
| BLACKBRO responde | `DIFY_API_KEY` | **Sí** |
| BLACKBRO en Dify propio | `DIFY_API_BASE` | Sólo si no es cloud.dify.ai |
| Founders333 | — | No (va por WhatsApp) |

Después de añadir o cambiar cualquier variable: **Clear cache and deploy site**.
