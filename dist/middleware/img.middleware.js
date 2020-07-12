'use strict';

var multer = require('multer');
var express = require('express');
var app = express();

var multerMiddleware = app.use(multer({
  dest: './img/',
  rename: function rename(fieldName, fileName) {
    return fileName;
  }
}));

module.exports = multerMiddleware;