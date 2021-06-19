const http = require('http');
const port = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');
const netSpeed = require('./netspeed.js');


// Create a server
const server = http.createServer((req, res) => {

    // Netspeed api
    if (req.url === '/netspeed' && req.method === "POST") {

        netSpeed()
            .then(speed => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(speed.toString());
            })
            .catch(err => res.end(err))

    } else {

        // File path
        let filePaht = path.join(
            __dirname,
            'public',
            req.url === "/" ? 'index.html' : req.url
        );

        // Content Type
        let contentType = 'text/html';

        // Request extention
        let extname = path.extname(req.url);

        // get extention
        switch (extname) {
            case '.css':
                contentType = 'text/css';
                break;
            case '.js':
                contentType = 'text/javascript';
            case '.svg':
                contentType = 'image/svg+xml';
        }

        // Check routes
        fs.readFile(filePaht, (err, data) => {
            if (err) {
                if (err.code === "ENOENT") {
                    // Page not found
                    fs.readFile(path.join(__dirname, '404.html'), (err, data) => {
                        res.writeHead(200, { contentType });
                        res.end(data);
                    })
                } else {
                    // Server error
                    res.writeHead(500, { contentType });
                    res.end("<h1>Server Error</h1>");
                }
            } else {
                // Success

                res.writeHead(200, { contentType });
                res.end(data);
            }
        });
    }

})

// Listen the server
server.listen(port)