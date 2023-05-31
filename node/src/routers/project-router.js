// File: routers/cat-router.js
import express from "express";
import statusCodes from 'http-status-codes';
import * as projectsController from '../controllers/projects-controller.js';

// Create a new router using express
const router = express.Router();

// Calls go here
router.get('/projects', projectsController.getAllProjects);

router.post('/projects', projectsController.addProject);

// A default export of the router
export default router;