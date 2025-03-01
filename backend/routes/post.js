const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = require("../models/Post");


//creating post 
router.post("/create", async (req, res) => {
  try {
    const { title, description, createdAt } = req.body;
    if(!title|| !description ){
    return res.json({message:"All fields required"})
    }
    // console.log(Date.now());
    const post = await Post.create({
      title,
      description,
      createdAt,
    });
    // console.log("this is the post", post);

    return res.json({ message: "ok" });
  } catch (err) {}
});

//getting all posts 
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (err) {
    console.log(err);

  }
});


//getting individual pages 
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  // console.log("this is the id i got",id);
  try {
    const post = await Post.findById(id);
    return res.json(post);
  } catch (err) {

    console.log(err);
  }
});

//getting comments of individual posts 
router.post("/:id/comment", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    
    const newComment = {
      text: req.body.text,
      _id: new mongoose.Types.ObjectId(),
    };
    post.comments.push(newComment);
    await post.save();

    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//deleting posts by their id 
router.post("/:id/delete", async (req, res) => {
  try {
    const id = req.params.id;
    await Post.findByIdAndDelete(id);
    return res.json({ message: "ok" });
  } catch (err) {}
});


//deleting  comment of a post  
router.post("/:postid/comment/:commentid", async (req, res) => {
  try {
    const { postid, commentid } = req.params;

    await Post.findByIdAndUpdate(postid, {
      $pull: { comments: { _id: commentid } },
    });

    
    return res.json({message:"ok"});
  } catch (err) {
    console.error("Error deleting comment:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
