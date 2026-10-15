const db = require('../config/db');

const initialServices = [
    // Laptops y equipos de escritorio
    { titulo: 'Mantenimiento preventivo y correctivo (limpieza, pasta térmica)', categoria: 'Laptops y equipos de escritorio' },
    { titulo: 'Instalación de sistemas operativos y paquetería de software', categoria: 'Laptops y equipos de escritorio' },
    { titulo: 'Diagnóstico y cambio de componentes (RAM, SSD, pantallas)', categoria: 'Laptops y equipos de escritorio' },
    { titulo: 'Optimización general y remoción de malware o virus', categoria: 'Laptops y equipos de escritorio' },

    // Multifuncional
    { titulo: 'Reparación y mantenimiento físico de multifuncionales', categoria: 'Multifuncional' },
    { titulo: 'Configuración de impresoras compartidas en red local', categoria: 'Multifuncional' },
    { titulo: 'Diagnóstico de problemas de alimentación y calidad de impresión', categoria: 'Multifuncional' },
    { titulo: 'Suministro de refacciones y consumibles de alta calidad', categoria: 'Multifuncional' },

    // Otros
    { titulo: 'Diseño, cableado estructurado e instalación de redes locales', categoria: 'Otros' },
    { titulo: 'Soporte técnico remoto y en sitio para incidentes', categoria: 'Otros' },
    { titulo: 'Asesoría en adquisición de tecnología y licenciamiento', categoria: 'Otros' },
    { titulo: 'Respaldo preventivo y recuperación de información sensible', categoria: 'Otros' }
];

async function resetServices() {
    try {
        console.log('Limpiando tabla servicios...');
        await db.execute('DELETE FROM servicios');
        
        console.log('Insertando servicios iniciales...');
        for (const service of initialServices) {
            await db.execute(
                'INSERT INTO servicios (titulo, categoria) VALUES (?, ?)',
                [service.titulo, service.categoria]
            );
            console.log(`- Insertado: ${service.titulo} (${service.categoria})`);
        }
        
        console.log('¡Reseteo de servicios completado con éxito!');
        process.exit(0);
    } catch (error) {
        console.error('Error al resetear servicios:', error);
        process.exit(1);
    }
}

resetServices();
