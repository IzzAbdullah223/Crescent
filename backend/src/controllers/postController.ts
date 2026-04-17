import { type Request, type Response } from 'express';
 
import cloudinary from '../config/cloudinary.js'
import * as db from '../db/queries.js'
 


export async function createPost(req:Request,res:Response){

    if(!req.user){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    const posterId = req.user.id
    const content = req.body.content as string
    const githubRepo = req.body.githubRepo as string
    const tags = JSON.parse(req.body.tags) as string[] || []
    let media:string | null = null
    
    try{
        if (req.file) {
            const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
                resource_type: "auto" // change later on to auto when we allow videos and other media types
            })
      media = cloudinaryResult.secure_url
    }
        await db.createPost(posterId,content,tags,media,githubRepo)
        return res.status(201).json({
            message:"Post created"
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message:"Internal server error"
        })
    }
    
 
}

export async function getPosts(req:Request,res:Response){
    try{
        const posts = await db.getPosts()
      
        return res.status(200).json(posts)
    }
    catch(err){
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

export async function getUserPosts(req:Request,res:Response){
    const userId = Number(req.params.id)
    try{
        const posts = await db.getUserPosts(userId)
        return res.status(200).json(posts)
    }
    catch(err){
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

export async function getLikedPosts(req:Request,res:Response){
    if(!req.user){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    const userId = Number(req.user.id)
    console.log(userId)
    try{
        const posts = await db.getLikedPosts(userId)
        return res.status(200).json(posts)
    }
    catch(err){
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

export async function likePost(req:Request,res:Response){
    if(!req.user){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    const userId = req.user.id
    const postId = req.body.postId as number
   try{
        await db.likePost(userId,postId)
        return res.status(200).json({
            message:"Post liked"
        }) 
   }
   catch(err){
        return res.status(500).json({
            message:"Internal server error"
        })
   }

}

export async function unlikePost(req:Request,res:Response){
    if(!req.user){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    const userId = req.user.id
    const postId = req.body.postId as number    
    try{
        await db.unlikePost(userId,postId)
        return res.status(200).json({
            message:"Post unliked"
        }) 
   }    catch(err){
        return res.status(500).json({
            message:"Internal server error"
         })
    }
    
}