import { prisma } from "./lib/prisma.js";
import { type postData } from '../libs/types.js';

export async function signUp(username:string,fName:string,password:string){
    
     await prisma.user.create({
        data:{
            username:username,
            displayname:fName,
            password:password
        }
    })
}


export async function getUser(username:string){
    const user = await prisma.user.findUnique({
        where:{username:username},
        select:{
            username:true,
            displayname:true,
            pictureURL:true
        }
    })

    return user 
}



export async function findUserByUsername(username:string){
    const existingUser = await prisma.user.findUnique({
        where:{username:username}
    })
    return existingUser
}

export async function createPost(posterId:number,data:postData){
    await prisma.post.create({
        data:{
            posterId:posterId,
            content:data.content ?? null,
            imageURL:data.pictureURL ?? null,
            tags:data.tags?? []
        }
    })
}

export async function getPosts(){
    return await prisma.post.findMany({
        include:{
            poster:{
                select:{
                    username:true,
                    displayname:true,
                    pictureURL:true,
                }
            }
        }
    })
}