/* ============================================================
   PORTAL SGC ISO 15189 — DEMO KAIZENLAB
   Arma el contenido de las páginas a partir de js/datos.js.
   No requiere editarse.
   ============================================================ */
(function () {
  'use strict';
  var P = window.PORTAL;
  if (!P) { console.error('No se cargó js/datos.js'); return; }

  var ICONOS = {
    nc: '<path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4"/><path d="M12 17h.01"/>',
    riesgos: '<path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6l-8-3z"/><path d="M9 12l2 2 4-4"/>',
    mejora: '<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
    indicadores: '<path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/>',
    quejas: '<path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    revision: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 13l2 2 4-4"/>',
    satisfaccion: '<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01"/><path d="M15 9h.01"/>',
    auditorias: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    proveedores: '<path d="M3 7h13v10H3z"/><path d="M16 10h4l1 3v4h-5"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>'
  };

  function $(id) { return document.getElementById(id); }
  function esc(v) {
    return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function norm(v) { return String(v || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function app(id) { return P.apps.filter(function (a) { return a.id === id; })[0]; }
  function enlaceApp(a) {
    return a.url ? 'href="' + esc(a.url) + '" target="_blank" rel="noopener"' : 'href="#" aria-disabled="true" title="En la versión implementada, aquí se abre la app de registro"';
  }
  function esFormato(d) { return /^(formato|registro)$/i.test(d.tipo); }
  function rutaDoc(d) { return d.archivo ? 'docs/' + encodeURI(d.archivo) : ''; }

  function tarjetaApp(a) {
    return '<a class="app' + (a.url ? '' : ' sin-url') + '" ' + enlaceApp(a) + '>' +
      '<span class="app-ico' + (a.id === 'nc' ? ' rojo' : '') + '"><svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONOS[a.id] || ICONOS.revision) + '</svg></span>' +
      '<span class="app-txt"><b>' + esc(a.nombre) + '</b><span>' + esc(a.desc) + '</span><em>' + esc(a.clausulas) + '</em></span></a>';
  }

  function refsHospital(clave) {
    return P.hospital.filter(function (h) { return h.secciones.indexOf(clave) > -1; }).map(function (h) {
      return '<a class="ref" href="' + (h.enlace ? esc(h.enlace) + '" target="_blank" rel="noopener' : '#') + '">' + esc(h.nombre) + ' <small>Hospital</small></a>';
    }).join('');
  }

  // Evita navegar en enlaces de apps sin URL
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[aria-disabled="true"]');
    if (a) { e.preventDefault(); }
  });

  /* ---------------- INICIO ---------------- */
  function inicio() {
    $('apps-inicio').innerHTML = P.apps.filter(function (a) { return a.inicio; }).map(tarjetaApp).join('');
    var nc = app('nc');
    if (nc && nc.url) { $('btn-nc').href = nc.url; $('btn-nc').target = '_blank'; }

    ['preexaminacion', 'examinacion', 'postexaminacion'].forEach(function (k) {
      var s = P.secciones[k];
      $('fase-' + k).innerHTML = s.etapas.map(function (e) {
        return '<li><a href="' + s.pagina + '#' + e.id + '" style="color:inherit;text-decoration:none">' + esc(e.nombre) + '</a></li>';
      }).join('');
    });
    ['recursos', 'minisgc'].forEach(function (k) {
      var s = P.secciones[k];
      $('mos-' + k).innerHTML = s.etapas.map(function (e) {
        return '<li><a href="' + s.pagina + '#' + e.id + '">' + esc(e.nombre) + '</a></li>';
      }).join('');
    });
    $('politica').textContent = P.politica;
    $('hospital-inicio').innerHTML = refsHospital('inicio');

    var inp = $('buscar'), res = $('resultados');
    function buscar() {
      var q = norm(inp.value.trim());
      if (q.length < 2) { res.innerHTML = ''; res.classList.add('oculto'); return; }
      var hits = P.documentos.filter(function (d) { return norm(d.codigo + ' ' + d.nombre).indexOf(q) > -1; }).slice(0, 12);
      res.classList.remove('oculto');
      res.innerHTML = hits.length ? hits.map(function (d) {
        var s = P.secciones[d.seccion] || {};
        var href = rutaDoc(d) || (s.pagina ? s.pagina + '#' + d.etapa : '#');
        return '<a class="resultado" href="' + esc(href) + '"' + (rutaDoc(d) ? ' target="_blank" rel="noopener"' : '') + '><span>' + esc(d.nombre) + '</span><small>' + esc(d.codigo) + ' · ' + esc(s.titulo || '') + '</small></a>';
      }).join('') : '<div class="nota" style="padding:8px 4px">Sin resultados para “' + esc(inp.value) + '”.</div>';
    }
    inp.addEventListener('input', buscar);
    $('form-buscar').addEventListener('submit', function (e) { e.preventDefault(); buscar(); });
    document.querySelectorAll('[data-busqueda]').forEach(function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); inp.value = b.dataset.busqueda; buscar(); inp.focus(); });
    });
  }

  /* ---------------- PÁGINA DE SECCIÓN ---------------- */
  function seccion(clave) {
    var s = P.secciones[clave];
    var docs = P.documentos.filter(function (d) { return d.seccion === clave; });
    var actual = '';

    function pintarMenu() {
      $('menu-etapas').innerHTML = '<span class="eti">Etapas</span>' +
        '<button type="button" data-etapa="" aria-pressed="' + (!actual) + '"><span>Todos los documentos</span><small>' + docs.length + '</small></button>' +
        s.etapas.map(function (e) {
          return '<button type="button" data-etapa="' + e.id + '" aria-pressed="' + (actual === e.id) + '"><span>' + esc(e.nombre) + '</span><small>' + esc(e.clausula) + '</small></button>';
        }).join('');
    }

    function pintarDocs() {
      var et = s.etapas.filter(function (e) { return e.id === actual; })[0];
      $('titulo-docs').textContent = et ? et.nombre : 'Documentos vigentes';
      $('nota-docs').textContent = et ? 'ISO 15189:2022 §' + et.clausula + ' · solo versión vigente' : 'Tomados de la lista maestra · solo versión vigente';
      var lista = docs.filter(function (d) { return !esFormato(d) && (!actual || d.etapa === actual); });
      $('tabla-docs').innerHTML = lista.length ? lista.map(function (d) {
        var r = rutaDoc(d);
        return '<tr><td class="cod">' + esc(d.codigo) + '</td><td>' +
          (r ? '<a class="doc" href="' + esc(r) + '" target="_blank" rel="noopener">' + esc(d.nombre) + '</a>' : '<span class="doc">' + esc(d.nombre) + '</span><span class="sin-archivo">Sin archivo</span>') +
          '</td><td>' + esc(d.tipo) + '</td><td class="tenue">' + esc(d.version) + '</td><td class="tenue">' + esc(d.vigente) + '</td></tr>';
      }).join('') : '<tr><td colspan="5" class="vacio">Aún no hay documentos registrados para esta etapa.</td></tr>';

      var fos = docs.filter(function (d) { return esFormato(d) && (!actual || d.etapa === actual); });
      $('formatos').innerHTML = fos.length ? fos.map(function (d) {
        var r = rutaDoc(d);
        return '<li>' + (r ? '<a href="' + esc(r) + '" target="_blank" rel="noopener">' + esc(d.nombre) + '</a>' : '<span>' + esc(d.nombre) + '</span>') + '<small>' + esc(d.codigo) + '</small></li>';
      }).join('') : '<li><span class="nota">Sin formatos registrados.</span></li>';
    }

    $('menu-etapas').addEventListener('click', function (e) {
      var b = e.target.closest('button[data-etapa]');
      if (!b) return;
      actual = b.dataset.etapa;
      history.replaceState(null, '', actual ? '#' + actual : location.pathname);
      pintarMenu(); pintarDocs();
    });

    $('apps-seccion').innerHTML = s.apps.map(app).filter(Boolean).map(function (a) {
      if (a.id === 'nc') return '<a class="btn btn-primario' + (a.url ? '' : ' sin-url') + '" ' + enlaceApp(a) + '>Reportar una no conformidad</a>';
      return '<a class="app-linea' + (a.url ? '' : ' sin-url') + '" ' + enlaceApp(a) + '><span>' + esc(a.nombre) + '</span><span aria-hidden="true" style="color:var(--a-secondary)">→</span></a>';
    }).join('');

    var refs = refsHospital(clave);
    if (refs) $('hospital-seccion').innerHTML = refs; else $('caja-hospital').classList.add('oculto');

    var h = decodeURIComponent(location.hash.replace('#', ''));
    if (s.etapas.some(function (e) { return e.id === h; })) actual = h;
    pintarMenu(); pintarDocs();
  }

  var clave = document.body.dataset.seccion;
  if (clave === 'inicio') inicio();
  else if (P.secciones[clave]) seccion(clave);
})();
