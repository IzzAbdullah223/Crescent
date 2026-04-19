import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type TSignUpSchema, signUpSchema} from '../../lib/types';
import { signUp } from '../../services/authServices';
import { useNavigate } from 'react-router-dom';
import loading from '../../assets/loading.svg'
 
export function SignUp(){


  const navigate = useNavigate()

    const{
        register,
        handleSubmit,
        formState:{errors,isSubmitting},
        setError,
    } = useForm<TSignUpSchema>({
        resolver:zodResolver(signUpSchema)
    })

    const onSubmit= async (data:TSignUpSchema)=>{
      const response = await signUp(data)
      if(response.errors){
        const errors = response.errors
        if(errors.username){
          setError("username",{type:"server",message: errors.username})
        }
      }
      else{
        navigate('/home')
      }

    }
  
    return(
            <form className='flex flex-col gap-4 mt-2 font-Alata text-white' onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register('username')}
                    placeholder='Username'
                    className='p-2 px-4 rounded-3xl
                    focus:outline-none  bg-[#2b2a33]'
                                                    />
              {errors.username && (
                <p className="text-red-500 text-sm -mt-1 -mb-1">{errors.username?.message}</p>
              )}

                <input
                    {...register('displayname')}
                    placeholder='Display Name'
                    className='p-2 px-4 rounded-3xl
                    focus:outline-none  bg-[#2b2a33]'/>
              {errors.displayname && (
                <p className="text-red-500 text-sm -mt-1 -mb-1">{errors.displayname?.message}</p>
              )}


                <input
                    {...register('password')}
                    type='password' 
                    placeholder='Password' className='p-2 px-4 rounded-3xl
                    focus:outline-none  bg-[#2b2a33]'/>
              {errors.password && (
                <p className="text-red-500 text-sm -mt-1 -mb-1">{errors.password?.message}</p>
              )}
                  
                <input
                {...register('confirmPassword')}
                    type='password'
                    placeholder='Confirm Password'
                     className='p-2 px-4 rounded-3xl
                   focus:outline-none  bg-[#2b2a33]'/>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm -mt-1 -mb-1">{errors.confirmPassword.message}</p>
              )}

                
                <button
                type='submit'
                 disabled={isSubmitting}
                 className='p-2 rounded-3xl bg-black cursor-pointer
                  hover:bg-white hover:text-black hover:outline-2 text-sm '>Sign up</button>
            </form>
    )
}