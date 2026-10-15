const db = require('../config/db');

const newProducts = [
    {
        clave: "840030703447",
        nombre: "ADAPTADOR BLUETOOH",
        descripcion: "Adaptador bluetooth USB para PC/Laptop. Clave: 840030703447",
        precio: 340.00,
        stock: 10,
        categoria_id: 78,
        marca: "Genérico"
    },
    {
        clave: "ZJT.35",
        nombre: "ADAPTADOR HDMI A VGA S/AUDIO LITOY",
        descripcion: "Adaptador HDMI a VGA sin audio marca Litoy. Clave: ZJT.35",
        precio: 216.00,
        stock: 8,
        categoria_id: 78,
        marca: "Litoy"
    },
    {
        clave: "845973050719",
        nombre: "ADAPTADOR INALAMBRICO NANO USB TL-WN725N",
        descripcion: "Adaptador inalámbrico Nano USB TP-Link TL-WN725N. Clave: 845973050719",
        precio: 160.00,
        stock: 3,
        categoria_id: 78,
        marca: "TP-Link"
    },
    {
        clave: "TECSIN71971",
        nombre: "ADAPTADOR MICRO-SD CARD READER",
        descripcion: "Lector de tarjetas de memoria Micro-SD. Clave: TECSIN71971",
        precio: 35.00,
        stock: 2,
        categoria_id: 78,
        marca: "Genérico"
    },
    {
        clave: "ADAPTADOR MULTI",
        nombre: "ADAPTADOR MULTI HUB RJ45, USB, C, HDMI LITOY",
        descripcion: "Hub multi adaptador RJ45, USB, Tipo C, HDMI Litoy. Clave: ADAPTADOR MULTI",
        precio: 360.00,
        stock: 1,
        categoria_id: 78,
        marca: "Litoy"
    },
    {
        clave: "SHWN80242",
        nombre: "ADAPTADOR OTG TIPO C A ENTRADA USB",
        descripcion: "Adaptador OTG USB Tipo C a entrada USB hembra. Clave: SHWN80242",
        precio: 70.00,
        stock: 13,
        categoria_id: 78,
        marca: "Genérico"
    },
    {
        clave: "ADATADOR",
        nombre: "ADAPTADOR RJ45 A TIPO C",
        descripcion: "Adaptador de red RJ45 ethernet a puerto Tipo C. Clave: ADATADOR",
        precio: 195.00,
        stock: 3,
        categoria_id: 78,
        marca: "Genérico"
    },
    {
        clave: "00-USB-RJ45",
        nombre: "ADAPTADOR RJ45 A USB LITOY",
        descripcion: "Adaptador de red RJ45 ethernet a puerto USB Litoy. Clave: 00-USB-RJ45",
        precio: 160.00,
        stock: 26,
        categoria_id: 78,
        marca: "Litoy"
    },
    {
        clave: "7503028372010",
        nombre: "ADAPTADOR TIPO JACK",
        descripcion: "Adaptador tipo Jack de corriente o audio. Clave: 7503028372010",
        precio: 6.50,
        stock: 4,
        categoria_id: 78,
        marca: "Genérico"
    },
    {
        clave: "ADAPTADOR VGA-HDMI",
        nombre: "ADAPTADOR VGA-HDMI",
        descripcion: "Adaptador convertidor de VGA a HDMI. Clave: ADAPTADOR VGA-HDMI",
        precio: 249.00,
        stock: 2,
        categoria_id: 78,
        marca: "Genérico"
    },
    {
        clave: "7501483147860",
        nombre: "AIRE COMPRIMIDO",
        descripcion: "Lata de aire comprimido para limpieza de equipos. Clave: 7501483147860",
        precio: 130.00,
        stock: 9,
        categoria_id: 95,
        marca: "Genérico"
    },
    {
        clave: "120",
        nombre: "ALCOHOL ISOPROPILICO 1L NAZA",
        descripcion: "Alcohol isopropílico de 1 litro marca Naza. Clave: 120",
        precio: 180.00,
        stock: 4,
        categoria_id: 95,
        marca: "Naza"
    },
    {
        clave: "4655312165",
        nombre: "ALCOHOL ISOPROPILICO DESTEC",
        descripcion: "Alcohol isopropílico marca Destec. Clave: 4655312165",
        precio: 180.00,
        stock: 1,
        categoria_id: 95,
        marca: "Destec"
    },
    {
        clave: "PAPPAP42276",
        nombre: "ALMOADILLAS PARA EPSON L120",
        descripcion: "Almohadillas de desecho de tinta para impresora Epson L120. Clave: PAPPAP42276",
        precio: 90.00,
        stock: 7,
        categoria_id: 58,
        marca: "Epson"
    },
    {
        clave: "MULSIN82446",
        nombre: "ALMOADILLAS PARA EPSON L3150",
        descripcion: "Almohadillas de desecho de tinta para impresora Epson L3150. Clave: MULSIN82446",
        precio: 310.00,
        stock: 1,
        categoria_id: 58,
        marca: "Epson"
    },
    {
        clave: "MULSIN83556",
        nombre: "ALMOHADILLA CANON G3111",
        descripcion: "Almohadilla de desecho de tinta para impresora Canon G3111. Clave: MULSIN83556",
        precio: 360.00,
        stock: 1,
        categoria_id: 58,
        marca: "Canon"
    },
    {
        clave: "TECSIN88594",
        nombre: "ALMOHADILLA ORIGINAL EPSON L4150",
        descripcion: "Almohadilla original de desecho de tinta para impresora Epson L4150. Clave: TECSIN88594",
        precio: 300.00,
        stock: 1,
        categoria_id: 58,
        marca: "Epson"
    },
    {
        clave: "TECTEC57422",
        nombre: "ALMOHADILLAS 310",
        descripcion: "Almohadillas para impresora modelo 310. Clave: TECTEC57422",
        precio: 310.00,
        stock: 5,
        categoria_id: 58,
        marca: "Genérico"
    },
    {
        clave: "510W",
        nombre: "ALMOHADILLAS BROTHER 510W",
        descripcion: "Almohadillas de desecho de tinta para impresora Brother 510W. Clave: 510W",
        precio: 660.00,
        stock: 1,
        categoria_id: 58,
        marca: "Brother"
    },
    {
        clave: "1254876521456",
        nombre: "ALMOHADILLAS CANON G2111",
        descripcion: "Almohadillas de desecho de tinta para impresora Canon G2111. Clave: 1254876521456",
        precio: 400.00,
        stock: 2,
        categoria_id: 58,
        marca: "Canon"
    },
    {
        clave: "MULSIN63420",
        nombre: "ALMOHADILLAS EPSON L210",
        descripcion: "Almohadillas de desecho de tinta para impresora Epson L210. Clave: MULSIN63420",
        precio: 310.00,
        stock: 4,
        categoria_id: 58,
        marca: "Epson"
    },
    {
        clave: "CONCON15302",
        nombre: "ALMOHADILLAS EPSON L3251",
        descripcion: "Almohadillas de desecho de tinta para impresora Epson L3251. Clave: CONCON15302",
        precio: 350.00,
        stock: 2,
        categoria_id: 58,
        marca: "Epson"
    },
    {
        clave: "EPSON L380",
        nombre: "ALMOHADILLAS EPSON L380",
        descripcion: "Almohadillas de desecho de tinta para impresora Epson L380. Clave: EPSON L380",
        precio: 310.00,
        stock: 2,
        categoria_id: 58,
        marca: "Epson"
    },
    {
        clave: "CON0789456",
        nombre: "ALMOHADILLAS EPSON L805",
        descripcion: "Almohadillas de desecho de tinta para impresora Epson L805. Clave: CON0789456",
        precio: 380.00,
        stock: 1,
        categoria_id: 58,
        marca: "Epson"
    },
    {
        clave: "MULSIN57480",
        nombre: "ALMOHADILLAS PARA CANON G4100",
        descripcion: "Almohadillas de desecho de tinta para impresora Canon G4100. Clave: MULSIN57480",
        precio: 400.00,
        stock: 2,
        categoria_id: 58,
        marca: "Canon"
    },
    {
        clave: "7032079'43",
        nombre: "ALMOHADILLAS PARA EPSON L355",
        descripcion: "Almohadillas de desecho de tinta para impresora Epson L355. Clave: 7032079'43",
        precio: 350.00,
        stock: 1,
        categoria_id: 58,
        marca: "Epson"
    },
    {
        clave: "CONCON23018",
        nombre: "ALMOHADILLAS PARA EPSON L575",
        descripcion: "Almohadillas de desecho de tinta para impresora Epson L575. Clave: CONCON23018",
        precio: 430.00,
        stock: 2,
        categoria_id: 58,
        marca: "Epson"
    },
    {
        clave: "1236",
        nombre: "ALMOHADILLAS PARA IMPRESORA 3110",
        descripcion: "Almohadillas de desecho de tinta para impresora 3110. Clave: 1236",
        precio: 230.00,
        stock: 3,
        categoria_id: 58,
        marca: "Genérico"
    },
    {
        clave: "3444554",
        nombre: "Cargador HP Centrino",
        descripcion: "Cargador para laptop HP Centrino. Clave: 3444554",
        precio: 450.00,
        stock: 2,
        categoria_id: 78,
        marca: "HP"
    },
    {
        clave: "07503051174438",
        nombre: "AUXILIAR USB",
        descripcion: "Cable o conector auxiliar USB. Clave: 07503051174438",
        precio: 100.00,
        stock: 2,
        categoria_id: 78,
        marca: "Genérico"
    },
    {
        clave: "7891040204199",
        nombre: "BANDERITAS ADESIVAS FLECHA POST IT PRIMARIOS 5 BLOCKS",
        descripcion: "Banderitas adhesivas tipo flecha Post-It colores primarios, 5 blocks. Clave: 7891040204199",
        precio: 64.00,
        stock: 6,
        categoria_id: 2,
        marca: "Post-it"
    },
    {
        clave: "7506086600712",
        nombre: "BATERIA DE LITIO AMITZU",
        descripcion: "Batería de litio marca Amitzu. Clave: 7506086600712",
        precio: 35.00,
        stock: 2,
        categoria_id: 78,
        marca: "Amitzu"
    },
    {
        clave: "7502285230026",
        nombre: "BICOLOR GRUESO",
        descripcion: "Lápiz bicolor grueso. Clave: 7502285230026",
        precio: 70.00,
        stock: 12,
        categoria_id: 4,
        marca: "Genérico"
    },
    {
        clave: "MULSIN95143",
        nombre: "BICOLOR GRUESO TRIANGULAR BUFFY",
        descripcion: "Lápiz bicolor grueso triangular marca Buffy. Clave: MULSIN95143",
        precio: 7.50,
        stock: 9,
        categoria_id: 4,
        marca: "Buffy"
    },
    {
        clave: "7503002370353",
        nombre: "BLOCK COTRARECIBO 50 H",
        descripcion: "Block de contrarecibo con 50 hojas. Clave: 7503002370353",
        precio: 10.00,
        stock: 3,
        categoria_id: 3,
        marca: "Genérico"
    },
    {
        clave: "7502005865224",
        nombre: "BLOCK SQUELA 50 H",
        descripcion: "Block esquela con 50 hojas. Clave: 7502005865224",
        precio: 13.00,
        stock: 3,
        categoria_id: 3,
        marca: "Genérico"
    },
    {
        clave: "PAPPAP43733",
        nombre: "BOLIGRAFO SAIRA GEL NEGRO CRISTAL PIEZA",
        descripcion: "Bolígrafo Saira Gel color negro cristal, por pieza. Clave: PAPPAP43733",
        precio: 105.63,
        stock: 2,
        categoria_id: 5,
        marca: "Saira"
    },
    {
        clave: "7501174953428",
        nombre: "BOLIGRAFO BACO LE PLUME AZUL, PUNTO MEDIO",
        descripcion: "Bolígrafo Baco Le Plume color azul, punto medio. Clave: 7501174953428",
        precio: 49.00,
        stock: 4,
        categoria_id: 5,
        marca: "Baco"
    },
    {
        clave: "072838315540",
        nombre: "BOLIGRAFO FINO FRIXION BALL AZUL C/2PZ",
        descripcion: "Bolígrafo fino Frixion Ball color azul, paquete con 2 piezas. Clave: 072838315540",
        precio: 117.00,
        stock: 2,
        categoria_id: 5,
        marca: "Pilot"
    }
];

