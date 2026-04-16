import { Router } from "express";
import { verifyToken } from "../controllers/authController.js";
import { upload } from "../middleware/multer.js";
import { getFriends,addFriend } from "../controllers/chatController.js";



export const chatRouter = Router()

chatRouter.get('/chat/friends',verifyToken,getFriends)
chatRouter.post('/chat/friends/:userId',verifyToken,addFriend)

//chatRouter.get('/chats/friends',verifyToken,getUserFriends)