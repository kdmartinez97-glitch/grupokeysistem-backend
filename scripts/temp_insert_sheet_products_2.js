const db = require('../config/db');

const products = [
    { clave: "4556522525", nombre: "BOLIGRAFO FINO PIN POINT 0.7 MM", precio: 63.00, stock: 1, marca: "Pin Point", categoria_id: 5, descripcion: "Bolígrafo fino pin point 0.7 mm." },
    { clave: "071641187764", nombre: "BOLIGRAFO KILOMETRICO AZUL PUNTA MEDIA PAPER MATE", precio: 29.00, stock: 2, marca: "Paper Mate", categoria_id: 5, descripcion: "Bolígrafo kilométrico azul punta media Paper Mate." },
    { clave: "071641204249", nombre: "BOLIGRAFO KILOMETRICO NEGRO PUNTA FINA 0.7MM PAPER MATE", precio: 39.70, stock: 1, marca: "Paper Mate", categoria_id: 5, descripcion: "Bolígrafo kilométrico negro punta fina 0.7mm Paper Mate." },
    { clave: "071641187788", nombre: "BOLIGRAFO PAPER MATE KILOMETRICO NEGRO C/12", precio: 40.00, stock: 2, marca: "Paper Mate", categoria_id: 5, descripcion: "Bolígrafo Paper Mate kilométrico negro caja con 12 piezas." },
    { clave: "7501428727195", nombre: "BOLIGRAFO PIN POINT FINO-A NEGRO C/12", precio: 64.00, stock: 1, marca: "Pin Point", categoria_id: 5, descripcion: "Bolígrafo Pin Point fino negro caja con 12 piezas." },
    { clave: "PAPPAP47792", nombre: "BOLIGRAFO SAIRA GEL AZUL CRISTAL PZA", precio: 5.00, stock: 3, marca: "Saira", categoria_id: 5, descripcion: "Bolígrafo Saira gel azul cristal pieza." },
    { clave: "8906050365408", nombre: "BOLIGRAFO SAIRA NEGRO PUNTO MEDIANO", precio: 35.00, stock: 2, marca: "Saira", categoria_id: 5, descripcion: "Bolígrafo Saira negro punto mediano." },
    { clave: "8906050365392", nombre: "BOLIGRAFO SAIRA PUNTO MEDIANO AZUL", precio: 37.43, stock: 9, marca: "Saira", categoria_id: 5, descripcion: "Bolígrafo Saira punto mediano azul." },
    { clave: "723707983178", nombre: "BOLSA CONECTORES RJ45", precio: 190.00, stock: 2, marca: "Genérico", categoria_id: 68, descripcion: "Bolsa de conectores RJ45 para cable de red." },
    { clave: "RJ45", nombre: "BOLSA DE CONECTORES RJ45", precio: 270.00, stock: 5, marca: "Genérico", categoria_id: 68, descripcion: "Bolsa de conectores RJ45 para red ethernet." },
    { clave: "PAPPAP79451", nombre: "BROCHE BACO PZA", precio: 3.00, stock: 15, marca: "Baco", categoria_id: 21, descripcion: "Broche metálico para archivo marca Baco pieza." },
    { clave: "7501174913033", nombre: "BROCHE METALICO PARA ARCHIVO BACO", precio: 87.00, stock: 1, marca: "Baco", categoria_id: 21, descripcion: "Broche metálico para archivo Baco." },
    { clave: "193905505210", nombre: "CABEZAL HP M0H51AL NEGRO", precio: 979.89, stock: 1, marca: "HP", categoria_id: 58, descripcion: "Cabezal de impresión HP M0H51AL negro." },
    { clave: "CABLES DIFERENTES", nombre: "CABLE 3.5 A CANON H", precio: 350.00, stock: 2, marca: "Genérico", categoria_id: 78, descripcion: "Cable de audio 3.5mm a Canon hembra." },
    { clave: "6974368776034", nombre: "CABLE 1 METRO TIPO C-3A 1HORA", precio: 50.00, stock: 3, marca: "1Hora", categoria_id: 80, descripcion: "Cable de 1 metro USB a tipo C de carga rápida 3A." },
    { clave: "CABLE", nombre: "CABLE ADAPTADOR HDTV CABLE 4K", precio: 200.00, stock: 2, marca: "Genérico", categoria_id: 78, descripcion: "Cable adaptador HDTV compatible con resolución 4K." },
    { clave: "MULSIN30283", nombre: "CABLE AUDIO 3.5 A 3.5", precio: 45.00, stock: 4, marca: "Genérico", categoria_id: 78, descripcion: "Cable de audio auxiliar con conectores jack 3.5mm macho a macho." },
    { clave: "TECTEC81818", nombre: "CABLE BIFASICO DE CORRIENTE", precio: 100.00, stock: 6, marca: "Genérico", categoria_id: 78, descripcion: "Cable bifásico de corriente para equipos electrónicos." },
    { clave: "7502264257051", nombre: "CABLE DE AUDIO 1.8M TKA", precio: 45.00, stock: 2, marca: "TKA", categoria_id: 78, descripcion: "Cable de audio de 1.8 metros." },
    { clave: "TECTEC73332", nombre: "CABLE DISPLAYPORT V. 1.4 1METRO", precio: 300.00, stock: 2, marca: "Genérico", categoria_id: 78, descripcion: "Cable DisplayPort versión 1.4 de 1 metro." },
    { clave: "66623333631", nombre: "CABLE EXTENSOR USB V 2.0 1.80 MT", precio: 180.00, stock: 1, marca: "Genérico", categoria_id: 80, descripcion: "Cable extensor USB versión 2.0 de 1.80 metros." },
    { clave: "723707986483", nombre: "CABLE HDMI - HDMI 3MTS", precio: 250.00, stock: 5, marca: "Genérico", categoria_id: 79, descripcion: "Cable digital de alta definición HDMI a HDMI de 3 metros." },
    { clave: "TECTEC99284", nombre: "CABLE HDMI 20 MTRS LITOY", precio: 600.00, stock: 1, marca: "Litoy", categoria_id: 79, descripcion: "Cable HDMI de largo alcance de 20 metros Litoy." },
    { clave: "TECTEC36351", nombre: "CABLE HDMI 7.5 MTS", precio: 270.00, stock: 2, marca: "Genérico", categoria_id: 79, descripcion: "Cable de conexión HDMI de 7.5 metros." },
    { clave: "HDMIE'1500", nombre: "CABLE HDMI DE 15 METROS", precio: 560.00, stock: 1, marca: "Genérico", categoria_id: 79, descripcion: "Cable HDMI de 15 metros." },
    { clave: "TECTEC68520", nombre: "CABLE HDMI MACHO A HEMBRA", precio: 225.00, stock: 1, marca: "Genérico", categoria_id: 79, descripcion: "Cable de extensión HDMI macho a hembra." },
    { clave: "3. CABLE IMPRE", nombre: "CABLE PARA IMPRESORA 3M LITOY", precio: 140.00, stock: 5, marca: "Litoy", categoria_id: 78, descripcion: "Cable USB para conexión de impresora de 3 metros." },
    { clave: "5. CABLE IMPRE", nombre: "CABLE PARA IMPRESORA 5MTR LITOY", precio: 180.00, stock: 1, marca: "Litoy", categoria_id: 78, descripcion: "Cable USB para conexión de impresora de 5 metros." },
    { clave: "CABLESATAPC", nombre: "CABLE SATA DE DATOS PARA PC INTERNO MANHATTAN", precio: 160.00, stock: 1, marca: "Manhattan", categoria_id: 78, descripcion: "Cable SATA de datos interno para PC." },
    { clave: "TECTEC56523", nombre: "CABLE TELEFONO 10 MTS", precio: 77.00, stock: 3, marca: "Genérico", categoria_id: 78, descripcion: "Cable de conexión telefónica RJ11 de 10 metros." },
    { clave: "6974368776010", nombre: "CABLE TIPO C-C 1 HORA", precio: 50.00, stock: 1, marca: "1Hora", categoria_id: 80, descripcion: "Cable tipo C a tipo C de 1 hora." },
    { clave: "190198496263", nombre: "CABLE USB -C LIGHTNING 1M BLANCO", precio: 95.00, stock: 1, marca: "Genérico", categoria_id: 80, descripcion: "Cable de USB-C a conector Lightning de 1 metro." },
    { clave: "TECSIN90431", nombre: "CABLE USB A USB", precio: 180.00, stock: 2, marca: "Genérico", categoria_id: 80, descripcion: "Cable de conexión USB a USB." },
    { clave: "766623333368", nombre: "CABLE USB V2.0 A-B 1.8M", precio: 192.00, stock: 3, marca: "Genérico", categoria_id: 80, descripcion: "Cable USB versión 2.0 A a B de 1.8 metros." },
    { clave: "TECSIN64007", nombre: "CABLE USB V2.0 M-H 5MTS", precio: 120.00, stock: 2, marca: "Genérico", categoria_id: 80, descripcion: "Cable extensor USB versión 2.0 macho a hembra de 5 metros." },
    { clave: "TECTEC50642", nombre: "CABLE UTP DOBLE FORRO 30MTS PONCHADO", precio: 338.00, stock: 1, marca: "Genérico", categoria_id: 68, descripcion: "Cable de red UTP doble forro de 30 metros ponchado con conectores RJ45." },
    { clave: "26121609", nombre: "CABLE UTP DOBLE FORRO CAT 6", precio: 20.00, stock: 20, marca: "Genérico", categoria_id: 68, descripcion: "Cable de red UTP por metro doble forro categoría 6." },
    { clave: "TECTEC71066", nombre: "CABLE UTP DOBLE FORRO CAT.5 METRO", precio: 9.00, stock: 49, marca: "Genérico", categoria_id: 68, descripcion: "Cable de red UTP por metro doble forro categoría 5." },
    { clave: "TECTEC83027", nombre: "CABLE UTP LINKED Pro 100% COBRE", precio: 16.00, stock: 175, marca: "LinkedPro", categoria_id: 68, descripcion: "Cable de red UTP 100% cobre LinkedPro." }
];

async function run() {
    try {
        console.log("Insertando segunda tanda de productos...");
        let count = 0;
        for (const p of products) {
            await db.query(
                "INSERT INTO productos (nombre, clave, descripcion, precio, stock, categoria_id, marca, estado) VALUES (?, ?, ?, ?, ?, ?, ?, 'activo')",
                [p.nombre, p.clave, p.descripcion, p.precio, p.stock, p.categoria_id, p.marca]
            );
            console.log(`[INSERTADO] ${p.nombre} (Clave: ${p.clave})`);
            count++;
        }
        console.log(`¡Éxito! Se insertaron ${count} productos correctamente.`);
    } catch (err) {
        console.error("Error al insertar productos:", err);
    } finally {
        process.exit();
    }
}

run();
