import Router from 'express'
import { createPost,getPosts, likePost,unlikePost,getLikedPosts } from '../controllers/postController.js'
import { verifyToken } from '../controllers/authController.js';
import { upload } from '../middleware/multer.js';
 

export const postRouter = Router()


postRouter.get('/post',getPosts)
postRouter.get('/posts/liked',verifyToken,getLikedPosts)
postRouter.get('/posts/:id',verifyToken,getPosts)
postRouter.post('/post',verifyToken,upload.single('media'),createPost)
postRouter.post('/post/like',verifyToken,likePost)
 
postRouter.post('/post/unlike',verifyToken,unlikePost)
//postRouter.delete('/post')