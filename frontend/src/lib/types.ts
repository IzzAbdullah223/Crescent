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

export type user={
    id:number,
    username:string
    displayname:string,
    pictureURL:string
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
        username:string,
        displayname:string,
        pictureURL:string
    }
    likes:Like[]
}