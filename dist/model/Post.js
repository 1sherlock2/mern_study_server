'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PostModel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostSchema = new _mongoose.Schema({
	title: String,
	description: String,
	imageURL: String,
	text: String,
	// date: {type: Date, default: Date.now},
	userId: { type: _mongoose.Schema.Types.ObjectId, ref: 'Login' }
}, {
	timestamps: true
});

var PostModel = exports.PostModel = _mongoose2.default.model('Post', PostSchema);