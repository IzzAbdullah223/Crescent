import {type Response, type Request } from 'express'
import * as db from '../db/queries.js'


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