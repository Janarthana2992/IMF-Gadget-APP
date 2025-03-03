// src/routes/gadgetRoutes.js
const express = require('express');
const router = express.Router();
const gadgetController = require('../controllers/gadgetController');
const { authenticate } = require('../middleware/auth');

// Apply authentication middleware to all gadget routes
router.use(authenticate);

// Get all gadgets (with optional status filter)
router.get('/', gadgetController.getAllGadgets);

// Get a single gadget by ID
router.get('/:id', gadgetController.getGadgetById);

// Create a new gadget
router.post('/', gadgetController.createGadget);

// Update an existing gadget
router.patch('/:id', gadgetController.updateGadget);

// "Delete" a gadget (mark as decommissioned)
router.delete('/:id', gadgetController.deleteGadget);

// Trigger self-destruct sequence
router.post('/:id/self-destruct', gadgetController.selfDestruct);

module.exports = router; 