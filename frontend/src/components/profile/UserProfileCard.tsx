import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {type user} from '../../lib/types'
import { getUserID, followUser, unfollowUser } from '../../services/userServices';
import { useNavigate } from 'react-router-dom';
import { addFriend } from '../../services/chatServices';
import message from '../../assets/message-circle.svg'
import github from '../../assets/github.svg'
import global from '../../assets/global.svg'
import { motion } from 'framer-motion'
import { DotLoader } from 'react-spinners'

export function UserProfileCard(){
    const navigate = useNavigate()
    const { id } = useParams()
    const currentUserId = Number(localStorage.getItem('currentUserId'))
    if(String(currentUserId) === id){
        navigate('/profile')
    }
    const[userData,setUserData] = useState<user>()
    const[isFollowing,setIsFollowing] = useState(false)
    const[loading,setLoading] = useState(true)
    const userId = Number(id)

    const user = async ()=>{
        const response = await getUserID(userId)
        if(response.status===200){
            const responseData:user = await response.json()
            setUserData(responseData)
            const alreadyFollowing = responseData.followers?.some((f:any) => f.followerId === currentUserId)
            setIsFollowing(alreadyFollowing)
        }
        setLoading(false)
    }

    const handleFollow = async ()=>{
        if(isFollowing){
            await unfollowUser(userId)
            setIsFollowing(false)
        } else {
            await followUser(userId)
            setIsFollowing(true)
        }
        user()  
    }

    const startChat = async ()=>{
        const response = await addFriend(userId)
        if(response.status===200){
            navigate('/chat')
        }
    }

    useEffect(()=>{
        user()
    },[])
    
    return(
        <div className='flex flex-col gap-6 border-b border-gray-400/15 p-4'>
            {loading ? (
                <div className='flex justify-center items-center p-10'>
                    <DotLoader color="#ffffff" size={25}/>
                </div>
            ) : (
                <motion.div
                    initial={{ y: 10 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='flex flex-col gap-6'>

                    {/* top row — avatar + stats */}
                    <div className='flex items-center gap-15 desk:justify-around'>
                        <img src={userData?.pictureURL} className="size-30 desk:size-50 rounded-full object-cover object-center"/> 
                        <div className='flex flex-col items-center ml-5 gap-4'>
                            <h1 className="font-bold text-lg desk:text-xl">{userData?.displayname}</h1>
                            <p className="text-[#c7c6ccd2] -mt-4">@{userData?.username}</p>
                            
                            <div className='flex gap-4 desk:text-[1.1rem]'>
                                <div>
                                    <div className="font-bold text-center">{userData?.followers?.length ?? 0}</div>
                                    <span className="text-[#e7e7eb] text-md">Followers</span>
                                </div>
                                <div>
                                    <div className="font-bold text-center">{userData?.following?.length ?? 0}</div>
                                    <span className="text-[#e7e7eb] text-md">Following</span>
                                </div>
                                <div>
                                    <div className="font-bold text-center">{userData?._count?.posts ?? 0}</div>
                                    <span className="text-[#e7e7eb] text-md">Posts</span>
                                </div>
                            </div>

                            <div className='flex items-center gap-4 w-full'> 
                                <button
                                    onClick={handleFollow}
                                    className='bg-[#c4c2ce] text-black text-sm font-bold py-2 w-full rounded-full outline outline-[#f7f4f8] hover:bg-black hover:text-[#c4c2ce] hover:outline-white cursor-pointer'>
                                    {isFollowing ? 'Unfollow' : 'Follow'}
                                </button>
                                <div className='outline-1 outline-white rounded-full p-0.5 px-2.5 hover:outline-#f7f4f8 hover:bg-[#c4c2ce] cursor-pointer' onClick={startChat}> 
                                    <img src={message} className="size-8 cursor-pointer hover:brightness-0"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* bio + links */}
                    <div className='flex flex-col text-sm desk:text-base gap-3'>
                        {userData?.bio && (
                            <div className='flex gap-2 items-center'>
                                <span>{userData.bio}</span>
                                <span className='text-[#7c818f]'>bio</span>
                            </div>
                        )}
                        {userData?.website && (
                            <div className='flex gap-2 items-center'>
                                <img src={global} className='size-5 desk:size-6'/>
                                <a href={userData.website} target='_blank' rel='noreferrer' className='hover:underline text-[#c4c2ce]'>
                                    {userData.website}
                                </a>
                            </div>
                        )}
                        {userData?.githubLink && (
                            <div className='flex gap-2 items-center'>
                                <img src={github} className='size-5 desk:size-6'/>
                                <a href={userData.githubLink} target='_blank' rel='noreferrer' className='hover:underline text-[#c4c2ce]'>
                                    {userData.githubLink}
                                </a>
                            </div>
                        )}
                    </div>

                </motion.div>
            )}
            <h2 className='text-center'>Posts</h2>
        </div>
    )
}