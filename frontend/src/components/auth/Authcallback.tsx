import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function AuthCallback() {
    const navigate = useNavigate()
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const token = params.get('token')
        const userId = params.get('userId')
        if (token && userId) {
            localStorage.setItem('token', token)
            localStorage.setItem('currentUserId', userId)
            navigate('/home')
        }
    }, [])
    return null
}