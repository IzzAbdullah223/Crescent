import { Header } from "../ui/Header"
import { Feed } from "../ui/Feed"
import { NavBar } from "../ui/NavBar"
import { FeedSideBar } from "../ui/FeedSideBar"
 
export  function Home(){

    return(
         <div className='bg-[#121212] text-white flex flex-col h-screen  '>
            <Header/>
            <div className="flex flex-col flex-1 overflow-hidden w-full tab:flex-row tab:justify-between tab:px-15  tab:max-w-[750px]  tab:mx-auto desk:flex-row desk:justify-between desk:px-20 desk:gap-4 desk:max-w-[1275px] desk:mx-auto  ">
                <Feed/>
                <NavBar/>
                <FeedSideBar/>
            </div>
    
         </div>
    )
}