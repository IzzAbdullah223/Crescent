 import { getUser } from "../../services/userServices"
 import { useEffect,useState } from "react"
 import {type user} from '../../lib/types'
export  function FeedSideBar(){


    const[data,setData]=  useState<user>()
    const user = async ()=>{

        const response = await getUser()
            console.log(response)
         if(response.status===200){
            const responseData:user = await response.json()
            setData(responseData)
          
         }
    }

        useEffect(()=>{
        user()
    },[])
    return(
        <div className="p-3 hidden desk:block">

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

    )
}