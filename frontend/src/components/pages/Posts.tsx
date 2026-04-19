import { Link, useLocation } from "react-router-dom"
import leftArrow from '../../assets/arrow-left(1).svg'
import { likePost, unlikePost, getComments, postComment, postReply, likeComment, unlikeComment } from "../../services/postServices"
import { type feedData, type Comment } from '../../lib/types'
import { useEffect, useState } from "react"
import likes from '../../assets/likes.svg'
import redHeart from '../../assets/redHeart.svg'
import commentPic from '../../assets/comment2.svg'
import commentLike from '../../assets/commentLikes.svg'
import replyIcon from '../../assets/reply.svg'
 

export function Post() {
    const currentUserId = Number(localStorage.getItem('currentUserId'))
    const { state } = useLocation()
    const [post, setPost] = useState<feedData>(state.post)
    const [commentText, setCommentText] = useState('')
    const [comments, setComments] = useState<Comment[]>([])
    const [replyingToId, setReplyingToId] = useState<number | null>(null)
    const [replyText, setReplyText] = useState('')
    const [showRepliesMap, setShowRepliesMap] = useState<Record<number, boolean>>({})
    const[loading,setLoading]=useState(false)

    const likePostHandler = async (postId: number) => {
        await likePost(postId)
        setPost(prev => ({
            ...prev,
            likes: [...prev.likes, { id: Date.now(), userId: currentUserId, postId }]
        }))
    }

    const unlikePostHandler = async (postId: number) => {
        await unlikePost(postId)
        setPost(prev => ({
            ...prev,
            likes: prev.likes.filter(like => like.userId !== currentUserId)
        }))
    }

    const fetchComments = async () => {
        const response = await getComments(post.id)
        if (response.status === 200) {
            const responseData = await response.json()
            setComments(responseData)
        }
    }

    const submitComment = async () => {
        if (!commentText.trim()) return
        const response = await postComment(post.id, commentText)
        if (response.status === 200) {
            setCommentText('')
            fetchComments()
        }
    }

    const submitReply = async (commentId: number) => {
        if (!replyText.trim()) return
        const response = await postReply(commentId, replyText, post.id)
        if (response.status === 200) {
            setReplyText('')
            setReplyingToId(null)
            fetchComments()
        }
    }

    const likeCommentHandler = async (commentId: number) => {
        await likeComment(commentId)
        setComments(prev => prev.map(comment =>
            comment.id === commentId
                ? { ...comment, likes: [...comment.likes, { id: Date.now(), userId: currentUserId, commentId }] }
                : comment
        ))
    }

    const unlikeCommentHandler = async (commentId: number) => {
        await unlikeComment(commentId)
        setComments(prev => prev.map(comment =>
            comment.id === commentId
                ? { ...comment, likes: comment.likes.filter(like => like.userId !== currentUserId) }
                : comment
        ))
    }

    const likeReplyHandler = async (replyId: number) => {
        await likeComment(replyId)
        fetchComments()
    }

    const unlikeReplyHandler = async (replyId: number) => {
        await unlikeComment(replyId)
        fetchComments()
    }

    const toggleReplies = (commentId: number) => {
        setShowRepliesMap(prev => ({ ...prev, [commentId]: !prev[commentId] }))
    }

    const toggleReplyInput = (commentId: number) => {
        setReplyingToId(replyingToId === commentId ? null : commentId)
        setReplyText('')
    }

    useEffect(() => {
        fetchComments()
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
                            ? <img src={redHeart} className="size-6 cursor-pointer" onClick={() => unlikePostHandler(post.id)} />
                            : <img src={likes} className="size-6 cursor-pointer" onClick={() => likePostHandler(post.id)} />
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
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Type a comment.."
                    rows={1}
                    className="flex-1 resize-none bg-transparent outline-none text-lg text-gray-300 placeholder-gray-500"
                />
                <button
                    onClick={submitComment}
                    className="text-sm font-bold border border-white/40 rounded-full px-4 py-1 hover:text-black hover:bg-white cursor-pointer transition-colors duration-300 ease-in-out">
                    Post
                </button>
            </div>

            <div className="p-4">
                <h2 className="font-bold text-lg">View comments ({comments.length})</h2>
            </div>

            {comments.map((comment) => (
                <div key={comment.id} className="flex flex-col gap-3 p-4 border-b border-gray-400/15">
                    <div className="flex items-center gap-2">
                        <img src={comment.user.pictureURL} className="size-8 rounded-full object-cover object-center" />
                        <Link to={`/user/${post.poster?.id}`} className="font-semibold hover:underline">{comment.user.username}</Link>
                        <span className="text-[#565565] text-sm">• 15 hours ago</span>
                    </div>
                    <p className="text-sm ml-1">{comment.comment}</p>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                            {comment.likes.some(like => like.userId === currentUserId)
                                ? <img src={redHeart} className="size-6 cursor-pointer" onClick={() => unlikeCommentHandler(comment.id)} />
                                : <img src={commentLike} className="size-6 cursor-pointer hover:opacity-60" onClick={() => likeCommentHandler(comment.id)} />
                            }
                            <span className="text-sm text-gray-400">{comment.likes.length}</span>
                        </div>
                        <div
                            className="flex items-center gap-1.5 cursor-pointer hover:opacity-60"
                            onClick={() => toggleReplyInput(comment.id)}>
                            <img src={replyIcon} className="size-6" />
                            <span className="text-sm text-gray-400">reply</span>
                        </div>
                        {(comment.replies ?? []).length > 0 && (
                            <span
                                className="text-sm text-gray-400 cursor-pointer hover:opacity-60"
                                onClick={() => toggleReplies(comment.id)}>
                                {showRepliesMap[comment.id] ? 'hide replies' : `show replies (${comment.replies.length})`}
                            </span>
                        )}
                    </div>

                    {replyingToId === comment.id && (
                        <div className="flex items-center gap-2 ml-8 mt-1 border-b border-gray-400/20 pb-2">
                            <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Add a reply..."
                                rows={1}
                                className="flex-1 resize-none bg-transparent outline-none text-sm text-gray-300 placeholder-gray-500"
                            />
                            <button
                                onClick={() => submitReply(comment.id)}
                                className="text-xs font-bold border border-white/40 rounded-full px-4 py-1.5 hover:text-black hover:bg-white cursor-pointer transition-colors duration-300 ease-in-out">
                                reply
                            </button>
                        </div>
                    )}

                    {showRepliesMap[comment.id] && (comment.replies ?? []).map((reply) => (
                        <div key={reply.id} className="flex flex-col gap-2 ml-8 pl-3 border-l border-gray-400/20">
                            <div className="flex items-center gap-2">
                                <img src={reply.user.pictureURL} className="size-6 rounded-full object-cover object-center" />
                                <span className="font-semibold text-sm">{reply.user.username}</span>
                                <span className="text-[#565565] text-xs">• 15 hours ago</span>
                            </div>
                            <p className="text-sm ml-1">{reply.comment}</p>
                            <div className="flex items-center gap-1.5">
                                {(reply.likes ?? []).some(like => like.userId === currentUserId)
                                    ? <img src={redHeart} className="size-5 cursor-pointer" onClick={() => unlikeReplyHandler(reply.id)} />
                                    : <img src={commentLike} className="size-5 cursor-pointer hover:opacity-60" onClick={() => likeReplyHandler(reply.id)} />
                                }
                                <span className="text-xs text-gray-400">{reply.likes?.length ?? 0}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}