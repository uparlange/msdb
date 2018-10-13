const compression = require('compression');
const express = require('express');
const app = express();
app.use(compression());
app.use(express.static('.'));
//app.use(express.static('./dist'));
app.listen(80);