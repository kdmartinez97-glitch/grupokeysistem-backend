const db = require('../config/db');

async function run() {
    try {
        // 1. Buscar o crear la categoría "Proyectores" bajo "Tecnología" (ID: 52)
        const [existing] = await db.query("SELECT id FROM categorias WHERE nombre = 'Proyectores'");
        let categoryId;
        if (existing.length > 0) {
            categoryId = existing[0].id;
            console.log("Categoría 'Proyectores' ya existe con ID:", categoryId);
        } else {
            const [result] = await db.query(
                "INSERT INTO categorias (nombre, descripcion, parent_id) VALUES (?, ?, ?)",
                ["Proyectores", "Proyectores y accesorios de proyección", 52]
            );
            categoryId = result.insertId;
            console.log("Categoría 'Proyectores' creada con ID:", categoryId);
        }

        // 2. Definir los productos a insertar
        const products = [
            {
                nombre: "Videoproyector Epson PowerLite E24, 3LCD, 3,600 lúmenes, HDMI",
                descripcion: "Proyector Epson PowerLite E24, 3LCD, XGA, 3,600 lúmenes, HDMI, ideal para aulas pequeñas y medianas.",
                precio: 12500,
                stock: 10,
                categoria_id: categoryId,
                marca: "Epson",
                imagen_url: null,
                imagenes: "[]",
                estado: "activo"
            },
            {
                nombre: "Proyector de uso multiple, 4000 ANSI Lúmenes",
                descripcion: "Proyector de uso multiple Entradas/Salidas: HDMI, VGA, Audio, USB Ttipo A, USB Tipo miniB, Peso: 2.3 kg, Consumo de energia de 260 W, 30 Idiomas",
                precio: 10199,
                stock: 10,
                categoria_id: categoryId,
                marca: "Genérico",
                imagen_url: null,
                imagenes: "[]",
                estado: "activo"
            },
            {
                nombre: "Proyector Benq Mw560c Wxga Hdmi, Bocina 10w, Tecnología SmartEcO",
                descripcion: "Proyector Benq Mw560c Wxga 1280x800, Dlp, 4000 ANSI Lúmenes, Alto Contraste 20,000 1, Hdmi, Bocina",
                precio: 11199,
                stock: 10,
                categoria_id: categoryId,
                marca: "BenQ",
                imagen_url: null,
                imagenes: "[]",
                estado: "activo"
            }
        ];

        // 3. Insertar productos
        for (const prod of products) {
            const [insertResult] = await db.query(
                "INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id, marca, imagen_url, imagenes, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [prod.nombre, prod.descripcion, prod.precio, prod.stock, prod.categoria_id, prod.marca, prod.imagen_url, prod.imagenes, prod.estado]
            );
            console.log(`Producto "${prod.nombre}" insertado con ID: ${insertResult.insertId}`);
        }

    } catch (e) {
        console.error("Error al insertar los proyectores:", e);
    } finally {
        process.exit();
    }
}

run();
