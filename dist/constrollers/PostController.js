'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Post = require('../model/Post');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var jwt = require('jsonwebtoken');

var PostController = function () {
  function PostController() {
    _classCallCheck(this, PostController);
  }

  _createClass(PostController, [{
    key: 'index',
    value: function index(req, res) {
      try {
        _Post.PostModel.find().then(function (err, posts) {
          if (err) {
            return res.send(err);
          }
          res.json(posts);
        });
      } catch (e) {
        console.log(e.message);
      }
    }
  }, {
    key: 'create',
    value: function create(req, res) {
      try {
        var data = req.body;
        console.log(data);
        var post = new _Post.PostModel({
          title: data.title,
          description: data.description,
          imageURL: data.imageURL,
          text: data.text
        });
        post.save().then(function () {
          res.send({ status: 'ok' });
        });
        var createId = jwt.sign({ id: data.id });
        res.json(createId);
      } catch (e) {
        console.log(e.message);
      }
    }
  }, {
    key: 'read',
    value: function read(req, res) {
      try {
        _Post.PostModel.findOne({ _id: req.params.id }).then(function (post) {
          if (!post) {
            res.send({ error: 'not found' });
          }
          res.json(post);
        });
      } catch (e) {
        console.log(e.message);
      }
    }
  }, {
    key: 'update',
    value: function update(req, res) {
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
    }
  }, {
    key: 'delete',
    value: function _delete(req, res) {
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
    }
  }]);

  return PostController;
}();

exports.default = PostController;