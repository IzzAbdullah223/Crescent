import Router from 'express'
import { getUser } from '../controllers/userController.js'
import { verifyToken } from '../controllers/authController.js'

export const userRouter = Router()

userRouter.get('/user',verifyToken,getUser)
