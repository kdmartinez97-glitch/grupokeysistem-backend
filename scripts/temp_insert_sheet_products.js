const db = require('../config/db');

const products = [
    { clave: "840030703447", nombre: "ADAPTADOR BLUETOOH", precio: 340.00, stock: 0, marca: "Genérico", categoria_id: 78, descripcion: "Adaptador USB Bluetooth para PC." },
    { clave: "ZJT.35", nombre: "ADAPTADOR HDMI A VGA S/AUDIO LITOY", precio: 216.00, stock: 8, marca: "Litoy", categoria_id: 81, descripcion: "Adaptador de video HDMI a VGA sin salida de audio." },
    { clave: "845973050719", nombre: "ADAPTADOR INALAMBRICO NANO USB TL-WN725N", precio: 160.00, stock: 3, marca: "TP-Link", categoria_id: 78, descripcion: "Adaptador de red nano USB inalámbrico N a 150 Mbps." },
    { clave: "TECSIN71971", nombre: "ADAPTADOR MICRO-SD CARD READER", precio: 35.00, stock: 2, marca: "Genérico", categoria_id: 78, descripcion: "Lector de tarjetas de memoria Micro-SD a USB." },
    { clave: "ADAPTADOR MULTI", nombre: "ADAPTADOR MULTI HUB RJ45, USB, C, HDMI LITOY", precio: 360.00, stock: 1, marca: "Litoy", categoria_id: 68, descripcion: "Adaptador multipuertos USB-C con salida HDMI, puertos USB y puerto Ethernet RJ45." },
    { clave: "SHWN80242", nombre: "ADAPTADOR OTG TIPO C A ENTRADA USB", precio: 40.00, stock: 13, marca: "Genérico", categoria_id: 78, descripcion: "Adaptador OTG USB tipo C macho a USB tipo A hembra." },
    { clave: "ADATADOR", nombre: "ADAPTADOR RJ45 A TIPO C", precio: 195.00, stock: 3, marca: "Genérico", categoria_id: 68, descripcion: "Adaptador de red Gigabit Ethernet RJ45 a conector USB tipo C." },
    { clave: "00-USB-RJ45", nombre: "ADAPTADOR RJ45 A USB LITOY", precio: 160.00, stock: 26, marca: "Litoy", categoria_id: 68, descripcion: "Adaptador de red Ethernet RJ45 a puerto USB." },
    { clave: "7503028372010", nombre: "ADAPTADOR TIPO JACK", precio: 6.50, stock: 4, marca: "Genérico", categoria_id: 78, descripcion: "Conector adaptador tipo Jack de energía." },
    { clave: "ADAPTADOR VGA-HDMI", nombre: "ADAPTADOR VGA-HDMI", precio: 249.00, stock: 2, marca: "Genérico", categoria_id: 81, descripcion: "Convertidor de señal analógica VGA a digital HDMI." },
    { clave: "7501483147860", nombre: "AIRE COMPRIMIDO", precio: 130.00, stock: 9, marca: "Genérico", categoria_id: 95, descripcion: "Lata de aire comprimido para limpieza de componentes electrónicos." },
    { clave: "120", nombre: "ALCOHOL ISOPROPILICO 1L NAZA", precio: 180.00, stock: 4, marca: "Naza", categoria_id: 95, descripcion: "Alcohol isopropílico de 1 litro para limpieza y desengrase de tarjetas de circuitos." },
    { clave: "46553132165", nombre: "ALCOHOL ISOPROPILICO DESTEC", precio: 180.00, stock: 1, marca: "Destec", categoria_id: 95, descripcion: "Alcohol isopropílico de alta calidad para limpieza de equipos." },
    { clave: "PAPPAP42276", nombre: "ALMOADILLAS PARA EPSON L120", precio: 90.00, stock: 7, marca: "Epson", categoria_id: 58, descripcion: "Almohadillas de desecho de tinta para impresora Epson L120." },
    { clave: "MULSIN82446", nombre: "ALMOADILLAS PARA EPSON L3150", precio: 310.00, stock: 1, marca: "Epson", categoria_id: 58, descripcion: "Almohadillas de depósito de tinta de desecho para Epson L3150." },
    { clave: "MULSIN83556", nombre: "ALMOHADILLA CANON G3111", precio: 360.00, stock: 1, marca: "Canon", categoria_id: 58, descripcion: "Almohadillas absorbentes de tinta de desecho para Canon Pixma G3111." },
    { clave: "TECSIN88594", nombre: "ALMOHADILLA ORIGINAL EPSON L4150", precio: 300.00, stock: 1, marca: "Epson", categoria_id: 58, descripcion: "Depósito y almohadilla original de desecho de tinta para Epson L4150." },
    { clave: "TECTEC57422", nombre: "ALMOHADILLAS 310", precio: 310.00, stock: 5, marca: "Epson", categoria_id: 58, descripcion: "Almohadillas absorbentes de tinta para Epson L3110 / 310." },
    { clave: "510W", nombre: "ALMOHADILLAS BROTHER 510W", precio: 660.00, stock: 1, marca: "Brother", categoria_id: 58, descripcion: "Almohadillas de desecho de tinta para impresora Brother DCP-T510W." },
    { clave: "1254876521456", nombre: "ALMOHADILLAS CANON G2111", precio: 400.00, stock: 2, marca: "Canon", categoria_id: 58, descripcion: "Repuesto de almohadillas absorbentes de tinta para Canon G2111." },
    { clave: "MULSIN63420", nombre: "ALMOHADILLAS EPSON L210", precio: 310.00, stock: 4, marca: "Epson", categoria_id: 58, descripcion: "Repuesto de almohadillas de desecho de tinta para Epson L210." },
    { clave: "CONCON15302", nombre: "ALMOHADILLAS EPSON L3251", precio: 350.00, stock: 2, marca: "Epson", categoria_id: 58, descripcion: "Almohadillas de tinta para Epson EcoTank L3251." },
    { clave: "EPSON L380", nombre: "ALMOHADILLAS EPSON L380", precio: 310.00, stock: 2, marca: "Epson", categoria_id: 58, descripcion: "Almohadillas absorbentes de tinta para Epson L380." },
    { clave: "CON0789456", nombre: "ALMOHADILLAS EPSON L805", precio: 380.00, stock: 1, marca: "Epson", categoria_id: 58, descripcion: "Depósito de almohadillas de desecho de tinta para Epson EcoTank L805." },
    { clave: "MULSIN57480", nombre: "ALMOHADILLAS PARA CANON G4100", precio: 400.00, stock: 2, marca: "Canon", categoria_id: 58, descripcion: "Almohadillas absorbentes de tinta para Canon G4100." },
    { clave: "7032079'43", nombre: "ALMOHADILLAS PARA EPSON L355", precio: 350.00, stock: 1, marca: "Epson", categoria_id: 58, descripcion: "Almohadillas de desecho de tinta para Epson L355." },
    { clave: "CONCON23018", nombre: "ALMOHADILLAS PARA EPSON L575", precio: 430.00, stock: 2, marca: "Epson", categoria_id: 58, descripcion: "Almohadillas absorbentes para impresora multifuncional Epson L575." },
    { clave: "1236", nombre: "ALMOHADILLAS PARA IMPRESORA 3110", precio: 230.00, stock: 3, marca: "Epson", categoria_id: 58, descripcion: "Almohadillas de desecho para impresora Epson L3110." },
    { clave: "3444554", nombre: "CARGADOR HP CENTRINO", precio: 450.00, stock: 2, marca: "HP", categoria_id: 133, descripcion: "Cargador para laptop HP Centrino." },
    { clave: "07503051174438", nombre: "AUXILIAR USB", precio: 100.00, stock: 1, marca: "Genérico", categoria_id: 80, descripcion: "Cable auxiliar con puerto e interfaz USB." },
    { clave: "7891040204199", nombre: "BANDERITAS ADESIVAS FLECHA POST IT PRIMARIOS 5 BLOCKS", precio: 64.00, stock: 6, marca: "Post-it", categoria_id: 20, descripcion: "Banderitas adhesivas señaladoras en forma de flecha Post-it, colores primarios, 5 blocks." },
    { clave: "7506086600712", nombre: "BATERIA DE LITIO AMITZU", precio: 35.00, stock: 2, marca: "Amitzu", categoria_id: 78, descripcion: "Batería de litio de alta calidad Amitzu." },
    { clave: "7502285230026", nombre: "BICOLOR GRUESO", precio: 70.00, stock: 12, marca: "Genérico", categoria_id: 4, descripcion: "Lápices bicolores gruesos para dibujo o marcación." },
    { clave: "MULSIN95143", nombre: "BICOLOR GRUESO TRIANGULAR BUFFY", precio: 7.50, stock: 5, marca: "Buffy", categoria_id: 4, descripcion: "Lápiz bicolor grueso de forma triangular marca Buffy." },
    { clave: "7503002370353", nombre: "BLOCK COTRARECIBO 50 H", precio: 10.00, stock: 3, marca: "Genérico", categoria_id: 3, descripcion: "Block de formatos para contrarecibo, contiene 50 hojas." },
    { clave: "7502005865224", nombre: "BLOCK SQUELA 50 H", precio: 13.00, stock: 3, marca: "Genérico", categoria_id: 3, descripcion: "Block de notas escolares tipo Squela de 50 hojas." },
    { clave: "PAPPAP43733", nombre: "BOLIGRAFO SAIRA GEL NEGRO CRISTAL PIEZA", precio: 105.63, stock: 2, marca: "Saira", categoria_id: 5, descripcion: "Bolígrafo de gel Saira tinta negra punto mediano." },
    { clave: "7501174953428", nombre: "BOLIGRAFO BACO LE PLUME AZUL, PUNTO MEDIO", precio: 49.00, stock: 1, marca: "Baco", categoria_id: 5, descripcion: "Bolígrafo clásico Baco Le Plume tinta azul punto medio." },
    { clave: "072838315540", nombre: "BOLIGRAFO FINO FRIXION BALL AZUL C/2PZ", precio: 117.00, stock: 2, marca: "Pilot", categoria_id: 5, descripcion: "Bolígrafo borrable Pilot Frixion Ball tinta azul fina, paquete con 2 piezas." }
];

async function run() {
    try {
        console.log("Insertando productos de la hoja...");
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
