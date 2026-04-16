import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { type user, type Message } from '../../lib/types'
import leftArrow from '../../assets/arrow-left(1).svg'
import send from '../../assets/send.svg'
import { fetchDirectedMessages, sendDirectedMessage } from '../../services/chatServices'

const currentUserId = Number(localStorage.getItem('currentUserId'))

export function Messages() {
    const { state } = useLocation()
    const friend = state.friend as user
    const [message, setMessage] = useState('')
    const [data, setData] = useState<Message[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const getMessages = async () => {
        const response = await fetchDirectedMessages(friend.id)
        if (response.status===200) {
            const responseData: Message[] = await response.json()
            setData(responseData)
        }
    }

    useEffect(() => {
        getMessages()
    }, [])

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        if (!message.trim()) return

        setIsSubmitting(true)
        await sendDirectedMessage(message, friend.id)
        setIsSubmitting(false)
        setMessage('')
    }

    return (
        <div className="flex flex-col h-full overflow-hidden flex-1 font-Inter tab:border-x tab:border-gray-400/15 desk:border-x desk:border-gray-400/15">

            <div className="flex gap-8 items-center text-[1.2rem] border-b border-gray-400/15 p-4">
                <Link to="/chat" className='hover:bg-white/10 rounded-full p-1'>
                    <img src={leftArrow} className="size-6 cursor-pointer" />
                </Link>
                <div className="flex gap-2 items-center">
                    <img src={friend.pictureURL} className="size-8 rounded-full object-cover object-center" />
                    <span className="font-bold text-xl">{friend.username}</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                {data.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-400 italic">
                        <p>Start a conversation, say Hi!</p>
                    </div>
                ) : (
    data.map(msg => (
    msg.senderId === currentUserId ? (
        <div key={msg.id} className="flex justify-end">
            <div className="flex flex-col items-end gap-1">
                <div className="bg-[#565565] py-2 px-4 rounded-2xl rounded-br-sm">
                    <p>{msg.content}</p>
                </div>
                <span className="text-xs text-gray-400">{/* tim placeholder h*/}</span>
            </div>
        </div>
    ) : (
        <div key={msg.id} className="flex gap-3 items-end">
            <img src={friend.pictureURL} className="size-7 rounded-full object-cover object-center" />
            <div className="flex flex-col gap-1">
                <div className="bg-white/10 py-2 px-4 rounded-2xl rounded-bl-sm">
                    <p>{msg.content}</p>
                </div>
                <span className="text-xs text-gray-400">{/*  time place holder */}</span>
            </div>
        </div>
    )
))
                )}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-t border-gray-400/15">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={1}
                    className="outline outline-gray-400/60 p-1 rounded-xl flex-1 resize-none" />
                <button
                    type="submit"
                    disabled={isSubmitting || !message.trim()}
                    className="outline outline-gray-400/60 p-1.5 rounded-full cursor-pointer hover:outline-gray-400/90 hover:bg-gray-400/10 disabled:opacity-50">
                    <img src={send} className="size-4" />
                </button>
            </form>
        </div>
    )
}