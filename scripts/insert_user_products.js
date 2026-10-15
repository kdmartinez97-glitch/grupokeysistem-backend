const db = require('../config/db');

const productsToInsert = [
    { nombre: 'Caja de hojas blancas', descripcion: 'Caja con 10 paquetes de 500 hojas blancas tamaño carta.', precio: 850.00, stock: 50, categoria_id: 32, marca: 'Scribe' },
    { nombre: 'Paquete de folders', descripcion: 'Paquete con 100 folders tamaño carta color crema.', precio: 120.00, stock: 30, categoria_id: 21, marca: 'Estrella' },
    { nombre: 'Papel Opalina', descripcion: 'Paquete de 100 hojas de papel opalina tamaño carta.', precio: 150.00, stock: 20, categoria_id: 42, marca: 'Pochteca' },
    { nombre: 'Papel Fotográfico', descripcion: 'Paquete de 20 hojas de papel fotográfico brillante tamaño carta.', precio: 200.00, stock: 15, categoria_id: 40, marca: 'HP' },
    { nombre: 'Millar de hojas de color', descripcion: 'Millar de hojas de color surtido tamaño carta.', precio: 300.00, stock: 10, categoria_id: 31, marca: 'Scribe' },
    { nombre: 'Notas adhesivas (Post-it)', descripcion: 'Paquete de 5 blocs de notas adhesivas colores neón.', precio: 80.00, stock: 40, categoria_id: 22, marca: '3M' },
    { nombre: 'Caja de sobres', descripcion: 'Caja con 500 sobres blancos tamaño carta.', precio: 250.00, stock: 12, categoria_id: 2, marca: 'Estrella' },
    { nombre: 'Carpetas registradoras', descripcion: 'Carpeta registradora tamaño oficio lomo ancho.', precio: 85.00, stock: 60, categoria_id: 21, marca: 'Lefort' },
    { nombre: 'Caja de plumas', descripcion: 'Caja con 12 bolígrafos de punto mediano color negro.', precio: 60.00, stock: 100, categoria_id: 5, marca: 'Bic' },
    { nombre: 'Caja de lápices', descripcion: 'Caja con 12 lápices de madera No. 2.', precio: 45.00, stock: 80, categoria_id: 9, marca: 'Dixon' },
    { nombre: 'Libretas profesionales', descripcion: 'Libreta profesional de espiral 100 hojas cuadro grande.', precio: 35.00, stock: 150, categoria_id: 3, marca: 'Norma' },
    { nombre: 'Caja de colores', short: 'colores', descripcion: 'Caja con 24 lápices de colores largos.', precio: 120.00, stock: 45, categoria_id: 11, marca: 'Prismacolor' },
    { nombre: 'Pegamento líquido (Resistol)', descripcion: 'Pegamento líquido blanco escolar 850g.', precio: 95.00, stock: 25, categoria_id: 22, marca: 'Resistol' },
    { nombre: 'Cinta Masking Tape (Masquin)', descripcion: 'Cinta adhesiva masking tape de 18mm x 50m.', precio: 25.00, stock: 100, categoria_id: 22, marca: 'Tuk' },
    { nombre: 'Caja de marcadores', descripcion: 'Caja con 12 marcadores para pizarrón blanco colores surtidos.', precio: 180.00, stock: 30, categoria_id: 14, marca: 'Expo' },
    { nombre: 'Teclado inalámbrico', descripcion: 'Teclado inalámbrico en español con conexión USB.', precio: 350.00, stock: 20, categoria_id: 71, marca: 'Logitech' },
    { nombre: 'Mouse inalámbrico (Maus)', descripcion: 'Mouse óptico inalámbrico conexión USB.', precio: 200.00, stock: 25, categoria_id: 72, marca: 'Logitech' },
    { nombre: 'Memoria USB 64GB', descripcion: 'Memoria USB 3.0 capacidad 64GB.', precio: 180.00, stock: 40, categoria_id: 63, marca: 'Kingston' },
    { nombre: 'Cargador Universal', descripcion: 'Cargador universal para laptop con múltiples puntas.', precio: 450.00, stock: 15, categoria_id: 78, marca: 'Steren' }
];

async function run() {
    try {
        console.log('Insertando productos...');
        for (const p of productsToInsert) {
            await db.execute(
                'INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id, marca, estado) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [p.nombre, p.descripcion, p.precio, p.stock, p.categoria_id, p.marca, 'activo']
            );
            console.log(`Insertado: ${p.nombre}`);
        }
        console.log('¡Todos los productos fueron insertados!');
    } catch (e) {
        console.error('Error insertando productos:', e);
    } finally {
        process.exit(0);
    }
}

run();
