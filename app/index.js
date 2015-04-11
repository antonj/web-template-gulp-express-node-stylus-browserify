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
  var http = require('./http/rxhttp');
  var Rx = require('rx');
  var obs = http.get("https://httpbin.org/get", {});
  // obs = Rx.Observable.range(1, 6);
  obs = Rx.Observable.from([4,5,6, 1, 10]);
  http.cacheObs('anton', obs.take(1))
    .subscribe(function(data) {
      console.log(data);
      res.render('index', {msg: 'got data', data: JSON.stringify(data)});
    }, function (e) {
      console.log('fail', e);
    });
});

module.exports = app;
