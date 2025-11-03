const express = require('express');
const router = express.Router();
const pasienController = require('../controllers/pasienController');
const validatePasien = require("../middleware/pasienValidate");

const authenticateToken = require("../middleware/authMiddleware");

router.get('/', authenticateToken, pasienController.getAllPasien);

router.get('/:id', authenticateToken, pasienController.getPasienById);

router.post('/', authenticateToken, validatePasien, pasienController.addPasien);

router.put('/:id', authenticateToken, validatePasien, pasienController.updatePasien);

router.delete('/:id', authenticateToken, pasienController.deletePasien);

module.exports = router;