import { PostModel } from '../model/Post';
import { LoginModel } from '../model/Login';
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const router = Router();
const multer = require('multer');

router.get('/:userId/posts', (req, res) => {
	try {
		PostModel.find({ userId: req.params.userId }).then(posts => {
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
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './img/');
	},
	filename: function (req, file, cb) {
		cb(null, new Date().toISOString() + file.originalname);
	}
});
const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
		cb(null, true);
	} else {
		cb(new Error('this image type is not correct'), false);
	}
};
const image = multer({ storage: storage, fileFilter: fileFilter });

router.post('/:userId/set_post', image.single('image'), (req, res) => {
	console.log(req.file);
	try {
		const data = req.body;
		console.log(data);
		const post = new PostModel({
			title: data.title,
			description: data.description,
			image: req.file.path,
			text: data.text,
			userId: req.params.userId
			// _userId: LoginModel.findOne({_id: userId}).populate('Login'),
		});
		post.save().then(() => {
			res.status(200).json({ post });
		});
		// const createId = jwt.sign(
		//   {id: data.id}
		// )
		// res.json(createId)
	} catch (e) {
		console.log(e.message);
	}
});

router.get('/post/:id', (req, res) => {
	try {
		PostModel.findById(req.params.id).then(post => {
			if (!post) {
				res.status(400).json({ message: 'not found' });
			}
			res.status(200).json(post);
		});
	} catch (e) {
		console.log(e.message);
	}
});

router.put('/update_post/:id', (req, res) => {
	try {
		PostModel.findByIdAndUpdate(req.params.id, { $set: req.body }, err => {
			if (err) {
				res.send(err);
			}
			res.json({ status: 'updated' });
		});
	} catch (e) {
		console.log(e.message);
	}
});

router.delete('/delete_post/:id', (req, res) => {
	try {
		PostModel.deleteOne({ _id: req.params.id }).then(post => {
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
