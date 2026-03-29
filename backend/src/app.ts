import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import './config/passport.js'
import cors from 'cors'
import { authRouter } from "./routes/auth.js";

const app = express()

app.use(cors());
app.use(express.json());
app.use('/',authRouter)
 

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost: ${PORT}`)
})
