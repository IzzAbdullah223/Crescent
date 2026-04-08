import { Header } from "../ui/Header"
import { Feed } from "../ui/Feed"
import { NavBar } from "../ui/NavBar"
export  function Home(){

    return(
         <div className='bg-[#121212] text-white flex flex-col h-screen '>
            <Header/>
            <div className="flex flex-col flex-1 overflow-hidden w-full tab:flex-row   tab:px-10  ">
            
                    <Feed/>
                <NavBar/>
            </div>
    
         </div>
    )
}