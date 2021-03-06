'use strict';

var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var auth = require('./constrollers/LoginController');
var postById = require('./constrollers/PostController');
var multer = require('multer');
var app = express();
var config = require('config');

var PORT = config.get('port');

var urlencodedFalse = bodyParser.urlencoded({ extended: false });
var bodyParserJsonTrue = bodyParser.json({
	inflate: true,
	strict: true
});

app.use(cors({ credentials: true, origin: true }));

// routers
app.use('/api', urlencodedFalse, bodyParserJsonTrue, auth);
app.use('/api', urlencodedFalse, bodyParserJsonTrue, postById);

mongoose.connect(config.get('mongoUri'), {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
	useCreateIndex: true
});

app.listen(PORT, function () {
	console.log('server was started');
});

// import mongoose from "mongoose"
// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import PostController from "./constrollers/PostController";
// import LoginController from "./constrollers/LoginController";
// import {body} from "express-validator";
//
// const {check} = require('express-validator')
// const cookieParser = require('cookie-parser');
//
// const Post = new PostController()
// const Login = new LoginController()
//
//
// const app = express();
// app.use(cors({credentials: true, origin: true}))
// mongoose.connect("mongodb+srv://1sherlock2:34896GAZ@cluster0-knqun.mongodb.net/express_study?retryWrites=true&w=majority", {
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// })
// let urlencodedFalse = bodyParser.urlencoded({extended: false})
// let bodyParserJsonTrue = bodyParser.json({
//   inflate: true,
//   strict: true
// })
// let expressStatic = (express.static('public', {
//   dotfiles: 'allow',
//   index: false,
//   maxAge: '1d',
// }))
// // app.use(cookieParser({}))
// // app.use(bodyParser.text({
// //   defaultCharset: String,
// // }))
//
// app.post('/posts/', Post.create)
// app.get('/posts', Post.index)
// app.get('/posts/:id', Post.read)
// app.delete('/posts/:id', Post.delete)
// app.put('/posts/:id', Post.update)
// app.post('/register',urlencodedFalse,bodyParserJsonTrue,
//   // [
//   //   check('email', "Uncorrected email").isEmail(),
//   //   check("password", "Minimum password size 8 symbols").isLength({min: 8})
//   // ],
//   Login.register)
// app.post('/auth', urlencodedFalse,bodyParserJsonTrue,
//   // [
//   //   check("email", "Entry email correct").normalizeEmail().isEmail(),
//   //   check("password", "Entry password").exists()
//   // ],
//   Login.authentication)
//
//
// app.listen(4000, () => {
//   console.log('server was started')
// })
//
//