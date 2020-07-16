const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const PostSchema = new Schema(
	{
		title: String,
		description: String,
		imageURL: String,
		text: String,
		// date: {type: Date, default: Date.now},
		userId: { type: Schema.Types.ObjectId, ref: 'Login' }
	},
	{
		timestamps: true
	}
);

var PostModel = (exports.PostModel = mongoose.model('Post', PostSchema));
// module.exports = PostModel;
