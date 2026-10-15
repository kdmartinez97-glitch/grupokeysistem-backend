const db = require('../config/db');

const User = {
    findByEmail: async (email) => {
        const [rows] = await db.execute('SELECT * FROM usuarios WHERE correo = ?', [email]);
        return rows[0];
    },
    findById: async (id) => {
        const [rows] = await db.execute('SELECT id, nombre, correo, rol, created_at FROM usuarios WHERE id = ?', [id]);
        return rows[0];
    },
    create: async (userData) => {
        const { nombre, correo, password, rol = 'empleado' } = userData;
        const [result] = await db.execute(
            'INSERT INTO usuarios (nombre, correo, password, rol) VALUES (?, ?, ?, ?)',
            [nombre, correo, password, rol]
        );
        return result.insertId;
    }
};

module.exports = User;
