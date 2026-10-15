const express = require('express');
const router = express.Router();
const {
    getAllContacts,
    createContact,
    updateContactStatus,
    deleteContact
} = require('../controllers/contactController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Rutas públicas
router.post('/', createContact);

// Rutas protegidas
router.get('/', [verifyToken, isAdmin], getAllContacts);
router.put('/:id', [verifyToken, isAdmin], updateContactStatus);
router.delete('/:id', [verifyToken, isAdmin], deleteContact);

module.exports = router;
