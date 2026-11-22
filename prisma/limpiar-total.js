// ============================================================
// Script: Limpieza TOTAL de datos en PostgreSQL (TRUNCATE + RESTART IDENTITY)
// Uso: node prisma/limpiar-total.js (o npm run db:clean:total)
// ============================================================
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function limpiarTodo() {
  console.log('🧹 Ejecutando limpieza TOTAL (TRUNCATE RESTART IDENTITY CASCADE)...');
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      transacciones,
      favoritos,
      presupuestos,
      objetivos_ahorro,
      detalles,
      subcategorias,
      categorias,
      medios_pago
    RESTART IDENTITY CASCADE;
  `);
  console.log('✅ Base de datos limpiada por completo (IDs reiniciados a 1).');
}

// Ejecutar directamente si se llama por CLI
if (process.argv[1]?.endsWith('limpiar-total.js')) {
  limpiarTodo()
    .catch((e) => {
      console.error('❌ Error en limpiar-total:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
