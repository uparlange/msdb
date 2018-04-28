const express = require('express');
const app = express();

const folders = ['css', 'data', 'html', 'images', 'js', 'node_modules'];
folders.forEach((ressource) => {
    app.use('/' + ressource, express.static(ressource));
});

const files = ['index.html', 'package.json'];
files.forEach((ressource) => {
    const file = '/' + ressource;
    app.get(file, function (req, res) {
        res.sendFile(__dirname + file);
    });
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(80);