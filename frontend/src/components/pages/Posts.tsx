import { Link, useLocation } from "react-router-dom"
import leftArrow from '../../assets/arrow-left(1).svg'
import { likePost, unlikePost } from "../../services/postServices"
import { type feedData } from '../../lib/types'
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import likes from '../../assets/likes.svg'
import redHeart from '../../assets/redHeart.svg'
import commentPic from '../../assets/comment2.svg'
import commentLike from '../../assets/commentLikes.svg'
import reply from '../../assets/reply.svg'
import {type Comment} from '../../lib/types'
import { getComments, postComment } from "../../services/postServices"

export function Post() {
    const currentUserId = Number(localStorage.getItem('currentUserId'))
    const { state } = useLocation()
    const [post, setPost] = useState<feedData>(state.post)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState<Comment[]>([])

    const like = async (postId: number) => {
        await likePost(postId)
        setPost(prev => ({
            ...prev,
            likes: [...prev.likes, { id: Date.now(), userId: currentUserId, postId }]
        }))
    }

    const unlike = async (postId: number) => {
        await unlikePost(postId)
        setPost(prev => ({
            ...prev,
            likes: prev.likes.filter(l => l.userId !== currentUserId)
        }))
    }

    const getPostComments = async () => {
        const response = await getComments(post.id)
        if(response.ok){
            const responseData = await response.json()
            setComments(responseData)
        }
    }

    const Comment = async () => {
        if(!comment.trim()) return
        const response = await postComment(post.id, comment)
        if(response.status === 200){
            setComment('')
            getPostComments()
        }
    }

    useEffect(() => {
        getPostComments()
    }, [])

    return (
        <div className="overflow-y-auto flex-1 font-Inter tab:border-x tab:border-gray-400/15 desk:border-x desk:border-gray-400/15">
            <div className="flex gap-8 items-center text-[1.2rem] border-b border-gray-400/15 p-4">
                <Link to="/" className='hover:bg-white/10 rounded-full p-1'>
                    <img src={leftArrow} className="size-6 cursor-pointer" />
                </Link>
                <span className="font-bold text-xl">Post</span>
            </div>

            <div className="flex flex-col gap-4 p-4 border-b border-gray-400/15">
                <div className="flex items-center gap-2">
                    <img src={post.poster?.pictureURL} className="mr-2 size-8 rounded-full object-cover object-center" />
                    <Link to={`/user/${post.poster?.id}`} className="font-Alata hover:underline">{post.poster?.username}</Link>
                </div>

                {post.content && <p>{post.content}</p>}

                {post.mediaURL && (
                    post.mediaURL.includes('/video/')
                        ? <video src={post.mediaURL} controls className="max-w-[40rem] w-full rounded-3xl mx-auto" />
                        : <img src={post.mediaURL} className="max-w-[40rem] w-full rounded-3xl mx-auto" />
                )}

                <div className="flex gap-4">
                    <div className="flex items-center gap-1.5">
                        {post.likes.some(like => like.userId === currentUserId)
                            ? <img src={redHeart} className="size-6 cursor-pointer" onClick={() => unlike(post.id)} />
                            : <img src={likes} className="size-6 cursor-pointer" onClick={() => like(post.id)} />
                        }
                        <span>{post.likes.length}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <img src={commentPic} className="size-6" />
                        <span>{comments.length}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 p-6 border-b border-gray-400/15">
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Type a comment.."
                    rows={1}
                    className="flex-1 resize-none bg-transparent outline-none text-lg text-gray-300 placeholder-gray-500"
                />
                <button onClick={Comment}
                    className="text-sm font-bold border border-white/40 rounded-full px-4 py-1 hover:text-black hover:bg-white cursor-pointer transition-colors duration-300 ease-in-out">
                    Post
                </button>
            </div>

            <div className="p-4   border-gray-400/15">
                <h2 className="font-bold text-lg">View comments ({comments.length})</h2>
            </div>

            {comments.map((c, index) => (
                <div key={index} className="flex flex-col gap-3 p-4 border-b border-gray-400/15">
                    <div className="flex items-center gap-2">
                        <img src={c.user.pictureURL} className="size-8 rounded-full object-cover object-center"/>
                        <span className="font-semibold">{c.user.username}</span>
                        <span className="text-[#565565] text-sm">• 15 hours ago</span>
                    </div>
                    <p className="text-sm ml-1">{c.comment}</p>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                            <img src={commentLike} className="size-6 cursor-pointer hover:opacity-60"/>
                            <span className="text-sm text-gray-400">0</span>
                        </div>
                        <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-60">
                            <img src={reply} className="size-6"/>
                            <span className="text-sm text-gray-400">reply</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}