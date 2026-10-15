const db = require('../config/db');

const Service = {
    findAll: async () => {
        const [rows] = await db.execute('SELECT * FROM servicios');
        return rows;
    },
    findById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM servicios WHERE id = ?', [id]);
        return rows[0];
    },
    create: async (serviceData) => {
        const { titulo, categoria } = serviceData;
        const [result] = await db.execute(
            'INSERT INTO servicios (titulo, categoria) VALUES (?, ?)',
            [titulo, categoria || 'Otros']
        );
        return result.insertId;
    },
    update: async (id, serviceData) => {
        const { titulo, categoria } = serviceData;
        const [result] = await db.execute(
            'UPDATE servicios SET titulo = ?, categoria = ? WHERE id = ?',
            [titulo, categoria || 'Otros', id]
        );
        return result.affectedRows;
    },
    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM servicios WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = Service;
