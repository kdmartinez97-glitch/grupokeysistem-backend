const db = require('../config/db');

const products = [
    { clave: "767982016053", nombre: "TIJERAS DE ACERO BARRILITO", precio: 47.00, stock: 1, categoria_id: 23, marca: "Barrilito", descripcion: "TIJERAS DE ACERO BARRILITO" },
    { clave: "3154144642552", nombre: "TIJERAS MAPED ESCOLAR", precio: 15.00, stock: 1, categoria_id: 23, marca: "Maped", descripcion: "TIJERAS MAPED ESCOLAR" },
    { clave: "012502641032", nombre: "TINTA BROTHER 5001 AMARILLA", precio: 226.00, stock: 2, categoria_id: 48, marca: "Brother", descripcion: "TINTA BROTHER 5001 AMARILLA" },
    { clave: "012502641018", nombre: "TINTA BROTHER 5001 CYAN", precio: 226.00, stock: 2, categoria_id: 48, marca: "Brother", descripcion: "TINTA BROTHER 5001 CYAN" },
    { clave: "012502641025", nombre: "TINTA BROTHER 5001 MAGENTA", precio: 226.00, stock: 2, categoria_id: 48, marca: "Brother", descripcion: "TINTA BROTHER 5001 MAGENTA" },
    { clave: "TECTEC73008", nombre: "TINTA BROTHER 6001 BK", precio: 210.00, stock: 1, categoria_id: 48, marca: "Brother", descripcion: "TINTA BROTHER 6001 BK" },
    { clave: "012502676782", nombre: "TINTA BROTHER AMARILLA D100Y", precio: 225.00, stock: 1, categoria_id: 48, marca: "Brother", descripcion: "TINTA BROTHER AMARILLA D100Y" },
    { clave: "012502676768", nombre: "TINTA BROTHER CYAN D100C", precio: 225.00, stock: 1, categoria_id: 48, marca: "Brother", descripcion: "TINTA BROTHER CYAN D100C" },
    { clave: "BTD60BK", nombre: "TINTA BROTHER D60BK NEGRO", precio: 230.00, stock: 1, categoria_id: 48, marca: "Brother", descripcion: "TINTA BROTHER D60BK NEGRO" },
    { clave: "012502676775", nombre: "TINTA BROTHER MAGENTA D100", precio: 225.00, stock: 1, categoria_id: 48, marca: "Brother", descripcion: "TINTA BROTHER MAGENTA D100" },
    { clave: "012502676751", nombre: "TINTA BROTHER NEGRO D100BK", precio: 225.00, stock: 2, categoria_id: 48, marca: "Brother", descripcion: "TINTA BROTHER NEGRO D100BK" },
    { clave: "013803259032", nombre: "TINTA CANON PIXMA 190 AMARILLA", precio: 288.00, stock: 2, categoria_id: 47, marca: "Canon", descripcion: "TINTA CANON PIXMA 190 AMARILLA" },
    { clave: "013803258998", nombre: "TINTA CANON PIXMA 190 CYAN", precio: 288.00, stock: 1, categoria_id: 47, marca: "Canon", descripcion: "TINTA CANON PIXMA 190 CYAN" },
    { clave: "013803259018", nombre: "TINTA CANON PIXMA 190 MAGENTA", precio: 288.00, stock: 2, categoria_id: 47, marca: "Canon", descripcion: "TINTA CANON PIXMA 190 MAGENTA" },
    { clave: "013803268201", nombre: "TINTA CANON PIXMA 190 NEGRO", precio: 288.00, stock: 2, categoria_id: 47, marca: "Canon", descripcion: "TINTA CANON PIXMA 190 NEGRO" },
    { clave: "010343938779", nombre: "TINTA EPSON 504 AMARILLA", precio: 235.00, stock: 3, categoria_id: 46, marca: "Epson", descripcion: "TINTA EPSON 504 AMARILLA" },
    { clave: "010343938755", nombre: "TINTA EPSON 504 CYAN", precio: 235.00, stock: 3, categoria_id: 46, marca: "Epson", descripcion: "TINTA EPSON 504 CYAN" },
    { clave: "010343938762", nombre: "TINTA EPSON 504 MAGENTA", precio: 235.00, stock: 3, categoria_id: 46, marca: "Epson", descripcion: "TINTA EPSON 504 MAGENTA" },
    { clave: "010343938748", nombre: "TINTA EPSON 504 NEGRA", precio: 295.00, stock: 1, categoria_id: 46, marca: "Epson", descripcion: "TINTA EPSON 504 NEGRA" },
    { clave: "010343942004", nombre: "TINTA EPSON 544 AMARILLA", precio: 233.00, stock: 1, categoria_id: 46, marca: "Epson", descripcion: "TINTA EPSON 544 AMARILLA" },
    { clave: "010343941984", nombre: "TINTA EPSON 544 CYAN", precio: 233.00, stock: 3, categoria_id: 46, marca: "Epson", descripcion: "TINTA EPSON 544 CYAN" },
    { clave: "010343941991", nombre: "TINTA EPSON 544 MAGENTA", precio: 233.00, stock: 3, categoria_id: 46, marca: "Epson", descripcion: "TINTA EPSON 544 MAGENTA" },
    { clave: "010343941977", nombre: "TINTA EPSON 544 NEGRO", precio: 233.00, stock: 2, categoria_id: 46, marca: "Epson", descripcion: "TINTA EPSON 544 NEGRO" },
    { clave: "010343885325", nombre: "TINTA EPSON 664 AMARILLO", precio: 234.00, stock: 3, categoria_id: 46, marca: "Epson", descripcion: "TINTA EPSON 664 AMARILLO" },
    { clave: "010343885301", nombre: "TINTA EPSON 664 CYAN", precio: 234.00, stock: 4, categoria_id: 46, marca: "Epson", descripcion: "TINTA EPSON 664 CYAN" },
    { clave: "010343885318", nombre: "TINTA EPSON 664 MAGENTA", precio: 234.00, stock: 3, categoria_id: 46, marca: "Epson", descripcion: "TINTA EPSON 664 MAGENTA" },
    { clave: "010343885295", nombre: "TINTA EPSON 664 NEGRA", precio: 235.00, stock: 2, categoria_id: 46, marca: "Epson", descripcion: "TINTA EPSON 664 NEGRA" },
    { clave: "MULSIN55225", nombre: "TINTA GENERICA 1L AMARILLA", precio: 480.00, stock: 6, categoria_id: 50, marca: "Genérico", descripcion: "TINTA GENERICA 1L AMARILLA" },
    { clave: "MOORIN187", nombre: "TINTA GENERICA 1L CYAN", precio: 480.00, stock: 2, categoria_id: 50, marca: "Genérico", descripcion: "TINTA GENERICA 1L CYAN" },
    { clave: "MOORIN12345", nombre: "TINTA GENERICA 1L MAGENTA", precio: 460.00, stock: 2, categoria_id: 50, marca: "Genérico", descripcion: "TINTA GENERICA 1L MAGENTA" },
    { clave: "MOORIN123", nombre: "TINTA GENERICA 1L NEGRA", precio: 450.00, stock: 9, categoria_id: 50, marca: "Genérico", descripcion: "TINTA GENERICA 1L NEGRA" },
    { clave: "8016040402386", nombre: "TINTA GENERICA AMARILLA 1/8", precio: 680.00, stock: 1, categoria_id: 50, marca: "Genérico", descripcion: "TINTA GENERICA AMARILLA 1/8" },
    { clave: "8803663002761", nombre: "TINTA GENERICA CIAN 1L", precio: 360.00, stock: 2, categoria_id: 50, marca: "Genérico", descripcion: "TINTA GENERICA CIAN 1L" },
    { clave: "192545527583", nombre: "TINTA HP GT53 NEGRO", precio: 217.00, stock: 1, categoria_id: 45, marca: "HP", descripcion: "TINTA HP GT53 NEGRO" },
    { clave: "54515", nombre: "TINTA PARA SELLO STAFFORD COLOR NEGRO 60ML", precio: 33.00, stock: 1, categoria_id: 27, marca: "Stafford", descripcion: "TINTA PARA SELLO STAFFORD COLOR NEGRO 60ML" },
    { clave: "CONCON78389", nombre: "TONER 105A COMPATIBLE", precio: 600.00, stock: 5, categoria_id: 51, marca: "Genérico", descripcion: "TONER 105A COMPATIBLE" },
    { clave: "7502281800377", nombre: "TONER 12A COMPATIBLE", precio: 230.00, stock: 1, categoria_id: 51, marca: "Genérico", descripcion: "TONER 12A COMPATIBLE" },
    { clave: "7502281800254", nombre: "TONER 226A COMPATIBLE", precio: 313.00, stock: 2, categoria_id: 51, marca: "Genérico", descripcion: "TONER 226A COMPATIBLE" },
    { clave: "CONCON78036", nombre: "TONER 258A SIN CHIP", precio: 600.00, stock: 5, categoria_id: 51, marca: "Genérico", descripcion: "TONER 258A SIN CHIP" }
];

