import {LoginModel} from "../model/Login";
import {validationResult} from "express-validator";

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class LoginController {
  authentication(req, res) {
    try {
      // const errors = validationResult(req)
      // if (errors.isEmpty()) {
      //   return res.send({message: "Email or password is not correct"})
      // }
      const {email,password} = req.body
      LoginModel.findOne({email}).then(email => {
        if (email) {
          return res.send('It is user available')
        }
      })
      bcrypt.hash(password, 12).then(hashPassword => {
        const login = new LoginModel({
          email: email,
          password: hashPassword
        })
        login.save().then(() => {
          res.send({status: 'You was authentication'})
        })
      })
    } catch (e) {
      res.send(e.message)
    }
  }

  register(req, res) {
    try {
      const errors = validationResult(req)
      if (errors.isEmpty()) {
        return res.statusCode(400).json({
          errors: errors.array(),
          message: "Email or password is not correct"
        })
      }
      const data = req.body;
      LoginModel.findOne(data.email).then(user => {
        if (!user) {
          return res.statusCode(400).json({
            message: "It user is not found"
          })
        }
        const token = jwt.sign(
          {userId: user.id},
          "express_study",
          {expiresIn: "1h"}
        )
        res.json(token)
      })
      bcrypt.compare(data.email, data.password).then(data => {
        if (!data) {
          return res.statusCode(400).json({
            message: "Password is not correct"
          })
        }
      })
    } catch (e) {
      res.statusCode(400).json({
        message: "Error happened, try connecting again later"
      })
    }
  }
}

export default LoginController;