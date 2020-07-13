'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImagePostModel = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImagePost = new _mongoose.Schema({ image: String });

var ImagePostModel = exports.ImagePostModel = _mongoose2.default.model('ImagePost', ImagePost);