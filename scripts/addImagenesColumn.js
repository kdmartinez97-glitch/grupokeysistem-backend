const db = require('../config/db');

async function run() {
    try {
        console.log("Añadiendo columna 'imagenes' a la tabla 'productos'...");
        await db.query("ALTER TABLE productos ADD COLUMN imagenes TEXT NULL AFTER imagen_url;");
        
        console.log("Migrando datos de imagen_url a imagenes...");
        // Convertir el imagen_url existente en un JSON array dentro de la columna imagenes
        const [rows] = await db.query("SELECT id, imagen_url FROM productos WHERE imagen_url IS NOT NULL AND imagen_url != ''");
        
        for (const row of rows) {
            const jsonArr = JSON.stringify([row.imagen_url]);
            await db.query("UPDATE productos SET imagenes = ? WHERE id = ?", [jsonArr, row.id]);
        }
        
        console.log("¡Columna añadida y datos migrados exitosamente!");
    } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
            console.log("La columna 'imagenes' ya existe.");
        } else {
            console.error("Error al añadir columna:", err);
        }
    } finally {
        process.exit();
    }
}

run();
