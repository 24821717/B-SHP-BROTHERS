/* ============================================================
   FOUNDERS 333 — /founders333
   ------------------------------------------------------------
   Ronda 02-oct (cierre V1): UNA sola conversión en la página.

   Lo que hace este fichero, y sólo esto:

   1. Pinta la taxonomía FROZEN de categorías: como elemento
      visual en «¿Qué estás construyendo?» (ya no es formulario)
      y como selector dentro de la Lista Genesis.
   2. Las cards Builder / Architect llevan a la Lista Genesis con
      su rol preseleccionado.
   3. Manda el lead GENESIS (con entry_role) al endpoint.
   4. Mide el journey sin PII: ni email, ni WhatsApp, ni texto
      libre salen jamás hacia analítica.

   El endpoint es uno solo: /api/founders/lead. Si todavía no
   está conectado a ninguna base, la página no miente: lo dice
   en pantalla y conserva lo escrito.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- TAXONOMÍA FROZEN · handoff 04 ---------- */
  var CATEGORIAS = [
    'NEGOCIO', 'MARCA', 'TECH', 'CONTENIDO', 'EXPERIENCIA',
    'COMUNIDAD', 'PROYECTO', 'CARRERA', 'OTRO'
  ];

  var ENDPOINT = '/api/founders/lead';

  var $ = function (id) { return document.getElementById(id); };
  var esMovil = window.matchMedia && window.matchMedia('(max-width:820px)').matches;
  var TIPO = esMovil ? 'mobile' : 'desktop';

  /* ---------- TRACKING ----------------------------------------
     Mismo canal que el resto del sitio: dataLayer + CustomEvent.
     Aquí NO entra nada personal. */
  function track(evento, datos) {
    var carga = { event: evento };
    if (datos) { for (var k in datos) { if (datos[k] !== undefined && datos[k] !== '') carga[k] = datos[k]; } }
    (window.dataLayer = window.dataLayer || []).push(carga);
    try { window.dispatchEvent(new CustomEvent('bshp:track', { detail: carga })); } catch (e) {}
  }

  /* ---------- ORIGEN (utm) ---------- */
  var params = new URLSearchParams(location.search);
  var ORIGEN = {
    source: params.get('utm_source') || params.get('source') || (document.referrer ? 'referral' : 'directo'),
    campaign: params.get('utm_campaign') || ''
  };

  /* ============================================================
     02 · EL VÍDEO DE FER
     Nace oculto mientras no llegue el archivo. Se enseña solo en
     cuanto el <video> tenga fuente, o con ?vista=1 para revisar
     el marco vacío.
     ============================================================ */
  var video = $('video');
  if (video) {
    var marco = video.querySelector('.f3video__marco');
    var tieneVideo = !!video.querySelector('video source[src], video[src], iframe[src]');
    if (marco && tieneVideo) marco.classList.add('tiene-video');
    if (tieneVideo || params.get('vista') === '1') video.hidden = false;
  }

  /* ============================================================
     CATEGORÍAS
     ============================================================ */
  var categoria = '';

  var vitrina = $('f3Cats');
  if (vitrina) {
    CATEGORIAS.forEach(function (n) {
      var s = document.createElement('span');
      s.className = 'f3cat';
      s.textContent = n;
      vitrina.appendChild(s);
    });
  }

  var chips = $('f3Cats2');
  if (chips) {
    CATEGORIAS.forEach(function (nombre) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'f3chip';
      b.textContent = nombre;
      b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', function () {
        Array.prototype.forEach.call(chips.children, function (o) { o.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', 'true');
        categoria = nombre;
      });
      chips.appendChild(b);
    });
  }

  /* ============================================================
     ERRORES
     Nunca borran lo escrito: el handoff lo pide expreso.
     ============================================================ */
  function fallo(caja, titulo, texto, campo) {
    if (!caja) return;
    caja.innerHTML = '';
    var b = document.createElement('b'); b.textContent = titulo;
    var t = document.createTextNode(texto);
    caja.appendChild(b); caja.appendChild(t);
    caja.hidden = false;
    if (campo) {
      campo.setAttribute('aria-invalid', 'true');
      try { campo.focus({ preventScroll: false }); } catch (e) { campo.focus(); }
    }
  }
  function limpiar(caja, campos) {
    if (caja) caja.hidden = true;
    (campos || []).forEach(function (c) { if (c) c.removeAttribute('aria-invalid'); });
  }

  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /* ============================================================
     ROL · BUILDER / ARCHITECT
     ============================================================ */
  var rolSel = document.querySelector('.f3rolsel');
  function radiosRol() { return document.querySelectorAll('input[name="entry_role"]'); }
  function rolElegido() {
    var r = document.querySelector('input[name="entry_role"]:checked');
    return r ? r.value : '';
  }
  function marcarRol(valor) {
    Array.prototype.forEach.call(radiosRol(), function (r) { r.checked = (r.value === valor); });
    if (rolSel) rolSel.classList.remove('is-invalid');
  }
  Array.prototype.forEach.call(radiosRol(), function (r) {
    r.addEventListener('change', function () { if (rolSel) rolSel.classList.remove('is-invalid'); });
  });

  /* ============================================================
     IR A UNA SECCIÓN
     ============================================================ */
  function irA(id, enfocar) {
    var s = $(id);
    if (!s) return;
    if (s.hidden) s.hidden = false;
    s.scrollIntoView({ behavior: esMovil ? 'auto' : 'smooth', block: 'start' });
    if (enfocar) {
      setTimeout(function () {
        try { enfocar.focus({ preventScroll: true }); } catch (e) { enfocar.focus(); }
      }, esMovil ? 80 : 460);
    }
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-f3-ir]') : null;
    if (!el) return;
    e.preventDefault();
    var rol = el.getAttribute('data-f3-rol') || '';
    if (rol) marcarRol(rol);
    track('founders_waitlist_start', {
      cta_location: el.getAttribute('data-f3-loc') || '',
      entry_section: el.getAttribute('data-f3-cta') || '',
      entry_role: rol,
      device_type: TIPO
    });
    irA(el.getAttribute('data-f3-ir'));
  });

  /* ============================================================
     LISTA GENESIS · el único formulario
     ============================================================ */
  var que = $('f3Que2');
  var nombre = $('f3Nombre');
  var email = $('f3Email');
  var pais = $('f3Pais');
  var wa = $('f3Wa');
  var errL = $('f3ErrL');
  var botonL = $('f3Enviar');
  var formL = $('f3Lista');

  if (formL) {
    formL.addEventListener('submit', function (e) {
      e.preventDefault();
      var campos = [que, nombre, email, pais];
      limpiar(errL, campos);
      if (rolSel) rolSel.classList.remove('is-invalid');

      var rol = rolElegido();
      if (!rol) {
        if (rolSel) rolSel.classList.add('is-invalid');
        fallo(errL, 'Elige cómo quieres entrar', 'Marca BUILDER o ARCHITECT.', radiosRol()[0]);
        return;
      }
      if (!categoria) {
        fallo(errL, 'Falta la categoría', 'Elige qué estás construyendo.');
        return;
      }
      var texto = (que.value || '').trim();
      if (texto.length < 3) {
        fallo(errL, 'Falta tu respuesta', 'Cuéntanos qué estás construyendo, aunque sea en una línea.', que);
        return;
      }
      if ((nombre.value || '').trim().length < 2) {
        fallo(errL, 'Falta tu nombre', 'Escribe tu nombre para poder continuar la conversación.', nombre);
        return;
      }
      if (!EMAIL.test((email.value || '').trim())) {
        fallo(errL, 'Revisa el email', 'Necesitamos un email válido: es por donde te escribimos.', email);
        return;
      }
      if ((pais.value || '').trim().length < 2) {
        fallo(errL, 'Falta el país', 'Dinos desde dónde construyes.', pais);
        return;
      }

      enviar(botonL, errL, {
        lead_type: 'GENESIS',
        entry_role: rol,
        name: (nombre.value || '').trim(),
        email: (email.value || '').trim(),
        country: (pais.value || '').trim(),
        whatsapp: (wa.value || '').trim(),
        builder_category: categoria,
        what_are_you_building: texto,
        source: ORIGEN.source,
        campaign: ORIGEN.campaign
      }, function () {
        track('founders_waitlist_submit', {
          entry_role: rol,
          builder_category: categoria,
          country: (pais.value || '').trim(),
          source: ORIGEN.source,
          campaign: ORIGEN.campaign,
          device_type: TIPO
        });
        formL.hidden = true;
        var senal = $('senal');
        if (senal) { senal.hidden = false; irA('senal'); }
      });
    });
  }

  /* ============================================================
     EL ENVÍO
     ============================================================ */
  function enviar(boton, cajaError, datos, alSalirBien) {
    var textoOriginal = boton ? boton.innerHTML : '';
    if (boton) { boton.disabled = true; boton.innerHTML = 'Enviando…'; }

    function recupera(titulo, texto, tipo) {
      if (boton) { boton.disabled = false; boton.innerHTML = textoOriginal; }
      fallo(cajaError, titulo, texto);
      track('founders_form_error', { error_type: tipo, device_type: TIPO });
    }

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (d) { return { ok: r.ok, d: d }; });
    }).then(function (res) {
      if (res.ok && res.d && res.d.ok) {
        if (boton) { boton.disabled = false; boton.innerHTML = textoOriginal; }
        alSalirBien();
        return;
      }
      var codigo = (res.d && res.d.error) || 'desconocido';
      if (codigo === 'not_configured') {
        recupera('Algo no salió bien', 'No pudimos registrar tu información: la lista todavía no está conectada. Tus respuestas siguen aquí.', codigo);
      } else if (codigo === 'invalid') {
        recupera('Revisa los datos', 'Falta algo o hay un campo mal escrito. Tus respuestas siguen aquí.', codigo);
      } else {
        recupera('Algo no salió bien', 'No pudimos registrar tu información. Tus respuestas siguen aquí. Inténtalo de nuevo.', codigo);
      }
    }).catch(function () {
      recupera('Algo no salió bien', 'No pudimos registrar tu información: parece que se cayó la conexión. Tus respuestas siguen aquí.', 'red');
    });
  }

  /* ============================================================
     BARRA FIJA DE MÓVIL
     Sólo después del hero, y se va cuando la lista está en pantalla:
     no tiene sentido ofrecer ir a donde ya estás.
     ============================================================ */
  var sticky = $('f3Sticky');
  var hero = $('top');
  var lista = $('lista');
  if (sticky && esMovil) {
    document.body.classList.add('f3-hasticky');
    var mostrar = function () {
      var pasoHero = hero ? (hero.getBoundingClientRect().bottom < 40) : true;
      var enLista = lista ? (lista.getBoundingClientRect().top < window.innerHeight * .75 &&
                             lista.getBoundingClientRect().bottom > 0) : false;
      sticky.classList.toggle('is-on', pasoHero && !enLista);
    };
    mostrar();
    window.addEventListener('scroll', mostrar, { passive: true });
    window.addEventListener('resize', mostrar);
  }
})();
