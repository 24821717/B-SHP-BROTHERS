/* ============================================================
   FOUNDERS 333  ·  captura de leads server-side
   ------------------------------------------------------------
   Los dos journeys del handoff entran por aquí y salen separados
   por `lead_type`. Nunca se mezclan:

        GENESIS      → interés en GEN 01 (Lista Genesis)
        PARTNERSHIP  → «Construye con nosotros»

        /founders333  →  /api/founders/lead  →  la base de B-SHP
                         (esta función)

   Igual que con BLACKBRO: el token vive SÓLO aquí, como variable
   de entorno del sitio. Ni en el repositorio, ni en el navegador.

   CÓMO SE ENCIENDE — hay dos caminos, se elige UNO:

   A) Webhook (Make, Zapier, n8n, un endpoint propio…)
        FOUNDERS_WEBHOOK_URL    = https://…
        FOUNDERS_WEBHOOK_SECRET = (opcional) viaja como
                                  X-B-SHP-Secret, para que el
                                  receptor sepa que es nuestro

   B) Airtable
        FOUNDERS_AIRTABLE_TOKEN = pat…
        FOUNDERS_AIRTABLE_BASE  = app…
        FOUNDERS_AIRTABLE_TABLE = Leads          (por defecto)

   Después: Deploys → Trigger deploy → Clear cache and deploy.

   Mientras no haya ninguno de los dos, la función responde
   `not_configured` y la página lo dice en pantalla sin borrar
   nada de lo escrito. La persona nunca cree que se envió.
   ============================================================ */

export const config = { path: '/api/founders/lead' };

const JSON_HEAD = { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' };
const responde = (cuerpo, status = 200) =>
  new Response(JSON.stringify(cuerpo), { status, headers: JSON_HEAD });
const fallo = (codigo, mensaje, status) => responde({ ok: false, error: codigo, message: mensaje }, status);

/* Freno best-effort por IP. Es por instancia (serverless), así que no
   sustituye a un rate limit de verdad: sólo evita que un bot tonto
   llene la lista de basura en diez segundos. */
const VENTANA_MS = 60000;
const MAX_POR_VENTANA = 6;
const visitas = new Map();

function frenado(ip) {
  const ahora = Date.now();
  const previas = (visitas.get(ip) || []).filter((t) => ahora - t < VENTANA_MS);
  previas.push(ahora);
  visitas.set(ip, previas);
  if (visitas.size > 500) {
    for (const [k, v] of visitas) {
      if (!v.length || ahora - v[v.length - 1] > VENTANA_MS) visitas.delete(k);
    }
  }
  return previas.length > MAX_POR_VENTANA;
}

const texto = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* Taxonomías FROZEN del handoff. Si llega algo fuera de la lista,
   no se inventa una categoría nueva: se guarda vacía. */
const CATEGORIAS = new Set([
  'NEGOCIO', 'MARCA', 'TECH', 'CONTENIDO', 'EXPERIENCIA',
  'COMUNIDAD', 'PROYECTO', 'CARRERA', 'OTRO'
]);

export default async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: { allow: 'POST, OPTIONS' } });
  }
  if (request.method !== 'POST') {
    return fallo('method_not_allowed', 'Sólo POST.', 405);
  }

  const ip = request.headers.get('x-nf-client-connection-ip')
    || (request.headers.get('x-forwarded-for') || '').split(',')[0].trim()
    || 'anon';
  if (frenado(ip)) {
    return fallo('rate_limited', 'Demasiados envíos seguidos. Espera un momento.', 429);
  }

  let cuerpo;
  try { cuerpo = await request.json(); } catch (e) {
    return fallo('invalid', 'Cuerpo ilegible.', 400);
  }

  const tipo = texto(cuerpo.lead_type, 20).toUpperCase();
  if (tipo !== 'GENESIS' && tipo !== 'PARTNERSHIP') {
    return fallo('invalid', 'lead_type debe ser GENESIS o PARTNERSHIP.', 400);
  }

  const email = texto(cuerpo.email, 160);
  const name = texto(cuerpo.name, 120);
  if (!name || name.length < 2) return fallo('invalid', 'Falta el nombre.', 400);
  if (!EMAIL.test(email)) return fallo('invalid', 'Email no válido.', 400);

  /* Campos comunes a los dos tipos. */
  const base = {
    lead_type: tipo,
    name,
    email,
    whatsapp: texto(cuerpo.whatsapp, 40),
    source: texto(cuerpo.source, 80),
    campaign: texto(cuerpo.campaign, 80),
    created_at: new Date().toISOString()
  };

  let lead;
  if (tipo === 'GENESIS') {
    const cat = texto(cuerpo.builder_category, 40).toUpperCase();
    const que = texto(cuerpo.what_are_you_building, 1200);
    const pais = texto(cuerpo.country, 80);
    if (!pais) return fallo('invalid', 'Falta el país.', 400);
    if (!que) return fallo('invalid', 'Falta qué está construyendo.', 400);
    lead = {
      ...base,
      country: pais,
      builder_category: CATEGORIAS.has(cat) ? cat : '',
      what_are_you_building: que,
      bottleneck: texto(cuerpo.bottleneck, 800)
    };
  } else {
    const que = texto(cuerpo.what_do_you_want_to_build, 1200);
    if (!que) return fallo('invalid', 'Falta qué quiere construir.', 400);
    lead = {
      ...base,
      company_project: texto(cuerpo.company_project, 160),
      opportunity_category: texto(cuerpo.opportunity_category, 80),
      what_do_you_want_to_build: que
    };
  }

  /* ---------- A dónde va ---------- */
  const webhook = process.env.FOUNDERS_WEBHOOK_URL;
  const airtableToken = process.env.FOUNDERS_AIRTABLE_TOKEN;
  const airtableBase = process.env.FOUNDERS_AIRTABLE_BASE;

  if (!webhook && !(airtableToken && airtableBase)) {
    /* Estado esperado hasta que Fer conecte la base. La página lo
       cuenta en pantalla y conserva lo escrito: nadie se queda
       creyendo que mandó algo. */
    return fallo('not_configured', 'La Lista Genesis todavía no está conectada a ninguna base.', 503);
  }

  try {
    if (webhook) {
      const cabeceras = { 'content-type': 'application/json' };
      if (process.env.FOUNDERS_WEBHOOK_SECRET) {
        cabeceras['x-b-shp-secret'] = process.env.FOUNDERS_WEBHOOK_SECRET;
      }
      const arriba = await fetch(webhook, {
        method: 'POST', headers: cabeceras, body: JSON.stringify(lead)
      });
      if (!arriba.ok) {
        return fallo('upstream', 'La base rechazó el registro.', 502);
      }
    } else {
      const tabla = encodeURIComponent(process.env.FOUNDERS_AIRTABLE_TABLE || 'Leads');
      const arriba = await fetch(
        `https://api.airtable.com/v0/${airtableBase}/${tabla}`,
        {
          method: 'POST',
          headers: {
            authorization: `Bearer ${airtableToken}`,
            'content-type': 'application/json'
          },
          body: JSON.stringify({ records: [{ fields: lead }], typecast: true })
        }
      );
      if (!arriba.ok) {
        return fallo('upstream', 'La base rechazó el registro.', 502);
      }
    }
  } catch (e) {
    return fallo('upstream', 'No se pudo alcanzar la base.', 502);
  }

  return responde({ ok: true, lead_type: tipo });
};
