// File: routers/project-router.js
import express from "express";
import statusCodes from 'http-status-codes';
import * as projectsController from '../controllers/projects-controller.js';

// Create a new router using express
const router = express.Router();

// Calls go here
router.get('/', projectsController.getAllProjects);

router.post('/', projectsController.addProject);

router.delete('/:id', projectsController.deleteProject)

// A default export of the router
export default router;