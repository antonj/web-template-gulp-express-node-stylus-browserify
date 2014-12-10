/*global require, exports, module, __dirname, process*/
'use strict';

var path = require('path'),
    appRoot = __dirname,
    publicPath = path.join(appRoot, '/public'),
    viewsPath = path.join(appRoot, '/views');

var config = {
  appRoot : appRoot,
  publicPath : publicPath,
  viewsPath : viewsPath
};

module.exports = config;
