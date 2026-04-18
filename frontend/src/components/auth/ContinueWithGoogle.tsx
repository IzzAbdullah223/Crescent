import google from '../../assets/google.svg'
export  function ContinueWithGoogle(){

    return(
        <div className='w-70'> 
                <div className='flex items-center  gap-1 mb-5'>
                    <div className=' flex-1 h-px bg-gray-700'></div>
                    <span className='text-gray-700'>or</span>
                    <div className=' flex-1 h-px bg-gray-700'></div>
                </div>
<button
    onClick={() => window.location.href = 'http://localhost:3000/auth/google'}
    className='flex items-center justify-center gap-2 bg-white border border-black/50 w-full p-2 rounded-4xl cursor-pointer hover:bg-gray-400/10'>
    <img src={google} className='size-5'/>
    <span className='font-Google text-sm'>Continue with Google</span>
</button>
            </div>
    )

}