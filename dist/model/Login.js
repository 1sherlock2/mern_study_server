'use strict';

var _require = require('mongoose'),
    Schema = _require.Schema;

var mongoose = require('mongoose');

var LoginSchema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, minlength: 8 }
});

var LoginModel = exports.LoginModel = mongoose.model('Login', LoginSchema);

// module.exports = LoginModel;