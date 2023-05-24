const express = require('express');
const app = express();
const port = 3000; // You can use any preferred port number

// Set up a route to serve your HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Replace 'index.html' with your actual HTML file name
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
