import { type TProfileSchema } from '../lib/types'
export async function getUser(){
    const token = localStorage.getItem('token')

   

    const response = await fetch(`${import.meta.env.VITE_API_URL}/user`,{
        method:"GET",
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })
 
    return response

}

export async function getUserID(id:number){
    const token = localStorage.getItem('token')


    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${id}`,{
        method:"GET",
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })
 
    return response

}

export async function getUsers(){
    const token = localStorage.getItem('token')

    const response = await fetch(`${import.meta.env.VITE_API_URL}/users`,{
        method:"GET",
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })
 
    return response

}

export async function searchUser(query:string){
    const token = localStorage.getItem('token') 
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users?username=${query}`,{
        method:"GET",
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })

    return response
}

export async function updateProfile(data:TProfileSchema){
    const token = localStorage.getItem('token') 
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user`,{
        method:"PATCH",
        headers:{
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify(data)
    })

    return response
}

export async function changeProfilePicture(formData:FormData){
    const token = localStorage.getItem('token')
    const userId = formData.get('userId')
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${userId}/picture`,{
        method:'PATCH',
        headers:{
            'Authorization':`Bearer ${token}`
        },
        body:formData
 
    })
    console.log(response)
    return response
}

export async function followUser(userId: number) {
    const token = localStorage.getItem('token')
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${userId}/follow`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
    })
    return response
}

export async function unfollowUser(userId: number) {
    const token = localStorage.getItem('token')
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${userId}/unfollow`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    })
    return response
}