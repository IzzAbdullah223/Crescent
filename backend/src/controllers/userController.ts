import {type Request, type Response} from 'express'
import * as db from '../db/queries.js'

export async function getUser(req: Request, res: Response) {


  if (!req.user) {
    return res.status(401).json({
      error: "Unauthorized"
    })
  }

    try {
        const user = await db.getUser(req.user?.username)
        if(!user){
            return res.status(404).json({
                error:"User not found"
            })
        }
            return res.status(200).json(user)

    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Internal server error' })
    }



}

export async function searchUsers(req: Request, res: Response) {
    if(!req.user){
        return res.status(401).json({
            error:"Unauthorized"
        })
    }

    try{
        const users = await db.findUserByUsername(req.query.username as string)
        return res.status(200).json(users)
    }
    catch(err){
        console.error(err)
        return res.status(500).json({ error: 'Internal server error' })
    }
  
  
}

export async function getUserByID(req: Request, res: Response) {
    if (!req.user) {
        return res.status(401).json({
            error: "Unauthorized"
        })
    }
    const userId = Number(req.params.id) 
    try {
        const user = await db.findUserByID(userId)
        if (!user) {
            return res.status(404).json({
                error: "User not found"
            })
        }
        return res.status(200).json(user)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Internal server error' })
    }
}