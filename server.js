const express = require('express');
const app = express();

//const base = "dist/";
const base = "";

const folders = ['css', 'data', 'html', 'images', 'js', 'node_modules'];
folders.forEach((ressource) => {
    app.use('/' + ressource, express.static(base + ressource));
});

const files = ['index.html', 'package.json', 'manifest.cache'];
files.forEach((ressource) => {
    const file = '/' + ressource;
    app.get(file, function (req, res) {
        res.sendFile(__dirname + '/' + base + file);
    });
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/' + base + '/index.html');
});

app.listen(80);