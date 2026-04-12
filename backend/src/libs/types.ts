import z from "zod"

export const signUpSchema = z.object({
    username: z.string().trim().min(2,'Username should be at least 2 characters.'),
    displayname:z.string().trim().min(1,'Username cannot be empty'),
    password: z.string().trim().min(5,'Password should be atleast 5 characters'),
    confirmPassword: z.string().trim().min(5,'Password should be at least 5 characters')
}).refine(data=>data.password===data.confirmPassword,{
    message:"Password must match",
    path: ["confirmPassword"]
})

export type postData={
    content?:string
    tags?:string[]
    pictureURL?:string
    githubRepo?:string
}