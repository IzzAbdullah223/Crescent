import { Router } from "express";
import { verifyToken } from "../controllers/authController.js";
import { getFriends, addFriend } from "../controllers/chatController.js";
import { getDirectedMessages, postDirectedMessage } from "../controllers/chatController.js";

export const chatRouter = Router()

chatRouter.get('/chat/friends', verifyToken, getFriends)
chatRouter.post('/chat/friends/:userId', verifyToken, addFriend)
chatRouter.get('/chat/:id/messages', verifyToken, getDirectedMessages)
chatRouter.post('/chat/:id/messages', verifyToken, postDirectedMessage)