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
    key: "register",
    value: function register(req, res) {
      try {
        // const errors = validationResult(req)
        // if (errors.isEmpty()) {
        //   return res.status(400).json({message: "Email or password is not correct"})
        // }
        var _req$body = req.body,
            email = _req$body.email,
            password = _req$body.password;

        console.log(email, password);
        return _Login.LoginModel.findOne({ email: email }).then(function (element) {
          console.log(req.cookies);
          console.log(element);
          if (element) {
            return res.status(400).json({ message: 'It is user available' });
          } else {
            bcrypt.hash(password, 12).then(function (hashPassword) {
              var login = new _Login.LoginModel({
                email: email,
                password: hashPassword
              });
              console.log(login);
              login.save().then(function () {
                return res.status(200).json({
                  email: email,
                  password: hashPassword
                });
              });
            });
          }
        });
      } catch (e) {
        res.send(e.message);
      }
    }
  }, {
    key: "authentication",
    value: function authentication(req, res) {
      try {
        // const errors = validationResult(req)
        // if (errors.isEmpty()) {
        //   return res.status(400).json({
        //     errors: errors.array(),
        //     message: "Email or password is not correct"
        //   })
        // }
        var _req$body2 = req.body,
            email = _req$body2.email,
            password = _req$body2.password;

        console.log(email, password);
        return _Login.LoginModel.findOne({ email: email }).then(function (user) {
          console.log(user);
          if (!user) {
            return res.status(400).json({
              message: "It user is not found"
            });
          }
          var token = jwt.sign({ userId: user.id }, "express_study", { expiresIn: "1h" });
          bcrypt.compare(password, user.password).then(function (data) {
            if (!data) {
              return res.status(400).json({
                message: "Password is not correct"
              });
            }
          });
          return res.status(200).json({ token: token, userID: user.id });
        });
      } catch (e) {
        console.log(e.message);
      }
    }
  }]);

  return LoginController;
}();

exports.default = LoginController;