const db = require('../config/db');

async function run() {
    try {
        console.log("Analizando productos de oficina mal clasificados...");

        // Query all products under 'Accesorios' (ID: 69)
        const [products] = await db.query("SELECT id, nombre, categoria_id FROM productos WHERE categoria_id = 69");

        console.log(`Se encontraron ${products.length} productos en la categoría general 'Accesorios'.`);

        let updatedCount = 0;

        for (const p of products) {
            const nombre = p.nombre.toLowerCase();
            let newCatId = null;

            // Clasificación de papelería / oficina
            if (nombre.includes("broche") || nombre.includes("sujetadocumentos") || nombre.includes("sujeta documentos") || nombre.includes("carpeta") || nombre.includes("folder") || nombre.includes("registrador")) {
                newCatId = 21; // Clasificación y Organización
            }
            else if (nombre.includes("dedal") || nombre.includes("grapas") || nombre.includes("grapa") || nombre.includes("clip") || nombre.includes("perforadora") || nombre.includes("engrapadora") || nombre.includes("tijera") || nombre.includes("cutter") || nombre.includes("chincheta") || nombre.includes("organizador de escritorio")) {
                newCatId = 20; // Accesorios de Escritorio
            }
            else if (nombre.includes("cinta") || nombre.includes("pegamento") || nombre.includes("silicon") || nombre.includes("silicón") || nombre.includes("adhesivo") || nombre.includes("lápiz adhesivo") || nombre.includes("lapiz adhesivo")) {
                newCatId = 22; // Adhesivos
            }
            else if (nombre.includes("regla") || nombre.includes("juego de geometria") || nombre.includes("escuadra")) {
                newCatId = 24; // Geometría
            }
            else if (nombre.includes("sobre") || nombre.includes("recibo") || nombre.includes("remision") || nombre.includes("factura")) {
                newCatId = 25; // Formatos
            }

            if (newCatId) {
                await db.query("UPDATE productos SET categoria_id = ? WHERE id = ?", [newCatId, p.id]);
                console.log(`[ACTUALIZADO] '${p.nombre}' -> Movido a Categoría ID: ${newCatId}`);
                updatedCount++;
            }
        }

        // También hagamos un barrido general de todo el catálogo para reubicar clips, grapas, broches, etc., que puedan estar en otras categorías incorrectas
        const [allProducts] = await db.query("SELECT id, nombre, categoria_id FROM productos");
        for (const p of allProducts) {
            const nombre = p.nombre.toLowerCase();
            let newCatId = null;

            if (nombre.includes("broche para archivo") || nombre.includes("broche baco")) {
                newCatId = 21;
            } else if (nombre.includes("dedal de hule") || nombre.includes("grapas estandar") || nombre.includes("clip estandar") || nombre.includes("perforadora") || nombre.includes("sujetadocumentos")) {
                newCatId = 20;
            }

            if (newCatId && newCatId !== p.categoria_id) {
                await db.query("UPDATE productos SET categoria_id = ? WHERE id = ?", [newCatId, p.id]);
                console.log(`[BARRIDO GENERAL] '${p.nombre}' -> Movido a Categoría ID: ${newCatId}`);
                updatedCount++;
            }
        }

        console.log(`¡Limpieza completada! Se actualizaron ${updatedCount} productos de oficina.`);
    } catch (err) {
        console.error("Error durante la limpieza:", err);
    } finally {
        process.exit();
    }
}

run();
