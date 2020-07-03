import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema({
  title: String,
  description: String,
  imageURL: String,
  text: String
},{
  timestamps: true
})

export const PostModel = mongoose.model("Post", PostSchema)

