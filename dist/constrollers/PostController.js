'use strict';

var _require = require('../model/Post'),
    PostModel = _require.PostModel;

var _require2 = require('express'),
    Router = _require2.Router;

var router = Router();

router.get('/:userId/posts', function (req, res) {
	try {
		PostModel.find({ userId: req.params.userId }).then(function (posts) {
			if (!posts) {
				return res.status(400).json({
					message: 'this posts is not defined'
				});
			}
			res.json(posts);
		});
	} catch (e) {
		console.log(e.message);
	}
});

router.post('/:userId/set_post', function (req, res) {
	console.log(req.file);
	try {
		var data = req.body;
		console.log(data);
		var post = new PostModel({
			title: data.title,
			description: data.description,
			imageURL: data.imageURL,
			text: data.text,
			userId: req.params.userId
		});
		post.save().then(function () {
			res.status(200).json({ post: post });
		});
	} catch (e) {
		console.log(e.message);
	}
});

router.get('/post/:id', function (req, res) {
	try {
		PostModel.findById(req.params.id).then(function (post) {
			if (!post) {
				res.status(400).json({ message: 'not found' });
			}
			res.status(200).json(post);
		});
	} catch (e) {
		console.log(e.message);
	}
});

router.put('/update_post/:id', function (req, res) {
	try {
		PostModel.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err) {
			if (err) {
				res.send(err);
			}
			res.json({ status: 'updated' });
		});
	} catch (e) {
		console.log(e.message);
	}
});

router.delete('/delete_post/:id', function (req, res) {
	try {
		PostModel.deleteOne({ _id: req.params.id }).then(function (post) {
			if (post) {
				res.json({ status: 'deleted' });
			} else {
				res.json({ status: 'error' });
			}
		});
	} catch (e) {
		console.log(e.message);
	}
});

module.exports = router;