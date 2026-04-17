import Router from 'express'
import { getUser,searchUsers,getUserByID,updateProfile, changeProfilePicture    } from '../controllers/userController.js'
import { verifyToken } from '../controllers/authController.js'
import { upload } from '../middleware/multer.js';
 

export const userRouter = Router()

userRouter.get('/user',verifyToken,getUser)
userRouter.get('/user/:id',verifyToken,getUserByID)
userRouter.get('/users',verifyToken,searchUsers)
userRouter.patch('/user/:id/picture',upload.single('image'),verifyToken,changeProfilePicture)
userRouter.patch('/user',verifyToken,updateProfile)
 
