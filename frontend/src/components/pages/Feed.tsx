import { getUser } from '../../services/userServices'
import { useEffect,useState } from 'react'
import {type user} from '../../lib/types'
import likes from '../../assets/likes.svg'
import comments from '../../assets/comment2.svg'
import { Link } from 'react-router-dom'
 

export function Feed(){

    const[data,setData]=  useState<user>()
    useEffect(()=>{
        user()
    },[])

    const[currentFeed,setCurrentFeed]=useState(true)



    const user = async ()=>{

        const response = await getUser()

         if(response.status===200){

            const responseData:user = await response.json()
            setData(responseData)
          
         }
    }
    return(
        <div className='flex flex-row w-full'> 
        <div className="w-full overflow-y-auto font-Inter tab:border-x tab:border-gray-400/15 desk:border-x desk:border-gray-400/15">

            <div className="flex items-center justify-center gap-4 text-[1.2rem]  border-b border-gray-400/15 w-full p-4">
                <div className={`${currentFeed? 'border-b-[3px] border-[#e66c47] rounded-sm':''}`}>Recent</div>
                <div className={`${currentFeed? '':'border-b-[3px] border-[#e66c47] rounded-sm'}`}>Following</div>
            </div>

            <div className='flex flex-col gap-4 hover:bg-white/10 pb-10 p-4 cursor-pointer'> 

            <div className='flex items-center gap-2'>
                <img src={data?.pictureURL} className=' mr-2 size-8 rounded-full object-cover object-center'/>
                <Link to={'/'} className='font-Alata hover:underline'>{data?.username}</Link>
                <div className='text-[#565565] text-2xl'>•</div>
                <div className='text-[#565565] text-balance'>15 hours ago</div>
            </div>

            <div>Hey, what's up?</div>

            <div className='flex gap-4'>
                {/* gonna have a conditn here to display either a red heart or no depend on likes*/}
                <div className='flex items-center gap-1.5'>
                    <img src={likes} className='size-6'/>
                    <span>0</span>
                </div>
                <div className='flex items-center gap-1.5'> 
                    <img src={comments} className='size-6'/>
                    <span>0</span>
                </div>
            </div>

            </div>

            <div className='flex flex-col gap-4 hover:bg-white/10 pb-10 p-4'> 

            <div className='flex items-center gap-2'>
                <img src={data?.pictureURL} className=' mr-2 size-8 rounded-full object-cover object-center'/>
                <div className='font-Alata'>{data?.username}</div>
                <div className='text-[#565565] text-2xl'>•</div>
                <div className='text-[#565565] text-balance'>15 hours ago</div>
            </div>

            <div>Hey, what's up?</div>

            <div className='flex gap-4'>
                {/* gonna have a conditn here to display either a red heart or no depend on likes*/}
                <div className='flex items-center gap-1.5'>
                    <img src={likes} className='size-6'/>
                    <span>0</span>
                </div>
                <div className='flex items-center gap-1.5'> 
                    <img src={comments} className='size-6'/>
                    <span>0</span>
                </div>
            </div>

            </div>

            <div className='flex flex-col gap-4 hover:bg-white/10 pb-10 p-4'> 

            <div className='flex items-center gap-2'>
                <img src={data?.pictureURL} className=' mr-2 size-8 rounded-full object-cover object-center'/>
                <div className='font-Alata'>{data?.username}</div>
                <div className='text-[#565565] text-2xl'>•</div>
                <div className='text-[#565565] text-balance'>15 hours ago</div>
            </div>

            <div>Hey, what's up?</div>

            <div className='flex gap-4'>
                {/* gonna have a conditn here to display either a red heart or no depend on likes*/}
                <div className='flex items-center gap-1.5'>
                    <img src={likes} className='size-6'/>
                    <span>0</span>
                </div>
                <div className='flex items-center gap-1.5'> 
                    <img src={comments} className='size-6'/>
                    <span>0</span>
                </div>
            </div>

            </div>

            <div className='flex flex-col gap-4 hover:bg-white/10 pb-10 p-4'> 

            <div className='flex items-center gap-2'>
                <img src={data?.pictureURL} className=' mr-2 size-8 rounded-full object-cover object-center'/>
                <div className='font-Alata'>{data?.username}</div>
                <div className='text-[#565565] text-2xl'>•</div>
                <div className='text-[#565565] text-balance'>15 hours ago</div>
            </div>

            <div>Hey, what's up?</div>

            <div className='flex gap-4'>
                {/* gonna have a conditn here to display either a red heart or no depend on likes*/}
                <div className='flex items-center gap-1.5'>
                    <img src={likes} className='size-6'/>
                    <span>0</span>
                </div>
                <div className='flex items-center gap-1.5'> 
                    <img src={comments} className='size-6'/>
                    <span>0</span>
                </div>
            </div>

            </div>

            <div className='flex flex-col gap-4 hover:bg-white/10 pb-10 p-4'> 

            <div className='flex items-center gap-2'>
                <img src={data?.pictureURL} className=' mr-2 size-8 rounded-full object-cover object-center'/>
                <div className='font-Alata'>{data?.username}</div>
                <div className='text-[#565565] text-2xl'>•</div>
                <div className='text-[#565565] text-balance'>15 hours ago</div>
            </div>

            <div>Hey, what's up?</div>

            <div className='flex gap-4'>
                {/* gonna have a conditn here to display either a red heart or no depend on likes*/}
                <div className='flex items-center gap-1.5'>
                    <img src={likes} className='size-6'/>
                    <span>0</span>
                </div>
                <div className='flex items-center gap-1.5'> 
                    <img src={comments} className='size-6'/>
                    <span>0</span>
                </div>
            </div>

            </div>



 
        </div>
        <div className="p-3 hidden desk:block"> {/* from here this is the feedsidebar component we had */}

            <div className="w-full flex flex-col gap-4  "> 

                <div className="outline-1 outline-white/10 p-2 rounded-md    ">

                    <h1 className=" border-b pb-2 border-gray-400/20 font-bold text-[1.25rem]  ">Latest users</h1>

                    <div className="flex items-center gap-4 pt-3">
                        <img src={data?.pictureURL} className="size-8 rounded-full object-cover object-center"/>
                        <div className="min-w-0">
                            <div className="truncate">12345</div>
                            <div className="truncate">{data?.displayname}</div>
                        </div>
                        <button className="text-black bg-[#c4c2ce] p-1 px-6 rounded-full border border-white/40 shadow-[0_0_0_1px_rgba(255,255,255,0.15)] shrink-0">Follow</button>
                    </div>

                    <div className="flex items-center gap-4">
                        <img src={data?.pictureURL} className="size-8 rounded-full object-cover object-center"/>
                        <div className="min-w-0">
                            <div className="truncate ">{data?.username}</div>
                            <div className="truncate">{data?.displayname}</div>
                        </div>
                        <button className="text-black bg-[#c4c2ce] p-1 px-6 rounded-full border border-white/40 shadow-[0_0_0_1px_rgba(255,255,255,0.15)] shrink-0">Follow</button>
                    </div>

                    <div className="flex items-center gap-4">
                        <img src={data?.pictureURL} className="size-8 rounded-full object-cover object-center"/>
                        <div className="min-w-0">
                            <div className="truncate ">{data?.username}</div>
                            <div className="truncate">{data?.displayname}</div>
                        </div>
                        <button className="text-black bg-[#c4c2ce] p-1 px-6 rounded-full border border-white/40 shadow-[0_0_0_1px_rgba(255,255,255,0.15)] shrink-0">Follow</button>
                    </div>

                </div>

                <div className="outline-1 outline-white/10 p-2 rounded-md">

                    <h1 className=" border-b pb-2 border-gray-400/20 font-bold text-[1.25rem]">Most followed</h1>

                    <div className="flex items-center gap-4 pt-3">
                        <img src={data?.pictureURL} className="size-8 rounded-full object-cover object-center"/>
                        <div className="min-w-0">
                            <div className="truncate">{data?.username}</div>
                            <div className="truncate">{data?.displayname}</div>
                        </div>
                        <button className="text-black bg-[#c4c2ce] p-1 px-6 rounded-full border border-white/40 shadow-[0_0_0_1px_rgba(255,255,255,0.15)] shrink-0">Follow</button>
                    </div>

                    <div className="flex items-center gap-4">
                        <img src={data?.pictureURL} className="size-8 rounded-full object-cover object-center"/>
                        <div className="min-w-0">
                            <div className="truncate">{data?.username}</div>
                            <div className="truncate">{data?.displayname}</div>
                        </div>
                        <button className="text-black bg-[#c4c2ce] p-1 px-6 rounded-full border border-white/40 shadow-[0_0_0_1px_rgba(255,255,255,0.15)] shrink-0">Follow</button>
                    </div>

                    <div className="flex items-center gap-4">
                        <img src={data?.pictureURL} className="size-8 rounded-full object-cover object-center"/>
                        <div className="min-w-0">
                            <div className="truncate">{data?.username}</div>
                            <div className="truncate">{data?.displayname}</div>
                        </div>
                        <button className="text-black bg-[#c4c2ce] p-1 px-6 rounded-full border border-white/40 shadow-[0_0_0_1px_rgba(255,255,255,0.15)] shrink-0">Follow</button>
                    </div>

                </div>

                <div className=" p-2 rounded-md">

                    <h1 className=" border-b pb-1 border-gray-400/20 text-[1.25rem] mb-8 font-[630]">Announcements</h1>
                    <ul className="list-disc pl-4 mb-5 text-[#c4c2ce]  ">
                        <li>Added animations to loading pages</li>
                        <li>Added Skeleton Loading to home page</li>
                    </ul>
                    <p>Last updated: 24 Nov 2024</p>
                </div>


            </div>

        </div>    
             
        </div>
    )
}