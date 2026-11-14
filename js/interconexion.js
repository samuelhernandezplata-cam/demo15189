/* ============================================================
   INTERCONEXIÓN DE REQUISITOS ISO 15189:2022 — DEMO KAIZENLAB
   Diagrama interactivo: al hacer clic en un requisito se trazan
   sus conexiones y el panel explica cada relación.
   Para ajustar textos o relaciones, edita NODOS y RELACIONES.
   ============================================================ */
(function () {
  'use strict';

  var W = 1600, H = 920, DY = -110; // DY sube todo el dibujo (coordenadas de diseño)

  /* ---------- Requisitos (posición en px del diseño) ---------- */
  var NODOS = {
    c4:   { x: 320,  y: 140, w: 960, h: 72,  cls: 'n-dir', html: '<span><b>4 · Requisitos generales</b> — Imparcialidad · Confidencialidad · Requisitos relativos a los pacientes</span>', t: '4 · Requisitos generales', d: 'Imparcialidad, confidencialidad y requisitos relativos a los pacientes. Aplican a todo el laboratorio.' },
    c5:   { x: 320,  y: 236, w: 960, h: 72,  cls: 'n-dir', html: '<span><b>5 · Estructura y gobernanza</b> — Director del laboratorio · Objetivos y políticas · Gestión de riesgos para el paciente (5.6)</span>', t: '5 · Estructura y gobernanza', d: 'Responsabilidades del director del laboratorio, objetivos, políticas y gestión de riesgos para el paciente.' },
    uin:  { x: 64,   y: 404, w: 192, h: 120, cls: 'n-usu', html: '<span><b style="font-size:15px">Pacientes y médicos</b><br>Servicios del hospital<br>Solicitan estudios</span>', t: 'Pacientes y médicos (solicitud)', d: 'Pacientes, médicos y servicios del hospital que solicitan los estudios.' },
    uout: { x: 1344, y: 404, w: 192, h: 120, cls: 'n-usu', html: '<span><b style="font-size:15px">Pacientes y médicos</b><br>Reciben un resultado oportuno y confiable</span>', t: 'Pacientes y médicos (resultado)', d: 'Quienes reciben y usan el informe para decidir la atención del paciente.' },
    c72:  { x: 352,  y: 412, w: 256, h: 104, cls: 'n-fase', html: '<span><b>7.2 Preexaminación</b><br>Solicitud, toma, transporte y recepción de la muestra</span>', t: '7.2 Preexaminación', d: 'Información al usuario, solicitud, toma, transporte, recepción y preparación de la muestra.', pagina: 'preexaminacion.html' },
    c73:  { x: 672,  y: 412, w: 256, h: 104, cls: 'n-fase', html: '<span><b>7.3 Examinación</b><br>Métodos verificados, control de calidad y ensayos de aptitud</span>', t: '7.3 Examinación', d: 'Verificación y validación de métodos, incertidumbre, intervalos de referencia y aseguramiento de la validez de los resultados.', pagina: 'examinacion.html' },
    c74:  { x: 992,  y: 412, w: 256, h: 104, cls: 'n-fase', html: '<span><b>7.4 Postexaminación</b><br>Revisión, valores críticos, informe y destino de la muestra</span>', t: '7.4 Postexaminación', d: 'Revisión y liberación de resultados, valores críticos, informe y conservación de las muestras.', pagina: 'postexaminacion.html' },
    c75:  { x: 352,  y: 540, w: 206, h: 48,  cls: 'n-sop', html: '7.5 Trabajo no conforme', t: '7.5 Trabajo no conforme', d: 'Lo que no cumple en cualquier fase se identifica, se evalúa su impacto y se controla.', pagina: 'minisgc.html#nc' },
    c76:  { x: 582,  y: 540, w: 206, h: 48,  cls: 'n-sop', html: '7.6 Control de datos y de la información', t: '7.6 Control de datos y de la información', d: 'Sistema de información del laboratorio: acceso, integridad, confidencialidad y disponibilidad de los datos.' },
    c77:  { x: 812,  y: 540, w: 206, h: 48,  cls: 'n-sop', html: '7.7 Quejas', t: '7.7 Quejas', d: 'Recepción, investigación y respuesta a las quejas de pacientes y usuarios.', pagina: 'minisgc.html#quejas' },
    c78:  { x: 1042, y: 540, w: 206, h: 48,  cls: 'n-sop', html: '7.8 Continuidad y emergencias', t: '7.8 Continuidad y emergencias', d: 'Preparación para mantener el servicio ante emergencias e interrupciones.', pagina: 'minisgc.html#continuidad' },
    c6:   { x: 320,  y: 660, w: 720, h: 72,  cls: 'n-rec', html: '<span><b style="color:#111827">6 · Recursos</b> — Personal · Instalaciones · Equipos y calibración · Reactivos · Servicios externos</span>', t: '6 · Recursos', d: 'Personal competente, instalaciones, equipos calibrados, reactivos verificados y servicios externos evaluados.', pagina: 'recursos.html' },
    c83:  { x: 328,  y: 836, w: 124, h: 72,  cls: 'n-sgc', html: '<span><b>8.3–8.4</b><br>Documentos y registros</span>', t: '8.3–8.4 Documentos y registros', d: 'Control de la información documentada: versiones vigentes y registros conservados.', pagina: 'minisgc.html#documentos' },
    c85:  { x: 492,  y: 836, w: 124, h: 72,  cls: 'n-sgc', html: '<span><b>8.5</b><br>Riesgos y oportunidades</span>', t: '8.5 Riesgos y oportunidades', d: 'Acciones para abordar los riesgos y las oportunidades de mejora del laboratorio.', pagina: 'minisgc.html#riesgos' },
    c88:  { x: 656,  y: 836, w: 124, h: 72,  cls: 'n-sgc', html: '<span><b>8.8</b><br>Indicadores y auditorías</span>', t: '8.8 Evaluaciones', d: 'Indicadores de calidad y auditorías internas para saber si el sistema funciona.', pagina: 'minisgc.html#evaluaciones' },
    c87:  { x: 820,  y: 836, w: 124, h: 72,  cls: 'n-sgc', html: '<span><b>8.7</b><br>NC y acciones correctivas</span>', t: '8.7 NC y acciones correctivas', d: 'Análisis de causa y acciones para que una no conformidad no se repita.', pagina: 'minisgc.html#nc' },
    c86:  { x: 984,  y: 836, w: 124, h: 72,  cls: 'n-sgc', html: '<span><b>8.6</b><br>Mejora continua</span>', t: '8.6 Mejora continua', d: 'Mejora del sistema y retroalimentación de pacientes, usuarios y personal.', pagina: 'minisgc.html#mejora' },
    c89:  { x: 1148, y: 836, w: 124, h: 72,  cls: 'n-sgc fuerte', html: '<span><b>8.9</b><br>Revisión por la dirección</span>', t: '8.9 Revisión por la dirección', d: 'La dirección revisa el sistema a intervalos planificados y decide mejoras, recursos y cambios.', pagina: 'minisgc.html#revision' }
  };

  /* ---------- Relaciones entre requisitos ---------- */
  var RELACIONES = [
    ['uin', 'c72', 'Solicitan estudios y reciben instrucciones de preparación.'],
    ['uin', 'c4', 'Tienen derecho a imparcialidad, confidencialidad e información.'],
    ['c4', 'c5', 'La dirección asegura la imparcialidad y la confidencialidad.'],
    ['c4', 'c85', 'Los riesgos a la imparcialidad se gestionan como riesgos.'],
    ['c4', 'c76', 'La confidencialidad del paciente se protege en el manejo de datos.'],
    ['c5', 'c6', 'La dirección asegura los recursos necesarios.'],
    ['c5', 'c85', 'La gestión de riesgos para el paciente (5.6) se aplica con 8.5.'],
    ['c5', 'c88', 'Los objetivos de la calidad se miden con indicadores.'],
    ['c5', 'c89', 'La dirección revisa el sistema y decide mejoras y recursos.'],
    ['c72', 'c73', 'Entrega muestras identificadas y aptas para examinar.'],
    ['c73', 'c74', 'Entrega resultados validados para su revisión y liberación.'],
    ['c74', 'uout', 'Informe oportuno; los valores críticos se notifican de inmediato.'],
    ['c6', 'c72', 'Personal de toma competente, material y condiciones de transporte.'],
    ['c6', 'c73', 'Equipos calibrados, reactivos verificados y personal competente.'],
    ['c6', 'c74', 'Personal autorizado para revisar y liberar resultados.'],
    ['c72', 'c75', 'Muestras rechazadas o con problemas se tratan como trabajo no conforme.'],
    ['c73', 'c75', 'Un control de calidad fuera de control detiene la liberación.'],
    ['c74', 'c75', 'Informes liberados con error se corrigen y se controlan.'],
    ['c73', 'c76', 'Datos de los equipos e interfaces con el sistema de información.'],
    ['c74', 'c76', 'Emisión, resguardo y acceso al informe.'],
    ['c76', 'c78', 'Contingencia si falla el sistema de información.'],
    ['c6', 'c78', 'Recursos alternos ante emergencias.'],
    ['c78', 'c85', 'El plan de continuidad parte de los riesgos de interrupción.'],
    ['uout', 'c77', 'Pacientes y médicos pueden presentar quejas.'],
    ['c77', 'c87', 'Las quejas justificadas generan acción correctiva.'],
    ['c77', 'c89', 'Las quejas son entrada de la revisión por la dirección.'],
    ['c75', 'c87', 'Si el trabajo no conforme puede repetirse, se abre acción correctiva.'],
    ['c75', 'c85', 'Se evalúa el riesgo para el paciente del trabajo no conforme.'],
    ['c83', 'c72', 'Procedimientos y formatos de la preexaminación.'],
    ['c83', 'c73', 'Procedimientos analíticos vigentes.'],
    ['c83', 'c74', 'Procedimientos de informe y de valores críticos.'],
    ['c85', 'c72', 'Riesgos de identificación, toma y transporte.'],
    ['c85', 'c73', 'Riesgos en el análisis y en el control de calidad.'],
    ['c85', 'c86', 'Las oportunidades se convierten en mejoras.'],
    ['c88', 'c72', 'Indicadores de rechazo y de transporte fuera de rango.'],
    ['c88', 'c74', 'TAT de valores críticos y corrección de informes.'],
    ['c88', 'c87', 'Hallazgos de auditoría y desviaciones de indicadores.'],
    ['c88', 'c89', 'Indicadores y auditorías son entrada de la revisión.'],
    ['c73', 'c89', 'Los resultados de ensayos de aptitud son entrada de la revisión.'],
    ['c87', 'c85', 'Tras una acción correctiva se actualizan los riesgos.'],
    ['c87', 'c86', 'Las acciones eficaces consolidan la mejora.'],
    ['c86', 'c83', 'Las mejoras crean o actualizan documentos.'],
    ['c86', 'uout', 'La retroalimentación de los usuarios alimenta la mejora.'],
    ['c86', 'c89', 'La eficacia de las mejoras se revisa.'],
    ['c89', 'c87', 'Se da seguimiento a las acciones correctivas.'],
    ['c89', 'c85', 'Se revisa la eficacia de las acciones sobre riesgos.']
  ];

  /* ---------- Flujo fijo (flechas) ---------- */
  var GRIS = '#6B7280', MAG = '#2E3192';
  var FLUJO = [
    { p: [[256, 464], [351, 464]], c: GRIS },
    { p: [[608, 464], [671, 464]], c: GRIS },
    { p: [[928, 464], [991, 464]], c: GRIS },
    { p: [[1248, 464], [1343, 464]], c: GRIS },
    { p: [[800, 308], [800, 371]], c: GRIS },
    { p: [[680, 660], [680, 613]], c: GRIS },
    { p: [[1160, 788], [1160, 613]], c: MAG },
    { p: [[1440, 524], [1440, 900], [1281, 900]], c: GRIS, dash: true },
    { p: [[452, 872], [491, 872]], c: MAG },
    { p: [[616, 872], [655, 872]], c: MAG },
    { p: [[780, 872], [819, 872]], c: MAG },
    { p: [[944, 872], [983, 872]], c: MAG },
    { p: [[1108, 872], [1147, 872]], c: MAG },
    { p: [[1210, 908], [1210, 964], [390, 964], [390, 909]], c: MAG }
  ];
  var ETIQUETAS = [
    { x: 268, y: 432, w: 72, t: 'solicitud', c: 1 },
    { x: 1264, y: 432, w: 64, t: 'informe', c: 1 },
    { x: 812, y: 332, t: 'dirige' },
    { x: 692, y: 628, t: 'habilitan' },
    { x: 1172, y: 692, t: 'controla y mejora', mag: 1 },
    { x: 1292, y: 872, w: 136, t: 'quejas y encuestas', c: 1 },
    { x: 680, y: 976, w: 240, t: 'ciclo de mejora continua (PHVA)', c: 1, mag: 1 }
  ];

  var escena = document.getElementById('escena');
  var lienzo = document.getElementById('lienzo');
  var panel = document.getElementById('panel');
  var sel = null;

  function esc(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function cx(n) { return n.x + n.w / 2; }
  function cy(n) { return n.y + n.h / 2 + DY; }

  function dibujar() {
    var h = '';
    h += '<div class="banda" style="left:320px;top:' + (372 + DY) + 'px;width:960px;height:240px;background:#EEF0F4"></div>';
    h += '<div class="banda" style="left:320px;top:' + (788 + DY) + 'px;width:960px;height:220px;background:#E9EAF7"></div>';

    var svg = '<svg width="' + W + '" height="' + H + '" aria-hidden="true"><defs>' +
      '<marker id="mk-g" orient="auto" markerWidth="5" markerHeight="5" refX="2" refY="2" overflow="visible"><path d="M0 0 L4 2 L0 4 Z" fill="' + GRIS + '"/></marker>' +
      '<marker id="mk-m" orient="auto" markerWidth="5" markerHeight="5" refX="2" refY="2" overflow="visible"><path d="M0 0 L4 2 L0 4 Z" fill="' + MAG + '"/></marker>' +
      '</defs><g class="flujo">';
    FLUJO.forEach(function (f) {
      var pts = f.p.map(function (p) { return [p[0], p[1] + DY]; });
      var last = pts[pts.length - 1], prev = pts[pts.length - 2];
      var dx = Math.sign(last[0] - prev[0]), dy = Math.sign(last[1] - prev[1]);
      var fin = [last[0] - dx * 4, last[1] - dy * 4];
      var d = 'M ' + pts.slice(0, -1).map(function (p) { return p.join(' '); }).join(' L ') + ' L ' + fin.join(' ');
      svg += '<path d="' + d + '" fill="none" stroke="' + f.c + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"' +
        (f.dash ? ' stroke-dasharray="6 6"' : '') + ' marker-end="url(#' + (f.c === MAG ? 'mk-m' : 'mk-g') + ')"/>';
    });
    svg += '</g><path id="rutas" d="" fill="none" stroke="#ED1C24" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/></svg>';
    h += svg;

    h += '<div class="tit-banda" style="left:336px;top:' + (382 + DY) + 'px;color:#374151">7 · Requisitos del proceso</div>';
    h += '<div class="tit-banda" style="left:336px;top:' + (802 + DY) + 'px;color:#262262">8 · Sistema de gestión · miniSGC del laboratorio</div>';
    ETIQUETAS.forEach(function (e) {
      h += '<div class="etq' + (e.mag ? ' mag' : '') + '" style="left:' + e.x + 'px;top:' + (e.y + DY) + 'px;' + (e.w ? 'width:' + e.w + 'px;' : '') + (e.c ? 'text-align:center;' : '') + '">' + esc(e.t) + '</div>';
    });
    Object.keys(NODOS).forEach(function (id) {
      var n = NODOS[id];
      h += '<button type="button" class="nodo ' + n.cls + '" data-id="' + id + '" aria-pressed="false" style="left:' + n.x + 'px;top:' + (n.y + DY) + 'px;width:' + n.w + 'px;height:' + n.h + 'px">' + n.html + '</button>';
    });
    escena.innerHTML = h;
  }

  function vecinos(id) {
    var v = {};
    RELACIONES.forEach(function (r) {
      if (r[0] === id) v[r[1]] = r[2];
      else if (r[1] === id) v[r[0]] = r[2];
    });
    return v;
  }

  function actualizar() {
    var v = sel ? vecinos(sel) : {};
    escena.classList.toggle('con-sel', !!sel);
    escena.querySelectorAll('.nodo').forEach(function (b) {
      var id = b.dataset.id;
      b.classList.toggle('elegido', id === sel);
      b.classList.toggle('vecino', !!v[id]);
      b.classList.toggle('atenuado', !!sel && id !== sel && !v[id]);
      b.setAttribute('aria-pressed', id === sel ? 'true' : 'false');
    });

    var d = '';
    if (sel) {
      var a = NODOS[sel];
      Object.keys(v).forEach(function (id) {
        var b = NODOS[id];
        var ax = cx(a), ay = cy(a), bx = cx(b), by = cy(b);
        var mx = (ax + bx) / 2, my = (ay + by) / 2, dx = bx - ax, dy = by - ay;
        var len = Math.sqrt(dx * dx + dy * dy) || 1, k = Math.min(60, len * 0.18);
        d += 'M ' + ax + ' ' + ay + ' Q ' + Math.round(mx - dy / len * k) + ' ' + Math.round(my + dx / len * k) + ' ' + bx + ' ' + by + ' ';
      });
    }
    document.getElementById('rutas').setAttribute('d', d);

    if (!sel) {
      panel.innerHTML = '<span class="eti">Explora las conexiones</span><h2>Elige un requisito</h2>' +
        '<p style="color:var(--a-text-body)">Haz clic en cualquier recuadro del diagrama. Se trazan en rojo sus conexiones con otros requisitos y aquí se explica por qué se relacionan.</p>' +
        '<div class="leyenda">' +
        '<span><i style="background:#2E3192"></i>Dirección y requisitos generales</span>' +
        '<span><i style="background:#fff;border:1.5px solid #ED1C24"></i>Fases de la muestra</span>' +
        '<span><i style="background:#E9EAF7;border:0.5px solid #A9ABDC"></i>miniSGC del laboratorio</span>' +
        '<span><i style="background:#C4141B"></i>Pacientes y médicos</span></div>';
      return;
    }
    var n = NODOS[sel], ids = Object.keys(v);
    panel.innerHTML = '<span class="eti rojo">Requisito seleccionado</span><h2>' + esc(n.t) + '</h2>' +
      '<p style="color:var(--a-text-body)">' + esc(n.d) + '</p>' +
      (n.pagina ? '<a class="enlace-fuerte" style="font-size:13px" href="' + n.pagina + '">Ver documentos de esta sección →</a>' : '') +
      '<span class="sub">Se conecta con ' + ids.length + ' requisitos</span><div class="ic-rels pila">' +
      ids.map(function (id) {
        return '<button type="button" class="ic-rel" data-ir="' + id + '"><b>' + esc(NODOS[id].t) + '</b><span>' + esc(v[id]) + '</span></button>';
      }).join('') + '</div>' +
      '<button type="button" class="btn btn-secundario" data-limpiar style="margin-top:4px">Quitar selección</button>';
  }

  function elegir(id) {
    sel = sel === id ? null : id;
    actualizar();
    // Si el panel está debajo del diagrama, acércalo a la vista
    if (sel && window.innerWidth < 1600) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  escena.addEventListener('click', function (e) {
    var b = e.target.closest('.nodo');
    if (b) elegir(b.dataset.id);
  });
  panel.addEventListener('click', function (e) {
    var r = e.target.closest('[data-ir]');
    if (r) { sel = r.dataset.ir; actualizar(); return; }
    if (e.target.closest('[data-limpiar]')) { sel = null; actualizar(); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && sel) { sel = null; actualizar(); } });

  function ajustar() {
    var s = lienzo.clientWidth / W;
    escena.style.transform = 'scale(' + s + ')';
    lienzo.style.height = Math.round(H * s) + 'px';
  }
  window.addEventListener('resize', ajustar);

  dibujar();
  ajustar();
  actualizar();
})();
