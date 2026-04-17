import { useState, useEffect } from 'react'
import { type user } from '../../lib/types'
import { getFriends } from '../../services/chatServices'
import { Link } from 'react-router-dom'
import leftArrow from '../../assets/arrow-left(1).svg'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function Chat() {
    const [friends, setFriends] = useState<user[]>([])
    const [loading, setLoading] = useState(true)

    const fetchFriends = async () => {
        setLoading(true)
        const response = await getFriends()
        if(response.status === 200){
            const responseData: user[] = await response.json()
            setFriends(responseData)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchFriends()
    }, [])

    return (
        <div className="overflow-y-auto flex-1 font-Inter tab:border-x tab:border-gray-400/15 desk:border-x desk:border-gray-400/15">
            <div className="flex gap-8 items-center text-[1.2rem] border-b border-gray-400/15 p-4">
                <Link to="/search" className='hover:bg-white/10 rounded-full p-1'>
                    <img src={leftArrow} className="size-6 cursor-pointer" />
                </Link>
                <span className="font-bold text-xl">Messages</span>
            </div>

            {loading ? (

        <div className='flex flex-col gap-10 p-4'>
                {[...Array(7)].map((_, i) => (
                    <div key={i} className='flex gap-3'>
                        <Skeleton circle height={40} width={40}/>
                        <div>
                         <Skeleton width={100} height={20}/>
                            <Skeleton width={100} height={20}/>
                        </div>
                 </div>
                ))}
        </div>
                 
            ) : friends.length === 0 ? (
                <div className="flex items-center justify-center mt-12 text-gray-400 text-center px-10">
                    <p>No Chats. Send a message to other{' '}
                        <Link to="/search" className="text-violet-700 hover:underline">users</Link>
                        {' '}to create a chat.
                    </p>
                </div>
            ) : (
                friends.map(friend => (
                    <Link to={`/chat/${friend.id}`} state={{friend}} key={friend.id} className='flex items-center gap-5 p-4 cursor-pointer hover:bg-white/10'>
                        <img src={friend.pictureURL} className='size-8 rounded-full object-cover object-center' />
                        <div className='flex flex-col'>
                            <span className='font-semibold'>{friend.username}</span>
                            <span className='text-sm text-[#acabb3d2]'>(new chat)</span>
                        </div>
                    </Link>
                ))
            )}
        </div>
    )
}