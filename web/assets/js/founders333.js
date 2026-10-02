/* ============================================================
   FOUNDERS 333 — /founders333
   ------------------------------------------------------------
   Ronda 02-oct (tarde): la página ya NO tiene formulario.
   Fer: «mejor sin formulario y botón a WhatsApp, más rápido,
   menos fricción». La aplicación a GEN01 sigue por WhatsApp.

   Lo que hace este fichero, y sólo esto:

   1. Los CTA de la página (nav, hero, barra de móvil) bajan a la
      banda GEN01, donde está el botón de WhatsApp.
   2. Mide los clics a WhatsApp sin PII: sólo desde dónde y con
      qué rol (BUILDER / ARCHITECT), nunca datos de la persona.
   3. La barra fija de móvil.
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var esMovil = window.matchMedia && window.matchMedia('(max-width:820px)').matches;
  var TIPO = esMovil ? 'mobile' : 'desktop';

  /* ---------- TRACKING ----------------------------------------
     Mismo canal que el resto del sitio: dataLayer + CustomEvent. */
  function track(evento, datos) {
    var carga = { event: evento };
    if (datos) { for (var k in datos) { if (datos[k] !== undefined && datos[k] !== '') carga[k] = datos[k]; } }
    (window.dataLayer = window.dataLayer || []).push(carga);
    try { window.dispatchEvent(new CustomEvent('bshp:track', { detail: carga })); } catch (e) {}
  }

  var params = new URLSearchParams(location.search);
  var SOURCE = params.get('utm_source') || params.get('source') || (document.referrer ? 'referral' : 'directo');
  var CAMPAIGN = params.get('utm_campaign') || '';

  document.addEventListener('click', function (e) {
    if (!e.target.closest) return;

    /* Bajar a la banda GEN01 */
    var ir = e.target.closest('[data-f3-ir]');
    if (ir) {
      e.preventDefault();
      track('founders_waitlist_start', {
        cta_location: ir.getAttribute('data-f3-loc') || '',
        device_type: TIPO
      });
      var destino = $(ir.getAttribute('data-f3-ir'));
      if (destino) destino.scrollIntoView({ behavior: esMovil ? 'auto' : 'smooth', block: 'start' });
      return;
    }

    /* Salida a WhatsApp: el enlace se abre solo, aquí sólo se mide */
    var wa = e.target.closest('[data-f3-wa]');
    if (wa) {
      track('founders_whatsapp_click', {
        cta_location: wa.getAttribute('data-f3-wa') || '',
        entry_role: wa.getAttribute('data-f3-rol') || '',
        source: SOURCE,
        campaign: CAMPAIGN,
        device_type: TIPO
      });
    }
  });

  /* ============================================================
     BARRA FIJA DE MÓVIL
     Sólo después del hero, y se va cuando la banda GEN01 está en
     pantalla: no tiene sentido ofrecer ir a donde ya estás.
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
