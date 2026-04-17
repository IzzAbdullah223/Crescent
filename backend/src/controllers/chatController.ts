import {type Response, type Request } from 'express'
import * as db from '../db/queries.js'
import  {io} from '../app.js'


export async function getFriends(req:Request,res:Response){

    if(!req.user){
        return res.status(401).json({
            success:false,
            message:"Unauthorized"
        })
    }

    const userId = req.user.id
    try{
        const friends = await db.getUserFriends(userId)
        return res.status(200).json(friends)

    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export async function addFriend(req:Request,res:Response){
    if(!req.user){
        return res.status(401).json({
            success:false,
            message:"Unauthorized"
        })
    }

    const userId = req.user.id
    const friendId = Number(req.params.userId)
    try{
        await db.addFriend(userId,friendId)
        return res.status(200).json({
            success:true,
            message:"Friend added successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }   

}


export async function getDirectedMessages(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" })

    const senderId = req.user.id
    const recipientId = Number(req.params.id)

    try {
        const messages = await db.fetchDirectedMessages(senderId, recipientId)
        return res.status(200).json(messages)
    } catch (err) {
        return res.status(500).json({ message: "Failed to retrieve messages" })
    }
}

export async function postDirectedMessage(req: Request, res: Response) {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" })

    const senderId = req.user.id
    const recipientId = Number(req.params.id)
    const message = req.body.message as string | undefined

    if (!message?.trim()) return res.status(400).json({ message: "Message required" })

    try {
        const newMessage = await db.postDirectedMessage(senderId, recipientId, message)
        const roomId = `chat_${Math.min(senderId, recipientId)}_${Math.max(senderId, recipientId)}`
        io.to(roomId).emit('newMessage', newMessage)
        return res.status(201).json(newMessage)
    } catch (err) {
        return res.status(500).json({ message: "Failed to send message" })
    }
}