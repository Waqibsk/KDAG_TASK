const express=require("express")
const app=express();
const cors=require("cors")
const postRoute=require("./routes/post")
const PORT=8000;
const mongoose=require("mongoose")
app.use(cors())


mongoose.connect("mongodb://127.0.0.1:27017/discussion-forum").then(()=>{
    console.log("database conencted")
})


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/post",postRoute)
app.listen(PORT,()=>{
    console.log(`port running ar port ${PORT}`)
})