async function run() {
    try {
        console.log("Insertando segunda tanda de productos solicitados por el usuario...");
        let insertados = 0;
        let actualizados = 0;

        for (const p of products) {
            // Verificar si ya existe un producto con la misma clave
            const [existing] = await db.query("SELECT id FROM productos WHERE clave = ?", [p.clave]);
            
            if (existing.length > 0) {
                // Actualizar
                await db.query(
                    "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, categoria_id = ?, marca = ?, estado = 'activo' WHERE clave = ?",
                    [p.nombre, p.descripcion, p.precio, p.stock, p.categoria_id, p.marca, p.clave]
                );
                console.log(`[ACTUALIZADO] ${p.nombre} (Clave: ${p.clave})`);
                actualizados++;
            } else {
                // Insertar
                await db.query(
                    "INSERT INTO productos (nombre, clave, descripcion, precio, stock, categoria_id, marca, estado) VALUES (?, ?, ?, ?, ?, ?, ?, 'activo')",
                    [p.nombre, p.clave, p.descripcion, p.precio, p.stock, p.categoria_id, p.marca]
                );
                console.log(`[INSERTADO] ${p.nombre} (Clave: ${p.clave})`);
                insertados++;
            }
        }
        console.log(`¡Proceso terminado! Insertados: ${insertados}, Actualizados: ${actualizados}`);
    } catch (err) {
        console.error("Error al procesar productos:", err);
    } finally {
        process.exit();
    }
}

run();
