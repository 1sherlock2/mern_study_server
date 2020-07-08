import {LoginModel} from "../model/Login";
import {validationResult} from "express-validator";

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class LoginController {
  register(req, res) {
    try {
      // const errors = validationResult(req)
      // if (errors.isEmpty()) {
      //   return res.status(400).json({message: "Email or password is not correct"})
      // }
      const {email, password} = req.body
      console.log(email, password)
      return LoginModel.findOne({email}).then(element => {
        // console.log(req.cookies)
        console.log(element)
        if (element) {
          return res.status(400).json({message: 'It is user available'})
        } else {
          bcrypt.hash(password, 12).then(hashPassword => {
            const login = new LoginModel({
              email: email,
              password: hashPassword
            })
            console.log(login)
            login.save().then(() => {
              return res.status(200).json({
                email: email,
                password: hashPassword
              })
            })
          })
        }
      })
    } catch (e) {
      res.send(e.message)
    }
  }

  authentication(req, res) {
    try {
      // const errors = validationResult(req)
      // if (errors.isEmpty()) {
      //   return res.status(400).json({
      //     errors: errors.array(),
      //     message: "Email or password is not correct"
      //   })
      // }
      const {email, password} = req.body;
      console.log(email, password)
      return LoginModel.findOne({email}).then((user) => {
        console.log(user)
        if (!user) {
          return res.status(400).json({
            message: "It user is not found"
          })
        }
        const token = jwt.sign(
          {userId: user.id},
          "express_study",
          {expiresIn: "1h"}
        )
        bcrypt.compare(password, user.password).then(data => {
          if (!data) {
            return res.status(400).json({
              message: "Password is not correct"
            })
          }
        })
        return res.status(200).json({token, userID: user.id})
      })
    } catch (e) {
      console.log(e.message)
    }
  }
}

export default LoginController;


