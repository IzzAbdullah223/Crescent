import Crescent from '../../assets/crescent.svg'
import { ContinueWithGoogle } from './ContinueWithGoogle'
import { Link, useLocation } from 'react-router-dom'
import CrescentPanel from '../../layouts/components/CrescentPanel'

export function FormPage({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()
  const isSignup = pathname === '/signup'

  return (
    <div className="flex h-screen">
      {/* left panel  }
      <div className="flex flex-col justify-center gap-4 items-center w-full panel:w-[45%] desk:w-[40%] shrink-0 bg-[#faf8f4] font-Inter px-8 overflow-y-auto pb-5">
        <img src={Crescent} className="size-30" />
        <div className="-mt-5">
          <p className="text-[1.3rem] font-bold text-center">
            {isSignup ? 'Join us Today!' : 'Welcome back!'}
          </p>
          <p className="text-gray-500 text-center">
            {isSignup ? 'Please fill in your details below' : 'Please fill in your login details'}
          </p>
        </div>
        <div className="h-[450px]">
          {children}
          {isSignup ? (
            <p className="text-gray-500 text-[0.9rem] mt-2">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-black hover:underline hover:decoration-1">
                Login
              </Link>
            </p>
          ) : (
            <p className="text-gray-500 text-[0.9rem] mt-2">
              Don't have an account?{' '}
              <Link to="/signup" className="font-bold text-black hover:underline hover:decoration-1">
                Sign up
              </Link>
            </p>
          )}
        </div>
        <ContinueWithGoogle />
      </div>

      {/* right panel */}
      <div className="hidden panel:flex flex-1">
        <CrescentPanel />
      </div>
    </div>
  )
}