import mongoose, {Schema,Types} from "mongoose";

const LoginSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true, minlength: 8},
  link: [{type: Types.ObjectId, ref:'Link'}]
})

export const LoginModel = mongoose.model("Login", LoginSchema )