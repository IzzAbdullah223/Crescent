import crescent from '../../assets/crescent.svg'
import { getUser } from '../../services/userServices'
import { useEffect,useState } from 'react'
import {type user} from '../../lib/types'
export function Header(){

    const[data,setData]=  useState<user>()

    useEffect(()=>{
        user()
    },[])



    const user = async ()=>{

        const response = await getUser()

         if(response.status===200){

            const responseData:user = await response.json()
            setData(responseData)
          
         }
    }


 

    return(
        <div className='flex items-center justify-between font-Alata border-b border-gray-400/20'>
            <div className='flex items-center gap-2'>
                <img src={crescent} className='size-15'/>
                <h1 className='text-lg'>Crescent </h1>
            </div>
            <div className='p-3'>
                <img src={data?.pictureURL} className='size-10 rounded-full object-cover object-center'/>   
            </div>
        </div>
    )
}