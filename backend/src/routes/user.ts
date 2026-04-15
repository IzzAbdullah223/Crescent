import Router from 'express'
import { getUser,searchUsers,getUserByID,updateProfile} from '../controllers/userController.js'
import { verifyToken } from '../controllers/authController.js'
 

export const userRouter = Router()

userRouter.get('/user',verifyToken,getUser)
userRouter.get('/user/:id',verifyToken,getUserByID)
userRouter.get('/users',verifyToken,searchUsers)
userRouter.patch('/user',verifyToken,updateProfile)
 
