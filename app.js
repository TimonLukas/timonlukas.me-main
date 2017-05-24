#!/usr/bin/env nodejs
const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(express.static('public/favicon'));

app.use((request, response) => {
  response.sendFile(`${__dirname}/public/index.html`);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
