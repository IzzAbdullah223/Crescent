 

export async function createPost(data:FormData){

    const token = localStorage.getItem('token')
 
    const response = await fetch(`${import.meta.env.VITE_API_URL}/post`,{
        method:"POST",
        headers:{
            'Authorization':`Bearer ${token}`
        },
        body:data
    })
    console.log(response)
    return response
}

export async function getPosts(){

    const response = await fetch(`${import.meta.env.VITE_API_URL}/post`,{
        method:"GET"
    })

 
    return response


}

export async function getFollowingPosts() {
    const token = localStorage.getItem('token')
    const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/following`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
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

export async function getUserPosts(userId:number){
    const token = localStorage.getItem('token')
    const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${userId}`,{
        method:"GET",
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })

    return response
}

export async function getLikedPosts(){
    const token = localStorage.getItem('token')
    const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/liked`,{
        method:"GET",
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })

    return response
}

export async function postComment(postId:number,comment:string){
    const token = localStorage.getItem('token')
    const response = await fetch(`${import.meta.env.VITE_API_URL}/post/${postId}/comments`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify({comment})
    })

 
    return response
}

export async function getComments(postId:number){
    const token = localStorage.getItem('token')
    const response = await fetch(`${import.meta.env.VITE_API_URL}/post/${postId}/comments`,{
        method:"GET",
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })

    return response
}


export async function postReply(commentId: number, comment: string,postId:number) {
    const token = localStorage.getItem('token')
    const response = await fetch(`${import.meta.env.VITE_API_URL}/post/comments/${commentId}/reply`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ comment,postId })
    })
    return response
}



export async function likeComment(commentId: number) {
    const token = localStorage.getItem('token')
    const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/comments/${commentId}/like`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
    })
    return response
}

export async function unlikeComment(commentId: number) {
    const token = localStorage.getItem('token')
    const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/comments/${commentId}/like`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    })
    return response
}