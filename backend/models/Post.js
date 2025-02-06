const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const commentSchema = new Schema({
  text: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const postSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  comments:[commentSchema]
});

const Post = model("post", postSchema);
module.exports = Post;
