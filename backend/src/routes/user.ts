import Router from 'express'
import { getUser,searchUsers,getUserByID,updateProfile, changeProfilePicture,followUser,unfollowUser   } from '../controllers/userController.js'
import { verifyToken } from '../controllers/authController.js'
import { upload } from '../middleware/multer.js';
 

export const userRouter = Router()

userRouter.get('/user',verifyToken,getUser)
userRouter.get('/user/:id',verifyToken,getUserByID)
userRouter.get('/users',verifyToken,searchUsers)
userRouter.patch('/user/:id/picture',upload.single('image'),verifyToken,changeProfilePicture)
userRouter.patch('/user',verifyToken,updateProfile)
userRouter.post('/user/:id/follow', verifyToken, followUser)
userRouter.delete('/user/:id/unfollow', verifyToken, unfollowUser)
 
