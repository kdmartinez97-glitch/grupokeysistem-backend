const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../.env' }); // Adjust path if needed, we are in backend/scripts

async function createTable() {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || 'kevinhdez80@',
            database: process.env.DB_NAME || 'grupokeysistem_db'
        });

        console.log('Conectado a la BD.');

        // Drop si existe
        await connection.execute('DROP TABLE IF EXISTS servicios');
        console.log('Tabla servicios eliminada (si existía).');

        // Create
        await connection.execute(`
            CREATE TABLE servicios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                titulo VARCHAR(255) NOT NULL,
                descripcion TEXT NOT NULL,
                icono VARCHAR(100) NOT NULL,
                color VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);
        console.log('Tabla servicios creada.');

        // Seed data
        const initialServices = [
            ['Mantenimiento Preventivo', 'Limpieza interna y externa de equipos, actualización de software, eliminación de archivos temporales y optimización del sistema operativo para alargar la vida útil de tu hardware.', 'FaTools', 'from-blue-500 to-blue-600'],
            ['Reparación de Hardware', 'Diagnóstico preciso y reemplazo de componentes dañados como pantallas, teclados, baterías, discos duros, fuentes de poder y tarjetas madre en laptops y equipos de escritorio.', 'FaLaptop', 'from-cyan-500 to-cyan-600'],
            ['Instalación de Redes', 'Diseño, cableado estructurado e instalación de redes locales (LAN) y redes inalámbricas (WLAN) de alta velocidad, garantizando una conexión estable y segura.', 'FaNetworkWired', 'from-teal-500 to-teal-600'],
            ['Soporte a Servidores', 'Configuración, administración y mantenimiento de servidores Windows y Linux. Gestión de usuarios, dominios, respaldos y políticas de seguridad corporativas.', 'FaServer', 'from-indigo-500 to-indigo-600'],
            ['Eliminación de Virus', 'Detección y eliminación de malware, ransomware, spyware y troyanos. Instalación de software antivirus con licencias originales y políticas de protección.', 'FaBug', 'from-rose-500 to-rose-600'],
            ['Recuperación de Datos', 'Recuperación de información de discos duros dañados, formateados por error o memorias USB. Implementación de soluciones de respaldo en la nube y local.', 'FaDatabase', 'from-emerald-500 to-emerald-600']
        ];

        for (const s of initialServices) {
            await connection.execute(
                'INSERT INTO servicios (titulo, descripcion, icono, color) VALUES (?, ?, ?, ?)',
                s
            );
        }

        console.log('Servicios iniciales insertados con éxito.');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    } finally {
        if (connection) await connection.end();
    }
}

createTable();
