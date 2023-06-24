// Import required modules and libraries
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';

// Import the project router
import projectRouter from './routers/project-router.js';

// Get the current file and directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create an instance of Express
const app = express();
const port = 3000; // You can use any preferred port number

// Serve static files from the "public" directory
app.use(express.static(join(__dirname, '..', '..', 'public')));

// Parse JSON request bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Use the project router for requests starting with "/projects"
app.use('/projects', projectRouter);

// Set up a route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '..', '..', 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
