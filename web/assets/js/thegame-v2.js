/* ============================================================
   THE GAME · B-SHP BROTHERS — interacciones
   ============================================================ */
(function () {
  'use strict';

  /* ---- 1. Header sticky + menú móvil ---- */
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var links = document.getElementById('navLinks');

  function onScroll() {
    nav.classList.toggle('is-stuck', window.scrollY > 40);
    var cta = document.getElementById('stickyCta');
    if (cta) cta.classList.toggle('is-on', window.scrollY > window.innerHeight * 0.85);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (burger) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- 2. Reveal on scroll ---- */
  var items = document.querySelectorAll('[data-rv]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---- 3. Videos: carga diferida, un solo player activo ---- */
  var players = document.querySelectorAll('.player');
  Array.prototype.forEach.call(players, function (p) {
    var video = p.querySelector('video');
    var btn = p.querySelector('.player__btn');
    if (!video || !btn) return;

    btn.addEventListener('click', function () {
      // pausa cualquier otro video en curso
      Array.prototype.forEach.call(players, function (o) {
        if (o !== p) {
          var v = o.querySelector('video');
          if (v && !v.paused) { v.pause(); o.classList.remove('is-playing'); }
        }
      });
      if (!video.src) video.src = video.dataset.src;
      p.classList.add('is-playing');
      var pr = video.play();
      if (pr && pr.catch) pr.catch(function () { video.controls = true; });
    });

    video.addEventListener('ended', function () { p.classList.remove('is-playing'); });
  });

  /* ---- 4. Marquee infinito (duplica el contenido) ---- */
  var ticker = document.getElementById('ticker');
  if (ticker) ticker.innerHTML += ticker.innerHTML;

  /* ---- 5. FAQ: sólo un panel abierto a la vez ---- */
  var faqs = document.querySelectorAll('.faq details');
  Array.prototype.forEach.call(faqs, function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      Array.prototype.forEach.call(faqs, function (o) { if (o !== d) o.open = false; });
    });
  });

  /* ---- 6. Fallback del widget de Hotmart ------------------------------
     Los CTA llevan el markup oficial del widget (clases hotmart-fb +
     onclick="return false"). Si el script de Hotmart no llega a cargar
     (bloqueadores, red caída), liberamos el click para que el enlace
     navegue directo al checkout en lugar de quedarse muerto.
  --------------------------------------------------------------------- */
  setTimeout(function () {
    var loaded = !!(window.checkoutElements || document.querySelector('.hotmart-fb[data-hotmart]') ||
                    window.hotmart || window.HotmartCheckout);
    if (loaded) return;
    var ctas = document.querySelectorAll('a.hotmart__button-checkout');
    Array.prototype.forEach.call(ctas, function (a) {
      a.onclick = null;
      a.removeAttribute('onclick');
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    });
  }, 3500);

})();
