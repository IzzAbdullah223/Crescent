import crescent from '../../assets/crescent.svg'
import { getUser } from '../../services/userServices'
import { useEffect,useState } from 'react'
import {type user} from '../../lib/types'
import { Link } from 'react-router-dom'

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
        <div className='flex items-center justify-between font-Alata border-b border-gray-400/20 p-1  '>
            <Link to={'/home'} className='flex items-center gap-2'>
                <img src={crescent} className=' size-18 tab:size-20'/>
                <h1 className='tab:text-2xl text-xl'>Crescent </h1>
            </Link>
            <Link to={'/profile'} className='p-3'>
                <img src={data?.pictureURL} className=' size-10 desk:size-12 tab:size-12 rounded-full object-cover object-center'/>   
            </Link>
        </div>
    )
}