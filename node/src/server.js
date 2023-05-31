import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000; // You can use any preferred port number

app.use(express.static(join(__dirname, '..', '..', 'public')));
app.use(express.json());
app.use(cors());

// Set up a route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '..', '..', 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/projects/:projectID', function (req, res) {
    const projectID = req.params.projectID;
    // TODO: Find student with the given student number
    res.send(`Project with ID ${projectID} was not found.`);
});

app.get('/contact/', function (req, res) {
    res.status(200).send('No contact for now.');
});
