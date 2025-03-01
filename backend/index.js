const express=require("express")
const app=express();
const cors=require("cors")
const postRoute=require("./routes/post")
const PORT=8000;
const mongoose=require("mongoose")


//mongoDB connection 
mongoose.connect("mongodb://127.0.0.1:27017/discussion-forum").then(()=>{
    console.log("database conencted")
})

//middleWares 
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



//routes
app.use("/post",postRoute)



app.listen(PORT,()=>{
    console.log(`port running ar port ${PORT}`)
})
