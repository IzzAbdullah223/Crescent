import {type Request, type Response} from 'express'
import * as db from '../db/queries.js'
import {profileSchema } from '../db/lib/types.js'
import cloudinary from '../config/cloudinary.js'

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
        const users = await db.SearchUserByUsername(req.query.username as string)
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


export async function changeProfilePicture(req:Request,res:Response){
    const userId = Number(req.params.id)
    let imageUrl:string =''
 
     try{
        if (req.file) {
                const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
                resource_type: "image"
            })
              imageUrl = cloudinaryResult.secure_url
            }
                await db.changeProfilePicture(userId,imageUrl)
                return res.status(200).json({
                    message:"success"
                })
    }catch(e){
        return res.status(200).json({
            message:"Failure"
        })
    }
    
}

export async function updateProfile(req:Request,res:Response){
    if(!req.user){
        return res.status(401).json({
            error:"Unauthorized"
        })
    }

    const userId = Number(req.user.id)
    const body:unknown = req.body

    const parseResult = profileSchema.safeParse(body)

    if(!parseResult.success){
        return res.status(400).json({
            error:"Invalid request body"
        })
    }

    try{
        await db.updateProfile(userId,parseResult.data.displayName,parseResult.data.bio,parseResult.data.website,parseResult.data.github)
        return res.status(200).json({
             message:"Profile updated successfully"
        })
    }
    catch(err){
        console.error(err)
        return res.status(500).json({ error: 'Internal server error' })
    }
}