const express = require('express');
const router = express.Router();
const { 
    getAllProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multerMiddleware');

// Rutas públicas
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Rutas protegidas (Solo admin)
// Usamos upload.array('imagenes', 5) para aceptar hasta 5 archivos
router.post('/', [verifyToken, isAdmin, upload.array('imagenes', 5)], createProduct);
router.put('/:id', [verifyToken, isAdmin, upload.array('imagenes', 5)], updateProduct);
router.delete('/:id', [verifyToken, isAdmin], deleteProduct);

module.exports = router;
