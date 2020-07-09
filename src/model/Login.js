import mongoose, {Schema, Types} from "mongoose";

const LoginSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true, minlength: 8},
})

export const LoginModel = mongoose.model("Login", LoginSchema)