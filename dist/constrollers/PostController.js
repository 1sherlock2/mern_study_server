"use strict";

var _Post = require("../model/Post");

var _Login = require("../model/Login");

var jwt = require('jsonwebtoken');

var _require = require('express'),
    Router = _require.Router;

var router = Router();
// const user = require('../middleware/auth.middleware')


router.get('/:userId/posts', function (req, res) {
  try {
    _Post.PostModel.find({ userId: req.params.userId }).then(function (posts) {
      if (!posts) {
        return res.status(400).json({
          message: "this posts is not defined"
        });
      }
      res.json(posts);
    });
  } catch (e) {
    console.log(e.message);
  }
});

router.post('/:userId/set_post', function (req, res) {
  try {
    var data = req.body;
    console.log(data);
    var post = new _Post.PostModel({
      title: data.title,
      description: data.description,
      imageURL: data.imageURL,
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