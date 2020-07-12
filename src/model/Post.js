import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema({
  title: String,
  description: String,
  // image: {data: Buffer, contentType: String},
  imageURL: String,
  text: String,
  // date: {type: Date, default: Date.now},
  userId: {type: Schema.Types.ObjectId, ref: 'Login'},
},{
  timestamps: true
})

export const PostModel = mongoose.model("Post", PostSchema)

