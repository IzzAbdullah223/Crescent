import {type Response, type Request, type NextFunction} from 'express'
import jwt,{type JwtPayload, type Secret} from 'jsonwebtoken'
import { signUpSchema } from '../libs/types.js';

declare global{
        namespace Express{
                interface Request{
                        token?: string | undefined,
                }
        }
}


interface TokenPayload {
    user: {
        id: number
        username: string
    }
}


export async function signUpPost(req:Request,res:Response){
 
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

export async function logInPost(req:Request,res:Response){
        const user=req.user
        
        jwt.sign({user:user},process.env.SECRET_KEY as Secret,{expiresIn: '7d'},(err: Error | null, token: string | undefined)=>{
          res.json({
                token
          })
        })
}


export function verifyToken(req: Request, res: Response, next: NextFunction){
    const bearerHeader = req.headers['authorization']
    
    if(typeof(bearerHeader) !== 'undefined'){
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        
        if(!bearerToken){
            return res.status(403).json({error: "Invalid token format"})
        }
        
        jwt.verify(bearerToken, process.env.SECRET_KEY as Secret, (err: Error | null, 	authData: string | JwtPayload | undefined) => {
            if(err){
                return res.status(403).json({error: "Invalid or expired token"})
            }
            
            const payload = authData as TokenPayload
            req.token = bearerToken    
            req.user = payload.user
            next()
        })
    }
    else{
        res.status(403).json({error: "No token provided"})
    }
}
 