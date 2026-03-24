import dotenv from "dotenv";
dotenv.config();
import express from 'express'

const app = express()

app.get("/",(req,res) =>{
    res.send("Test this route")
})

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost: ${PORT}`)
})
