import { Router } from "express";
import { signUpPost,logInPost } from "../controllers/authController.js";
import passport from "passport";
export const authRouter = Router()

 authRouter.post("/signup",signUpPost)
 authRouter.post('/login',passport.authenticate("local",{session:false}),logInPost)

