import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import {createServer} from 'http'
import {Server} from 'socket.io'
import './config/passport.js'
import cors from 'cors'
import { authRouter } from "./routes/auth.js";
import { userRouter } from "./routes/user.js";
import { postRouter } from "./routes/post.js";
import { chatRouter } from "./routes/chat.js";

const app = express()

const httpServer = createServer(app)

export const io = new Server(httpServer, {
    cors: {origin: '*'}
})


io.on('connection', (socket) => {          
    socket.on('join_room', (roomId: string) => {
        socket.join(roomId)               
    })
    socket.on('leave_room', (roomId: string) => {
        socket.leave(roomId)          
    })
})


app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://crescent-nu.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());
app.use('/',authRouter)
app.use('/',userRouter)
app.use('/',postRouter)
app.use('/',chatRouter)
 

const PORT = process.env.PORT || 3000

httpServer.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost: ${PORT}`)
})
