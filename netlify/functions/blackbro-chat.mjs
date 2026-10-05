/* ============================================================
   BLACKBRO ↔ DIFY  ·  proxy server-side
   ------------------------------------------------------------
   Este fichero es el único punto del proyecto que conoce la API
   Key. El navegador nunca la ve, no aparece en el repositorio y
   no viaja por WhatsApp.

        /blackbro  →  /api/blackbro/chat  →  api.dify.ai/v1
                      (esta función)          (Chatflow BLACKBRO)

   CÓMO SE ENCIENDE (lo hace Fer, una sola vez):
     Netlify → Site configuration → Environment variables → Add
        DIFY_API_KEY   = app-xxxxxxxxxxxxxxxxxxxxxxxx
     (opcional)
        DIFY_API_BASE  = https://api.dify.ai/v1   ← sólo si el
                         Chatflow vive en otra instancia de Dify
     Después: Deploys → Trigger deploy → Clear cache and deploy.

   Docs del endpoint: https://docs.dify.ai/en/api-reference/guides/chatflow
   ============================================================ */

export const config = { path: '/api/blackbro/chat' };

const BASE = (process.env.DIFY_API_BASE || 'https://api.dify.ai/v1').replace(/\/+$/, '');
const LIMITE_CARACTERES = 4000;

/* Freno best-effort por IP. Es por instancia (serverless), así que no
   sustituye a un rate limit de verdad: sólo evita que un bucle tonto del
   navegador dispare cien llamadas seguidas contra la cuota de Dify. */
const VENTANA_MS = 60000;
const MAX_POR_VENTANA = 25;
const visitas = new Map();

function frenado(ip) {
  const ahora = Date.now();
  const previas = (visitas.get(ip) || []).filter((t) => ahora - t < VENTANA_MS);
  previas.push(ahora);
  visitas.set(ip, previas);
  if (visitas.size > 500) {
    for (const [k, v] of visitas) { if (!v.length || ahora - v[v.length - 1] > VENTANA_MS) visitas.delete(k); }
  }
  return previas.length > MAX_POR_VENTANA;
}

const JSON_HEAD = { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' };
const fallo = (codigo, mensaje, status) =>
  new Response(JSON.stringify({ error: codigo, message: mensaje }), { status, headers: JSON_HEAD });

export default async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: { allow: 'POST, OPTIONS' } });
  }
  if (request.method !== 'POST') {
    return fallo('method_not_allowed', 'Sólo POST.', 405);
  }

  const key = process.env.DIFY_API_KEY;
  if (!key) {
    /* Estado esperado hasta que Fer cargue la key: el front lo entiende
       y avisa en pantalla en vez de romperse. */
    return fallo('missing_api_key', 'Falta DIFY_API_KEY en las variables de entorno del sitio.', 503);
  }

  const ip = request.headers.get('x-nf-client-connection-ip') ||
             (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
             'anon';
  if (frenado(ip)) {
    return fallo('rate_limited', 'Demasiadas peticiones seguidas. Espera unos segundos.', 429);
  }

  let cuerpo;
  try { cuerpo = await request.json(); } catch { return fallo('bad_request', 'JSON inválido.', 400); }

  const query = typeof cuerpo.query === 'string' ? cuerpo.query.trim() : '';
  if (!query) return fallo('empty_query', 'No hay mensaje que enviar.', 400);
  if (query.length > LIMITE_CARACTERES) {
    return fallo('query_too_long', 'El mensaje supera los ' + LIMITE_CARACTERES + ' caracteres.', 413);
  }

  /* Sólo se deja pasar lo que Dify necesita, ya saneado. Nada que venga
     del navegador llega crudo al Chatflow. */
  const usuario = String(cuerpo.user || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 64) || 'player-anon';
  const carga = {
    inputs: (cuerpo.inputs && typeof cuerpo.inputs === 'object' && !Array.isArray(cuerpo.inputs)) ? cuerpo.inputs : {},
    query,
    response_mode: cuerpo.response_mode === 'blocking' ? 'blocking' : 'streaming',
    conversation_id: typeof cuerpo.conversation_id === 'string' ? cuerpo.conversation_id : '',
    user: usuario,
    files: []
  };

  let arriba;
  try {
    arriba = await fetch(BASE + '/chat-messages', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + key,
        'Content-Type': 'application/json',
        Accept: carga.response_mode === 'streaming' ? 'text/event-stream' : 'application/json'
      },
      body: JSON.stringify(carga)
    });
  } catch (e) {
    return fallo('upstream_unreachable', 'No se pudo contactar con Dify.', 502);
  }

  if (!arriba.ok) {
    let detalle = {};
    try { detalle = await arriba.json(); } catch {}
    const codigo = detalle.code || '';

    /* La conversación caducó o no pertenece a este usuario: el front lo
       sabe interpretar y abre una nueva sin molestar al Player. */
    if (arriba.status === 404 || codigo === 'conversation_not_exists' || codigo === 'not_found') {
      return fallo('conversation_not_found', 'La conversación ya no existe en Dify.', 404);
    }
    if (arriba.status === 401 || arriba.status === 403) {
      return fallo('bad_api_key', 'Dify rechazó la API Key del sitio.', 502);
    }
    if (arriba.status === 429) {
      return fallo('rate_limited', 'Dify está limitando las peticiones.', 429);
    }
    return fallo('upstream_error', detalle.message || ('Dify respondió ' + arriba.status + '.'), 502);
  }

  if (carga.response_mode === 'blocking') {
    const datos = await arriba.json();
    return new Response(JSON.stringify({
      answer: datos.answer || '',
      conversation_id: datos.conversation_id || '',
      message_id: datos.message_id || datos.id || ''
    }), { status: 200, headers: JSON_HEAD });
  }

  /* Streaming: se reenvía el SSE de Dify tal cual. Así el Player ve la
     respuesta escribirse y no hay riesgo de timeout de función. */
  return new Response(arriba.body, {
    status: 200,
    headers: {
      'content-type': 'text/event-stream; charset=utf-8',
      'cache-control': 'no-cache, no-transform',
      connection: 'keep-alive',
      'x-accel-buffering': 'no'
    }
  });
};
