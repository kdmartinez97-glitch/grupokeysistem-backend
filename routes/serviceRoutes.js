const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);
router.post('/', authMiddleware.verifyToken, serviceController.createService);
router.put('/:id', authMiddleware.verifyToken, serviceController.updateService);
router.delete('/:id', authMiddleware.verifyToken, serviceController.deleteService);

module.exports = router;
