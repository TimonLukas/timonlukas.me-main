#!/usr/bin/env nodejs
const http = require("http");

http.createServer((request, response) => {
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    response.end("Hello World!");
}).listen(8080, "localhost");

console.log("Server running at http://localhost:8080/");