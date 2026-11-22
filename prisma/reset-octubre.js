// ============================================================
// Script: Limpieza total + Taxonomía oficial limpia + Data sintética de Octubre 2026
// Uso: node prisma/reset-octubre.js  (o npm run db:reset:octubre)
// ============================================================
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { MEDIOS_PAGO } from './taxonomia.js';
import { limpiarTodo } from './limpiar-total.js';

const prisma = new PrismaClient();

// Categorías con código EXACTO y subcategorías limpias (sin _ ni números adelante)
const TAXONOMIA_LIMPIA = [
  {
    codigo: '0_AHORRO',
    tipo: 'AHORRO',
    persona: 'FAMILIA',
    subcategorias: [
      { codigo: 'Ahorro Vanessa', persona: 'VANESSA', detalles: ['Ahorro Vanessa'] },
      { codigo: 'Ahorro Anthony', persona: 'ANTHONY', detalles: ['Ahorro Anthony'] }
    ]
  },
  {
    codigo: 'I_INGRESOS',
    tipo: 'INGRESO',
    persona: 'FAMILIA',
    subcategorias: [
      { codigo: 'Sueldos', detalles: ['Sueldo Anthony', 'Sueldo Vanessa'] },
      { codigo: 'Pensión', persona: 'LARA', detalles: ['Pensión Lara'] },
      { codigo: 'Ingreso Adicional 1', detalles: ['Ejemplo 1'] },
      { codigo: 'Ingreso Adicional 2', detalles: ['Ejemplo 2'] }
    ]
  },
  {
    codigo: 'II_GENERALES',
    tipo: 'GASTO',
    persona: 'FAMILIA',
    subcategorias: [
      { codigo: 'Vivienda', detalles: ['Alquiler departamento'] },
      { codigo: 'Mantenimiento', detalles: ['Mantenimiento departamento', 'Otros Mantenimiento'] },
      {
        codigo: 'Servicios Básicos',
        detalles: [
          'Internet y telefono- Claro',
          'Luz',
          'Otros servicios basicos (nube/netflix /camaras/apps)',
          'Celular Anthony',
          'Celular Vanessa',
          'Gastos extraordinarios',
          'Agua'
        ]
      },
      {
        codigo: 'Transporte',
        detalles: [
          'Gasolina',
          'Transporte Anthony',
          'Transporte Vanessa',
          'Otros Transporte (estacioamientos, peajes, SAT)',
          'Seguro Vehicular',
          'Mantenimiento vehicular - 5 KM',
          'Mecánico o reparacion vehicular',
          'Revision Técnica',
          'Soat'
        ]
      },
      {
        codigo: 'Personal de Servicio',
        detalles: [
          'Nana / Empleada del Hogar',
          'Beneficios (Gratificación, vacaciones, CTS)',
          'Limpieza del hogar'
        ]
      },
      {
        codigo: 'Alimentación',
        detalles: [
          'Alimentos, utiles de limpieza hogar',
          'Otros Alimentación Anthony',
          'Otros Alimentación Vanessa',
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
      { codigo: 'Cuidado Personal Lara', detalles: ['Cuidado personal y útiles de aseo Lara'] },
      {
        codigo: 'Educación Lara',
        detalles: [
          'Pensión y derecho a matricula',
          'Utiles escolares y de soporte ( juguetes/ cuentos / libros / muebles de estudio / disfraces)',
          'Actividades escolares',
          'Movilidad',
          'Uniforme'
        ]
      },
      {
        codigo: 'Talleres Lara',
        detalles: [
          'Matricula / Pensión',
          'Accesorios para el taller (Indumentaria/ vestimenta/ materiales)'
        ]
      },
      { codigo: 'Vestimenta Lara', detalles: ['Vestimenta, accesorios y calzado Lara'] },
      {
        codigo: 'Salud Lara',
        detalles: [
          'Consultas medicas y exámenes (Pediatra/nutricionista/neumologo/otros)',
          'Controles por Histiocitosis',
          'Medicamentos o vitaminas',
          'Seguro de salud'
        ]
      },
      { codigo: 'Diversión Lara', detalles: ['Gastos de diversión Lara (salidas / paseos / viajes)'] }
    ]
  },
  {
    codigo: 'IV_VANESSA',
    tipo: 'GASTO',
    persona: 'VANESSA',
    subcategorias: [
      { codigo: 'Cuidado Personal Vanessa', detalles: ['Cuidado personal y útiles de aseo Vanessa'] },
      { codigo: 'Deporte Vanessa', detalles: ['Deporte'] },
      {
        codigo: 'Salud Vanessa',
        detalles: ['Consultas medicas', 'Medicamentos o vitaminas', 'Seguro privado de salud Vanessa']
      },
      { codigo: 'Estudios Vanessa', detalles: ['Estudios Vanessa'] },
      { codigo: 'Vestimenta Vanessa', detalles: ['Vestimenta, accesorios y calzado Vanessa'] },
      { codigo: 'Legal Vanessa', detalles: ['Legal Vanessa'] },
      { codigo: 'Diversión Vanessa', detalles: ['Diversión Vanessa (salidas/ paseos / viajes)'] }
    ]
  },
  {
    codigo: 'V_ANTHONY',
    tipo: 'GASTO',
    persona: 'ANTHONY',
    subcategorias: [
      { codigo: 'Cuidado Personal Anthony', detalles: ['Cuidado personal y útiles de aseo Anthony'] },
      { codigo: 'Deporte Anthony', detalles: ['Deporte'] },
      {
        codigo: 'Salud Anthony',
        detalles: ['Consultas medicas Anthony', 'Medicamentos o vitaminas Anthony', 'Seguro privado de salud Anthony']
      },
      { codigo: 'Estudios Anthony', detalles: ['Estudios Anthony'] },
      { codigo: 'Vestimenta Anthony', detalles: ['Vestimenta, accesorios y calzado ANTHONY'] },
      { codigo: 'Diversión Anthony', detalles: ['Diversión Anthony (salidas/ paseos / viajes)'] }
    ]
  }
];

const FAVORITOS_LIMPIOS = {
  ANTHONY: ['Alimentación', 'Transporte', 'Servicios Básicos', 'Educación Lara', 'Cuidado Personal Anthony', 'Ahorro Anthony'],
  VANESSA: ['Alimentación', 'Cuidado Personal Lara', 'Salud Lara', 'Cuidado Personal Vanessa', 'Transporte', 'Ahorro Vanessa']
};

async function main() {
  await limpiarTodo();

  console.log('📁 Cargando taxonomía oficial...');
  const mapaSubs = new Map();
  for (const [ci, cat] of TAXONOMIA_LIMPIA.entries()) {
    const categoria = await prisma.categoria.create({
      data: { codigo: cat.codigo, tipo: cat.tipo, persona: cat.persona, orden: ci + 1 }
    });
    for (const [si, sub] of cat.subcategorias.entries()) {
      const subcategoria = await prisma.subcategoria.create({
        data: {
          categoriaId: categoria.id,
          codigo: sub.codigo,
          persona: sub.persona || null,
          orden: si + 1
        }
      });
      const detObjs = [];
      for (const [di, nombre] of sub.detalles.entries()) {
        const det = await prisma.detalle.create({
          data: { subcategoriaId: subcategoria.id, nombre, orden: di + 1 }
        });
        detObjs.push(det);
      }
      mapaSubs.set(`${cat.codigo}|${sub.codigo}`, { cat: categoria, sub: subcategoria, detalles: detObjs });
    }
  }

  for (const [i, m] of MEDIOS_PAGO.entries()) {
    await prisma.medioPago.upsert({
      where: { nombre: m.nombre },
      update: { activo: true, orden: i + 1 },
      create: { ...m, orden: i + 1 }
    });
  }
  const medios = await prisma.medioPago.findMany({ where: { activo: true } });
  const byMedio = (nombre) => medios.find((m) => m.nombre === nombre) || medios[0];

  const passwordHash = await bcrypt.hash('famicash123', 10);
  const usuariosSeed = [
    { nombre: 'Anthony', email: 'anthony@famicash.pe', persona: 'ANTHONY' },
    { nombre: 'Vanessa', email: 'vanessa@famicash.pe', persona: 'VANESSA' }
  ];
  const usuariosMap = {};
  for (const u of usuariosSeed) {
    const user = await prisma.usuario.upsert({
      where: { email: u.email },
      update: { activo: true },
      create: { ...u, passwordHash }
    });
    usuariosMap[u.persona] = user;
    const favCodigos = FAVORITOS_LIMPIOS[u.persona] || [];
    for (const [i, cod] of favCodigos.entries()) {
      const found = await prisma.subcategoria.findFirst({ where: { codigo: cod } });
      if (found) {
        await prisma.favorito.create({ data: { usuarioId: user.id, subcategoriaId: found.id, orden: i + 1 } });
      }
    }
  }

  // Movimientos sintéticos realistas para TODO Octubre 2026 (2026-10-01 al 2026-10-31)
  // [dia, catCodigo, subCodigo, idxDetalle, monto, medioNombre, clase, obs, personaUser]
  const movsOctubre = [
    [1, 'I_INGRESOS', 'Sueldos', 0, 7800, 'CUENTA BCP', 'Fijo', 'Sueldo mensual Anthony Octubre', 'ANTHONY'],
    [1, 'I_INGRESOS', 'Sueldos', 1, 9500, 'CUENTA BCP', 'Fijo', 'Sueldo mensual Vanessa Octubre', 'VANESSA'],
    [2, 'II_GENERALES', 'Vivienda', 0, 3200, 'CUENTA BCP', 'Fijo', 'Alquiler departamento Octubre', 'ANTHONY'],
    [2, 'II_GENERALES', 'Mantenimiento', 0, 380, 'CUENTA BCP', 'Fijo', 'Mantenimiento edificio Octubre', 'VANESSA'],
    [3, 'II_GENERALES', 'Alimentación', 0, 420.5, 'TC PERSONAL VANESSA', 'Cotidiano', 'Compras semanales supermercado', 'VANESSA'],
    [4, 'II_GENERALES', 'Transporte', 0, 165, 'TC PERSONAL ANTHONY', 'Cotidiano', 'Tanqueo gasolina Primax', 'ANTHONY'],
    [5, 'III_LARA', 'Educación Lara', 0, 1150, 'CUENTA BCP', 'Fijo', 'Pensión colegio Lara Octubre', 'VANESSA'],
    [5, 'I_INGRESOS', 'Pensión', 0, 850, 'CUENTA BCP', 'Fijo', 'Pensión Lara Octubre', 'VANESSA'],
    [6, '0_AHORRO', 'Ahorro Vanessa', 0, 1200, 'CUENTA BCP', 'Fijo', 'Aporte mensual ahorro Vanessa', 'VANESSA'],
    [6, '0_AHORRO', 'Ahorro Anthony', 0, 1000, 'CUENTA BCP', 'Fijo', 'Aporte mensual ahorro Anthony', 'ANTHONY'],
    [7, 'II_GENERALES', 'Servicios Básicos', 0, 149, 'TC PERSONAL ANTHONY', 'Fijo', 'Internet y cable Claro', 'ANTHONY'],
    [8, 'II_GENERALES', 'Servicios Básicos', 1, 215.4, 'CUENTA BCP', 'Fijo', 'Recibo de Luz Enel', 'VANESSA'],
    [9, 'II_GENERALES', 'Servicios Básicos', 6, 84.2, 'YAPE/PLIN/TRANSFERENCIA VANESSA', 'Fijo', 'Recibo de Agua Sedapal', 'VANESSA'],
    [10, 'II_GENERALES', 'Alimentación', 3, 195, 'TC PERSONAL ANTHONY', 'Cotidiano', 'Almuerzo familiar fin de semana', 'ANTHONY'],
    [11, 'III_LARA', 'Talleres Lara', 0, 240, 'YAPE/PLIN/TRANSFERENCIA VANESSA', 'Fijo', 'Taller de natación Octubre', 'VANESSA'],
    [12, 'II_GENERALES', 'Alimentación', 0, 389.8, 'TC PERSONAL VANESSA', 'Cotidiano', 'Supermercado semana 2', 'VANESSA'],
    [13, 'IV_VANESSA', 'Deporte Vanessa', 0, 180, 'TC PERSONAL VANESSA', 'Fijo', 'Mensualidad gym/yoga Vanessa', 'VANESSA'],
    [14, 'V_ANTHONY', 'Cuidado Personal Anthony', 0, 65, 'YAPE/PLIN/TRANSFERENCIA ANTHONY', 'Cotidiano', 'Corte y barbería Anthony', 'ANTHONY'],
    [15, 'II_GENERALES', 'Personal de Servicio', 0, 1400, 'CUENTA BCP', 'Fijo', 'Pago quincenal/mensual nana', 'VANESSA'],
    [16, 'II_GENERALES', 'Servicios Básicos', 3, 69.9, 'TC PERSONAL ANTHONY', 'Fijo', 'Plan celular Anthony', 'ANTHONY'],
    [16, 'II_GENERALES', 'Servicios Básicos', 4, 69.9, 'TC PERSONAL VANESSA', 'Fijo', 'Plan celular Vanessa', 'VANESSA'],
    [17, 'II_GENERALES', 'Transporte', 0, 155, 'TC PERSONAL ANTHONY', 'Cotidiano', 'Gasolina semana 3', 'ANTHONY'],
    [18, 'III_LARA', 'Salud Lara', 0, 220, 'TC PERSONAL VANESSA', 'Extra', 'Consulta pediatra control', 'VANESSA'],
    [19, 'III_LARA', 'Salud Lara', 2, 118.5, 'YAPE/PLIN/TRANSFERENCIA VANESSA', 'Cotidiano', 'Vitaminas y jarabe Lara', 'VANESSA'],
    [20, 'II_GENERALES', 'Alimentación', 0, 410.2, 'TC PERSONAL VANESSA', 'Cotidiano', 'Supermercado semana 3', 'VANESSA'],
    [21, 'IV_VANESSA', 'Estudios Vanessa', 0, 320, 'TC PERSONAL VANESSA', 'Fijo', 'Curso inglés de negocios', 'VANESSA'],
    [22, 'V_ANTHONY', 'Estudios Anthony', 0, 290, 'TC PERSONAL ANTHONY', 'Fijo', 'Curso inglés Anthony', 'ANTHONY'],
    [23, 'I_INGRESOS', 'Ingreso Adicional 1', 0, 650, 'YAPE/PLIN/TRANSFERENCIA ANTHONY', 'Extra', 'Asesoría / ingreso extra Octubre', 'ANTHONY'],
    [24, 'III_LARA', 'Diversión Lara', 0, 145, 'EFECTIVO', 'Cotidiano', 'Salida parque y juegos Lara', 'VANESSA'],
    [25, 'II_GENERALES', 'Alimentación', 3, 168, 'TC PERSONAL ANTHONY', 'Cotidiano', 'Cena en restaurante', 'ANTHONY'],
    [26, 'IV_VANESSA', 'Cuidado Personal Vanessa', 0, 190, 'TC PERSONAL VANESSA', 'Cotidiano', 'Peluquería y cuidado personal', 'VANESSA'],
    [27, 'II_GENERALES', 'Alimentación', 0, 365.4, 'TC PERSONAL VANESSA', 'Cotidiano', 'Supermercado fin de mes', 'VANESSA'],
    [28, 'II_GENERALES', 'Transporte', 3, 48, 'YAPE/PLIN/TRANSFERENCIA ANTHONY', 'Cotidiano', 'Peajes y estacionamientos', 'ANTHONY'],
    [29, 'V_ANTHONY', 'Diversión Anthony', 0, 140, 'YAPE/PLIN/TRANSFERENCIA ANTHONY', 'Cotidiano', 'Salida con amigos', 'ANTHONY'],
    [30, 'II_GENERALES', 'Servicios Básicos', 2, 92.5, 'TC PERSONAL ANTHONY', 'Fijo', 'Netflix, iCloud y suscripciones', 'ANTHONY'],
    [31, 'IV_VANESSA', 'Diversión Vanessa', 0, 175, 'TC PERSONAL VANESSA', 'Cotidiano', 'Salida de fin de mes Vanessa', 'VANESSA']
  ];

  const txsData = movsOctubre.map(([dia, catCod, subCod, idxDet, monto, medNom, clase, obs, userKey]) => {
    const entry = mapaSubs.get(`${catCod}|${subCod}`);
    if (!entry) throw new Error(`No existe taxonomía: ${catCod}|${subCod}`);
    const det = entry.detalles[idxDet] || entry.detalles[0] || null;
    const mp = byMedio(medNom);
    return {
      fecha: new Date(Date.UTC(2026, 9, dia)), // Octubre = mes 9 (0-indexed)
      tipo: entry.cat.tipo,
      categoriaId: entry.cat.id,
      subcategoriaId: entry.sub.id,
      detalleId: det?.id || null,
      medioPagoId: mp?.id || null,
      monto,
      persona: entry.sub.persona || entry.cat.persona,
      clase,
      observaciones: obs,
      categoriaNombre: entry.cat.codigo,
      subcategoriaNombre: entry.sub.codigo,
      detalleNombre: det?.nombre || null,
      medioPagoNombre: mp?.nombre || null,
      creadoPorId: usuariosMap[userKey]?.id || usuariosMap.ANTHONY.id
    };
  });

  await prisma.transaccion.createMany({ data: txsData });

  // Topes mensuales para Octubre 2026 (con variedad de semáforos verde/amarillo/rojo)
  const catGen = await prisma.categoria.findUnique({ where: { codigo: 'II_GENERALES' } });
  const catLara = await prisma.categoria.findUnique({ where: { codigo: 'III_LARA' } });
  const catVan = await prisma.categoria.findUnique({ where: { codigo: 'IV_VANESSA' } });
  const catAnt = await prisma.categoria.findUnique({ where: { codigo: 'V_ANTHONY' } });

  await prisma.presupuesto.createMany({
    data: [
      { periodoTipo: 'MENSUAL', periodo: '2026-10', categoriaId: catGen.id, monto: 8500 },
      { periodoTipo: 'MENSUAL', periodo: '2026-10', categoriaId: catLara.id, monto: 1800 },
      { periodoTipo: 'MENSUAL', periodo: '2026-10', categoriaId: catVan.id, monto: 800 },
      { periodoTipo: 'MENSUAL', periodo: '2026-10', categoriaId: catAnt.id, monto: 600 }
    ]
  });

  // Objetivo de ahorro vinculado a Ahorro Anthony
  const subAhorroAnt = mapaSubs.get('0_AHORRO|Ahorro Anthony')?.sub;
  await prisma.objetivoAhorro.create({
    data: {
      nombre: 'Fondo de Emergencia Familiar',
      tipo: 'Fondo de emergencia',
      montoMeta: 25000,
      montoInicial: 5000,
      responsable: 'FAMILIA',
      subcategoriaAhorroId: subAhorroAnt?.id || null
    }
  });

  console.log(`✅ Listo: 6 categorías, ${mapaSubs.size} subcategorías limpias, ${txsData.length} movimientos en Octubre 2026.`);
}

main()
  .catch((e) => {
    console.error('❌ Error en reset-octubre:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
