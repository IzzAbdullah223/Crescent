import home from '../../assets/home.svg'
import heart from '../../assets/heartwhite.svg'
import chat from '../../assets/chat.svg'
import settings from '../../assets/settings.svg'
import create from '../../assets/plus (2).svg'
import searchUser from '../../assets/userSearch.svg'
import profile from '../../assets/profile.svg'
import { useNavigate,NavLink } from 'react-router-dom'


export function NavBar(){

    const navigate = useNavigate()

    const navStyle = (isActive:boolean)=>
     `p-1 rounded-full transition-all duration-300 ${
      isActive
        ? 'bg-[#656373] hover:-translate-x-1 hover:translate-y-1'
        : 'hover:bg-white/10 hover:-translate-x-1'
    }`
    

  return (
    <div className='flex items-center justify-around p-2'>
      <NavLink to="/Home" className={({ isActive }) => navStyle(isActive)}>
        <img src={home} className='size-6' />
      </NavLink>

      <NavLink to="/Feed" className={({ isActive }) => navStyle(isActive)}>
        <img src={create} className='size-6' />
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