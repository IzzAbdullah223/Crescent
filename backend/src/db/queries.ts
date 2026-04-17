import e from "express";
import { prisma } from "./lib/prisma.js";
 
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
            id:true,
            username:true,
            displayname:true,
            pictureURL:true
        }
    })

    return user 
}



export async function SearchUserByUsername(username:string){
    const existingUser = await prisma.user.findMany({
        where:{username:
            {
                contains:username,
                mode:"insensitive"
            }
        },
        select:{
            id:true,
            username:true,
            displayname:true,
            pictureURL:true
        }
    })
    return existingUser
}

export async function findUserByID(id:number){
    const user = await prisma.user.findUnique({
        where:{id:Number(id)},
        select:{
            id:true,
            username:true,
            displayname:true,
            pictureURL:true,
            bio:true,
            website:true,
            githubLink:true
        }
    })
    return user
}

export async function changeProfilePicture(Id:number,image:string){
     await prisma.user.update({
        where:{id:Id},
        data:{pictureURL:image}
     })
}


export async function updateProfile(userId:number,displayName:string,bio?:string,website?:string,github?:string){
    await prisma.user.update({
        where:{id:userId},
        data:{
            displayname:displayName,
            bio:bio ?? '',
            website:website ?? '',
            githubLink:github ?? ''
        }
    })
}

export async function createPost(posterId:number,content:string,tags:string[],media:string | null,githubRepo:string){
    await prisma.post.create({
        data:{
            posterId:posterId,
            content:content ?? null,
            mediaURL:media ?? null,
            githubRepo:githubRepo ?? null,
            tags:tags
        }
    })
}

export async function getPosts(){
    return await prisma.post.findMany({
        include:{
            poster:{
                select:{
                    id:true,
                    username:true,
                    displayname:true,
                    pictureURL:true,
                }
            },
            likes:{
                select:{
                    userId:true,
                    postId:true,
                }
            }
        }
        
    })
}

export async function getUserPosts(userId:number){
    return await prisma.post.findMany({
        where:{posterId:userId},
        include:{
            poster:{
                select:{
                    id:true,
                    username:true,
                    displayname:true,
                    pictureURL:true,
                }
            },
            likes:{
                select:{
                    userId:true,
                    postId:true,
                }
            }
        }
    })
}

export async function getLikedPosts(userId:number){
     const posts = await prisma.like.findMany({
        where:{userId:userId},
        include:{
            post:{
                include:{
                    poster:{
                        select:{
                            id:true,
                            username:true,
                            displayname:true,
                            pictureURL:true,
                        }
                    },
                    likes:{
                        select:{
                            userId:true,
                            postId:true,
                        }
                    }
                }
            }
        }
     })
    return posts.map(like=>like.post)
}


export async function likePost(userId:number,postId:number){
    await prisma.like.create({
        data:{
            userId:userId,
            postId:postId
        }
    })
}

export async function unlikePost(userId:number,postId:number){
    await prisma.like.delete({
        where:{
            userId_postId:{
                userId:userId,
                postId:postId
            }
        }
    })
}

export async function getUserFriends(userId: number) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            friends: {
                select: {
                    id: true,
                    username: true,
                    displayname: true,
                    pictureURL: true,
                }
            }
        }
    })
    return user!.friends
}

export async function addFriend(userId: number, friendId: number) { //right now this is one sided fix it later 
    await prisma.user.update({
        where: { id: userId },
        data: {
            friends: {
                connect: { id: friendId }
            }
        }
    })
}




export async function fetchDirectedMessages(senderId: number, recipientId: number) {
    return await prisma.message.findMany({
        where: {
            OR: [
                { senderId: senderId, recipentId: recipientId },
                { senderId: recipientId, recipentId: senderId }
            ]
        },
        include: {
            sender: {
                select: { username: true, displayname: true, pictureURL: true }
            }
        },
        orderBy: { date: 'asc' }
    })
}

export async function postDirectedMessage(senderId: number, recipientId: number, message?: string) {
    return await prisma.message.create({
        data: {
            senderId,
            recipentId: recipientId,
            content: message ?? null,
        },
        include: {
            sender: {
                select: { username: true, displayname: true, pictureURL: true }
            }
        }
    })
}