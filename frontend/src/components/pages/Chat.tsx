import search from '../../assets/search.svg'
import { useState,useEffect  } from 'react'
import {type user} from '../../lib/types'
import { Link } from 'react-router-dom'
import leftArrow from '../../assets/arrow-left(1).svg'
 

export function Chat(){
    
 
   

    return(
        <div className=" overflow-y-auto   flex-1  font-Inter tab:border-x tab:border-gray-400/15 desk:border-x desk:border-gray-400/15">
 
            <div className=" flex gap-8 items-center text-[1.2rem]  border-b border-gray-400/15  p-4">
                <Link to="/search" className='hover:bg-white/10 rounded-full p-1'> 
                    <img src={leftArrow} className="size-6 cursor-pointer"/>
                </Link>
                <span className="font-bold text-xl">User</span>
            </div>
                  
    
                  

 
        </div>
    )
 
}