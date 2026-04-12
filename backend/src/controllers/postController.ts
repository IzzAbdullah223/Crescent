import { type Request, type Response } from 'express';
import { type postData } from '../libs/types.js';
import * as db from '../db/queries.js'
 


export async function createPost(req:Request,res:Response){

    if(!req.user){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
     
    const posterId = req.user.id
    const body:postData = req.body

    try{
        await db.createPost(posterId,body)
        return res.status(201).json({
            message:"Post created"
        })
    }
    catch(err){
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
 