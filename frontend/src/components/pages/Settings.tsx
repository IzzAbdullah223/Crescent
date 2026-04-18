import { Link } from "react-router-dom"
import leftArrow from '../../assets/arrow-left(1).svg'
import logout from '../../assets/logout(1).svg'
import { useNavigate } from "react-router-dom"
import {motion} from 'framer-motion'
export function Settings(){
    const navigate = useNavigate()
   
    const logOut = () => {
        console.log("TEST")
        localStorage.removeItem('currentUserId')
        localStorage.removeItem('token')
        navigate('/login')
    }

    return(
      <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
        className=" overflow-y-auto   flex-1  font-Inter tab:border-x tab:border-gray-400/15 desk:border-x desk:border-gray-400/15">
            <div className=" flex gap-8 items-center text-[1.2rem]  border-b border-gray-400/15  p-4">
                <Link to="/search" className='hover:bg-white/10 rounded-full p-1'> 
                    <img src={leftArrow} className="size-6 cursor-pointer"/>
                </Link>
                <span className="font-bold text-lg">Settings</span>
            </div>

            <div className="flex flex-col gap-5 p-4 ">
                <div className="font-Inter">Account</div>
                <div className="flex items-center gap-1 bg-white/6 p-3.5 rounded-lg hover:bg-white/10  cursor-pointer" onClick={logOut} >
                    <img src={logout} className="size-6 inline-block"/>
                    <div>Logout</div>
                </div>
            </div>
        </motion.div>
    )
 
}