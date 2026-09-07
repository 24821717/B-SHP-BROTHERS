/* ============================================================
   B-SHP BROTHERS — HOME
   Sin dependencias. Todo degrada: si algo falla, la página
   sigue siendo legible y los vídeos se quedan en su póster.
   ============================================================ */
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* ---------- TRACKING ----------------------------------------
     No se asume ningún proveedor: se empuja a dataLayer (GTM) y
     se emite un CustomEvent para que quien conecte analítica lo
     escuche sin tocar este fichero. */
  function track(evento, datos) {
    var carga = Object.assign({ event: evento }, datos || {});
    (window.dataLayer = window.dataLayer || []).push(carga);
    try { window.dispatchEvent(new CustomEvent('bshp:track', { detail: carga })); } catch (e) {}
  }

  /* ---------- NAV ---------- */
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var links = document.getElementById('navLinks');

  function solidez() {
    if (nav) nav.classList.toggle('is-solid', window.scrollY > 40);
  }
  solidez();
  window.addEventListener('scroll', solidez, { passive: true });

  if (burger && links) {
    burger.addEventListener('click', function () {
      var abierto = links.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- REVELADO AL ENTRAR ---------- */
  var revelables = document.querySelectorAll('[data-rv]');
  if (!('IntersectionObserver' in window) || reduce) {
    revelables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var obsRv = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); obsRv.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.02 });
    revelables.forEach(function (el) { obsRv.observe(el); });

    /* Red de seguridad: nada que esté en pantalla puede quedarse invisible.
       Si el observador no ha disparado por el margen, se fuerza a los 1,2 s. */
    setTimeout(function () {
      revelables.forEach(function (el) {
        if (el.classList.contains('is-in')) return;
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.classList.add('is-in');
          obsRv.unobserve(el);
        }
      });
    }, 1200);
  }

  /* ---------- VÍDEOS PEREZOSOS ----------
     Sólo se descargan cuando la sección está cerca. Hasta entonces
     el usuario ve el póster: la página nunca aparece vacía. */
  var perezosos = document.querySelectorAll('video[data-lazy]');
  function cargar(v) {
    if (v.dataset.cargado) return;
    v.dataset.cargado = '1';
    var s = document.createElement('source');
    s.src = v.dataset.lazy;
    s.type = 'video/mp4';
    v.appendChild(s);
    v.load();
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  }
  if (!('IntersectionObserver' in window)) {
    perezosos.forEach(cargar);
  } else {
    var obsVid = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) { cargar(en.target); obsVid.unobserve(en.target); }
      });
    }, { rootMargin: '400px 0px' });
    perezosos.forEach(function (v) { obsVid.observe(v); });
  }

  /* ---------- BRAND FILM ----------
     Nunca arranca solo: el master pide póster primero y sin audio
     automático. El fichero (24 MB) no se descarga hasta el clic. */
  document.querySelectorAll('.player').forEach(function (caja) {
    var video = caja.querySelector('video');
    var boton = caja.querySelector('.player__btn');
    if (!video || !boton) return;
    boton.addEventListener('click', function () {
      if (!video.dataset.cargado) {
        video.dataset.cargado = '1';
        var s = document.createElement('source');
        s.src = video.dataset.src;
        s.type = 'video/mp4';
        video.appendChild(s);
        video.load();
      }
      caja.classList.add('is-playing');
      var p = video.play();
      if (p && p.catch) p.catch(function () {});
      track('brandfilm_play');
    });
  });

  /* ---------- EVENTOS DE SECCIÓN ---------- */
  var vistas = document.querySelectorAll('[data-view]');
  if ('IntersectionObserver' in window) {
    var obsVista = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) {
          track(en.target.dataset.view);
          obsVista.unobserve(en.target);
        }
      });
    }, { threshold: 0.35 });
    vistas.forEach(function (s) { obsVista.observe(s); });
  } else {
    vistas.forEach(function (s) { track(s.dataset.view); });
  }

  /* ---------- CLICS MEDIDOS ---------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-track]') : null;
    if (!el) return;
    track(el.dataset.track, { desde: el.dataset.trackFrom || '' });
  });
})();
