export async function getFriends() {
    const token = localStorage.getItem('token') 
    const response = await fetch(`${import.meta.env.VITE_API_URL}/chat/friends`,{
        method:"GET",
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
    
   return response
}

export async function addFriend(userId:number){
 
    const token = localStorage.getItem('token') 
    const response = await fetch(`${import.meta.env.VITE_API_URL}/chat/friends/${userId}`,{
        method:"POST",
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
    
   return response
}