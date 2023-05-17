// Requiring the http module
const
    http = require('http');
// Creating a port variable to listen on later
const port = 3000;
// Creating a server object
const server =
    http.createServer(function (req, res) {
        res.setHeader('Content-Type', 'text/plain');
        res.write('Hello World!');
        res.end();
    });
// Server setup, listening on port 3000 (port variable)
server.listen(port, function() {
    console.log(`Server listening on port ${port}!`);
});