const mongoose=require("mongoose")
const {model,Schema}=mongoose;
const postSchema=new Schema({

    title:{
        type:String,
    },
    description:{
        type:String,
    }
})


const Post=model("post",postSchema);
module.exports=Post