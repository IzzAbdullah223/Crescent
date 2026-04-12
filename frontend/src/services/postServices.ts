import {type postData} from '../lib/types'

export async function createPost(data:postData){

    
 
    const token = localStorage.getItem('token')
 
    const response = await fetch(`${import.meta.env.VITE_API_URL}/post`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify(data)
    })

    return response
}