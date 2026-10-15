require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const db = require('../config/db');

const tablas = [
    `CREATE TABLE IF NOT EXISTS feedback_calificaciones (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) DEFAULT 'Anonimo',
        atencion TINYINT UNSIGNED NOT NULL,
        entrega TINYINT UNSIGNED NOT NULL,
        calidad TINYINT UNSIGNED NOT NULL,
        precio TINYINT UNSIGNED NOT NULL,
        sitio_web TINYINT UNSIGNED NOT NULL,
        comentario TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS feedback_sugerencias (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(200) NOT NULL,
        descripcion TEXT NOT NULL,
        autor VARCHAR(100) DEFAULT 'Anonimo',
        estado ENUM('pendiente','en_revision','en_desarrollo','implementado','rechazado') DEFAULT 'pendiente',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS feedback_votos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sugerencia_id INT NOT NULL,
        ip_votante VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_voto (sugerencia_id, ip_votante),
        FOREIGN KEY (sugerencia_id) REFERENCES feedback_sugerencias(id) ON DELETE CASCADE
    )`
];

(async () => {
    const conn = await db.getConnection();
    for (const sql of tablas) {
        await conn.query(sql);
        console.log('OK:', sql.trim().substring(0, 50) + '...');
    }
    conn.release();
    console.log('\nTablas de feedback creadas exitosamente.');
    process.exit(0);
})().catch(e => {
    console.error('Error:', e.message);
    process.exit(1);
});
