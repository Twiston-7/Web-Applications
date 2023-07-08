// Import required modules and libraries
import express from "express";

import * as programmerController from '../controllers/programmer-controller.js';

// Create a new router using Express
const router = express.Router();

// Define routes and their corresponding controller functions
router.get('/:id', programmerController.getProgrammer); // Get all projects

router.post('/', programmerController.addProgrammer); // Add a new project

router.delete('/:id', programmerController.deleteProgrammer); // Delete a project by ID

router.put('/:id', programmerController.putProgrammer); // Update a project by ID

// Export the router as a default export
export default router;