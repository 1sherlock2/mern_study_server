"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Login = require("../model/Login");

var _expressValidator = require("express-validator");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var LoginController = function () {
  function LoginController() {
    _classCallCheck(this, LoginController);
  }

  _createClass(LoginController, [{
    key: "authentication",
    value: function authentication(req, res) {
      try {
        // const errors = validationResult(req)
        // if (errors.isEmpty()) {
        //   return res.send({message: "Email or password is not correct"})
        // }
        var _req$body = req.body,
            email = _req$body.email,
            password = _req$body.password;

        _Login.LoginModel.findOne({ email: email }).then(function (email) {
          if (email) {
            return res.send('It is user available');
          }
        });
        bcrypt.hash(password, 12).then(function (hashPassword) {
          var login = new _Login.LoginModel({
            email: email,
            password: hashPassword
          });
          login.save().then(function () {
            res.send({ status: 'You was authentication' });
          });
        });
      } catch (e) {
        res.send(e.message);
      }
    }
  }, {
    key: "register",
    value: function register(req, res) {
      try {
        var errors = (0, _expressValidator.validationResult)(req);
        if (errors.isEmpty()) {
          return res.statusCode(400).json({
            errors: errors.array(),
            message: "Email or password is not correct"
          });
        }
        var data = req.body;
        _Login.LoginModel.findOne(data.email).then(function (user) {
          if (!user) {
            return res.statusCode(400).json({
              message: "It user is not found"
            });
          }
          var token = jwt.sign({ userId: user.id }, "express_study", { expiresIn: "1h" });
          res.json(token);
        });
        bcrypt.compare(data.email, data.password).then(function (data) {
          if (!data) {
            return res.statusCode(400).json({
              message: "Password is not correct"
            });
          }
        });
      } catch (e) {
        res.statusCode(400).json({
          message: "Error happened, try connecting again later"
        });
      }
    }
  }]);

  return LoginController;
}();

exports.default = LoginController;