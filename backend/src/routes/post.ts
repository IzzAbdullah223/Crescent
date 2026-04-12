import Router from 'express'
import { createPost } from '../controllers/postController.js'
import { verifyToken } from '../controllers/authController.js';

export const postRouter = Router()


//postRouter.get('/post')
postRouter.post('/post',verifyToken,createPost)
//postRouter.delete('/post')