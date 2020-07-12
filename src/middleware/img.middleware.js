const multer = require('multer')
const express = require('express')
const app = express()

const multerMiddleware = app.use(multer({
  dest: './img/',
  rename: function (fieldName, fileName) {
    return fileName
  }
}))

module.exports = multerMiddleware
