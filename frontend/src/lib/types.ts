import {z} from 'zod'



export const signUpSchema = z.object({
    username: z.string().trim().min(2,'Username should be at least 2 characters.'),
    displayname:z.string().trim().min(1,'Username cannot be empty'),
    password: z.string().trim().min(5,'Password should be atleast 5 characters'),
    confirmPassword: z.string().trim().min(5,'Password should be at least 5 characters')
}).refine(data=>data.password===data.confirmPassword,{
    message:"Password must match",
    path: ["confirmPassword"]
})

export type TSignUpSchema = z.infer<typeof signUpSchema>


export const profileSchema = z.object({
  displayName: z.string().min(1, 'Name required').max(50),
  bio: z.string().max(160).optional(),
website: z.literal('').or(z.string().url('Invalid URL')).optional(),
github: z.literal('').or(z.string().url('Invalid URL')).optional(),
})
export type TProfileSchema = z.infer<typeof profileSchema>

export type Follow ={
    id:number,
    followerId:number,
    followingId:number
}

export type user={
    id:number,
    username:string
    displayname:string,
    pictureURL:string,
    bio:string,
    githubLink:string,
    website:string,
    followers: Follow[]
    following: Follow[]
    _count:{
        posts:number
    }
}

export type postData={
    content?:string
    tags?:string[]
    mediaURL?:File | null
    githubRepo?:string
}

export type Like={
    id:number,
    userId:number,
    postId:number
}

export type feedData={
    id:number,
    content:string,
    mediaURL:string,
    tags:string[],
    poster:{
        id:number,
        username:string,
        displayname:string,
        pictureURL:string
    }
    likes:Like[]
    _count:{
        comments:number
    }
}

export type Message = {
    id: number
    content: string
    date: string
    senderId: number
    recipentId: number
}

export type Comment = {
    id: number
    comment: string
    postId: number
    commenterId: number
    likes: CommentLike[]
    replies: Reply[]
    user: {
        id: number
        username: string
        displayname: string
        pictureURL: string
    }
}

export type CommentLike = {
    id: number
    userId: number
    commentId: number
}

export type Reply = {
    id: number
    comment: string
    commenterId: number
    parentId: number
    likes: CommentLike[]
    user: {
        id: number
        username: string
        displayname: string
        pictureURL: string
    }
}