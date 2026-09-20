/* ============================================================
   FOUNDERS 333 — /founders333
   ------------------------------------------------------------
   Lo que hace este fichero, y sólo esto:

   1. Pinta las dos taxonomías FROZEN (categorías de la 04 y
      oportunidades de la 07). Están aquí arriba del todo: si
      cambian, se cambian en un sitio y en ninguno más.
   2. Guarda lo que la persona contesta en la Section 04 SIN
      enviar nada, y lo devuelve en la Section 08.
   3. Manda los dos leads —GENESIS y PARTNERSHIP— por separado,
      como manda el handoff. Nunca se mezclan.
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

  /* ---------- TAXONOMÍA FROZEN · handoff 07 ---------- */
  var OPORTUNIDADES = [
    'COLABS DE MARCA', 'NEGOCIOS', 'TECH / AI / SOFTWARE',
    'VENUES / EXPERIENCIAS', 'DISTRIBUCIÓN / AUDIENCIAS', 'PRODUCCIÓN',
    'TALENTO / OPERADORES', 'PROYECTOS / VENTURES', 'OPORTUNIDADES ESTRATÉGICAS'
  ];

  var ENDPOINT = '/api/founders/lead';
  var LLAVE = 'bshp_f333_paso1';

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
  var ORIGEN = (function () {
    var p = new URLSearchParams(location.search);
    return {
      source: p.get('utm_source') || p.get('source') || (document.referrer ? 'referral' : 'directo'),
      campaign: p.get('utm_campaign') || ''
    };
  })();

  /* ============================================================
     ESTADO DE LA SECTION 04
     Vive en sessionStorage: acompaña la visita y se va con ella.
     No es un perfil guardado, es el hilo de una conversación.
     ============================================================ */
  var paso1 = { builder_category: '', what_are_you_building: '', bottleneck: '' };
  try {
    var crudo = sessionStorage.getItem(LLAVE);
    if (crudo) { var g = JSON.parse(crudo); if (g && typeof g === 'object') paso1 = g; }
  } catch (e) {}

  function guardarPaso1() {
    try { sessionStorage.setItem(LLAVE, JSON.stringify(paso1)); } catch (e) {}
  }

  /* ============================================================
     CHIPS
     ============================================================ */
  function pintarChips(caja, lista, elegida, alElegir) {
    if (!caja) return;
    caja.innerHTML = '';
    lista.forEach(function (nombre) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'f3chip';
      b.textContent = nombre;
      b.setAttribute('aria-pressed', nombre === elegida ? 'true' : 'false');
      b.addEventListener('click', function () {
        Array.prototype.forEach.call(caja.children, function (o) { o.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', 'true');
        alElegir(nombre);
      });
      caja.appendChild(b);
    });
  }

  function marcarChip(caja, valor) {
    if (!caja) return;
    Array.prototype.forEach.call(caja.children, function (o) {
      o.setAttribute('aria-pressed', o.textContent === valor ? 'true' : 'false');
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
    track('founders_waitlist_start', {
      cta_location: el.getAttribute('data-f3-loc') || '',
      entry_section: el.getAttribute('data-f3-cta') || '',
      device_type: TIPO
    });
    irA(el.getAttribute('data-f3-ir'), $('f3Nombre'));
  });

  /* ============================================================
     SECTION 04 · ¿QUÉ ESTÁS CONSTRUYENDO?
     NO envía el lead. Guarda y sigue.
     ============================================================ */
  var cats1 = $('f3Cats');
  var que1 = $('f3Que');
  var freno = $('f3Freno');
  var err1 = $('f3Err1');

  pintarChips(cats1, CATEGORIAS, paso1.builder_category, function (v) {
    paso1.builder_category = v;
    guardarPaso1();
    limpiar(err1, [que1]);
  });
  if (que1) que1.value = paso1.what_are_you_building || '';
  if (freno) freno.value = paso1.bottleneck || '';

  var form1 = $('f3Paso1');
  if (form1) {
    form1.addEventListener('submit', function (e) {
      e.preventDefault();
      var texto = (que1.value || '').trim();

      if (!paso1.builder_category) {
        fallo(err1, 'Falta la categoría', 'Elige qué estás construyendo para seguir.');
        return;
      }
      if (texto.length < 3) {
        fallo(err1, 'Falta tu respuesta', 'Cuéntanos qué estás construyendo, aunque sea en una línea.', que1);
        return;
      }

      limpiar(err1, [que1]);
      paso1.what_are_you_building = texto;
      paso1.bottleneck = (freno.value || '').trim();
      guardarPaso1();
      hidratarLista();

      track('founders_waitlist_start', {
        entry_section: 'seccion_04',
        builder_category: paso1.builder_category,
        device_type: TIPO
      });

      irA('mesa');
    });
  }

  /* ============================================================
     SECTION 08 · LISTA GENESIS
     Si la 04 se completó, aquí reaparece. Si no, los dos campos
     que faltan entran como obligatorios.
     ============================================================ */
  var guardado = $('f3Guardado');
  var guardadoCat = $('f3GuardadoCat');
  var guardadoTxt = $('f3GuardadoTxt');
  var faltante = $('f3Faltante');
  var cats2 = $('f3Cats2');
  var que2 = $('f3Que2');

  pintarChips(cats2, CATEGORIAS, paso1.builder_category, function (v) {
    paso1.builder_category = v;
    guardarPaso1();
    marcarChip(cats1, v);
  });

  function hidratarLista() {
    var completo = !!(paso1.builder_category && paso1.what_are_you_building);
    if (guardado) guardado.hidden = !completo;
    if (faltante) faltante.hidden = completo;
    if (completo) {
      if (guardadoCat) guardadoCat.textContent = paso1.builder_category;
      if (guardadoTxt) guardadoTxt.textContent = paso1.what_are_you_building;
    }
    marcarChip(cats1, paso1.builder_category);
    marcarChip(cats2, paso1.builder_category);
    if (que1 && paso1.what_are_you_building) que1.value = paso1.what_are_you_building;
  }
  hidratarLista();

  var editar = $('f3Editar');
  if (editar) {
    editar.addEventListener('click', function () {
      irA('construyendo', que1);
    });
  }

  /* ---------- envío del lead GENESIS ---------- */
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
      var campos = [nombre, email, pais, que2];
      limpiar(errL, campos);

      /* Si se saltó la Section 04, aquí es obligatorio. */
      if (faltante && !faltante.hidden) {
        if (!paso1.builder_category) {
          fallo(errL, 'Falta la categoría', 'Elige qué estás construyendo.');
          return;
        }
        var t2 = (que2.value || '').trim();
        if (t2.length < 3) {
          fallo(errL, 'Falta tu respuesta', 'Cuéntanos qué estás construyendo.', que2);
          return;
        }
        paso1.what_are_you_building = t2;
        guardarPaso1();
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

      enviar(botonL, errL, campos, {
        lead_type: 'GENESIS',
        name: (nombre.value || '').trim(),
        email: (email.value || '').trim(),
        country: (pais.value || '').trim(),
        whatsapp: (wa.value || '').trim(),
        builder_category: paso1.builder_category,
        what_are_you_building: paso1.what_are_you_building,
        bottleneck: paso1.bottleneck || '',
        source: ORIGEN.source,
        campaign: ORIGEN.campaign
      }, function () {
        track('founders_waitlist_submit', {
          builder_category: paso1.builder_category,
          country: (pais.value || '').trim(),
          source: ORIGEN.source,
          campaign: ORIGEN.campaign,
          device_type: TIPO
        });
        try { sessionStorage.removeItem(LLAVE); } catch (e) {}
        formL.hidden = true;
        var senal = $('senal');
        if (senal) { senal.hidden = false; irA('senal'); }
      }, 'founders_form_error');
    });
  }

  /* ============================================================
     SECTION 07 · CONSTRUYE CON NOSOTROS
     Journey aparte. Nace cerrado.
     ============================================================ */
  var opos = $('f3Opos');
  if (opos) {
    OPORTUNIDADES.forEach(function (n) {
      var s = document.createElement('span');
      s.className = 'f3cat';
      s.textContent = n;
      opos.appendChild(s);
    });
  }

  var abrir = $('f3AbrirPartner');
  var formP = $('f3Partner');
  var pNombre = $('f3pNombre');
  var pEmpresa = $('f3pEmpresa');
  var pQue = $('f3pQue');
  var pEmail = $('f3pEmail');
  var pWa = $('f3pWa');
  var errP = $('f3ErrP');
  var botonP = $('f3pEnviar');

  if (abrir && formP) {
    abrir.addEventListener('click', function () {
      var cerrado = formP.hidden;
      formP.hidden = !cerrado;
      abrir.setAttribute('aria-expanded', cerrado ? 'true' : 'false');
      if (cerrado) {
        track('founders_partner_click', { cta_location: 'seccion_07', device_type: TIPO });
        setTimeout(function () { try { pNombre.focus(); } catch (e) {} }, 60);
      }
    });
  }

  if (formP) {
    formP.addEventListener('submit', function (e) {
      e.preventDefault();
      var campos = [pNombre, pQue, pEmail];
      limpiar(errP, campos);

      if ((pNombre.value || '').trim().length < 2) {
        fallo(errP, 'Falta tu nombre', 'Escribe tu nombre para poder continuar la conversación.', pNombre);
        return;
      }
      if ((pQue.value || '').trim().length < 3) {
        fallo(errP, 'Falta lo importante', 'Cuéntanos qué quieres construir con nosotros.', pQue);
        return;
      }
      if (!EMAIL.test((pEmail.value || '').trim())) {
        fallo(errP, 'Revisa el email', 'Necesitamos un email válido: es por donde te escribimos.', pEmail);
        return;
      }

      enviar(botonP, errP, campos, {
        lead_type: 'PARTNERSHIP',
        name: (pNombre.value || '').trim(),
        company_project: (pEmpresa.value || '').trim(),
        what_do_you_want_to_build: (pQue.value || '').trim(),
        email: (pEmail.value || '').trim(),
        whatsapp: (pWa.value || '').trim(),
        source: ORIGEN.source,
        campaign: ORIGEN.campaign
      }, function () {
        track('founders_partner_submit', {
          source: ORIGEN.source,
          campaign: ORIGEN.campaign,
          device_type: TIPO
        });
        formP.innerHTML =
          '<p class="f3ok__sub" style="margin:0 0 .9rem">Señal recibida.</p>' +
          '<p style="margin:0;color:var(--texto);line-height:1.72">Revisaremos lo que quieres construir con nosotros. ' +
          'Si hay fit, continuaremos la conversación contigo por email o WhatsApp.</p>';
        if (abrir) abrir.hidden = true;
      }, 'founders_form_error');
    });
  }

  /* ============================================================
     EL ENVÍO
     Un solo camino para los dos journeys. El servidor decide
     dónde cae cada uno según lead_type.
     ============================================================ */
  function enviar(boton, cajaError, campos, datos, alSalirBien, eventoError) {
    var textoOriginal = boton ? boton.innerHTML : '';
    if (boton) { boton.disabled = true; boton.innerHTML = 'Enviando…'; }

    function recupera(titulo, texto, tipo) {
      if (boton) { boton.disabled = false; boton.innerHTML = textoOriginal; }
      fallo(cajaError, titulo, texto);
      track(eventoError, { error_type: tipo, device_type: TIPO });
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
