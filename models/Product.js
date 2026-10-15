const db = require('../config/db');

const Product = {
    findAll: async () => {
        const [rows] = await db.execute(`
            SELECT p.*, c.nombre as categoria_nombre 
            FROM productos p 
            LEFT JOIN categorias c ON p.categoria_id = c.id
        `);
        return rows;
    },
    findById: async (id) => {
        const [rows] = await db.execute(`
            SELECT p.*, c.nombre as categoria_nombre 
            FROM productos p 
            LEFT JOIN categorias c ON p.categoria_id = c.id 
            WHERE p.id = ?
        `, [id]);
        return rows[0];
    },
    create: async (productData) => {
        const { nombre, clave, descripcion, precio, stock, categoria_id, marca, imagen_url, imagenes, estado = 'activo' } = productData;
        const [result] = await db.execute(
            'INSERT INTO productos (nombre, clave, descripcion, precio, stock, categoria_id, marca, imagen_url, imagenes, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [nombre, clave, descripcion, precio, stock, categoria_id, marca, imagen_url, imagenes, estado]
        );
        return result.insertId;
    },
    update: async (id, productData) => {
        const { nombre, clave, descripcion, precio, stock, categoria_id, marca, imagen_url, imagenes, estado } = productData;
        const [result] = await db.execute(
            'UPDATE productos SET nombre=?, clave=?, descripcion=?, precio=?, stock=?, categoria_id=?, marca=?, imagen_url=?, imagenes=?, estado=? WHERE id=?',
            [nombre, clave, descripcion, precio, stock, categoria_id, marca, imagen_url, imagenes, estado, id]
        );
        return result.affectedRows;
    },
    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM productos WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = Product;
