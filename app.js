#!/usr/bin/env nodejs
const express = require("express");
const bodyParser = require("body-parser");

const port = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(bodyParser.json());

app.use((request, response) => {
    console.log(JSON.stringify(request.body, null, 2));
    response.end();
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

console.log("Server running at http://localhost:8080/");