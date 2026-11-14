/* ============================================================
   DATOS DEL PORTAL — LABORATORIO DEMO (KaizenLab México)
   ------------------------------------------------------------
   Versión de DEMOSTRACIÓN: documentos, códigos y fechas son
   ficticios. En una implementación real, este es el único
   archivo que Calidad edita:
   - apps:       la URL de cada app de Apps Script.
   - documentos: la lista maestra (se muestra por sección y etapa
                 y aparece en el buscador). El PDF va en /docs.
   - hospital:   documentos del hospital usados por referencia.
   ============================================================ */

window.PORTAL = {

  laboratorio: 'Laboratorio Demo',
  politica: 'En Laboratorio Demo nos comprometemos a entregar resultados confiables y oportunos que apoyen la atención de cada paciente, con personal competente, métodos verificados y trato respetuoso. Cumplimos los requisitos de la norma ISO 15189:2022, los legales aplicables y los de nuestros usuarios, actuamos con imparcialidad y confidencialidad, y mejoramos continuamente la eficacia de nuestro sistema de gestión.',

  /* ---------- Apps de Apps Script (en la demo no se enlazan) ---------- */
  apps: [
    { id: 'nc',          nombre: 'No conformidades',          desc: 'Reporta trabajo no conforme y da seguimiento a la acción correctiva.', clausulas: '§7.5 · §8.7', url: '', inicio: true },
    { id: 'riesgos',     nombre: 'Riesgos y oportunidades',   desc: 'Identifica y evalúa riesgos con el AMEF del laboratorio.',             clausulas: '§5.6 · §8.5', url: '', inicio: true },
    { id: 'mejora',      nombre: 'Registro de mejora',        desc: 'Propón una mejora a tu proceso y sigue su implementación.',            clausulas: '§8.6',        url: '', inicio: true },
    { id: 'indicadores', nombre: 'Indicadores de calidad',    desc: 'Rechazos, TAT de valores críticos, corrección de informes y transporte.', clausulas: '§8.8.2',   url: '', inicio: true },
    { id: 'quejas',      nombre: 'Atención al paciente',      desc: 'Buzón de quejas y sugerencias de pacientes.',                          clausulas: '§7.7',        url: '', inicio: true },
    { id: 'revision',    nombre: 'Revisión por la dirección', desc: 'Entradas, acuerdos y acta. Acceso de Dirección y Calidad.',            clausulas: '§8.9',        url: '', inicio: true },
    { id: 'satisfaccion', nombre: 'Encuesta de satisfacción', desc: 'Retroalimentación de pacientes y servicios del hospital.',             clausulas: '§8.6.2',      url: '' },
    { id: 'auditorias',  nombre: 'Auditorías internas',       desc: 'Programa anual y seguimiento de auditorías.',                          clausulas: '§8.8.3',      url: '' },
    { id: 'proveedores', nombre: 'Evaluación de proveedores', desc: 'Evaluación de proveedores y laboratorios de referencia.',               clausulas: '§6.8',        url: '' }
  ],

  /* ---------- Secciones del portal ---------- */
  secciones: {
    preexaminacion: {
      titulo: 'Preexaminación', chip: 'Fase 1 · §7.2', pagina: 'preexaminacion.html',
      desc: 'Desde que el médico solicita el estudio hasta que la muestra, identificada y en condiciones, llega al área analítica.',
      etapas: [
        { id: 'informacion', nombre: 'Información a usuarios y pacientes', clausula: '7.2.2' },
        { id: 'solicitud',   nombre: 'Solicitud de estudios',              clausula: '7.2.3' },
        { id: 'toma',        nombre: 'Toma de muestra primaria',           clausula: '7.2.4' },
        { id: 'transporte',  nombre: 'Transporte',                         clausula: '7.2.5' },
        { id: 'recepcion',   nombre: 'Recepción de muestras',              clausula: '7.2.6' },
        { id: 'preparacion', nombre: 'Preparación y almacenamiento',       clausula: '7.2.7' }
      ],
      apps: ['indicadores', 'riesgos', 'nc']
    },
    examinacion: {
      titulo: 'Examinación', chip: 'Fase 2 · §7.3', pagina: 'examinacion.html',
      desc: 'El análisis de la muestra con métodos verificados y el aseguramiento de la validez de los resultados.',
      etapas: [
        { id: 'verificacion', nombre: 'Verificación de métodos',              clausula: '7.3.2' },
        { id: 'validacion',   nombre: 'Validación de métodos',                clausula: '7.3.3' },
        { id: 'incertidumbre', nombre: 'Incertidumbre de medida',             clausula: '7.3.4' },
        { id: 'intervalos',   nombre: 'Intervalos de referencia',             clausula: '7.3.5' },
        { id: 'procedimientos', nombre: 'Procedimientos analíticos',          clausula: '7.3.6' },
        { id: 'validez',      nombre: 'Control de calidad y ensayos de aptitud', clausula: '7.3.7' }
      ],
      apps: ['riesgos', 'nc']
    },
    postexaminacion: {
      titulo: 'Postexaminación', chip: 'Fase 3 · §7.4', pagina: 'postexaminacion.html',
      desc: 'La revisión, liberación y entrega del informe, y el destino de la muestra.',
      etapas: [
        { id: 'liberacion', nombre: 'Revisión y liberación de resultados', clausula: '7.4.1' },
        { id: 'criticos',   nombre: 'Valores críticos',                    clausula: '7.4.1' },
        { id: 'informe',    nombre: 'Informe y correcciones',              clausula: '7.4.1' },
        { id: 'muestras',   nombre: 'Conservación y desecho de muestras',  clausula: '7.4.2' }
      ],
      apps: ['indicadores', 'riesgos', 'nc']
    },
    recursos: {
      titulo: 'Recursos', chip: 'Capítulo 6', pagina: 'recursos.html',
      desc: 'El personal, las instalaciones, los equipos, los reactivos y los servicios externos que hacen posible el trabajo de las tres fases.',
      etapas: [
        { id: 'personal',     nombre: 'Personal y competencia',          clausula: '6.2' },
        { id: 'instalaciones', nombre: 'Instalaciones y ambiente',       clausula: '6.3' },
        { id: 'equipos',      nombre: 'Equipos y calibración',           clausula: '6.4–6.5' },
        { id: 'reactivos',    nombre: 'Reactivos y consumibles',         clausula: '6.6' },
        { id: 'acuerdos',     nombre: 'Acuerdos de servicio',            clausula: '6.7' },
        { id: 'externos',     nombre: 'Proveedores y laboratorios de referencia', clausula: '6.8' }
      ],
      apps: ['proveedores', 'nc']
    },
    minisgc: {
      titulo: 'miniSGC del laboratorio', chip: 'Capítulos 4, 5 y 8', pagina: 'minisgc.html',
      desc: 'El sistema de gestión propio del laboratorio para controlar y mejorar su trabajo, en convivencia con el SGC del hospital.',
      etapas: [
        { id: 'generales',   nombre: 'Imparcialidad y confidencialidad', clausula: '4' },
        { id: 'estructura',  nombre: 'Organización y objetivos',         clausula: '5' },
        { id: 'documentos',  nombre: 'Documentos y registros',           clausula: '8.2–8.4' },
        { id: 'riesgos',     nombre: 'Riesgos y oportunidades',          clausula: '8.5' },
        { id: 'mejora',      nombre: 'Mejora y retroalimentación',       clausula: '8.6' },
        { id: 'nc',          nombre: 'No conformidades y acciones correctivas', clausula: '7.5 · 8.7' },
        { id: 'quejas',      nombre: 'Quejas',                           clausula: '7.7' },
        { id: 'continuidad', nombre: 'Continuidad y emergencias',        clausula: '7.8' },
        { id: 'evaluaciones', nombre: 'Indicadores y auditorías',        clausula: '8.8' },
        { id: 'revision',    nombre: 'Revisión por la dirección',        clausula: '8.9' }
      ],
      apps: ['nc', 'riesgos', 'mejora', 'indicadores', 'auditorias', 'quejas', 'satisfaccion', 'revision']
    }
  },

  /* ---------- Lista maestra de documentos (ficticia) ---------- */
  documentos: [
    { codigo: 'PNO-PRE-01', nombre: 'Catálogo de estudios e instrucciones de preparación del paciente', tipo: 'Procedimiento', version: '03', vigente: '12/02/2026', seccion: 'preexaminacion', etapa: 'informacion', archivo: '' },
    { codigo: 'PNO-PRE-02', nombre: 'Recepción de solicitudes de estudios', tipo: 'Procedimiento', version: '02', vigente: '12/02/2026', seccion: 'preexaminacion', etapa: 'solicitud', archivo: '' },
    { codigo: 'PNO-PRE-03', nombre: 'Toma y manipulación de la muestra primaria', tipo: 'Procedimiento', version: '04', vigente: '05/03/2026', seccion: 'preexaminacion', etapa: 'toma', archivo: '' },
    { codigo: 'IT-PRE-01',  nombre: 'Identificación inequívoca del paciente y de la muestra', tipo: 'Instructivo', version: '02', vigente: '05/03/2026', seccion: 'preexaminacion', etapa: 'toma', archivo: '' },
    { codigo: 'IT-PRE-02',  nombre: 'Orden de llenado de tubos', tipo: 'Instructivo', version: '01', vigente: '05/03/2026', seccion: 'preexaminacion', etapa: 'toma', archivo: '' },
    { codigo: 'PNO-PRE-04', nombre: 'Transporte de muestras', tipo: 'Procedimiento', version: '02', vigente: '20/01/2026', seccion: 'preexaminacion', etapa: 'transporte', archivo: '' },
    { codigo: 'PNO-PRE-05', nombre: 'Recepción de muestras y criterios de aceptación y rechazo', tipo: 'Procedimiento', version: '03', vigente: '20/01/2026', seccion: 'preexaminacion', etapa: 'recepcion', archivo: '' },
    { codigo: 'PNO-PRE-06', nombre: 'Preparación, alicuotado y almacenamiento de muestras', tipo: 'Procedimiento', version: '01', vigente: '20/01/2026', seccion: 'preexaminacion', etapa: 'preparacion', archivo: '' },
    { codigo: 'FO-PRE-01',  nombre: 'Solicitud de estudios de laboratorio', tipo: 'Formato', version: '02', vigente: '12/02/2026', seccion: 'preexaminacion', etapa: 'solicitud', archivo: '' },
    { codigo: 'FO-PRE-02',  nombre: 'Bitácora de temperatura de transporte', tipo: 'Formato', version: '02', vigente: '20/01/2026', seccion: 'preexaminacion', etapa: 'transporte', archivo: '' },
    { codigo: 'FO-PRE-03',  nombre: 'Registro de muestras rechazadas', tipo: 'Formato', version: '01', vigente: '20/01/2026', seccion: 'preexaminacion', etapa: 'recepcion', archivo: '' },

    { codigo: 'PNO-EXA-01', nombre: 'Verificación del desempeño de métodos', tipo: 'Procedimiento', version: '02', vigente: '18/02/2026', seccion: 'examinacion', etapa: 'verificacion', archivo: '' },
    { codigo: 'PNO-EXA-02', nombre: 'Validación de métodos no normalizados', tipo: 'Procedimiento', version: '01', vigente: '18/02/2026', seccion: 'examinacion', etapa: 'validacion', archivo: '' },
    { codigo: 'PNO-EXA-03', nombre: 'Estimación de la incertidumbre de medida', tipo: 'Procedimiento', version: '02', vigente: '18/02/2026', seccion: 'examinacion', etapa: 'incertidumbre', archivo: '' },
    { codigo: 'PNO-EXA-04', nombre: 'Establecimiento y verificación de intervalos de referencia', tipo: 'Procedimiento', version: '01', vigente: '18/02/2026', seccion: 'examinacion', etapa: 'intervalos', archivo: '' },
    { codigo: 'PNO-EXA-10', nombre: 'Biometría hemática automatizada', tipo: 'Procedimiento', version: '05', vigente: '02/04/2026', seccion: 'examinacion', etapa: 'procedimientos', archivo: '' },
    { codigo: 'PNO-EXA-11', nombre: 'Química clínica: glucosa, urea y creatinina', tipo: 'Procedimiento', version: '04', vigente: '02/04/2026', seccion: 'examinacion', etapa: 'procedimientos', archivo: '' },
    { codigo: 'PNO-EXA-12', nombre: 'Examen general de orina', tipo: 'Procedimiento', version: '03', vigente: '02/04/2026', seccion: 'examinacion', etapa: 'procedimientos', archivo: '' },
    { codigo: 'PNO-EXA-05', nombre: 'Control de calidad interno', tipo: 'Procedimiento', version: '03', vigente: '10/03/2026', seccion: 'examinacion', etapa: 'validez', archivo: '' },
    { codigo: 'PNO-EXA-06', nombre: 'Participación en ensayos de aptitud', tipo: 'Procedimiento', version: '02', vigente: '10/03/2026', seccion: 'examinacion', etapa: 'validez', archivo: '' },
    { codigo: 'FO-EXA-01',  nombre: 'Registro de control de calidad interno (Levey-Jennings)', tipo: 'Registro', version: '02', vigente: '10/03/2026', seccion: 'examinacion', etapa: 'validez', archivo: '' },
    { codigo: 'FO-EXA-02',  nombre: 'Informe de verificación de método', tipo: 'Formato', version: '01', vigente: '18/02/2026', seccion: 'examinacion', etapa: 'verificacion', archivo: '' },

    { codigo: 'PNO-POS-01', nombre: 'Revisión y liberación de resultados', tipo: 'Procedimiento', version: '03', vigente: '25/02/2026', seccion: 'postexaminacion', etapa: 'liberacion', archivo: '' },
    { codigo: 'PNO-POS-02', nombre: 'Notificación de valores críticos', tipo: 'Procedimiento', version: '02', vigente: '25/02/2026', seccion: 'postexaminacion', etapa: 'criticos', archivo: '' },
    { codigo: 'PNO-POS-03', nombre: 'Emisión y corrección de informes', tipo: 'Procedimiento', version: '02', vigente: '25/02/2026', seccion: 'postexaminacion', etapa: 'informe', archivo: '' },
    { codigo: 'PNO-POS-04', nombre: 'Conservación y desecho de muestras', tipo: 'Procedimiento', version: '01', vigente: '25/02/2026', seccion: 'postexaminacion', etapa: 'muestras', archivo: '' },
    { codigo: 'FO-POS-01',  nombre: 'Bitácora de notificación de valores críticos', tipo: 'Registro', version: '02', vigente: '25/02/2026', seccion: 'postexaminacion', etapa: 'criticos', archivo: '' },
    { codigo: 'FO-POS-02',  nombre: 'Registro de entrega de resultados', tipo: 'Registro', version: '01', vigente: '25/02/2026', seccion: 'postexaminacion', etapa: 'informe', archivo: '' },

    { codigo: 'PNO-REC-01', nombre: 'Competencia y evaluación del personal', tipo: 'Procedimiento', version: '02', vigente: '15/01/2026', seccion: 'recursos', etapa: 'personal', archivo: '' },
    { codigo: 'PNO-REC-02', nombre: 'Control de condiciones ambientales', tipo: 'Procedimiento', version: '01', vigente: '15/01/2026', seccion: 'recursos', etapa: 'instalaciones', archivo: '' },
    { codigo: 'PNO-REC-03', nombre: 'Mantenimiento y calibración de equipos', tipo: 'Procedimiento', version: '03', vigente: '15/01/2026', seccion: 'recursos', etapa: 'equipos', archivo: '' },
    { codigo: 'PNO-REC-04', nombre: 'Recepción y verificación de reactivos', tipo: 'Procedimiento', version: '02', vigente: '15/01/2026', seccion: 'recursos', etapa: 'reactivos', archivo: '' },
    { codigo: 'PNO-REC-05', nombre: 'Acuerdos de servicio con usuarios', tipo: 'Procedimiento', version: '01', vigente: '15/01/2026', seccion: 'recursos', etapa: 'acuerdos', archivo: '' },
    { codigo: 'PNO-REC-06', nombre: 'Evaluación de proveedores y laboratorios de referencia', tipo: 'Procedimiento', version: '02', vigente: '15/01/2026', seccion: 'recursos', etapa: 'externos', archivo: '' },
    { codigo: 'FO-REC-01',  nombre: 'Perfil de puesto y evaluación de competencia', tipo: 'Formato', version: '02', vigente: '15/01/2026', seccion: 'recursos', etapa: 'personal', archivo: '' },
    { codigo: 'FO-REC-02',  nombre: 'Bitácora de temperatura y humedad', tipo: 'Registro', version: '01', vigente: '15/01/2026', seccion: 'recursos', etapa: 'instalaciones', archivo: '' },
    { codigo: 'FO-REC-03',  nombre: 'Programa de mantenimiento y calibración', tipo: 'Registro', version: '03', vigente: '15/01/2026', seccion: 'recursos', etapa: 'equipos', archivo: '' },

    { codigo: 'MC-01',      nombre: 'Manual del sistema de gestión del laboratorio', tipo: 'Manual', version: '04', vigente: '08/01/2026', seccion: 'minisgc', etapa: 'documentos', archivo: '' },
    { codigo: 'DOC-SGC-01', nombre: 'Declaración de imparcialidad y confidencialidad', tipo: 'Documento', version: '02', vigente: '08/01/2026', seccion: 'minisgc', etapa: 'generales', archivo: '' },
    { codigo: 'DOC-SGC-02', nombre: 'Interfaz laboratorio–hospital', tipo: 'Documento', version: '02', vigente: '08/01/2026', seccion: 'minisgc', etapa: 'estructura', archivo: '' },
    { codigo: 'DOC-SGC-03', nombre: 'Objetivos de la calidad y organigrama', tipo: 'Documento', version: '03', vigente: '08/01/2026', seccion: 'minisgc', etapa: 'estructura', archivo: '' },
    { codigo: 'PNO-SGC-01', nombre: 'Control de documentos y registros', tipo: 'Procedimiento', version: '03', vigente: '08/01/2026', seccion: 'minisgc', etapa: 'documentos', archivo: '' },
    { codigo: 'PNO-SGC-02', nombre: 'Gestión de riesgos y oportunidades', tipo: 'Procedimiento', version: '02', vigente: '08/01/2026', seccion: 'minisgc', etapa: 'riesgos', archivo: '' },
    { codigo: 'PNO-SGC-03', nombre: 'Mejora continua y retroalimentación de usuarios', tipo: 'Procedimiento', version: '01', vigente: '08/01/2026', seccion: 'minisgc', etapa: 'mejora', archivo: '' },
    { codigo: 'PNO-SGC-04', nombre: 'Trabajo no conforme y acciones correctivas', tipo: 'Procedimiento', version: '03', vigente: '08/01/2026', seccion: 'minisgc', etapa: 'nc', archivo: '' },
    { codigo: 'PNO-SGC-05', nombre: 'Atención de quejas', tipo: 'Procedimiento', version: '02', vigente: '08/01/2026', seccion: 'minisgc', etapa: 'quejas', archivo: '' },
    { codigo: 'PNO-SGC-06', nombre: 'Plan de continuidad y respuesta a emergencias', tipo: 'Procedimiento', version: '01', vigente: '08/01/2026', seccion: 'minisgc', etapa: 'continuidad', archivo: '' },
    { codigo: 'PNO-SGC-07', nombre: 'Indicadores de calidad y auditorías internas', tipo: 'Procedimiento', version: '02', vigente: '08/01/2026', seccion: 'minisgc', etapa: 'evaluaciones', archivo: '' },
    { codigo: 'PNO-SGC-08', nombre: 'Revisión por la dirección', tipo: 'Procedimiento', version: '02', vigente: '08/01/2026', seccion: 'minisgc', etapa: 'revision', archivo: '' },
    { codigo: 'FO-SGC-01',  nombre: 'Lista maestra de documentos', tipo: 'Registro', version: '04', vigente: '08/01/2026', seccion: 'minisgc', etapa: 'documentos', archivo: '' },
    { codigo: 'FO-SGC-02',  nombre: 'Acta de revisión por la dirección', tipo: 'Formato', version: '02', vigente: '08/01/2026', seccion: 'minisgc', etapa: 'revision', archivo: '' }
  ],

  /* ---------- Documentos del hospital, por referencia ---------- */
  hospital: [
    { nombre: 'Compras',                          secciones: ['inicio', 'recursos'],       enlace: '' },
    { nombre: 'Mantenimiento de instalaciones',   secciones: ['inicio', 'recursos'],       enlace: '' },
    { nombre: 'Recursos humanos',                 secciones: ['inicio', 'recursos'],       enlace: '' },
    { nombre: 'Manejo de RPBI',                   secciones: ['inicio', 'preexaminacion', 'postexaminacion'], enlace: '' },
    { nombre: 'Quejas generales de pacientes',    secciones: ['inicio', 'minisgc'],        enlace: '' },
    { nombre: 'Identificación del paciente hospitalizado', secciones: ['preexaminacion'],  enlace: '' }
  ]
};
