import { prisma } from "./lib/prisma.js";

export async function findUserByUsername(username:string){
    const existingUser = await prisma.user.findUnique({
        where:{username:username}
    })
    return existingUser
}


export async function signUp(username:string,fName:string,password:string){
    
     await prisma.user.create({
        data:{
            username:username,
            displayname:fName,
            password:password
        }
    })
}