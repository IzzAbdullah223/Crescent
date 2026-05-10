import {type Response, type Request, type NextFunction} from 'express'
import jwt,{type JwtPayload, type Secret} from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import * as db from '../db/queries.js'
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


export async function signUpPost(req: Request, res: Response) {
    const body: unknown = req.body
    const result = signUpSchema.safeParse(body);

    if (!result.success) {
        return res.status(400).json({ success: "Failed to create account" })
    }
    const existingUser = await db.getUser(result.data.username)
    if (existingUser) {
        return res.status(400).json({ errors: { username: "Username already exists" } })
    }
    const hashedPassword = await bcrypt.hash(result.data.password, 10)
    await db.signUp(result.data.username, result.data.displayname, hashedPassword)

    const newUser = await db.getUser(result.data.username)
    jwt.sign({ user: newUser }, process.env.SECRET_KEY as Secret, { expiresIn: '24h' }, (err, token) => {
        res.json({ token, currentUserId: newUser?.id })
    })
}

export async function logInPost(req: Request, res: Response) {
    const user = req.user
    jwt.sign({ user }, process.env.SECRET_KEY as Secret, { expiresIn: '24h' }, (err, token) => {
        if (req.path.includes('callback')) {
            return res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}&userId=${user?.id}`)
        }
        res.json({ token, currentUserId: user?.id })
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
 