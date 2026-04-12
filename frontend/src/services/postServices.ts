import {type postData} from '../lib/types'

export async function createPost(data:FormData){

    
 
    const token = localStorage.getItem('token')
 
    const response = await fetch(`${import.meta.env.VITE_API_URL}/post`,{
        method:"POST",
        headers:{
            'Authorization':`Bearer ${token}`
        },
        body:data
    })

    return response
}

export async function getPosts(){

    const response = await fetch(`${import.meta.env.VITE_API_URL}/post`,{
        method:"GET"
    })

 
    return response

}

export async function likePost(postId:number){
    const token = localStorage.getItem('token')
    const response = await fetch(`${import.meta.env.VITE_API_URL}/post/like`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify({postId})
    })      
    
    return response
}

export async function unlikePost(postId:number){
    const token = localStorage.getItem('token')
    const response = await fetch(`${import.meta.env.VITE_API_URL}/post/unlike`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify({postId})
    })
    return response
}