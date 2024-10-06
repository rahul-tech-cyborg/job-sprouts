import express from 'express';
import connectDB from './config/mongodb.js'
import 'dotenv/config' 
import cors from "cors"
import userRouter from './routes/userRoute.js';
import connectCloudinary from './config/cloudinary.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
connectDB();
connectCloudinary();

app.get('/',(req,res)=>{
    res.json({msg:"Get latest job updates"})
})

app.use('/api/user',userRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})