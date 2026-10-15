const express = require('express');
const router = express.Router();
const {
    crearCalificacion,
    getPromedios,
    getCalificaciones,
    crearSugerencia,
    getSugerencias,
    votarSugerencia,
    updateEstadoSugerencia
} = require('../controllers/feedbackController');

// Calificaciones
router.post('/calificaciones', crearCalificacion);
router.get('/calificaciones', getCalificaciones);
router.get('/promedios', getPromedios);

// Sugerencias / Buzón de ideas
router.post('/sugerencias', crearSugerencia);
router.get('/sugerencias', getSugerencias);
router.post('/sugerencias/:id/votar', votarSugerencia);
router.patch('/sugerencias/:id/estado', updateEstadoSugerencia); // Admin only

module.exports = router;
