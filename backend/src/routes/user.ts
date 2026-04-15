import Router from 'express'
import { getUser,searchUsers} from '../controllers/userController.js'
import { verifyToken } from '../controllers/authController.js'
 

export const userRouter = Router()

userRouter.get('/user',verifyToken,getUser)
userRouter.get('/user/:id',verifyToken,getUser)
userRouter.get('/users',verifyToken,searchUsers)
 
