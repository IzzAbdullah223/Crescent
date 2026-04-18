import { Router } from "express";
import { signUpPost,logInPost } from "../controllers/authController.js";
import passport from "passport";
export const authRouter = Router()

 authRouter.post("/signup",signUpPost)
 authRouter.post('/login',passport.authenticate("local",{session:false}),logInPost)
 authRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
authRouter.get('/auth/google/callback',
    passport.authenticate('google', { session: false }),
    logInPost
)

