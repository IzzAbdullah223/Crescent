import { useState } from 'react'
import { useNavigate } from 'react-router'
import { logIn, guestLogin } from '../../services/authServices'
import { DotLoader } from 'react-spinners'

export function LogIn() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isGuest, setIsGuest] = useState(false)
    const [error, setError] = useState(false)

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        const response = await logIn({ username, password })
        if (response.status === 200) {
            const data = await response.json()
            localStorage.setItem('token', data.token)
            localStorage.setItem('currentUserId', String(data.currentUserId))
            navigate('/home')
        } else {
            setError(true)
        }
        setIsSubmitting(false)
    }

    const handleGuest = async () => {
        setIsGuest(true)
        const response = await guestLogin()
        if (response.status === 200) {
            const data = await response.json()
            localStorage.setItem('token', data.token)
            localStorage.setItem('currentUserId', String(data.currentUserId))
            navigate('/home')
        }
        setIsGuest(false)
    }

    return (
        <form onSubmit={onSubmit} className='flex flex-col gap-4 mt-2 font-Alata text-white'>
            <input
                type='text'
                placeholder='Username'
                value={username}
                onChange={e => setUsername(e.target.value)}
                disabled={isGuest}
                className='p-2 px-4 rounded-3xl focus:outline-none bg-[#2b2a33] disabled:opacity-50'
            />
            <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={isGuest}
                className='p-2 px-4 rounded-3xl focus:outline-none bg-[#2b2a33] disabled:opacity-50'
            />
            <button
                type='submit'
                disabled={isSubmitting || isGuest}
                className='p-2 rounded-3xl bg-black text-white cursor-pointer hover:bg-white hover:text-black hover:outline-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white'>
                {isSubmitting ? 'Logging in....' : 'Log in'}
            </button>
            <button
                type='button'
                onClick={handleGuest}
                disabled={isGuest || isSubmitting}
                className='cursor-pointer p-2 rounded-3xl [background:linear-gradient(to_right,#000,#c8a96e)] hover:[background:#fff] hover:text-black hover:outline-1 text-sm transition-all duration-700 disabled:opacity-60 disabled:cursor-not-allowed'>
                {isGuest ? 'Signing in as guest...' : 'Guest User'}
            </button>
            {(isSubmitting || isGuest) && (
                <div className='flex justify-center mt-5 mb-5'>
                    <DotLoader color="#6b7280" size={30} />
                </div>
            )}
            {error && (
                <p className='text-red-500 text-sm text-center'>Invalid username or password</p>
            )}
        </form>
    )
}