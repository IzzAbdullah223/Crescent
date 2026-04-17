import { getUser } from '../../services/userServices'
import { useEffect, useState } from 'react'
import {type user} from '../../lib/types'
import likes from '../../assets/likes.svg'
import redHeart from '../../assets/redHeart.svg'
import comments from '../../assets/comment2.svg'
import { Link } from 'react-router-dom'
import { getPosts, likePost, unlikePost } from '../../services/postServices'
import { useNavigate } from 'react-router-dom'
import { type feedData } from '../../lib/types'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function Feed(){
    const currentUserId = Number(localStorage.getItem('currentUserId'))
    const [currentUser, setCurrentUser] = useState<user>()
    const [currentFeed, setCurrentFeed] = useState(true)
    const [feed, setFeed] = useState<feedData[]>([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const user = async () => {
        const response = await getUser()
        if(response.status === 200){
            const responseData: user = await response.json()
            setCurrentUser(responseData)
        }
    }

    const posts = async () => {
        setLoading(true)
        const response = await getPosts()
        if(response.status === 200){
            const responseData: feedData[] = await response.json()
            setFeed(responseData)
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

    useEffect(() => {
        const run = async () => {
            user()
            posts()
        }
        run()
    }, [])

    return(
        <div className='flex flex-row w-full'> 
        <div className="w-full overflow-y-auto font-Inter tab:border-x tab:border-gray-400/15 desk:border-x desk:border-gray-400/15">

            <div className="flex items-center justify-center gap-4 text-[1.2rem] border-b border-gray-400/15 w-full p-4">
                <div className={`${currentFeed? 'border-b-[3px] border-[#e66c47] rounded-sm':''}`}>Recent</div>
                <div className={`${currentFeed? '':'border-b-[3px] border-[#e66c47] rounded-sm'}`}>Following</div>
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
            ) : (
                feed.map((post, index) => (
                    <div className='flex flex-col gap-4 hover:bg-white/10 pb-10 p-4 cursor-pointer' key={index} onClick={() => navigate(`/posts/${post.id}`, { state: { post } })}>
                        <div className='flex items-center gap-2'>
                            <img src={post.poster?.pictureURL} className='mr-2 size-8 rounded-full object-cover object-center'/>
                            <Link to={`/user/${post.poster?.id}`} className='font-Alata hover:underline' onClick={(e) => e.stopPropagation()}>{post.poster?.username}</Link>
                            <div className='text-[#565565] text-2xl'>•</div>
                            <div className='text-[#565565] text-balance'>15 hours ago</div>
                        </div>

                        {post.content && <p className="">{post.content}</p>}
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

        <div className="p-3 hidden desk:block">
            <div className="w-full flex flex-col gap-4">
                <div className="outline-1 outline-white/10 p-2 rounded-md">
                    <h1 className="border-b pb-2 border-gray-400/20 font-bold text-[1.25rem]">Latest users</h1>
                    <div className="flex items-center gap-4 pt-3">
                        <img src={currentUser?.pictureURL} className="size-8 rounded-full object-cover object-center"/>
                        <div className="min-w-0">
                            <div className="truncate">12345</div>
                            <div className="truncate">{currentUser?.displayname}</div>
                        </div>
                        <button className="text-black bg-[#c4c2ce] p-1 px-6 rounded-full border border-white/40 shadow-[0_0_0_1px_rgba(255,255,255,0.15)] shrink-0">Follow</button>
                    </div>
                    <div className="flex items-center gap-4">
                        <img src={currentUser?.pictureURL} className="size-8 rounded-full object-cover object-center"/>
                        <div className="min-w-0">
                            <div className="truncate">{currentUser?.username}</div>
                            <div className="truncate">{currentUser?.displayname}</div>
                        </div>
                        <button className="text-black bg-[#c4c2ce] p-1 px-6 rounded-full border border-white/40 shadow-[0_0_0_1px_rgba(255,255,255,0.15)] shrink-0">Follow</button>
                    </div>
                    <div className="flex items-center gap-4">
                        <img src={currentUser?.pictureURL} className="size-8 rounded-full object-cover object-center"/>
                        <div className="min-w-0">
                            <div className="truncate">{currentUser?.username}</div>
                            <div className="truncate">{currentUser?.displayname}</div>
                        </div>
                        <button className="text-black bg-[#c4c2ce] p-1 px-6 rounded-full border border-white/40 shadow-[0_0_0_1px_rgba(255,255,255,0.15)] shrink-0">Follow</button>
                    </div>
                </div>

                <div className="outline-1 outline-white/10 p-2 rounded-md">
                    <h1 className="border-b pb-2 border-gray-400/20 font-bold text-[1.25rem]">Most followed</h1>
                    <div className="flex items-center gap-4 pt-3">
                        <img src={currentUser?.pictureURL} className="size-8 rounded-full object-cover object-center"/>
                        <div className="min-w-0">
                            <div className="truncate">{currentUser?.username}</div>
                            <div className="truncate">{currentUser?.displayname}</div>
                        </div>
                        <button className="text-black bg-[#c4c2ce] p-1 px-6 rounded-full border border-white/40 shadow-[0_0_0_1px_rgba(255,255,255,0.15)] shrink-0">Follow</button>
                    </div>
                    <div className="flex items-center gap-4">
                        <img src={currentUser?.pictureURL} className="size-8 rounded-full object-cover object-center"/>
                        <div className="min-w-0">
                            <div className="truncate">{currentUser?.username}</div>
                            <div className="truncate">{currentUser?.displayname}</div>
                        </div>
                        <button className="text-black bg-[#c4c2ce] p-1 px-6 rounded-full border border-white/40 shadow-[0_0_0_1px_rgba(255,255,255,0.15)] shrink-0">Follow</button>
                    </div>
                    <div className="flex items-center gap-4">
                        <img src={currentUser?.pictureURL} className="size-8 rounded-full object-cover object-center"/>
                        <div className="min-w-0">
                            <div className="truncate">{currentUser?.username}</div>
                            <div className="truncate">{currentUser?.displayname}</div>
                        </div>
                        <button className="text-black bg-[#c4c2ce] p-1 px-6 rounded-full border border-white/40 shadow-[0_0_0_1px_rgba(255,255,255,0.15)] shrink-0">Follow</button>
                    </div>
                </div>

                <div className="p-2 rounded-md">
                    <h1 className="border-b pb-1 border-gray-400/20 text-[1.25rem] mb-8 font-[630]">Announcements</h1>
                    <ul className="list-disc pl-4 mb-5 text-[#c4c2ce]">
                        <li>Added animations to loading pages</li>
                        <li>Added Skeleton Loading to home page</li>
                    </ul>
                    <p>Last updated: 24 Nov 2024</p>
                </div>
            </div>
        </div>    
        </div>
    )
}