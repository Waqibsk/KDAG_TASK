const express=require("express")
const router=express.Router();

const Post = require("../models/Post");

router.post("/create", async (req, res) => {
  try {
    const { title, description } = req.body;
    const post = await  Post.create({
      title,
      description,
    });
    console.log("this is the post",post.title)
    await post.save();
    return res.json({ message: "ok" });
  } catch (err) {}
});
router.get("/",async (req,res)=>{
    try{
        const posts=await Post.find({});
        res.json(posts)
    }
    catch(err){
            
    }
    
}

)
module.exports=router
