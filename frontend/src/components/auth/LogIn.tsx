import { useState } from 'react'
import { useNavigate } from 'react-router'
import { logIn } from '../../services/authServices'

export function LogIn(){

    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        const response = await logIn({ username, password })
        if (response.status === 200) {
            const data = await response.json()
            localStorage.setItem('token', data.token)
            localStorage.setItem('currentUserId', String(data.currentUserId))
            navigate('/home')
        }
        setIsSubmitting(false)
    }
    

    return (
        <form onSubmit={onSubmit} className='flex flex-col gap-4 mt-2 font-Alata text-white'>
            <input type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)}
                className='p-2 px-4 rounded-3xl focus:outline-none bg-[#2b2a33]' />
            <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}
                className='p-2 px-4 rounded-3xl focus:outline-none bg-[#2b2a33]' />
            <button disabled={isSubmitting} className='p-2 rounded-3xl bg-black text-white cursor-pointer hover:bg-white hover:text-black hover:outline-2 text-sm'>
                {isSubmitting ? 'Logging in...' : 'Log in'}
            </button>
            <button type='button' onClick={() => navigate('/global')}
                className='cursor-pointer p-2 rounded-3xl [background:linear-gradient(to_right,#000,#c8a96e)] hover:[background:#fff] hover:text-black hover:outline-1 text-sm transition-all duration-700'>
                Guest User
            </button>
        </form>
    )

  
}