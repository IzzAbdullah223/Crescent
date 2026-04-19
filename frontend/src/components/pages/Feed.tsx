import { getUser, getLatestUsers, getMostFollowedUsers, followUser, unfollowUser } from '../../services/userServices'
import { useEffect, useState } from 'react'
import { type user } from '../../lib/types'
import likes from '../../assets/likes.svg'
import redHeart from '../../assets/redHeart.svg'
import comments from '../../assets/comment2.svg'
import { Link } from 'react-router-dom'
import { getPosts, getFollowingPosts, likePost, unlikePost } from '../../services/postServices'
import { useNavigate } from 'react-router-dom'
import { type feedData, type SidebarUser  } from '../../lib/types'
 
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {motion} from 'framer-motion'

 

export function Feed() {
    const currentUserId = Number(localStorage.getItem('currentUserId'))
    const [currentUser, setCurrentUser] = useState<user>()
    const [currentFeed, setCurrentFeed] = useState(true)
    const [feed, setFeed] = useState<feedData[]>([])
    const [loading, setLoading] = useState(true)
    const [latestUsers, setLatestUsers] = useState<SidebarUser[]>([])
    const [mostFollowedUsers, setMostFollowedUsers] = useState<SidebarUser[]>([])
    const [followingIds, setFollowingIds] = useState<Set<number>>(new Set())
    const navigate = useNavigate()

    const user = async () => {
        const response = await getUser()
        if (response.status === 200) {
            const responseData: user = await response.json()
            setCurrentUser(responseData)
        }
    }

    const posts = async (following: boolean = false) => {
        setLoading(true)
        const response = following ? await getFollowingPosts() : await getPosts()
        if (response.status === 200) {
            const responseData: feedData[] = await response.json()
            setFeed(responseData)
        }
        setLoading(false)
    }

    const fetchSidebarUsers = async () => {
        const [latestRes, mostFollowedRes] = await Promise.all([
            getLatestUsers(),
            getMostFollowedUsers()
        ])
        if (latestRes.status === 200) {
            const data: SidebarUser[] = await latestRes.json()
            setLatestUsers(data)
            const ids = new Set(data.filter(u => u.followers.some(f => f.followerId === currentUserId)).map(u => u.id))
            setFollowingIds(ids)
        }
        if (mostFollowedRes.status === 200) {
            const data: SidebarUser[] = await mostFollowedRes.json()
            setMostFollowedUsers(data)
        }
    }

    const like = async (postId: number) => {
        await likePost(postId)
        posts(currentFeed ? false : true)
    }

    const unlike = async (postId: number) => {
        await unlikePost(postId)
        posts(currentFeed ? false : true)
    }

    const handleFollow = async (userId: number) => {
        if (followingIds.has(userId)) {
            await unfollowUser(userId)
            setFollowingIds(prev => { const next = new Set(prev); next.delete(userId); return next })
        } else {
            await followUser(userId)
            setFollowingIds(prev => new Set(prev).add(userId))
        }
    }

    useEffect(() => {
        user()
        posts()
        fetchSidebarUsers()
    }, [])

    return (
        <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
         className='flex flex-row w-full'>
            {/* Feed */}
            <div className="flex-1 min-w-0 overflow-y-auto font-Inter tab:border-x tab:border-gray-400/15 desk:border-x desk:border-gray-400/15">
                <div className="flex items-center justify-center gap-4 text-[1.2rem] border-b border-gray-400/15 w-full p-4">
                    <div
                        className={`cursor-pointer ${currentFeed ? 'border-b-[3px] border-[#e66c47] rounded-sm' : ''}`}
                        onClick={() => { setCurrentFeed(true); posts(false) }}>
                        Recent
                    </div>
                    <div
                        className={`cursor-pointer ${currentFeed ? '' : 'border-b-[3px] border-[#e66c47] rounded-sm'}`}
                        onClick={() => { setCurrentFeed(false); posts(true) }}>
                        Following
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className='flex flex-col gap-4 pb-10 p-4'>
                                <div className='flex items-center gap-2'>
                                    <Skeleton circle height={32} width={32} />
                                    <Skeleton width={110} />
                                    <Skeleton width={70} />
                                </div>
                                <Skeleton count={2} />
                                <div className='flex gap-3'>
                                    <Skeleton width={40} />
                                    <Skeleton width={40} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : feed.length === 0 && !currentFeed ? (
                    <div className="flex items-center justify-center mt-8 text-gray-400 italic">
                        <p>No posts from people you follow yet.</p>
                    </div>
                ) : (
                    feed.map((post, index) => (
                        <div className='flex flex-col gap-4 hover:bg-white/10 pb-10 p-4 cursor-pointer' key={index} onClick={() => navigate(`/posts/${post.id}`, { state: { post } })}>
                            <div className='flex items-center gap-2'>
                                <img src={post.poster?.pictureURL} className='mr-2 size-8 rounded-full object-cover object-center' />
                                <Link to={`/user/${post.poster?.id}`} className='font-Alata hover:underline' onClick={(e) => e.stopPropagation()}>{post.poster?.username}</Link>
                                <div className='text-[#565565] text-2xl'>•</div>
                                <div className='text-[#565565] text-balance'>15 hours ago</div>
                            </div>

                            {post.content && <p>{post.content}</p>}
                            {post.mediaURL && (
                                post.mediaURL.includes('/video/')
                                    ? <video src={post.mediaURL} controls className="max-w-[40rem] w-[100%] rounded-3xl mx-auto mb-8" />
                                    : <img src={post.mediaURL} className="max-w-[40rem] w-[100%] rounded-3xl mx-auto mb-8" />
                            )}

                            <div className='flex gap-4'>
                                <div className='flex items-center gap-1.5'>
                                    {post.likes.some(like => like.userId === currentUserId)
                                        ? <img src={redHeart} className='size-6 cursor-pointer' onClick={(e) => { e.stopPropagation(); unlike(post.id) }} />
                                        : <img src={likes} className='size-6 cursor-pointer' onClick={(e) => { e.stopPropagation(); like(post.id) }} />
                                    }
                                    <span>{post.likes.length}</span>
                                </div>
                                <div className='flex items-center gap-1.5'>
                                    <img src={comments} className='size-6' />
                                    <span>{post._count.comments}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* sidebar */}
            <div className="hidden desk:flex desk:flex-col desk:w-[280px] desk:shrink-0 desk:p-4 desk:gap-4">

                {/* latest*/}
                <div className="border border-white/10 rounded-lg p-4">
                    <h1 className="border-b border-gray-400/20 pb-2 mb-3 font-bold text-[1.1rem]">Latest users</h1>
                    <div className="flex flex-col gap-3">
                        {latestUsers.map(sidebarUser => (
                            <div key={sidebarUser.id} className="flex items-center gap-3">
                                <img src={sidebarUser.pictureURL} className="size-9 rounded-full object-cover object-center shrink-0" />
                                <div className="flex flex-col min-w-0 flex-1">
                                    <span className="text-sm font-semibold truncate">{sidebarUser.username}</span>
                                    <span className="text-xs text-gray-400 truncate">{sidebarUser.displayname}</span>
                                </div>
                                {sidebarUser.id !== currentUserId && (
                                    <button
                                        onClick={() => handleFollow(sidebarUser.id)}
                                        className="text-black bg-[#c4c2ce] px-4 py-1 text-sm rounded-full border border-white/40 shrink-0 hover:bg-black hover:text-[#c4c2ce] cursor-pointer transition-colors">
                                        {followingIds.has(sidebarUser.id) ? 'Unfollow' : 'Follow'}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* most followed */}
                <div className="border border-white/10 rounded-lg p-4">
                    <h1 className="border-b border-gray-400/20 pb-2 mb-3 font-bold text-[1.1rem]">Most followed</h1>
                    <div className="flex flex-col gap-3">
                        {mostFollowedUsers.map(sidebarUser => (
                            <div key={sidebarUser.id} className="flex items-center gap-3">
                                <img src={sidebarUser.pictureURL} className="size-9 rounded-full object-cover object-center shrink-0" />
                                <div className="flex flex-col min-w-0 flex-1">
                                    <span className="text-sm font-semibold truncate">{sidebarUser.username}</span>
                                    <span className="text-xs text-gray-400 truncate">{sidebarUser.displayname}</span>
                                </div>
                                {sidebarUser.id !== currentUserId && (
                                    <button
                                        onClick={() => handleFollow(sidebarUser.id)}
                                        className="text-black bg-[#c4c2ce] px-4 py-1 text-sm rounded-full border border-white/40 shrink-0 hover:bg-black hover:text-[#c4c2ce] cursor-pointer transition-colors">
                                        {followingIds.has(sidebarUser.id) ? 'Unfollow' : 'Follow'}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* annoucments*/}
                <div className="border border-white/10 rounded-lg p-4">
                    <h1 className="border-b border-gray-400/20 pb-2 mb-4 font-bold text-[1.1rem]">Announcements</h1>
                    <ul className="list-disc pl-4 mb-4 text-[#c4c2ce] flex flex-col gap-1 text-sm">
                        <li>Added animations to loading pages</li>
                        <li>Added Skeleton Loading to home page</li>
                    </ul>
                    <p className="text-sm text-gray-400">Last updated: 18 April 2026</p>
                </div>
            </div>
        </motion.div>
    )
}