'use strict';

var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    var token = req.headers.authorizations.split('')[1];

    if (!token) {
      return res.status(401).json({
        message: "Not authorizations"
      });
    }

    var decoded = jwt.verify(token, 'express_study');
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({
      message: "Not authorizations"
    });
  }
};