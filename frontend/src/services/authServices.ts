import { type TSignUpSchema } from "../lib/types";

export async function signUp(data:TSignUpSchema){
 
     const response = await fetch(`${import.meta.env.VITE_API_URL}/signup`,{
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(data)
     })

    const responseData =  await response.json()
    console.log(responseData)
    if(!response.ok){
        return {success:false,errors:responseData.errors}
    }

    return {success:true}
}