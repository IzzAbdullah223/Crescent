export function LogIn(){

    return(
        <form className='flex flex-col gap-4 mt-2 font-Alata text-white  w-70'>
            <input type='text' placeholder='Username' className='p-2 px-4 rounded-3xl focus:outline-none  bg-[#2b2a33]'/>
            <input type='password' placeholder='Password' className='p-2 px-4 rounded-3xl focus:outline-none  bg-[#2b2a33]'/>
            <button className='p-2 rounded-3xl bg-black text-white cursor-pointer hover:bg-white hover:text-black hover:outline-2 text-sm '>Sign up</button>
            <button className=' cursor-pointer p-2 rounded-3xl [background:linear-gradient(to_right,#000,#c8a96e)] hover:[background:#fff] hover:text-black hover:outline-1 text-sm transition-all duration-700' >Guest User</button>
        </form>
    )

  
}