const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

router.post("/create", async (req, res) => {
  try {
    const { title, description, createdAt } = req.body;
    console.log(Date.now());
    const post = await Post.create({
      title,
      description,
      createdAt,
    });
    console.log("this is the post", post);

    return res.json({ message: "ok" });
  } catch (err) {}
});
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (err) {}
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  // console.log("this is the id i got",id);
  try {
    const post = await Post.findById(id);
    return res.json(post);
  } catch (err) {}
});
router.post("/:id/comment", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const newComment = { text: req.body.text };
    post.comments.push(newComment);
    await post.save();

    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