async function run() {
    try {
        // Obtener todos los productos actuales
        const [existing] = await db.query("SELECT nombre FROM productos");
        const existingNames = new Set(existing.map(p => p.nombre.toLowerCase().trim()));

        console.log(`Productos existentes en BD: ${existingNames.size}`);

        let insertedCount = 0;
        let skippedCount = 0;

        for (const prod of newProducts) {
            const normalizedNewName = prod.nombre.toLowerCase().trim();
            
            // Verificar si hay coincidencias exactas o muy similares en el nombre
            let isDuplicate = false;
            
            // Comprobación simple
            if (existingNames.has(normalizedNewName)) {
                isDuplicate = true;
            } else {
                // Comprobación por subcadena
                for (const existingName of existingNames) {
                    if (existingName.includes(normalizedNewName) || normalizedNewName.includes(existingName)) {
                        isDuplicate = true;
                        break;
                    }
                }
            }

            if (isDuplicate) {
                console.log(`[DUPLICADO] Omitiendo producto: "${prod.nombre}"`);
                skippedCount++;
            } else {
                console.log(`[NUEVO] Insertando producto: "${prod.nombre}" por $${prod.precio}`);
                
                const query = `
                    INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id, marca, estado, imagenes, imagen_url) 
                    VALUES (?, ?, ?, ?, ?, ?, 'activo', '[]', '')
                `;
                
                await db.query(query, [
                    prod.nombre,
                    prod.descripcion,
                    prod.precio,
                    prod.stock,
                    prod.categoria_id,
                    prod.marca
                ]);
                
                insertedCount++;
            }
        }

        console.log(`\nInserción finalizada.`);
        console.log(`Insertados: ${insertedCount}`);
        console.log(`Omitidos por duplicados: ${skippedCount}`);

    } catch (e) {
        console.error("Error durante la inserción:", e);
    } finally {
        process.exit();
    }
}

run();
