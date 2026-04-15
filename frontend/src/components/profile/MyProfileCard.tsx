 
import { useEffect, useState } from 'react'
import {type user} from '../../lib/types'
import { getUserID } from '../../services/userServices';
import edit from '../../assets/edit(1).svg'
import check from '../../assets/check.svg'
import github from '../../assets/github.svg'
import global from '../../assets/global.svg'
 
const[editingName,setEditingName] = useState(false)
const[bio,setBio] = useState(false)
const[website,setWebsite] = useState(false)
const[githubLink,setGithubLink] = useState(false)

 
 
 
 

export function MyProfileCard(){
    const currentUserId= Number(localStorage.getItem('currentUserId'))
    const[userData,setUserData] = useState<user>()
 

    const user = async ()=>{
 
        const response = await getUserID(currentUserId)
        if(response.status===200){
            const responseData:user = await response.json()
            setUserData(responseData)
        }
    }

    useEffect(()=>{
        user()
    },[])
    return(
            <div className='flex flex-col gap-7  border-b border-gray-400/15 p-4 '>
                <div className='flex items-center mb-5 gap-15 mt-3  '> 
                <img src={userData?.pictureURL} className="size-30 rounded-full"/> 

                    <div className='flex flex-col items-center ml-5 gap-4'>
                      
                            <h1 className="font-bold text-lg">{userData?.displayname}</h1>
                            {editingName? <input type='text' placeholder='test'/> :
                            <div className='flex  items-center -mt-4'>
                                <p className="text-[#c7c6ccd2]">@{userData?.username}</p>
                                <img src={edit} className="size-6  cursor-pointer hover:opacity-60" onClick={()=>setEditingName(true)}/>
                            </div>
                            
                            }
    
                             
                        

                        <div className='flex gap-4 text-[0.9rem]'>

                            <div>
                                <div className="font-bold text-center">0</div>
                                <span className="text-[#e7e7eb] text-md">Followers</span>
                            </div>

                            <div>
                                <div className="font-bold text-center">0</div>
                                <span className="text-[#e7e7eb] text-md">Following</span>
                            </div>

                            <div>
                                <div className="font-bold text-center">0</div>
                                <span className="text-[#e7e7eb] text-md">Posts</span>
                            </div>

                        </div>
 

                </div>
              
                </div>
                <div className='flex flex-col text-sm   gap-3'> 
                    <div className='flex gap-2'>
                        <div>Hello there</div>
                        <img src={edit} className='cursor-pointer hover:opacity-40'/>
                        <div className='text-[#7c818f]'>bio</div>
                    </div>

                    <div className='flex gap-2'>
                        <img src={global} className='size-6'/>
                        <div>www.google.com</div>
                        <img src={edit} className='cursor-pointer hover:opacity-40'/>
                        <div className='text-[#7c818f]'>website</div>
                    </div>
                
                    <div className='flex gap-2'>
                        <img src={github} className='size-6'/>
                        <div className=''>www.github.com/timothyligma</div>
                        <img src={edit} className='cursor-pointer hover:opacity-40'/>
                        <div className='text-[#7c818f]'>github</div>
                    </div>
                </div>
                <button className='bg-white text-black font-[500] -mb-3 w-fit p-1.5 px-3.5 rounded-lg text-[0.9rem] outline-2  cursor-pointer hover:bg-black hover:outline-white hover:text-white'>Save Changes</button>
                <h2 className='text-center  -mb-3'>Posts</h2>
        </div>
    )
}