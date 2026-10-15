const db = require('../config/db');

const Feedback = {
    // ─── CALIFICACIONES ───────────────────────────────────────────────
    createCalificacion: async (data) => {
        const { nombre, atencion, entrega, calidad, precio, sitio_web, comentario } = data;
        const [result] = await db.execute(
            `INSERT INTO feedback_calificaciones 
             (nombre, atencion, entrega, calidad, precio, sitio_web, comentario) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [nombre || 'Anónimo', atencion, entrega, calidad, precio, sitio_web, comentario || null]
        );
        return result.insertId;
    },

    getCalificaciones: async () => {
        const [rows] = await db.execute(
            'SELECT * FROM feedback_calificaciones ORDER BY created_at DESC'
        );
        return rows;
    },

    getPromedios: async () => {
        const [rows] = await db.execute(
            `SELECT 
                COUNT(*) as total,
                ROUND(AVG(atencion), 1) as atencion,
                ROUND(AVG(entrega), 1) as entrega,
                ROUND(AVG(calidad), 1) as calidad,
                ROUND(AVG(precio), 1) as precio,
                ROUND(AVG(sitio_web), 1) as sitio_web,
                ROUND(AVG((atencion + entrega + calidad + precio + sitio_web) / 5), 1) as general
             FROM feedback_calificaciones`
        );
        return rows[0];
    },

    // ─── SUGERENCIAS / BUZÓN DE IDEAS ────────────────────────────────
    createSugerencia: async (data) => {
        const { titulo, descripcion, autor } = data;
        const [result] = await db.execute(
            `INSERT INTO feedback_sugerencias (titulo, descripcion, autor) VALUES (?, ?, ?)`,
            [titulo, descripcion, autor || 'Anónimo']
        );
        return result.insertId;
    },

    getSugerencias: async () => {
        const [rows] = await db.execute(
            `SELECT s.*, 
                (SELECT COUNT(*) FROM feedback_votos WHERE sugerencia_id = s.id) as votos
             FROM feedback_sugerencias s
             ORDER BY votos DESC, s.created_at DESC`
        );
        return rows;
    },

    votarSugerencia: async (sugerenciaId, ip) => {
        const [existing] = await db.execute(
            'SELECT id FROM feedback_votos WHERE sugerencia_id = ? AND ip_votante = ?',
            [sugerenciaId, ip]
        );
        if (existing.length > 0) {
            return { yaVoto: true };
        }
        await db.execute(
            'INSERT INTO feedback_votos (sugerencia_id, ip_votante) VALUES (?, ?)',
            [sugerenciaId, ip]
        );
        return { yaVoto: false };
    },

    updateEstadoSugerencia: async (id, estado) => {
        const [result] = await db.execute(
            'UPDATE feedback_sugerencias SET estado = ? WHERE id = ?',
            [estado, id]
        );
        return result.affectedRows;
    }
};

module.exports = Feedback;
