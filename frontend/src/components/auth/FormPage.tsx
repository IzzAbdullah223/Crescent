import Crescent from '../../assets/crescent.svg'
import { ContinueWithGoogle } from './ContinueWithGoogle'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
export  function FormPage({children}:{children:React.ReactNode}){

    const {pathname} = useLocation()

    console.log(pathname)

      return(
         <div className="bg-[#faf8f4]">
            <div className='flex flex-col justify-center gap-4 items-center h-[95vh] font-Inter'> 
                <img src={Crescent} className='size-30'/>
                <div className='-mt-5'> 
                    <p className='text-2xl text-[1.3rem] font-bold text-center'>Join us Today!</p>
                    {pathname=='/signup'?
                    <p className='text-gray-500'>Please fill in your details below</p>:
                    <p className='text-gray-500'>Please fill in your login details</p>
                } 
                </div>
                <div className='h-[450px]'> 
                    {children}
                    {pathname=='/signup'?
                        <p className='text-gray-500 text-[0.9rem] mt-2'>Already have an account? <Link to={'/login'} className='font-bold text-black hover:underline hover:decoration-1'>Login</Link></p>:
                        <p className='text-gray-500 text-[0.9rem] mt-2'>Don't have an account? <Link to={'/signup'} className='font-bold text-black hover:underline hover:decoration-1'>Sign up</Link></p>    
                    }
                </div>
                <ContinueWithGoogle/>
            </div>
        </div>
    )
}