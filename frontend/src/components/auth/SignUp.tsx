export function SignUp(){
    
    return(
            <form className='flex flex-col gap-4 mt-2 font-Alata text-white  w-70'>
                <input type='text' placeholder='Username' className='p-2 px-4 rounded-3xl focus:outline-none  bg-[#2b2a33]'/>
                <input type='text' placeholder='Display Name' className='p-2 px-4 rounded-3xl focus:outline-none  bg-[#2b2a33]'/>
                <input type='password' placeholder='Password' className='p-2 px-4 rounded-3xl focus:outline-none  bg-[#2b2a33]'/>
                <input type='password' placeholder='Confirm Password' className='p-2 px-4 rounded-3xl focus:outline-none  bg-[#2b2a33]'/>

                <button className='p-2 rounded-3xl bg-black cursor-pointer hover:bg-white hover:text-black hover:outline-2 text-sm '>Sign up</button>
            </form>
    )
}