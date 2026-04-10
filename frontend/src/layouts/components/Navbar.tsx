import home from '../../assets/home.svg'
import heart from '../../assets/heart.svg'
import chat from '../../assets/messages.svg'
import settings from '../../assets/settings.svg'
import create from '../../assets/plus.svg'
import profile from '../../assets/user-circle.svg'
import searchUser from '../../assets/profile.svg'
import { useNavigate,NavLink } from 'react-router-dom'


export function NavBar(){

    const navigate = useNavigate()

    const navStyle = (isActive:boolean)=>
     `p-2 rounded-full  transition-all duration-300 tab:px-3 tab:rounded-2xl desk:px-3 desk:rounded-2xl ${
      isActive
        ? 'bg-[#565565] hover:-translate-x-1 hover:translate-y-1'
        : 'hover:bg-white/5 hover:-translate-x-1'
    }`
    

  return (
    <div className='flex items-center justify-around p-2 tab:pt-6 tab:flex-col  tab:order-first tab:justify-start tab:gap-6 tab:pr-4  tab:shrink-0 desk:pt-6 desk:flex-col desk:order-first desk:justify-start desk:gap-6 desk:pr-4 desk:shrink-0 '>
      <NavLink to="/home" className={({ isActive }) => navStyle(isActive)}>
        <img src={home} className='size-6'/>
      </NavLink>

      <NavLink to="/create" className={({ isActive }) => navStyle(isActive)}>
        <img src={create} className='size-6'/>
      </NavLink>

      <NavLink to="/Search" className={({ isActive }) => navStyle(isActive)}>
        <img src={searchUser} className='size-6' />
      </NavLink>

      <NavLink to="/Chat" className={({ isActive }) => navStyle(isActive)}>
        <img src={chat} className='size-6' />
      </NavLink>

      <NavLink to="/Likes" className={({ isActive }) => navStyle(isActive)}>
        <img src={heart} className='size-6' />
      </NavLink>

      <NavLink to="/Profile" className={({ isActive }) => navStyle(isActive)}>
        <img src={profile} className='size-6' />
      </NavLink>

      <NavLink to="/Settings" className={({ isActive }) => navStyle(isActive)}>
        <img src={settings} className='size-6' />
      </NavLink>

    </div>
  )
}