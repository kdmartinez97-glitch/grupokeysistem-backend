const express = require('express');
const router = express.Router();
const {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Rutas públicas
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);

// Rutas protegidas
router.post('/', [verifyToken, isAdmin], createCategory);
router.put('/:id', [verifyToken, isAdmin], updateCategory);
router.delete('/:id', [verifyToken, isAdmin], deleteCategory);

module.exports = router;
