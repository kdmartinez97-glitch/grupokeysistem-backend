const db = require('../config/db');
const Product = require('../models/Product');

async function run() {
    try {
        console.log('Buscando categoría Laptops...');
        const [rows] = await db.execute('SELECT id, nombre FROM categorias WHERE nombre = ? OR nombre = ?', ['Laptops', 'Computadoras']);
        console.log('Categorías encontradas:', rows);

        let laptopCatId = null;
        const laptopCat = rows.find(r => r.nombre === 'Laptops');
        if (laptopCat) {
            laptopCatId = laptopCat.id;
        } else if (rows.length > 0) {
            laptopCatId = rows[0].id;
        } else {
            console.log('No se encontró categoría Laptops, insertando en categoría default (1)...');
            laptopCatId = 1; // Default
        }

        console.log('Insertando producto...');
        const productId = await Product.create({
            nombre: 'Lenovo ThinkPad X1 Carbon Gen 10',
            descripcion: 'Laptop empresarial ultraligera con Intel Core i7, 16GB RAM, 512GB SSD, pantalla de 14" WUXGA.',
            precio: 35000.00,
            stock: 15,
            categoria_id: laptopCatId,
            marca: 'Lenovo',
            imagen_url: '',
            estado: 'activo'
        });

        console.log('Producto insertado con ID:', productId);
    } catch (error) {
        console.error('Error:', error);
    } process.exit(0);
}

run();
