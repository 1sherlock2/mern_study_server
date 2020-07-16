const { PostModel } = require('../model/Post');
const { Router } = require('express');
const router = Router();

router.get('/:userId/posts', (req, res) => {
	try {
		PostModel.find({ userId: req.params.userId }).then((posts) => {
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

router.post('/:userId/set_post', (req, res) => {
	console.log(req.file);
	try {
		const data = req.body;
		console.log(data);
		const post = new PostModel({
			title: data.title,
			description: data.description,
			imageURL: data.imageURL,
			text: data.text,
			userId: req.params.userId
		});
		post.save().then(() => {
			res.status(200).json({ post });
		});
	} catch (e) {
		console.log(e.message);
	}
});

router.get('/post/:id', (req, res) => {
	try {
		PostModel.findById(req.params.id).then((post) => {
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
		PostModel.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
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
		PostModel.deleteOne({ _id: req.params.id }).then((post) => {
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
