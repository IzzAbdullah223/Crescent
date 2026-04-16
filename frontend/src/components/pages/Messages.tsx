import { useLocation } from "react-router-dom"
import { type user } from '../../lib/types'
import { Link } from "react-router-dom"
import leftArrow from '../../assets/arrow-left(1).svg'
import send from '../../assets/send.svg'
import { useState } from "react"

export function Messages() {
    const { state } = useLocation()
    const friend = state.friend as user
    const [message, setMessage] = useState('')

    return (
        <div className="flex flex-col h-full overflow-hidden flex-1 font-Inter tab:border-x tab:border-gray-400/15 desk:border-x desk:border-gray-400/15">
            <div className="flex gap-8 items-center text-[1.2rem] border-b border-gray-400/15 p-4">
                <Link to="/chat" className='hover:bg-white/10 rounded-full p-1'>
                    <img src={leftArrow} className="size-6 cursor-pointer" />
                </Link>
                <div className="flex gap-2 items-center">
                    <img src={friend.pictureURL} className="size-8 rounded-full object-cover object-center" />
                    <span className="font-bold text-xl ml-2">{friend.username}</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {/* messages go here */}
            </div>

            <form className="flex items-center gap-2 p-4 border-t border-gray-400/15">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={1}
                    className="outline outline-gray-400/60 p-1 rounded-xl flex-1 resize-none" />
                <div className="outline outline-gray-400/60 p-1.5 rounded-full cursor-pointer hover:outline-gray-400/90 hover:bg-gray-400/10">
                    <img src={send} className="size-4 cursor-pointer" />
                </div>
            </form>
        </div>
    )
}