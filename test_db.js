const Product = require('./models/Product');

async function run() {
    try {
        const res = await Product.update(1, {
            nombre: 'Prueba',
            descripcion: 'Desc',
            precio: '0.00',
            stock: '10',
            categoria_id: null,
            marca: 'MBK',
            imagen_url: '/uploads/test.jpg',
            imagenes: '["/uploads/test.jpg"]',
            estado: 'activo'
        });
        console.log("UPDATE OK:", res);
    } catch(e) {
        console.error("DB ERROR:", e);
    } finally {
        process.exit();
    }
}
run();
