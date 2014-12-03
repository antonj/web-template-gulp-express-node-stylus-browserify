/*global require, exports, module, __dirname, process*/
'use strict';

var express = require('express');
var app = module.exports.app = exports.app = express();
var path = require('path');

// app.use(require('connect-livereload')());
app.set('view engine', 'jade');
app.set('view options', { pretty: true });
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('index', {});
});

var port = Number(process.env.PORT || 3000);
app.listen(port, function() {
  console.log("Listening  http://127.0.0.1:" + port);
});
