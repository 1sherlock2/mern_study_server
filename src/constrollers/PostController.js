import {PostModel} from "../model/Post";
const jwt = require('jsonwebtoken')

class PostController {
  index(req, res) {
    try {
      PostModel.find().then((err, posts) => {
        if (err) {
          return res.send(err)
        }
        res.json(posts)
      })
    } catch (e) {
      console.log(e.message)
    }
  }

  create(req, res) {
    try {
      const data = req.body;
      console.log(data)
      const post = new PostModel({
        title: data.title,
        description: data.description,
        imageURL: data.imageURL,
        text: data.text
      })
      post.save().then(() => {
        res.send({status: 'ok'})
      })
      const createId = jwt.sign(
        {id: data.id}
      )
      res.json(createId)
    } catch (e) {
      console.log(e.message)
    }
  }

  read(req, res) {
    try {
      PostModel.findOne({_id: req.params.id}).then(post => {
        if (!post) {
          res.send({error: 'not found'})
        }
        res.json(post)

      })
    } catch (e) {
      console.log(e.message)
    }
  }

  update(req, res) {
    try {
      PostModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (err) => {
        if (err) {
          res.send(err)
        }
        res.json({status: 'updated'})
      })
    } catch (e) {
      console.log(e.message)
    }
  }

  delete(req, res) {
    try {
      PostModel.deleteOne({_id: req.params.id}).then(post => {
        if (post) {
          res.json({status: 'deleted'})
        } else {
          res.json({status: 'error'})
        }
      })
    } catch (e) {
      console.log(e.message)
    }
  }
}

export default PostController