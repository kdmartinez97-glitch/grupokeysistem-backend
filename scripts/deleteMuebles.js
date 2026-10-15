const db = require('../config/db');

async function run() {
    try {
        console.log("Buscando categoría 'Muebles'...");
        const [rows] = await db.query("SELECT id FROM categorias WHERE nombre = 'Muebles' LIMIT 1");
        
        if (rows.length === 0) {
            console.log("La categoría 'Muebles' no existe o ya fue eliminada.");
            process.exit(0);
        }

        const mueblesId = rows[0].id;
        console.log(`ID de 'Muebles' encontrado: ${mueblesId}`);

        // Primero borrar subcategorías (o actualizar sus parent_id a null, pero el usuario pidió borrar el menú)
        const [subcats] = await db.query("SELECT id FROM categorias WHERE parent_id = ?", [mueblesId]);
        
        if (subcats.length > 0) {
            const subcatIds = subcats.map(s => s.id);
            console.log(`Eliminando subcategorías asociadas: ${subcatIds.join(', ')}...`);
            // Setear a null o 1 (Sin Categoria) en productos que pertenecían a estas subcats, por seguridad
            await db.query(`UPDATE productos SET categoria_id = NULL WHERE categoria_id IN (?)`, [subcatIds]);
            await db.query(`DELETE FROM categorias WHERE parent_id = ?`, [mueblesId]);
        }

        // Setear a null los productos que tenían la categoría principal (Muebles) directamente
        console.log("Desvinculando productos de 'Muebles'...");
        await db.query("UPDATE productos SET categoria_id = NULL WHERE categoria_id = ?", [mueblesId]);

        console.log("Eliminando la categoría principal 'Muebles'...");
        await db.query("DELETE FROM categorias WHERE id = ?", [mueblesId]);

        console.log("¡Categoría 'Muebles' eliminada por completo!");

    } catch (err) {
        console.error("Error al eliminar:", err);
    } finally {
        process.exit();
    }
}

run();
