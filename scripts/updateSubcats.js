const db = require('../config/db');

async function run() {
    try {
        console.log("Buscando categoría padre 'Mobiliario Corporativo'...");
        const [rows] = await db.query("SELECT id FROM categorias WHERE nombre = 'Mobiliario Corporativo' LIMIT 1");
        
        if (rows.length === 0) {
            console.error("No se encontró la categoría 'Mobiliario Corporativo'.");
            process.exit(1);
        }

        const parentId = rows[0].id;

        const subcategorias = [
            "Escritorios",
            "Estaciones de Trabajo",
            "Almacenamiento y Archivo",
            "Mesas de Juntas"
        ];

        const subcatMap = {};

        for (const sub of subcategorias) {
            const [existing] = await db.query("SELECT id FROM categorias WHERE nombre = ? AND parent_id = ?", [sub, parentId]);
            if (existing.length > 0) {
                subcatMap[sub] = existing[0].id;
                console.log(`Subcategoría encontrada: ${sub} (ID: ${existing[0].id})`);
            } else {
                const [result] = await db.query("INSERT INTO categorias (nombre, parent_id) VALUES (?, ?)", [sub, parentId]);
                subcatMap[sub] = result.insertId;
                console.log(`Subcategoría creada: ${sub} (ID: ${result.insertId})`);
            }
        }

        // Mapeo de productos a subcategorías
        const productMapping = {
            "Escritorios": [
                "Escritorio ejecutivo Zadar 120 Roble",
                "Escritorio ejecutivo Zadar 160 Roble",
                "Escritorio ejecutivo lateral Zadar 160 Roble",
                "Escritorio ejecutivo lateral Zadar 180 Roble",
                "Escritorio ejecutivo 120 Cazza",
                "Escritorio ejecutivo 160 Cazza",
                "Escritorio Ejecutivo Cazza 120 C/Cajones Roble",
                "Escritorio Ejecutivo Cazza 160 C/Cajones Roble"
            ],
            "Estaciones de Trabajo": [
                "Estación de 2 personas Zadar Roble",
                "Estación de 4 personas Zadar Roble",
                "Estación 2 personas Cazza C/Cajones Blanco",
                "Extensión estación 2 personas Cazza Blanco",
                "Estación de 2 personas Roble Cazza",
                "Extensión estación 2 personas roble Cazza"
            ],
            "Almacenamiento y Archivo": [
                "Credenza Zadar 160 Roble",
                "Archivero Melamina 2+1 Zadar Roble"
            ],
            "Mesas de Juntas": [
                "Mesa de Juntas 240 Zadar Roble",
                "Mesa de juntas Cazza 240 Blanco/Roble",
                "Mesa de juntas Cazza 180 Blanco/Roble",
                "Mesa de Juntas Cazza 110 Blanco/Nogal/Roble"
            ]
        };

        for (const [subName, products] of Object.entries(productMapping)) {
            const catId = subcatMap[subName];
            for (const prodName of products) {
                await db.query("UPDATE productos SET categoria_id = ? WHERE nombre = ?", [catId, prodName]);
                console.log(`Producto '${prodName}' asignado a '${subName}'.`);
            }
        }

        console.log("¡Todo actualizado correctamente!");

    } catch (err) {
        console.error("Error:", err);
    } finally {
        process.exit();
    }
}

run();
