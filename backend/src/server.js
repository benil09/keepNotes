import express from "express";
import notesRoute from "./Routes/notes.routes.js"
import cors from "cors"
import dotenv from "dotenv"

import { connectDB } from "./config/db.js";
import rateLimiter from "./middlewares/rateLimiter.js";

dotenv.config()

const app=express();
const PORT = process.env.PORT || 8000 ;


app.use(cors({
    origin:"http://localhost:5173",
    
}))
app.use(express.json()) // allows us to get the values such as req.body or req.params 
app.use(rateLimiter)


app.use("/api/notes",notesRoute)


connectDB().then(()=>{

    app.listen(PORT,(req,res)=>{
        console.log("server started ⏿  ")
    })
})