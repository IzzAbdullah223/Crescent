

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