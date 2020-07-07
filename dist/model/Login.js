"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginModel = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoginSchema = new _mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 }
  // link: [{type: Types.ObjectId, ref:'Link'}]
});

var LoginModel = exports.LoginModel = _mongoose2.default.model("Login", LoginSchema);