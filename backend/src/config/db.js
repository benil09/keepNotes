import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

export const connectDB =  async () =>{
    try {
      await   mongoose.connect(process.env.MONGO_URI)
      console.log("MongoDB connected 🔗 ")
    } catch (error) {
        console.error("Error connecting to mongoDB : ",error)
        process.exit(1) // 1 - exit with failure  0 - exit with success 
    }
}