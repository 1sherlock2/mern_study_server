'use strict';

var _Post = require('../model/Post');

var _Login = require('../model/Login');

var jwt = require('jsonwebtoken');

var _require = require('express'),
    Router = _require.Router;

var router = Router();
var multer = require('multer');

router.get('/:userId/posts', function (req, res) {
	try {
		_Post.PostModel.find({ userId: req.params.userId }).then(function (posts) {
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

// image property
var storage = multer.diskStorage({
	destination: function destination(req, file, cb) {
		cb(null, './img/');
	},
	filename: function filename(req, file, cb) {
		cb(null, new Date().toISOString() + file.originalname);
	}
});
var fileFilter = function fileFilter(req, file, cb) {
	if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
		cb(null, true);
	} else {
		cb(new Error('this image type is not correct'), false);
	}
};
var image = multer({ storage: storage, fileFilter: fileFilter });

router.post('/:userId/set_post', image.single('image'), function (req, res) {
	console.log(req.file);
	try {
		var data = req.body;
		console.log(data);
		var post = new _Post.PostModel({
			title: data.title,
			description: data.description,
			image: req.file.path,
			text: data.text,
			userId: req.params.userId
			// _userId: LoginModel.findOne({_id: userId}).populate('Login'),
		});
		post.save().then(function () {
			res.status(200).json({ post: post });
		});
		// const createId = jwt.sign(
		//   {id: data.id}
		// )
		// res.json(createId)
	} catch (e) {
		console.log(e.message);
	}
});

router.get('/post/:id', function (req, res) {
	try {
		_Post.PostModel.findById(req.params.id).then(function (post) {
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
		_Post.PostModel.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err) {
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
		_Post.PostModel.deleteOne({ _id: req.params.id }).then(function (post) {
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