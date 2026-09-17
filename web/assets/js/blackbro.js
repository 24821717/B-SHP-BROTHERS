/* ============================================================
   BLACKBRO — cliente de /blackbro
   ------------------------------------------------------------
   Habla con NUESTRO endpoint, nunca con Dify directamente:
   el navegador no ve —ni puede ver— la API Key.

       navegador  →  /api/blackbro/chat  →  Dify Chatflow
                     (Netlify Function,     (api.dify.ai/v1)
                      la key vive aquí)

   Estados: INITIAL → INPUT ACTIVE → THINKING → RESPONSE →
            FOLLOW-UP → ERROR → RETRY.
   ============================================================ */
(function () {
  'use strict';

  /* ==========================================================
     1. CONFIGURACIÓN — LO ÚNICO QUE SE TOCA AQUÍ
     ========================================================== */

  /* Nuestro endpoint. En Netlify lo sirve netlify/functions/blackbro-chat.mjs
     (netlify.toml redirige /api/blackbro/* hacia la función). */
  var ENDPOINT = '/api/blackbro/chat';

  /* LAS 6 JUGADAS · FROZEN (BUILD MASTER V1.1 · 03).
     Regla congelada: tocar una jugada NO envía el mensaje. Activa el chat
     y PRECARGA la intención; el Player completa y envía. Así un toque
     accidental no gasta una llamada a la API.

     `texto` es lo que aparece escrito en el input. Si el backend espera
     otra forma de iniciar cada intención (un comando, un prefijo, un
     inputs.* de Dify), SE CAMBIA AQUÍ y en ningún otro sitio. */
  var JUGADAS = {
    bottleneck:  { nombre: 'ENCUENTRA MI BOTTLENECK', texto: 'Ayúdame a encontrar mi bottleneck. Lo que estoy construyendo ahora es: ' },
    next_play:   { nombre: 'DEFINE MI NEXT PLAY',     texto: 'Necesito definir mi next play. Mi situación ahora mismo es: ' },
    tres_nn:     { nombre: 'AYÚDAME CON MIS 3NN',     texto: 'Ayúdame con mis 3NN. ' },
    board:       { nombre: 'CREA MI BOARD',           texto: 'Quiero crear mi board. Lo que tengo abierto ahora es: ' },
    proof:       { nombre: 'REVISA MI PROOF',         texto: 'Revisa mi proof. Esto es lo que ya hice: ' },
    sobre_bshp:  { nombre: 'PREGUNTA SOBRE B-SHP',    texto: 'Tengo una pregunta sobre B-SHP: ' }
  };

  /* Temas de la barra lateral: mismo mecanismo, sólo precargan. */
  var TEMAS = {
    estrategia: 'Quiero hablar de estrategia. ',
    disciplina: 'Quiero hablar de disciplina y consistencia. ',
    negocio:    'Quiero hablar de negocio. ',
    ideas:      'Quiero ordenar una idea o un proyecto. ',
    vida:       'Quiero hablar de vida real. ',
    bshp:       'Tengo una pregunta sobre B-SHP: '
  };

  /* Acciones que aparecen bajo cada respuesta. También precargan. */
  var SEGUIMIENTO = [
    { id: 'profundiza',  etiqueta: 'Profundiza',      texto: 'Profundiza en eso. ' },
    { id: 'ejemplos',    etiqueta: 'Dame ejemplos',   texto: 'Dame ejemplos concretos de eso. ' },
    { id: 'siguiente',   etiqueta: 'Siguiente jugada', texto: '¿Cuál es mi siguiente jugada? ' }
  ];

  /* ==========================================================
     2. UTILIDADES
     ========================================================== */

  var $ = function (id) { return document.getElementById(id); };
  var log      = $('bbLog');
  if (!log) return;                       // esta página no es /blackbro
  var inicio   = $('bbInicio');
  var input    = $('bbInput');
  var form     = $('bbForm');
  var enviarBt = $('bbEnviar');
  var barra    = $('bbBar');
  var estadoTx = $('bbEstado');
  var chips    = $('bbChips');

  var conversacion = '';                  // conversation_id de Dify
  var enviando = false;
  var nMensaje = 0;                       // message_number
  var ultimo = '';                        // para RETRY
  var reintentoLimpio = false;            // ya se reintentó tras conversación caducada

  var esMovil = window.matchMedia('(max-width:820px)').matches ||
                (window.matchMedia('(pointer:coarse)').matches && window.innerWidth < 1000);

  /* Página abierta a pelo desde el disco (file://) en vez de servida.
     El diseño se ve entero, pero no hay nadie ejecutando la función que
     habla con Dify: más vale decirlo que dar un error de red genérico. */
  var SIN_SERVIDOR = location.protocol === 'file:';

  /* --- identidad anónima del Player (Dify exige un `user`) ---
     Sin PII: un identificador aleatorio guardado en este navegador. */
  function playerId() {
    var k = 'bshp_bb_player';
    var v = '';
    try { v = localStorage.getItem(k) || ''; } catch (e) {}
    if (!v) {
      v = 'player-' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
      try { localStorage.setItem(k, v); } catch (e) {}
    }
    return v;
  }
  var PLAYER = playerId();

  /* --- la conversación sobrevive a un F5, pero no al cierre de pestaña --- */
  try { conversacion = sessionStorage.getItem('bshp_bb_conv') || ''; } catch (e) {}
  function guardarConv(id) {
    conversacion = id || '';
    try {
      if (conversacion) sessionStorage.setItem('bshp_bb_conv', conversacion);
      else sessionStorage.removeItem('bshp_bb_conv');
    } catch (e) {}
  }

  /* --- TRACKING (V1.1 · 07) ---
     Mismos nombres de evento y de parámetro que el master. Sin PII,
     sin contenido de las conversaciones, sin keys. */
  function track(evento, datos) {
    var carga = { event: evento };
    if (datos) { for (var k in datos) { if (datos[k] !== undefined && datos[k] !== '') carga[k] = datos[k]; } }
    (window.dataLayer = window.dataLayer || []).push(carga);
    try { window.dispatchEvent(new CustomEvent('bshp:track', { detail: carga })); } catch (e) {}
  }
  var TIPO = esMovil ? 'mobile' : 'desktop';

  function estado(nombre, texto) {
    if (barra) barra.setAttribute('data-estado', nombre);
    if (estadoTx) estadoTx.textContent = texto;
  }

  function abajo() { log.scrollTop = log.scrollHeight; }

  function escapar(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* --- markdown mínimo y seguro ---
     Se escapa SIEMPRE antes de formatear: nada de lo que llegue del
     modelo puede inyectar HTML. Sólo se reconstruyen las marcas que
     BLACKBRO usa de verdad: títulos, listas, negritas, código, enlaces. */
  function md(txt) {
    var esc = escapar(txt);
    var bloques = esc.split(/\n{2,}/);
    var html = '';

    bloques.forEach(function (b) {
      b = b.replace(/\s+$/, '');
      if (!b) return;

      if (/^```/.test(b)) {
        html += '<pre><code>' + b.replace(/^```[^\n]*\n?/, '').replace(/```$/, '') + '</code></pre>';
        return;
      }
      if (/^#{1,6}\s/.test(b)) {
        html += '<h3>' + linea(b.replace(/^#{1,6}\s*/, '')) + '</h3>';
        return;
      }
      if (/^&gt;\s?/.test(b)) {
        html += '<blockquote>' + linea(b.replace(/^&gt;\s?/gm, '')) + '</blockquote>';
        return;
      }
      if (/^\s*\d+[.)]\s/.test(b)) {
        html += '<ol>' + b.split('\n').map(function (l) {
          return '<li>' + linea(l.replace(/^\s*\d+[.)]\s*/, '')) + '</li>';
        }).join('') + '</ol>';
        return;
      }
      if (/^\s*[-*•]\s/.test(b)) {
        html += '<ul>' + b.split('\n').map(function (l) {
          return '<li>' + linea(l.replace(/^\s*[-*•]\s*/, '')) + '</li>';
        }).join('') + '</ul>';
        return;
      }
      html += '<p>' + linea(b).replace(/\n/g, '<br>') + '</p>';
    });

    return html || '<p></p>';
  }

  function linea(s) {
    return s
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1<em>$2</em>')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  }

  /* ==========================================================
     3. PINTAR LA CONVERSACIÓN
     ========================================================== */

  function quitarInicio() {
    if (inicio && inicio.parentNode) { inicio.parentNode.removeChild(inicio); inicio = null; }
  }

  function burbuja(quien, texto) {
    quitarInicio();
    var wrap = document.createElement('div');
    wrap.className = 'bbmsg bbmsg--' + (quien === 'yo' ? 'yo' : 'bro');

    var av;
    if (quien === 'yo') {
      av = document.createElement('span');
      av.className = 'bbmsg__av bbmsg__av--yo';
      av.innerHTML = '&#9670;';
    } else {
      av = document.createElement('img');
      av.className = 'bbmsg__av';
      av.src = '../assets/img/blackbro/avatar-mini.png';
      av.alt = '';
    }

    var cuerpo = document.createElement('div');
    cuerpo.className = 'bbmsg__cuerpo';

    var quienEl = document.createElement('p');
    quienEl.className = 'bbmsg__quien';
    quienEl.textContent = quien === 'yo' ? 'Tú' : 'BLACKBRO';

    var txt = document.createElement('div');
    txt.className = 'bbmsg__txt';
    if (quien === 'yo') txt.innerHTML = md(texto);

    cuerpo.appendChild(quienEl);
    cuerpo.appendChild(txt);
    wrap.appendChild(av);
    wrap.appendChild(cuerpo);
    log.appendChild(wrap);
    abajo();
    return txt;
  }

  function pensando() {
    var caja = burbuja('bro', '');
    caja.innerHTML = '<div class="bbpiensa"><span></span><span></span><span></span></div>';
    return caja;
  }

  /* acciones bajo una respuesta terminada (estado FOLLOW-UP) */
  function acciones(caja, texto) {
    var fila = document.createElement('div');
    fila.className = 'bbmsg__acciones';

    var copiar = document.createElement('button');
    copiar.type = 'button';
    copiar.className = 'bbmini';
    copiar.textContent = 'Copiar';
    copiar.addEventListener('click', function () {
      var ok = function () {
        copiar.textContent = 'Copiado';
        copiar.classList.add('is-ok');
        setTimeout(function () { copiar.textContent = 'Copiar'; copiar.classList.remove('is-ok'); }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto).then(ok, function () {});
      } else {
        var ta = document.createElement('textarea');
        ta.value = texto; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); ok(); } catch (e) {}
        document.body.removeChild(ta);
      }
      track('blackbro_cta_click', { cta_name: 'copiar_respuesta', cta_location: 'chat' });
    });
    fila.appendChild(copiar);

    SEGUIMIENTO.forEach(function (s) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'bbmini';
      b.textContent = s.etiqueta;
      b.addEventListener('click', function () {
        precargar(s.texto);
        track('blackbro_cta_click', { cta_name: 'followup_' + s.id, cta_location: 'chat' });
      });
      fila.appendChild(b);
    });

    caja.parentNode.appendChild(fila);
    abajo();
  }

  /* estado ERROR + RETRY */
  function error(tipo, mensaje, reintentar) {
    quitarInicio();
    estado('error', 'Conexión interrumpida');
    track('blackbro_error', { error_type: tipo, conversation_id: conversacion });

    var caja = document.createElement('div');
    caja.className = 'bberror';
    var p = document.createElement('p');
    p.textContent = mensaje;
    caja.appendChild(p);

    if (reintentar) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'bbmini';
      b.textContent = 'Reintentar';
      b.addEventListener('click', function () {
        if (caja.parentNode) caja.parentNode.removeChild(caja);
        mandar(ultimo, { reintento: true });
      });
      caja.appendChild(b);
    }

    log.appendChild(caja);
    abajo();
  }

  /* ==========================================================
     4. ENVÍO (P0 · frontend → Dify → respuesta → contexto)
     ========================================================== */

  function precargar(texto) {
    input.value = texto;
    input.focus();
    try { input.setSelectionRange(input.value.length, input.value.length); } catch (e) {}
    alto();
    abajo();
  }

  function mandar(texto, opts) {
    opts = opts || {};
    texto = (texto || '').trim();
    if (!texto || enviando) return;

    enviando = true;
    enviarBt.disabled = true;
    ultimo = texto;

    if (!opts.reintento) {
      burbuja('yo', texto);
      nMensaje += 1;
      input.value = '';
      alto();
    }

    track('blackbro_message_sent', { conversation_id: conversacion, message_number: nMensaje });

    if (SIN_SERVIDOR) {
      fin();
      error('sin_servidor',
        'Estás viendo la página abierta desde la carpeta, no desde el servidor. El diseño se ve entero, pero el chat necesita que alguien ejecute la función que habla con Dify. Ábrela en http://localhost:3010/blackbro/ (con «node scripts/dev.mjs» corriendo).',
        false);
      return;
    }

    var caja = pensando();
    estado('pensando', 'BLACKBRO está pensando');
    var t0 = Date.now();

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: texto, conversation_id: conversacion, user: PLAYER })
    }).then(function (res) {
      var tipo = res.headers.get('content-type') || '';

      if (!res.ok) {
        return res.json().catch(function () { return {}; }).then(function (d) {
          throw { codigo: d.error || ('http_' + res.status), mensaje: d.message || '' };
        });
      }
      if (tipo.indexOf('text/event-stream') !== -1 && res.body && res.body.getReader) {
        return leerStream(res, caja, t0);
      }
      return res.json().then(function (d) {
        if (d.conversation_id) guardarConv(d.conversation_id);
        cerrar(caja, d.answer || '', t0);
      });
    }).catch(function (e) {
      if (caja.parentNode && caja.parentNode.parentNode) {
        caja.parentNode.parentNode.removeChild(caja.parentNode.parentNode);
      }
      var cod = (e && e.codigo) || 'red';
      fin();

      /* La conversación caducó en Dify: se abre una nueva y se reintenta
         el mismo mensaje una sola vez, sin molestar al Player. */
      if (cod === 'conversation_not_found' && !reintentoLimpio) {
        reintentoLimpio = true;
        guardarConv('');
        mandar(ultimo, { reintento: true });
        return;
      }

      if (cod === 'missing_api_key') {
        error(cod, 'BLACKBRO todavía no está conectado en este entorno: falta configurar la API Key de Dify en el servidor. La interfaz está lista; en cuanto se cargue la key, responde.', false);
      } else if (cod === 'rate_limited') {
        error(cod, 'Demasiadas preguntas a la vez. Espera unos segundos y vuelve a intentarlo.', true);
      } else if (cod === 'empty_query') {
        error(cod, 'Escribe algo antes de enviar.', false);
      } else {
        error(cod, 'No se pudo completar la jugada. Revisa tu conexión e inténtalo otra vez.', true);
      }
    });
  }

  /* --- lectura del stream SSE que devuelve Dify --- */
  function leerStream(res, caja, t0) {
    var lector = res.body.getReader();
    var dec = new TextDecoder();
    var resto = '';
    var texto = '';
    var primera = true;

    function trozo(dato) {
      var d;
      try { d = JSON.parse(dato); } catch (e) { return; }

      if (d.conversation_id) guardarConv(d.conversation_id);

      if (d.event === 'message' || d.event === 'agent_message') {
        if (primera) { caja.innerHTML = ''; primera = false; }
        texto += (d.answer || '');
        caja.innerHTML = md(texto) + '<span class="bbmsg__cursor"></span>';
        abajo();
      } else if (d.event === 'message_replace') {
        texto = d.answer || '';
        caja.innerHTML = md(texto) + '<span class="bbmsg__cursor"></span>';
        abajo();
      } else if (d.event === 'error') {
        throw { codigo: d.code || 'dify_error', mensaje: d.message || '' };
      }
    }

    function tirar() {
      return lector.read().then(function (r) {
        if (r.done) { cerrar(caja, texto, t0); return; }
        resto += dec.decode(r.value, { stream: true });
        var partes = resto.split('\n\n');
        resto = partes.pop();
        partes.forEach(function (bloque) {
          bloque.split('\n').forEach(function (l) {
            if (l.indexOf('data:') === 0) trozo(l.slice(5).trim());
          });
        });
        return tirar();
      });
    }
    return tirar();
  }

  /* --- estado RESPONSE → FOLLOW-UP --- */
  function cerrar(caja, texto, t0) {
    reintentoLimpio = false;
    if (!texto) {
      caja.innerHTML = '<p>BLACKBRO no devolvió respuesta. Prueba a reformular la pregunta.</p>';
    } else {
      caja.innerHTML = md(texto);
      acciones(caja, texto);
    }
    track('blackbro_response_received', {
      conversation_id: conversacion,
      message_number: nMensaje,
      response_time_ms: Date.now() - t0
    });
    fin();
  }

  function fin() {
    enviando = false;
    enviarBt.disabled = false;
    estado('online', 'BLACKBRO online');
    abajo();
  }

  /* ==========================================================
     5. INTERFAZ
     ========================================================== */

  function alto() {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 168) + 'px';
  }

  input.addEventListener('input', alto);

  input.addEventListener('keydown', function (e) {
    /* En escritorio, Enter envía. En móvil, Enter es salto de línea:
       ahí se envía con el botón. */
    if (e.key === 'Enter' && !e.shiftKey && !esMovil) {
      e.preventDefault();
      mandar(input.value);
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    mandar(input.value);
  });

  /* --- las 6 jugadas: precargan, no envían (V1.1 · 03) --- */
  function jugada(id) {
    var j = JUGADAS[id];
    if (!j) return;
    precargar(j.texto);
    track('blackbro_quick_action', { action_name: j.nombre, conversation_id: conversacion });
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-bb-play],[data-bb-tema],[data-bb-enter]') : null;
    if (!el) return;

    if (el.hasAttribute('data-bb-play')) {
      irAlChat();
      jugada(el.getAttribute('data-bb-play'));
      return;
    }
    if (el.hasAttribute('data-bb-tema')) {
      var id = el.getAttribute('data-bb-tema');
      var t = TEMAS[id];
      if (t) {
        irAlChat();
        precargar(t);
        track('blackbro_cta_click', { cta_name: 'tema_' + id, cta_location: 'chat_sidebar' });
      }
      return;
    }
    if (el.hasAttribute('data-bb-enter')) {
      e.preventDefault();
      track('blackbro_enter', { source_cta: el.getAttribute('data-bb-loc') || '', device_type: TIPO });
      irAlChat(true);
    }
  });

  /* ENTER BLACKBRO → siempre el mismo destino: el chat, con el foco puesto.
     En móvil el salto es directo: nada de recorrer secciones intermedias. */
  var seccionChat = document.getElementById('chat');
  function irAlChat(forzar) {
    if (!seccionChat) return;
    var r = seccionChat.getBoundingClientRect();
    var dentro = r.top < window.innerHeight * .6 && r.bottom > 120;
    if (!dentro || forzar) {
      if (esMovil) {
        var y = window.pageYOffset + seccionChat.getBoundingClientRect().top - 66;
        window.scrollTo(0, y);
      } else {
        seccionChat.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setTimeout(function () { try { input.focus({ preventScroll: true }); } catch (e) { input.focus(); } }, esMovil ? 60 : 420);
  }

  /* --- NUEVO CHAT: cierra el contexto y vuelve al estado INITIAL --- */
  var nuevo = document.getElementById('bbNuevo');
  if (nuevo) {
    nuevo.addEventListener('click', function () {
      guardarConv('');
      nMensaje = 0;
      ultimo = '';
      log.innerHTML = '';
      var div = document.createElement('div');
      div.className = 'bbchat__inicio';
      div.innerHTML =
        '<img src="../assets/img/blackbro/avatar.png" alt="">' +
        '<p class="bbchat__online">BLACKBRO ONLINE</p>' +
        '<p class="bbchat__pregunta">¿QUÉ ESTÁ FRENANDO TU JUEGO?</p>' +
        '<p class="bbchat__ayuda">Puedes empezar escribiendo o elegir una jugada.</p>';
      log.appendChild(div);
      inicio = div;
      input.value = '';
      alto();
      estado('online', 'BLACKBRO online');
      track('blackbro_cta_click', { cta_name: 'nuevo_chat', cta_location: 'chat' });
      input.focus();
    });
  }

  /* --- llegada desde la home con una jugada ya elegida: /blackbro/?play=board --- */
  var m = /[?&]play=([a-z_]+)/.exec(location.search);
  if (m && JUGADAS[m[1]]) {
    window.addEventListener('load', function () {
      track('blackbro_enter', { source_cta: 'home_quick_action', device_type: TIPO });
      irAlChat(true);
      jugada(m[1]);
    });
  }

  /* --- la barra de móvil se aparta cuando el chat ya está en pantalla --- */
  var movil = document.getElementById('bbMovil');
  if (movil && seccionChat && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { movil.classList.toggle('is-oculta', en.isIntersecting); });
    }, { threshold: .18 }).observe(seccionChat);
  }

  /* --- blackbro_view: una sola vez, sin PII --- */
  track('blackbro_view', {});

  /* ==========================================================
     6. VISTA DE INTERFAZ SIN API — /blackbro/?vista=1
     Sólo para revisar el diseño antes de que exista la key.
     Escribe un intercambio de MUESTRA, marcado como tal, y no
     llama a ningún servicio. La página normal nunca lo muestra.
     ========================================================== */
  if (/[?&]vista=1(&|$)/.test(location.search)) {
    var aviso = document.createElement('div');
    aviso.className = 'bbaviso';
    aviso.innerHTML = '<b>Vista de interfaz</b><br>Texto de muestra para revisar el diseño. ' +
      'No es una respuesta de BLACKBRO y no se ha llamado a ninguna API.';
    log.insertBefore(aviso, log.firstChild);

    burbuja('yo', 'Tengo tres proyectos abiertos y no avanzo en ninguno.');
    var demo = burbuja('bro', '');
    demo.innerHTML = md(
      '**Tu bottleneck no es tiempo. Es decisión.**\n\n' +
      'Tres proyectos abiertos significan tres primeras jugadas compitiendo por el mismo día.\n\n' +
      '1. Elige el que ya tenga evidencia real, aunque sea pequeña.\n' +
      '2. Los otros dos se congelan por escrito, con fecha.\n' +
      '3. Bloquea dos horas mañana para la siguiente jugada del que elegiste.\n\n' +
      'Dime cuál eliges y armamos el board.'
    );
    acciones(demo, 'Texto de muestra.');
  }
})();
