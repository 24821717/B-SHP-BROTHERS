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

/* ============================================================
   B-SHP GOODS · catálogo y compra
   ------------------------------------------------------------
   ESTE ES EL ÚNICO SITIO QUE HAY QUE TOCAR PARA PONER LA TIENDA
   EN MARCHA. Por cada pieza:

     precio : número en dólares, sin símbolo   → 45
     enlace : el Payment Link de Stripe        → 'https://buy.stripe.com/xxxxxxxx'

   Regla de seguridad: una pieza sólo se pone a la venta cuando
   tiene LAS DOS COSAS. Si falta cualquiera, sigue mostrando
   «Próximamente» y no se puede comprar. Así nunca se publica un
   precio sin cobro detrás, ni un cobro sin precio a la vista.

   Ejemplo de una pieza ya activa:
     camiseta: { precio: 45, enlace: 'https://buy.stripe.com/3cs00l9aX2b1abc' },
   ============================================================ */
var GOODS = {
  camiseta: { precio: null, enlace: '' },
  sudadera: { precio: null, enlace: '' },
  gorra:    { precio: null, enlace: '' },
  bucket:   { precio: null, enlace: '' },
  termo:    { precio: null, enlace: '' },
  taza:     { precio: null, enlace: '' }
};

/* Envío: se calcula en el checkout de Stripe. Este texto es sólo el aviso
   que se ve bajo el botón. Vacío = no se muestra. */
var GOODS_ENVIO = 'Envío calculado en el pago';

/* Vista de prueba: abrir la home con ?demo=1 al final de la URL rellena
   precios de ejemplo para ver cómo queda la tienda montada. No cobra nada
   (los botones no llevan a ningún checkout) y sólo se activa con ese
   parámetro: la página normal nunca lo muestra. */
var GOODS_DEMO = { camiseta: 45, sudadera: 75, gorra: 39, bucket: 42, termo: 49, taza: 29 };

(function () {
  'use strict';

  var demo = /[?&]demo=1(&|$)/.test(location.search);
  if (demo) {
    Object.keys(GOODS_DEMO).forEach(function (id) {
      if (GOODS[id] && GOODS[id].precio == null) {
        GOODS[id] = { precio: GOODS_DEMO[id], enlace: '#', demo: true };
      }
    });
    document.addEventListener('DOMContentLoaded', function () {
      var aviso = document.createElement('p');
      aviso.textContent = 'Vista de prueba · precios de ejemplo, ningún botón cobra';
      aviso.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:200;margin:0;' +
        'padding:.7rem 1rem;text-align:center;background:#D4AF37;color:#0B0B0B;' +
        'font:600 .68rem/1.4 Poppins,sans-serif;letter-spacing:.2em;text-transform:uppercase';
      document.body.appendChild(aviso);
    });
  }

  function alaVenta(id) {
    var p = GOODS[id];
    return !!(p && typeof p.precio === 'number' && p.precio > 0 && p.enlace);
  }

  function precioTexto(id) {
    var p = GOODS[id];
    var n = p.precio;
    var txt = (n % 1 === 0) ? String(n) : n.toFixed(2);
    return '$' + txt + ' <b>USD</b>';
  }

  /* ---------- 1. el pie de cada pieza de la rejilla ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('.pieza'), function (pieza) {
    var caja = pieza.querySelector('[data-compra]');
    if (!caja) return;
    var id = pieza.getAttribute('data-id') || '';
    var nombre = pieza.getAttribute('data-pieza') || '';

    if (!alaVenta(id)) {
      caja.innerHTML = '<span class="pieza__estado">Próximamente</span>';
      return;
    }

    var html = '<p class="pieza__precio">' + precioTexto(id) + '</p>' +
      '<a class="btn btn--gold pieza__cta" href="' + GOODS[id].enlace + '" ' +
      'data-track="comprar_click" data-track-from="goods_' + id + '">' +
      'Comprar <i>&rarr;</i></a>';
    if (GOODS_ENVIO) html += '<p class="pieza__envio">' + GOODS_ENVIO + '</p>';
    caja.innerHTML = html;
    caja.querySelector('a').setAttribute('aria-label', 'Comprar ' + nombre);
  });

  /* ---------- 2. la ficha ampliada ---------- */
  var ficha = document.getElementById('ficha');
  if (!ficha) return;

  var visual = document.getElementById('fichaVisual');
  var nombre = document.getElementById('fichaNombre');
  var precio = document.getElementById('fichaPrecio');
  var estado = document.getElementById('fichaEstado');
  var cta    = document.getElementById('fichaCta');
  var cerrar = document.getElementById('fichaCerrar');
  var previo = null;

  function abrir(pieza) {
    var img = pieza.getAttribute('data-img') || '';
    var nom = pieza.getAttribute('data-pieza') || '';
    var id  = pieza.getAttribute('data-id') || '';
    nombre.textContent = nom;

    var el = visual.querySelector('img');
    if (img) {
      el.src = img;
      el.alt = nom;
      el.classList.add('real');
    } else {
      el.src = 'assets/img/pina.png';
      el.alt = '';
      el.classList.remove('real');
    }

    if (alaVenta(id)) {
      precio.innerHTML = precioTexto(id);
      precio.hidden = false;
      estado.hidden = true;
      cta.href = GOODS[id].enlace;
      cta.setAttribute('data-track-from', 'ficha_' + id);
      cta.setAttribute('aria-label', 'Comprar ' + nom);
      cta.hidden = false;
    } else {
      precio.hidden = true;
      estado.hidden = false;
      cta.hidden = true;
    }

    previo = document.activeElement;
    ficha.hidden = false;
    document.body.style.overflow = 'hidden';
    cerrar.focus();
  }

  function cerrarFicha() {
    ficha.hidden = true;
    document.body.style.overflow = '';
    if (previo && previo.focus) previo.focus();
  }

  Array.prototype.forEach.call(document.querySelectorAll('.pieza'), function (p) {
    var btn = p.querySelector('.pieza__btn');
    if (btn) btn.addEventListener('click', function () { abrir(p); });
  });

  cerrar.addEventListener('click', cerrarFicha);
  ficha.addEventListener('click', function (e) { if (e.target === ficha) cerrarFicha(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !ficha.hidden) cerrarFicha();
  });
})();
