'use strict';

var _require = require('mongoose'),
    Schema = _require.Schema;

var mongoose = require('mongoose');

var PostSchema = new Schema({
	title: String,
	description: String,
	imageURL: String,
	text: String,
	// date: {type: Date, default: Date.now},
	userId: { type: Schema.Types.ObjectId, ref: 'Login' }
}, {
	timestamps: true
});

var PostModel = exports.PostModel = mongoose.model('Post', PostSchema);
// module.exports = PostModel;