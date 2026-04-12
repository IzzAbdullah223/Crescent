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

}