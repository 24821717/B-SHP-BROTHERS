/* ============================================================
   Servidor de desarrollo — B-SHP BROTHERS
   ------------------------------------------------------------
   Sirve web/ Y ADEMÁS levanta /api/blackbro/chat con la misma
   función que usa Netlify. Es la única forma de probar el chat
   de BLACKBRO en local, porque `python3 -m http.server` no sabe
   ejecutar funciones.

   Sin dependencias: sólo Node 18 o superior.

       cd "FER PROYECT"
       DIFY_API_KEY=app-xxxxxxxx node scripts/dev.mjs
       → http://localhost:3010/            (home)
       → http://localhost:3010/blackbro/   (BLACKBRO)

   Sin DIFY_API_KEY el sitio se ve igual y el chat avisa en
   pantalla de que falta la key: es el mismo estado que tendrá
   Netlify hasta que Fer la cargue.
   ============================================================ */
import { createServer } from 'node:http';
import { readFile, stat, appendFile } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const WEB = join(RAIZ, 'web');

// La key puede venir de un `.env` en la raíz (que NO se versiona) o de la
// línea de comandos. Lo que ya viene en el entorno manda: así
// `DIFY_API_KEY=... node scripts/dev.mjs` sigue pudiendo pisar el .env.
try { process.loadEnvFile(join(RAIZ, '.env')); } catch { /* no hay .env: normal */ }
const PUERTO = Number(process.env.PORT || 3010);

const chat = (await import(join(RAIZ, 'netlify/functions/blackbro-chat.mjs'))).default;

// FOUNDERS 333. Si no hay base configurada, en local se apunta la función a
// un buzón que sirve este mismo servidor: así se puede recorrer el formulario
// entero —validación, envío, estado de éxito— sin conectar nada todavía.
// Los leads de prueba caen en `.dev-leads.jsonl`, que no se versiona.
const BUZON = '/__dev/lead-sink';
if (!process.env.FOUNDERS_WEBHOOK_URL && !process.env.FOUNDERS_AIRTABLE_TOKEN) {
  process.env.FOUNDERS_WEBHOOK_URL = `http://localhost:${PUERTO}${BUZON}`;
  process.env.BSHP_DEV_BUZON = '1';
}
const lead = (await import(join(RAIZ, 'netlify/functions/founders-lead.mjs'))).default;

const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.ico': 'image/x-icon', '.mp4': 'video/mp4',
  '.webm': 'video/webm', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8'
};

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');

  /* ---- buzón local de leads (sólo desarrollo) ---- */
  if (url.pathname === BUZON && req.method === 'POST') {
    const trozos = [];
    for await (const t of req) trozos.push(t);
    const linea = Buffer.concat(trozos).toString('utf8');
    await appendFile(join(RAIZ, '.dev-leads.jsonl'), linea + '\n');
    try {
      const l = JSON.parse(linea);
      console.log(`  ✉  lead ${l.lead_type} recibido — ${l.name} · guardado en .dev-leads.jsonl`);
    } catch { console.log('  ✉  lead recibido'); }
    res.writeHead(200, { 'content-type': 'application/json' }).end('{"ok":true}');
    return;
  }

  /* ---- la función de FOUNDERS 333 ---- */
  if (url.pathname.startsWith('/api/founders')) {
    const trozos = [];
    for await (const t of req) trozos.push(t);
    const peticion = new Request('http://localhost' + url.pathname, {
      method: req.method,
      headers: req.headers,
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : Buffer.concat(trozos)
    });
    const salida = await lead(peticion);
    res.writeHead(salida.status, Object.fromEntries(salida.headers));
    res.end(Buffer.from(await salida.arrayBuffer()));
    return;
  }

  /* ---- la función de BLACKBRO ---- */
  if (url.pathname.startsWith('/api/blackbro')) {
    const trozos = [];
    for await (const t of req) trozos.push(t);
    const peticion = new Request('http://localhost' + url.pathname, {
      method: req.method,
      headers: req.headers,
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : Buffer.concat(trozos)
    });
    const salida = await chat(peticion);
    res.writeHead(salida.status, Object.fromEntries(salida.headers));
    if (salida.body) {
      for await (const t of salida.body) res.write(Buffer.from(t));   // SSE en directo
    }
    res.end();
    return;
  }

  /* ---- ficheros estáticos ---- */
  let ruta = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
  if (ruta.endsWith('/')) ruta += 'index.html';
  let destino = join(WEB, ruta);

  try {
    const info = await stat(destino);
    if (info.isDirectory()) destino = join(destino, 'index.html');
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('404 · ' + ruta);
    return;
  }

  try {
    const datos = await readFile(destino);
    res.writeHead(200, {
      'content-type': TIPOS[extname(destino).toLowerCase()] || 'application/octet-stream',
      'cache-control': 'no-store'
    });
    res.end(datos);
  } catch {
    res.writeHead(404).end('404');
  }
}).listen(PUERTO, () => {
  console.log('\n  B-SHP BROTHERS · desarrollo');
  console.log('  → http://localhost:' + PUERTO + '/');
  console.log('  → http://localhost:' + PUERTO + '/blackbro/');
  console.log('  → http://localhost:' + PUERTO + '/founders333/');
  console.log('  DIFY_API_KEY: ' + (process.env.DIFY_API_KEY ? 'cargada ✔' : 'NO cargada — el chat avisará en pantalla'));
  console.log('  FOUNDERS: ' + (process.env.BSHP_DEV_BUZON
    ? 'buzón local — los leads caen en .dev-leads.jsonl'
    : 'base real configurada ✔') + '\n');
});
