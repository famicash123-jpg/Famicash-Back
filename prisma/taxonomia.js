// ============================================================
// Taxonomía oficial FamiCash (Lista exacta solicitada)
// Los nombres se conservan EXACTAMENTE porque los filtros,
// la Tabla Dinámica y las exportaciones a Excel dependen de ellos.
// ============================================================

export const TAXONOMIA = [
  {
    codigo: '0_AHORRO',
    tipo: 'AHORRO',
    persona: 'FAMILIA',
    subcategorias: [
      { codigo: '_1_AHORRO_VANESSA', persona: 'VANESSA', detalles: ['Ahorro Vanessa'] },
      { codigo: '_2_AHORRO_ANTHONY', persona: 'ANTHONY', detalles: ['Ahorro Anthony'] }
    ]
  },
  {
    codigo: 'I_INGRESOS',
    tipo: 'INGRESO',
    persona: 'FAMILIA',
    subcategorias: [
      { codigo: '_1_SUELDOS', detalles: ['Sueldo Anthony', 'Sueldo Vanessa'] },
      { codigo: '_2_PENSION', persona: 'LARA', detalles: ['Pensión Lara'] },
      { codigo: '_3_INGRESO ADICIONAL 1', detalles: ['Ejemplo 1'] },
      { codigo: '_4_INGRESO ADICIONAL 2', detalles: ['Ejemplo 2'] }
    ]
  },
  {
    codigo: 'II_GENERALES',
    tipo: 'GASTO',
    persona: 'FAMILIA',
    subcategorias: [
      { codigo: '_1_VIVIENDA', detalles: ['Alquiler departamento'] },
      { codigo: '_2_MANTENIMIENTO', detalles: ['Agua', 'Mantenimiento departamento', 'Otros'] },
      {
        codigo: '_3_SERVICIOS_BASICOS',
        detalles: [
          'Internet y telefono- Claro',
          'Luz',
          'Otros servicios basicos (nube/netflix/camaras/apps)',
          'Celular Anthony',
          'Celular Vanessa',
          'Gastos extraordinarios'
        ]
      },
      {
        codigo: '_4_TRANSPORTE',
        detalles: [
          'Gasolina',
          'Transporte Anthony',
          'Transporte Vanessa',
          'Otros Transporte (estacionamientos y peajes)',
          'Seguro Vehicular',
          'Mantenimiento vehicular - 5 KM',
          'Mecánico o reparación vehicular',
          'Revisión Técnica',
          'Soat'
        ]
      },
      {
        codigo: '_5_PERSONAL_DE_SERVICIO',
        detalles: [
          'Nana',
          'Beneficios Nana (Gratificación, vacaciones, CTS)',
          'Limpieza del hogar'
        ]
      },
      {
        codigo: '_6_ALIMENTACION',
        detalles: [
          'Alimentos, utiles de limpieza hogar',
          'Otros Alimentación Anthony (consumos fuera / invitaciones)',
          'Otros Alimentación Vanessa (consumos fuera / invitaciones)',
          'Restaurantes'
        ]
      }
    ]
  },
  {
    codigo: 'III_LARA',
    tipo: 'GASTO',
    persona: 'LARA',
    subcategorias: [
      {
        codigo: '_1_CUIDADO_PERSONAL_LARA',
        detalles: ['Botiquín personal Lara', 'Útiles de aseo Lara', 'Otros Cuidado personal Lara']
      },
      {
        codigo: '_2_EDUCACION_LARA',
        detalles: [
          'Pensión y derecho a matricula',
          'Utiles escolares y de soporte (juguetes/cuentos/libros)',
          'Uniforme (Casaca y pantalon/polos/short)',
          'Actividades escolares'
        ]
      },
      {
        codigo: '_3_TALLERES_LARA',
        detalles: [
          'Matrícula/Pensión (clases de natación)',
          'Accesorios para el taller (Indumentaria/vestimenta/materiales)',
          'Otros Talleres Lara'
        ]
      },
      { codigo: '_4_VESTIMENTA_LARA', detalles: ['Vestimenta, accesorios y calzado Lara'] },
      {
        codigo: '_6_SALUD_LARA',
        detalles: [
          'Consultas medicas y exámenes (Pediatra/nutricionista)',
          'Medicamentos o vitaminas',
          'Seguro privado de salud Lara'
        ]
      },
      {
        codigo: '_7_DIVERSION_LARA',
        detalles: [
          'Fiestas infantiles y regalos (incluye también su fiesta de cumpleaños)',
          'Gasto de diversión Lara (salidas / paseos / viajes)'
        ]
      }
    ]
  },
  {
    codigo: 'IV_VANESSA',
    tipo: 'GASTO',
    persona: 'VANESSA',
    subcategorias: [
      {
        codigo: '_1_CUIDADO_PERSONAL_VANESSA',
        detalles: [
          'Botiquín Personal Vanessa',
          'Maquillaje',
          'Otros Cuidado Personal Vanessa (Peluquería / cejas / pestañas)',
          'Skin Care Vanessa',
          'Útiles de aseo y cuidado personal Vanessa'
        ]
      },
      { codigo: '_2_DEPORTE_VANESSA', detalles: ['Gym, baile o yoga'] },
      {
        codigo: '_3_SALUD_VANESSA',
        detalles: [
          'Consultas medicas',
          'Consultas psicológicas',
          'Medicamentos o vitaminas (Escitalopram, D3, Omega 3)',
          'Seguro privado de salud Vanessa'
        ]
      },
      {
        codigo: '_4_ESTUDIOS_VANESSA',
        detalles: ['Ingles para los negocios', 'Otros Estudios Vanessa']
      },
      { codigo: '_5_VESTIMENTA_VANESSA', detalles: ['Vestimenta, accesorios y calzado Vanessa'] },
      {
        codigo: '_6_LEGAL_VANESSA',
        detalles: ['Abogado Giovana', 'Abogado Ytalo', 'Otros Legal Vanessa']
      },
      {
        codigo: '_7_DIVERSION_VANESSA',
        detalles: [
          'Gastos de diversión Vanessa (salidas / paseos / viajes)',
          'Otros Gastos de diversión Vanessa'
        ]
      }
    ]
  },
  {
    codigo: 'V_ANTHONY',
    tipo: 'GASTO',
    persona: 'ANTHONY',
    subcategorias: [
      {
        codigo: '_1_CUIDADO_PERSONAL_ANTHONY',
        detalles: [
          'Barbería',
          'Botiquín Personal ANTHONY',
          'Otros Cuidado Personal ANTHONY (Peluquería / cejas / otros)',
          'Skin Care ANTHONY',
          'Útiles de aseo y cuidado personal ANTHONY'
        ]
      },
      { codigo: '_2_DEPORTE_ANTHONY', detalles: ['Ropa deportiva'] },
      {
        codigo: '_3_SALUD_ANTHONY',
        detalles: [
          'Consultas medicas Anthony',
          'Consultas psicológicas Anthony',
          'Medicamentos o vitaminas Anthony',
          'Seguro privado de salud ANTHONY'
        ]
      },
      {
        codigo: '_4_ESTUDIOS_ANTHONY',
        detalles: ['Ingles para los negocios Anthony', 'Otros Estudios ANTHONY']
      },
      { codigo: '_5_VESTIMENTA_ANTHONY', detalles: ['Vestimenta, accesorios y calzado ANTHONY'] },
      {
        codigo: '_6_DIVERSION_ANTHONY',
        detalles: [
          'Gastos de diversión ANTHONY (salidas / paseos / viajes)',
          'Otros Gastos de diversión ANTHONY'
        ]
      }
    ]
  }
];

