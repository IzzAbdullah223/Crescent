import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import './config/passport.js'
import cors from 'cors'
import { authRouter } from "./routes/auth.js";
import { userRouter } from "./routes/user.js";
import { postRouter } from "./routes/post.js";

const app = express()

app.use(cors());
app.use(express.json());
app.use('/',authRouter)
app.use('/',userRouter)
app.use('/',postRouter)
 

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost: ${PORT}`)
})
