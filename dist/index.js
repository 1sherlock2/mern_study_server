"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _PostController = require("./constrollers/PostController");

var _PostController2 = _interopRequireDefault(_PostController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Post = new _PostController2.default();

var app = (0, _express2.default)();
app.use((0, _cors2.default)({ credentials: true, origin: true }));
_mongoose2.default.connect("mongodb+srv://1sherlock2:34896GAZ@cluster0-knqun.mongodb.net/express_study?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.post('/posts', Post.create);
app.get('/posts', Post.index);
app.get('/posts/:id', Post.read);
app.delete('/posts/:id', Post.delete);
app.put('/posts/:id', Post.update);

app.listen(4000, function () {
  console.log('server was started');
});

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