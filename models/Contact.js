const db = require('../config/db');

const Contact = {
    findAll: async () => {
        const [rows] = await db.execute('SELECT * FROM contactos ORDER BY created_at DESC');
        return rows;
    },
    findById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM contactos WHERE id = ?', [id]);
        return rows[0];
    },
    create: async (contactData) => {
        const { nombre, correo, telefono, mensaje } = contactData;
        const [result] = await db.execute(
            'INSERT INTO contactos (nombre, correo, telefono, mensaje) VALUES (?, ?, ?, ?)',
            [nombre, correo, telefono, mensaje]
        );
        return result.insertId;
    },
    updateStatus: async (id, estado) => {
        const [result] = await db.execute(
            'UPDATE contactos SET estado = ? WHERE id = ?',
            [estado, id]
        );
        return result.affectedRows;
    },
    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM contactos WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = Contact;
