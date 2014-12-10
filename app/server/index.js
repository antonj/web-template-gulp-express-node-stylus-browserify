/*global require, exports, module, __dirname, process*/
'use strict';

var express = require('express'),
    config = require('./config'),
    app = express(),
    path = require('path');

app.set('view engine', 'jade');
app.set('view options', { pretty: true });
app.set('views', config.viewsPath);
app.use(express.static(config.publicPath));

app.get('/', function(req, res) {
  res.render('index', {});
});

module.exports = app;
