import { Outlet } from 'react-router-dom'
import { Header } from './components/Header'
import { NavBar } from './components/Navbar'

export function AppLayout() {
    return (
        <div className='bg-[#121212] text-white flex flex-col h-screen'>
            <Header/>
            <div className="flex flex-col flex-1 overflow-hidden w-full tab:flex-row tab:justify-between tab:px-15  tab:max-w-[700px] tab:mx-auto desk:flex-row desk:justify-between  desk:gap-4 desk:max-w-[1500px] desk:mx-auto">
                <Outlet/>
                <NavBar/>
            </div>
        </div>
    )
}