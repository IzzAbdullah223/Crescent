import { Header } from "../ui/Header"
import { Feed } from "../ui/Feed"
import { NavBar } from "../ui/NavBar"
export  function Home(){

    return(
         <div className='bg-[#121212] text-white flex flex-col h-screen'>
            <Header/>
            <div className="flex items-center justify-center gap-4 text-[1.2rem] border-t border-gray-400/20 font-Alata p-4">
                <div className="border-b-[3px] border-[#e66c47] rounded-sm">Recent</div>
                <div className="border-b-[3px] border-[#e66c47] rounded-sm">Following</div>
            </div>
            <Feed/>
            <NavBar/>
         </div>
    )
}