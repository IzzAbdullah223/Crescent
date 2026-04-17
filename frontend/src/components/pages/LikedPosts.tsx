import { Link } from "react-router-dom"
import leftArrow from '../../assets/arrow-left(1).svg'
import { getLikedPosts, likePost, unlikePost } from "../../services/postServices"
import { type feedData } from '../../lib/types'
import { useEffect, useState } from "react"
import likes from '../../assets/likes.svg'
import redHeart from '../../assets/redHeart.svg'
import comments from '../../assets/comment2.svg'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function LikedPosts(){
    const currentUserId = Number(localStorage.getItem('currentUserId'))
    const [likedPosts, setLikedPosts] = useState<feedData[]>([])
    const [loading, setLoading] = useState(true)

    const posts = async () => {
        setLoading(true)
        const response = await getLikedPosts()
        if(response.status === 200){
            const responseData: feedData[] = await response.json()
            setLikedPosts(responseData)
        }
        setLoading(false)
    }

    const like = async (postId: number) => {
        await likePost(postId)
        posts()
    }

    const unlike = async (postId: number) => {
        await unlikePost(postId)
        posts()
    }

    useEffect(() => { posts() }, [])

    return(
        <div className="overflow-y-auto flex-1 font-Inter tab:border-x tab:border-gray-400/15 desk:border-x desk:border-gray-400/15">
            <div className="flex gap-8 items-center text-[1.2rem] border-b border-gray-400/15 p-4">
                <Link to="/search" className='hover:bg-white/10 rounded-full p-1'> 
                    <img src={leftArrow} className="size-6 cursor-pointer"/>
                </Link>
                <span className="font-bold text-xl">Liked Posts</span>
            </div>

            {loading ? (
                <div className="flex flex-col">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className='flex flex-col gap-4 pb-10 p-4'>
                            <div className='flex items-center gap-2'>
                                <Skeleton circle height={32} width={32}/>
                                <Skeleton width={110}/>
                                <Skeleton width={70}/>
                            </div>
                            <Skeleton count={2}/>
                            <div className='flex gap-3'>
                                <Skeleton width={40}/>
                                <Skeleton width={40}/>
                            </div>
                        </div>
                    ))}
                </div>
            ) : likedPosts.length === 0 ? (
                <div className="flex justify-center items-center mt-10 text-gray-400/70">
                    No liked posts
                </div>
            ) : (
                likedPosts.map((post, index) => (
                    <div className='flex flex-col gap-4 hover:bg-white/10 pb-10 p-4 cursor-pointer' key={index}>
                        <div className='flex items-center gap-2'>
                            <img src={post.poster?.pictureURL} className='mr-2 size-8 rounded-full object-cover object-center'/>
                            <Link to={`/user/${post.poster?.id}`} className='font-Alata hover:underline'>{post.poster?.username}</Link>
                            <div className='text-[#565565] text-2xl'>•</div>
                            <div className='text-[#565565] text-balance'>15 hours ago</div>
                        </div>
                        {post.content && <p>{post.content}</p>}
                        {post.mediaURL && (
                            post.mediaURL.includes('/video/')
                                ? <video src={post.mediaURL} controls className="max-w-[40rem] w-[100%] rounded-3xl mx-auto mb-8"/>
                                : <img src={post.mediaURL} className="max-w-[40rem] w-[100%] rounded-3xl mx-auto mb-8"/>
                        )}
                        <div className='flex gap-4'>
                            <div className='flex items-center gap-1.5'>
                                {post.likes.some(like => like.userId === currentUserId)
                                    ? <img src={redHeart} className='size-6' onClick={() => unlike(post.id)}/>
                                    : <img src={likes} className='size-6' onClick={() => like(post.id)}/>
                                }   
                                <span>{post.likes.length}</span>
                            </div>
                            <div className='flex items-center gap-1.5'>
                                <img src={comments} className='size-6'/>
                                <span>0</span>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}