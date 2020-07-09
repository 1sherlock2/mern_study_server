import {PostModel} from "../model/Post";
import {LoginModel} from "../model/Login";

const jwt = require('jsonwebtoken')
const {Router} = require('express')
const router = Router()
const user = require('../middleware/auth.middleware')


router.get('/:userId/posts', (req, res) => {
  try {
    PostModel.find({userId: req.params.userId}).then((posts) => {
      if (!posts) {
        return res.status(400).json({
          message: "this posts is not defined"
        })
      }
      res.json(posts)
    })
  } catch (e) {
    console.log(e.message)
  }
})

router.post('/:userId/set_post', (req, res) => {
  try {
    const data = req.body
    console.log(data)
    const post = new PostModel({
      title: data.title,
      description: data.description,
      imageURL: data.imageURL,
      text: data.text,
      // _userId: LoginModel.findOne({_id: userId}).populate('Login'),
      userId: req.params.userId,
    })
    post.save().then(() => {
      res.status(400).json({
        message: post,
      })
    })
    // const createId = jwt.sign(
    //   {id: data.id}
    // )
    // res.json(createId)
  } catch (e) {
    console.log(e.message)
  }
})

router.post('/:userId/post/:id', (req, res) => {
  try {
    PostModel.findOne({_id: req.params.id}).then(post => {
      if (!post) {
        res.status(400).json({message: 'not found'})
      }
      res.json(post)
    })
  } catch (e) {
    console.log(e.message)
  }
})

router.put('/:userId/update_post/:id', (req, res) => {
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
})

router.delete('/:userId/delete_post/:id', (req, res) => {
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
})


module.exports = router