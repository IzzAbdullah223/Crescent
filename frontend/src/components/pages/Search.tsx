import search from '../../assets/search.svg'
import { useState,useEffect  } from 'react'
import {type user} from '../../lib/types'
import { searchUser } from '../../services/userServices'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'

export function Search(){
    
    const [queryResult,setQueryResult] = useState<user[]>([])

    const[searchQuery,setSearchQuery] = useState('')


    const findUsers = async () =>{
        if(searchQuery.trim() === ''){
            setQueryResult([])
            return
        }
        const response = await searchUser(searchQuery)
        if(response.status==200){
              const responseData:user[] = await response.json()
              setQueryResult(responseData)
        }
       
    }

    useEffect(()=>{
        findUsers()
    },[searchQuery])

   
   

    return(
        <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
         className=" overflow-y-auto   flex-1  font-Inter tab:border-x tab:border-gray-400/15 desk:border-x desk:border-gray-400/15">
                <div className='flex items-center p-3 py-8  gap-3'> 
                    <img src={search} className="size-6  "/>
                    <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    type="text" 
                    placeholder="Enter a username"
                    className="outline-1 outline-gray-400/60 rounded-xl py-1.5 px-3 text-base  flex-1 "/>
                 </div>

                  
                     {queryResult.length > 0 ? (
                        <div className='flex flex-col -mt-6'>
                            {queryResult.map((user)=>(
                                <div key={user.id} className='flex items-center gap-4 p-3 -mb-3'>
                                    <img src={user.pictureURL} className="size-9 rounded-full"/>
                                    <div className='font-Inter'>
                                        <Link to={`/user/${user.id}`} className='hover:underline font-semibold'>{user.username}</Link>
                                        <div className='text-sm text-[#c7c6ccd2]'>{user.displayname}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                     ) : (
                        <div className='text-center text-[#acabb3d2] mt-4'>No results</div>
                     )}
                  

 
        </motion.div>
    )
 
}