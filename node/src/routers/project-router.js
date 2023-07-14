// Import required modules and libraries
import express from "express";

import * as projectsController from "../controllers/projects-controller.js";

// Create a new router using Express
const router = express.Router();

// Define routes and their corresponding controller functions
router.get("/", projectsController.getAllProjects); // Get all projects

router.get("/:id", projectsController.getProjectById); // Get specific projects

router.get("/programmer/:id", projectsController.getProgrammerFromProjectId); // Get programmer relating to the project id

router.get("/article/:id", projectsController.getArticleFromProjectId); // Get article relating to the project id

router.post("/", projectsController.addProject); // Add a new project

router.delete("/:id", projectsController.deleteProject); // Delete a project by ID

router.put("/:id", projectsController.updateProject); // Update a project by ID

// Export the router as a default export
export default router;
