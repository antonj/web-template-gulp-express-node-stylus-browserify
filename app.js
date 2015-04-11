/*global require, exports, module, __dirname, process*/
'use strict';

var server = require('./app/');

var port = Number(process.env.PORT || 3000);
server.listen(port, function() {
  console.log("Listening  http://127.0.0.1:" + port);
});
