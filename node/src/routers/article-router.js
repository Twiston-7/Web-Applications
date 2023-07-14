// Import required modules and libraries
import express from "express";

import * as articleController from "../controllers/article-controller.js";

// Create a new router using Express
const router = express.Router();

// Define routes and their corresponding controller functions
router.get("/:id", articleController.getArticle); // Get all projects

router.post("/", articleController.addArticle); // Add a new project

router.delete("/:id", articleController.deleteArticle); // Delete a project by ID

router.put("/:id", articleController.updateArticle); // Update a project by ID

// Export the router as a default export
export default router;
