const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');

// Configuración de multer para subir comprobantes de pago
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Asegúrate de que esta carpeta exista
    },
    filename: function (req, file, cb) {
        cb(null, 'receipt-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Crear pedido (Público) con comprobante
router.post('/', upload.single('receipt'), orderController.createOrder);

// Rutas protegidas (Admin)
router.get('/', verifyToken, isAdmin, orderController.getAllOrders);
router.get('/:id', verifyToken, isAdmin, orderController.getOrderById);
router.put('/:id/approve', verifyToken, isAdmin, orderController.approveOrder);
router.put('/:id/complete', verifyToken, isAdmin, orderController.completeOrder);

module.exports = router;
