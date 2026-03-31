

export async function getUser(){
    const token = localStorage.getItem('token')

    console.log(import.meta.env.VITE_API_URL)
    
    console.log("test")

    const response = await fetch(`${import.meta.env.VITE_API_URL}/user`,{
        method:"GET",
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })
 
    return response

}