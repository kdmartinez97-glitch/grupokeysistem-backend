const db = require('../config/db');

const Category = {
    findAll: async () => {
        const [rows] = await db.execute('SELECT * FROM categorias ORDER BY parent_id IS NULL DESC, parent_id, nombre');
        return rows;
    },
    findById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM categorias WHERE id = ?', [id]);
        return rows[0];
    },
    create: async (categoryData) => {
        const { nombre, descripcion, parent_id } = categoryData;
        const [result] = await db.execute(
            'INSERT INTO categorias (nombre, descripcion, parent_id) VALUES (?, ?, ?)',
            [nombre, descripcion || null, parent_id || null]
        );
        return result.insertId;
    },
    update: async (id, categoryData) => {
        const { nombre, descripcion, parent_id } = categoryData;
        const [result] = await db.execute(
            'UPDATE categorias SET nombre=?, descripcion=?, parent_id=? WHERE id=?',
            [nombre, descripcion || null, parent_id || null, id]
        );
        return result.affectedRows;
    },
    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM categorias WHERE id = ?', [id]);
        return result.affectedRows;
    },
    countProducts: async (id) => {
        const [rows] = await db.execute('SELECT COUNT(*) as count FROM productos WHERE categoria_id = ?', [id]);
        return rows[0].count;
    }
};

module.exports = Category;
