import { type TSignUpSchema } from "../lib/types";

export async function signUp(data: TSignUpSchema) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    const responseData = await response.json()
    if (!response.ok) {
        return { success: false, errors: responseData.errors }
    }
    localStorage.setItem('token', responseData.token)
    localStorage.setItem('currentUserId', responseData.currentUserId)
    return { success: true }
}

export async function logIn(data: { username: string; password: string }){

    
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`,{
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({
            username: data.username,
            password: data.password
        })
    })
    return response;
}

export async function guestLogin() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: 'GuestUser',
            password: 'guest445'  
        })
    })
    return response
}