export const MEDIOS_PAGO = [
  { nombre: 'TC PERSONAL VANESSA', persona: 'VANESSA' },
  { nombre: 'YAPE/PLIN/TRANSFERENCIA VANESSA', persona: 'VANESSA' },
  { nombre: 'TC PERSONAL ANTHONY', persona: 'ANTHONY' },
  { nombre: 'YAPE/PLIN/TRANSFERENCIA ANTHONY', persona: 'ANTHONY' },
  { nombre: 'CUENTA BCP', persona: 'FAMILIA' },
  { nombre: 'EFECTIVO', persona: 'FAMILIA' }
];

// Favoritos iniciales por usuario (subcategorías más frecuentes)
export const FAVORITOS_INICIALES = {
  ANTHONY: [
    '_6_ALIMENTACION',
    '_4_TRANSPORTE',
    '_3_SERVICIOS_BASICOS',
    '_2_EDUCACION_LARA',
    '_1_CUIDADO_PERSONAL_ANTHONY',
    '_2_AHORRO_ANTHONY'
  ],
  VANESSA: [
    '_6_ALIMENTACION',
    '_1_CUIDADO_PERSONAL_LARA',
    '_6_SALUD_LARA',
    '_1_CUIDADO_PERSONAL_VANESSA',
    '_4_TRANSPORTE',
    '_1_AHORRO_VANESSA'
  ]
};
