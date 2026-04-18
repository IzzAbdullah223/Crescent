import Router from 'express'
import { createPost, getPosts, likePost, unlikePost, getLikedPosts, getUserPosts, getComments, postComment, postReply, likeComment, unlikeComment,getFollowingPosts } from '../controllers/postController.js'
import { verifyToken } from '../controllers/authController.js'
import { upload } from '../middleware/multer.js'

export const postRouter = Router()
postRouter.get('/post', getPosts)
postRouter.get('/posts/following', verifyToken, getFollowingPosts)
postRouter.get('/posts/liked', verifyToken, getLikedPosts)
postRouter.get('/post/:id/comments', verifyToken, getComments)
postRouter.get('/posts/:id', verifyToken, getUserPosts)
postRouter.post('/post', verifyToken, upload.single('media'), createPost)
postRouter.post('/post/like', verifyToken, likePost)
postRouter.post('/post/unlike', verifyToken, unlikePost)
postRouter.post('/post/:id/comments', verifyToken, postComment)
postRouter.post('/post/comments/:commentId/reply', verifyToken, postReply)
postRouter.post('/posts/comments/:commentId/like', verifyToken, likeComment)
postRouter.delete('/posts/comments/:commentId/like', verifyToken, unlikeComment)