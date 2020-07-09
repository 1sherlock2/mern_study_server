"use strict";

var _Post = require("../model/Post");

var _Login = require("../model/Login");

var jwt = require('jsonwebtoken');

var _require = require('express'),
    Router = _require.Router;

var router = Router();
var user = require('../middleware/auth.middleware');

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
      // _userId: LoginModel.findOne({_id: userId}).populate('Login'),
      userId: req.params.userId
    });
    post.save().then(function () {
      res.status(400).json({
        message: post
      });
    });
    // const createId = jwt.sign(
    //   {id: data.id}
    // )
    // res.json(createId)
  } catch (e) {
    console.log(e.message);
  }
});

router.post('/:userId/post/:id', function (req, res) {
  try {
    _Post.PostModel.findOne({ _id: req.params.id }).then(function (post) {
      if (!post) {
        res.status(400).json({ message: 'not found' });
      }
      res.json(post);
    });
  } catch (e) {
    console.log(e.message);
  }
});

router.put('/:userId/update_post/:id', function (req, res) {
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

router.delete('/:userId/delete_post/:id', function (req, res) {
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