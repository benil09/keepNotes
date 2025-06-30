import express from "express";
import notesRoute from "./Routes/notes.routes.js"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"

import { connectDB } from "./config/db.js";
import rateLimiter from "./middlewares/rateLimiter.js";

dotenv.config()

const app=express();
const PORT = process.env.PORT || 8000 ;
const __dirname=path.resolve();

if(process.env.NODE_ENV !== "production"){
    app.use(cors({
    origin:"http://localhost:5173",
    
}))

}


app.use(express.json()) // allows us to get the values such as req.body or req.params 
app.use(rateLimiter)


app.use("/api/notes",notesRoute)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
})

}



connectDB().then(()=>{

    app.listen(PORT,(req,res)=>{
        console.log("server started ⏿  ")
    })
})