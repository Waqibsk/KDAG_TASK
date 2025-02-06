const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

router.post("/create", async (req, res) => {
  try {
    const { title, description } = req.body;
    const post = await Post.create({
      title,
      description,
    });
    console.log("this is the post", post);
    await post.save();
    return res.json({ message: "ok" });
  } catch (err) {}
});
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (err) {}
});


router.get("/:id",async (req,res)=>{
const {id}=req.params;
console.log("this is the id i got",id);
try{
const post=await Post.findById(id);
return res.json(post);
}
catch(err){

}

})
module.exports = router;
