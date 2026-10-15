const db = require('../config/db');

const products = [
    { clave: "TECTEC80638", nombre: "CABLE UTP XCASE SENCILLO METRO", precio: 8.00, stock: 73, categoria_id: 68, marca: "Xcase", descripcion: "CABLE UTP XCASE SENCILLO METRO" },
    { clave: "TECTEC54459", nombre: "CABLE V8 3 MTS REFORZADO", precio: 55.00, stock: 1, categoria_id: 80, marca: "Genérico", descripcion: "CABLE V8 3 MTS REFORZADO" },
    { clave: "TECSIN30981", nombre: "CABLE VGA 1.5", precio: 50.00, stock: 6, categoria_id: 81, marca: "Genérico", descripcion: "CABLE VGA 1.5" },
    { clave: "TECTEC80431", nombre: "CABLE VGA 1.5MTS LITOY", precio: 100.00, stock: 2, categoria_id: 81, marca: "Litoy", descripcion: "CABLE VGA 1.5MTS LITOY" },
    { clave: "TECTEC44638", nombre: "CABLE VGA M-M 15 MTS XCASE", precio: 750.00, stock: 1, categoria_id: 81, marca: "Xcase", descripcion: "CABLE VGA M-M 15 MTS XCASE" },
    { clave: "7503022355743", nombre: "CABLE VORAGO DISPLAYPORT MACHO", precio: 350.00, stock: 1, categoria_id: 78, marca: "Vorago", descripcion: "CABLE VORAGO DISPLAYPORT MACHO" },
    { clave: "7501428729793", nombre: "CAJA DE BOLIGRAFO PIN POINT ULTRAFINO 0.5MM NEGRO", precio: 69.50, stock: 1, categoria_id: 5, marca: "Pin Point", descripcion: "CAJA DE BOLIGRAFO PIN POINT ULTRAFINO 0.5MM NEGRO" },
    { clave: "023942974888", nombre: "CAJA DE CD-R VERBATIN C/50", precio: 405.69, stock: 1, categoria_id: 61, marca: "Verbatim", descripcion: "CAJA DE CD-R VERBATIN C/50" },
    { clave: "7501428727201", nombre: "CAJA DE LAPICERO AZUL PIN POINT P. FINO", precio: 62.00, stock: 1, categoria_id: 10, marca: "Pin Point", descripcion: "CAJA DE LAPICERO AZUL PIN POINT P. FINO" },
    { clave: "TECTEC12467", nombre: "CAJA DE MANTENIMIENTO EPSON L6270 ORIGINAL", precio: 750.00, stock: 1, categoria_id: 46, marca: "Epson", descripcion: "CAJA DE MANTENIMIENTO EPSON L6270 ORIGINAL" },
    { clave: "CAJA PAPEL FOTOBONG", nombre: "CAJA PAPEL FOTOBONG", precio: 700.00, stock: 9, categoria_id: 31, marca: "Fotobong", descripcion: "CAJA PAPEL FOTOBONG" },
    { clave: "PAPPAP75007", nombre: "CAJA ROLLO TERMICO 57*60 C/50 PZ", precio: 1200.00, stock: 1, categoria_id: 38, marca: "Genérico", descripcion: "CAJA ROLLO TERMICO 57*60 C/50 PZ" },
    { clave: "PAPPAP81643", nombre: "CAJA ROLLO TERMICO 80*70MM C/50 PZAS", precio: 1250.00, stock: 2, categoria_id: 38, marca: "Genérico", descripcion: "CAJA ROLLO TERMICO 80*70MM C/50 PZAS" },
    { clave: "7501214978077", nombre: "CALCULADORA DE ESCRITORIO", precio: 180.00, stock: 1, categoria_id: 20, marca: "Genérico", descripcion: "CALCULADORA DE ESCRITORIO" },
    { clave: "TEC012345", nombre: "CARGADOR ASUS 19V 2.34A PUNTA MEDIANA MOD. W19-045N3A", precio: 380.00, stock: 4, categoria_id: 136, marca: "Asus", descripcion: "CARGADOR ASUS 19V 2.34A PUNTA MEDIANA MOD. W19-045N3A" },
    { clave: "TECTEC18316", nombre: "CARGADOR ASUS 19V-3.42A PUNTA AGUJA", precio: 380.00, stock: 3, categoria_id: 136, marca: "Asus", descripcion: "CARGADOR ASUS 19V-3.42A PUNTA AGUJA" },
    { clave: "TECTEC13171", nombre: "CARGADOR ASUS PUNTA CENTRUINO 19V-3.47A", precio: 650.00, stock: 4, categoria_id: 136, marca: "Asus", descripcion: "CARGADOR ASUS PUNTA CENTRUINO 19V-3.47A" },
    { clave: "MULSIN84543", nombre: "CARGADOR DELL 19.5V-3.34A ORIGINAL CENTRINO", precio: 950.00, stock: 2, categoria_id: 134, marca: "Dell", descripcion: "CARGADOR DELL 19.5V-3.34A ORIGINAL CENTRINO" },
    { clave: "8552154877551", nombre: "CARGADOR DELL CENTRINO", precio: 300.00, stock: 2, categoria_id: 134, marca: "Dell", descripcion: "CARGADOR DELL CENTRINO" },
    { clave: "7503030727174", nombre: "CARGADOR DELL TIPO C", precio: 520.00, stock: 4, categoria_id: 134, marca: "Dell", descripcion: "CARGADOR DELL TIPO C" },
    { clave: "46584765847", nombre: "CARGADOR HP 19V-1.58A PUNTA AGUJA", precio: 370.00, stock: 1, categoria_id: 133, marca: "HP", descripcion: "CARGADOR HP 19V-1.58A PUNTA AGUJA" },
    { clave: "TECTEC39119", nombre: "CARGADOR HP BALA 19V-4.74A", precio: 350.00, stock: 1, categoria_id: 133, marca: "HP", descripcion: "CARGADOR HP BALA 19V-4.74A" },
    { clave: "CARHP", nombre: "CARGADOR HP PUNTA AZUL", precio: 380.00, stock: 4, categoria_id: 133, marca: "HP", descripcion: "CARGADOR HP PUNTA AZUL" },
    { clave: "TECTEC69675", nombre: "CARGADOR SAMSUNG 19.5V-3.15A PUNTA CENTRINO", precio: 395.00, stock: 3, categoria_id: 137, marca: "Samsung", descripcion: "CARGADOR SAMSUNG 19.5V-3.15A PUNTA CENTRINO" },
    { clave: "110033", nombre: "CARGADOR TOSHIBA 19V-6.3A", precio: 525.00, stock: 1, categoria_id: 132, marca: "Toshiba", descripcion: "CARGADOR TOSHIBA 19V-6.3A" },
    { clave: "078787122192", nombre: "CARPETA DE PALANCA OXFORD", precio: 60.75, stock: 3, categoria_id: 21, marca: "Oxford", descripcion: "CARPETA DE PALANCA OXFORD" },
    { clave: "PAPPAP80904", nombre: "CARPETA LEFORT OFICIO MARMOLEADO", precio: 82.00, stock: 5, categoria_id: 21, marca: "Lefort", descripcion: "CARPETA LEFORT OFICIO MARMOLEADO" },
    { clave: "CARPETA PANORAMICA #5", nombre: "CARPETA PANORAMICA #5", precio: 489.93, stock: 1, categoria_id: 21, marca: "Genérico", descripcion: "CARPETA PANORAMICA #5" },
    { clave: "7501015163641", nombre: "CARPETA PANORAMICA BLANCA 5\" DIETRIX T/C", precio: 163.00, stock: 1, categoria_id: 21, marca: "Dietrix", descripcion: "CARPETA PANORAMICA BLANCA 5\" DIETRIX T/C" },
    { clave: "7502282085926", nombre: "CARPETA PANORAMICA DE 5\" 10.2 CM", precio: 195.00, stock: 15, categoria_id: 21, marca: "Genérico", descripcion: "CARPETA PANORAMICA DE 5\" 10.2 CM" },
    { clave: "895638754", nombre: "CARPETA PANORAMICA ECONOMICA CARDINAL 3\"", precio: 88.00, stock: 15, categoria_id: 21, marca: "Cardinal", descripcion: "CARPETA PANORAMICA ECONOMICA CARDINAL 3\"" },
    { clave: "7502282085698", nombre: "CARPETA PANORAMICA KYMA 4\"", precio: 170.00, stock: 13, categoria_id: 21, marca: "Kyma", descripcion: "CARPETA PANORAMICA KYMA 4\"" },
    { clave: "078787010048", nombre: "CARPETA PANORAMICA OXFORD 3\"", precio: 98.00, stock: 1, categoria_id: 21, marca: "Oxford", descripcion: "CARPETA PANORAMICA OXFORD 3\"" },
    { clave: "193015522459", nombre: "CARTUCHO HP 667 NEGRO", precio: 326.67, stock: 4, categoria_id: 45, marca: "HP", descripcion: "CARTUCHO HP 667 NEGRO" },
    { clave: "193015522435", nombre: "CARTUCHO HP 667 TRICOLOR", precio: 350.00, stock: 1, categoria_id: 45, marca: "HP", descripcion: "CARTUCHO HP 667 TRICOLOR" },
    { clave: "889296597148", nombre: "CARTUCHO HP NEGRO 664", precio: 320.00, stock: 2, categoria_id: 45, marca: "HP", descripcion: "CARTUCHO HP NEGRO 664" },
    { clave: "889296597124", nombre: "CARTUCHO HP TRICOLOR 664", precio: 242.42, stock: 2, categoria_id: 45, marca: "HP", descripcion: "CARTUCHO HP TRICOLOR 664" },
    { clave: "CON70877", nombre: "CARTUCHO HP TRICOLOR 664 GENERICO", precio: 280.00, stock: 1, categoria_id: 50, marca: "Genérico", descripcion: "CARTUCHO HP TRICOLOR 664 GENERICO" }
];

async function run() {
    try {
        console.log("Insertando productos solicitados por el usuario...");
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
