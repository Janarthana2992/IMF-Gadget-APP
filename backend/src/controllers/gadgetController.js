// src/controllers/gadgetController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generateCodename } = require('../utils/codeGenerator');

/**
 * Get all gadgets with optional status filter
 */
exports.getAllGadgets = async (req, res, next) => {
  try {
    const { status } = req.query;
    
    // Build filter conditions
    const where = status ? { status } : {};
    
    // Get gadgets from database
    const gadgets = await prisma.gadget.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    
    // Add mission success probability for each gadget
    const gadgetsWithProbability = gadgets.map(gadget => {
      const successProbability = Math.floor(Math.random() * 41) + 60; // Between 60-100%
      return {
        ...gadget,
        successProbability: `${successProbability}%`,
      };
    });
    
    res.json(gadgetsWithProbability);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single gadget by ID
 */
exports.getGadgetById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const gadget = await prisma.gadget.findUnique({
      where: { id },
    });
    
    if (!gadget) {
      return res.status(404).json({ message: 'Gadget not found' });
    }
    
    // Add mission success probability
    const successProbability = Math.floor(Math.random() * 41) + 60; // Between 60-100%
    
    res.json({
      ...gadget,
      successProbability: `${successProbability}%`,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new gadget
 */
exports.createGadget = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    
    // Generate a unique codename
    const codename = `The ${generateCodename()}`;
    
    const newGadget = await prisma.gadget.create({
      data: {
        codename,
        name,
        description,
        status: 'Available',
      },
    });
    
    res.status(201).json(newGadget);
  } catch (error) {
    next(error);
  }
};

/**
 * Update an existing gadget
 */
exports.updateGadget = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;
    
    // Check if gadget exists
    const existingGadget = await prisma.gadget.findUnique({
      where: { id },
    });
    
    if (!existingGadget) {
      return res.status(404).json({ message: 'Gadget not found' });
    }
    
    // Validate status if provided
    if (status && !['Available', 'Deployed', 'Destroyed', 'Decommissioned'].includes(status)) {
      return res.status(400).json({ 
        message: 'Invalid status. Must be one of: Available, Deployed, Destroyed, Decommissioned' 
      });
    }
    
    // Update the gadget
    const updatedGadget = await prisma.gadget.update({
      where: { id },
      data: {
        name: name || existingGadget.name,
        description: description !== undefined ? description : existingGadget.description,
        status: status || existingGadget.status,
      },
    });
    
    res.json(updatedGadget);
  } catch (error) {
    next(error);
  }
};

/**
 * "Delete" a gadget by marking it as decommissioned
 */
exports.deleteGadget = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if gadget exists
    const existingGadget = await prisma.gadget.findUnique({
      where: { id },
    });
    
    if (!existingGadget) {
      return res.status(404).json({ message: 'Gadget not found' });
    }
    
    // Mark as decommissioned instead of deleting
    const decommissionedGadget = await prisma.gadget.update({
      where: { id },
      data: {
        status: 'Decommissioned',
        decommissionedAt: new Date(),
      },
    });
    
    res.json({
      message: 'Gadget decommissioned successfully',
      gadget: decommissionedGadget,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Trigger self-destruct sequence for a gadget
 */
exports.selfDestruct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { confirmationCode } = req.body;
    
    // Check if gadget exists
    const existingGadget = await prisma.gadget.findUnique({
      where: { id },
    });
    
    if (!existingGadget) {
      return res.status(404).json({ message: 'Gadget not found' });
    }
    
    // Generate a random confirmation code for this request
    // In a real app, this would be sent via email/SMS and then matched
    const expectedCode = Math.floor(10000 + Math.random() * 90000).toString();
    
    // For demonstration purposes, we'll accept any 5-digit code or the one provided
    if (!confirmationCode || confirmationCode.length !== 5 || !/^\d+$/.test(confirmationCode)) {
      return res.status(400).json({ 
        message: 'Invalid confirmation code. Please provide the 5-digit code.',
        requiredCode: expectedCode // Normally wouldn't send this, just for demo
      });
    }
    
    // Update the gadget status to "Destroyed"
    const destroyedGadget = await prisma.gadget.update({
      where: { id },
      data: {
        status: 'Destroyed',
      },
    });
    
    res.json({
      message: 'Gadget self-destruct sequence completed successfully',
      gadget: destroyedGadget,
    });
  } catch (error) {
    next(error);
  }
};