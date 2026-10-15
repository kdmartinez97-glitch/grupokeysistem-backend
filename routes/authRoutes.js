const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// @route   POST api/auth/login
// @desc    Autenticar usuario y obtener token
// @access  Public
router.post('/login', login);

// @route   POST api/auth/register
// @desc    Registrar nuevo usuario admin/empleado
// @access  Private (Admin only)
router.post('/register', [verifyToken, isAdmin], register);

// @route   GET api/auth/me
// @desc    Obtener datos del usuario actual
// @access  Private
router.get('/me', verifyToken, (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;
