import {type Response, type Request} from 'express'
import { signUpSchema } from '../libs/types.js';


export async function signUp(req:Request,res:Response){
 
     const body: unknown = req.body
     const result = signUpSchema.safeParse(body);
   
 
    if(!result.success){
         return res.status(500).json({
            success:"Failed to create account"
         })
        }
        
   
     return res.status(200).json({
        sucess:true
     })
}