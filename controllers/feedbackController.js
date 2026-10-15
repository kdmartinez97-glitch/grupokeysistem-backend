const Feedback = require('../models/Feedback');

// ─── CALIFICACIONES ───────────────────────────────────────────────────────────
const crearCalificacion = async (req, res) => {
    try {
        const { nombre, atencion, entrega, calidad, precio, sitio_web, comentario } = req.body;
        // Validar que todos los scores estén presentes y sean 1-10
        const scores = { atencion, entrega, calidad, precio, sitio_web };
        for (const [key, val] of Object.entries(scores)) {
            if (val === undefined || val === null || val < 1 || val > 10) {
                return res.status(400).json({ message: `El campo "${key}" debe ser un valor entre 1 y 10.` });
            }
        }
        const id = await Feedback.createCalificacion({ nombre, atencion, entrega, calidad, precio, sitio_web, comentario });
        res.status(201).json({ message: 'Calificación registrada exitosamente', id });
    } catch (error) {
        console.error('Error al crear calificación:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getPromedios = async (req, res) => {
    try {
        const promedios = await Feedback.getPromedios();
        res.json(promedios);
    } catch (error) {
        console.error('Error al obtener promedios:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getCalificaciones = async (req, res) => {
    try {
        const calificaciones = await Feedback.getCalificaciones();
        res.json(calificaciones);
    } catch (error) {
        console.error('Error al obtener calificaciones:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// ─── SUGERENCIAS ──────────────────────────────────────────────────────────────
const crearSugerencia = async (req, res) => {
    try {
        const { titulo, descripcion, autor } = req.body;
        if (!titulo || !descripcion) {
            return res.status(400).json({ message: 'Título y descripción son requeridos.' });
        }
        const id = await Feedback.createSugerencia({ titulo, descripcion, autor });
        res.status(201).json({ message: 'Sugerencia enviada exitosamente', id });
    } catch (error) {
        console.error('Error al crear sugerencia:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getSugerencias = async (req, res) => {
    try {
        const sugerencias = await Feedback.getSugerencias();
        res.json(sugerencias);
    } catch (error) {
        console.error('Error al obtener sugerencias:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const votarSugerencia = async (req, res) => {
    try {
        const { id } = req.params;
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
        const result = await Feedback.votarSugerencia(Number(id), ip);
        if (result.yaVoto) {
            return res.status(409).json({ message: 'Ya votaste por esta idea.' });
        }
        res.json({ message: 'Voto registrado exitosamente' });
    } catch (error) {
        console.error('Error al votar:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const updateEstadoSugerencia = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const estadosValidos = ['pendiente', 'en_revision', 'en_desarrollo', 'implementado', 'rechazado'];
        if (!estadosValidos.includes(estado)) {
            return res.status(400).json({ message: 'Estado no válido.' });
        }
        await Feedback.updateEstadoSugerencia(id, estado);
        res.json({ message: 'Estado actualizado' });
    } catch (error) {
        console.error('Error al actualizar estado:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = {
    crearCalificacion,
    getPromedios,
    getCalificaciones,
    crearSugerencia,
    getSugerencias,
    votarSugerencia,
    updateEstadoSugerencia
};
