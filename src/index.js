import mongoose from "mongoose"
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import PostController from "./constrollers/PostController";
import LoginController from "./constrollers/LoginController";
const {check} = require('express-validator')
const cookieParser = require('cookie-parser');

const Post = new PostController()
const Login = new LoginController()


const app = express();
app.use(cors({credentials: true, origin: true}))
mongoose.connect("mongodb+srv://1sherlock2:34896GAZ@cluster0-knqun.mongodb.net/express_study?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const optionByStatis = {
  dotfiles: 'allow',
  index: false,
  maxAge: '1d',
}

const optionByUrlencoded = {
  extended: true,
}

const optionByText = {
  defaultCharset: String,
}

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public',optionByStatis))
app.use(express.urlencoded(optionByUrlencoded))
app.use(cookieParser())
app.use(express.text(optionByText))

app.post('/posts', Post.create)
app.get('/posts', Post.index)
app.get('/posts/:id', Post.read)
app.delete('/posts/:id', Post.delete)
app.put('/posts/:id', Post.update)
app.post('/register',
  [
    check('email', "Uncorrected email").isEmail(),
    check("password", "Minimum password size 8 symbols").isLength({min: 8})
  ],
  Login.register)
app.post('/auth',
  [
    check("email", "Entry email correct").normalizeEmail().isEmail(),
    check("password", "Entry password").exists()
  ],
  Login.authentication)


app.listen(4000, () => {
  console.log('server was started')
})


// const express = require('express')
// const bodyParser = require('body-parser')
// const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/test')
// const app = express()
//
// const Stocks = mongoose.model('Stocks', {name: String})
// const stocks = new Stocks({name:'stocks'})
// stocks.save().then(() => console.log('stocks'))
// //
// // app.use(bodyParser({extended:true}))
// // app.use(bodyParser.json())
// //
// // const products = [
// //   {type: 'stocks',
// //   text: 'text'
// //   },
// //   {type: 'stocks',
// //     text: 'text'
// //   },
// //   {type: 'stocks',
// //     text: 'text'
// //   },
// //   {type: 'stocks',
// //     text: 'text'
// //   },
// //   {type: 'stocks',
// //     text: 'text'
// //   },
// //   {type: 'stocks',
// //     text: 'text'
// //   },
// // ]
// //
// // app.get('/stocks', (req,res) => {
// //   return res.send(products)
// // })
// //
// // app.get('/stocks/:id', (req,res) => {
// //   const id = req.params.id
// //   return res.send(products[id])
// // })
// //
// // app.post('stocks',(req,res) => {
// //   const data = req.body;
// //   products.push(data)
// //   return res.send(products)
// // })
// //
// //
// // app.listen(5000, () => {
// //   console.log('server was started')
// // })
//
// const arr = [1,2,3,4,5]
// const result = arr.map(element => element * 2)
// console.log(result)