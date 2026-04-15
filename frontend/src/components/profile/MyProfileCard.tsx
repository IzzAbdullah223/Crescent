import { useEffect, useState } from 'react'
import {type user} from '../../lib/types'
import { getUserID } from '../../services/userServices';
import edit from '../../assets/edit(1).svg'
import check from '../../assets/check.svg'
import github from '../../assets/github.svg'
import global from '../../assets/global.svg'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { updateProfile } from '../../services/userServices';
import {type TProfileSchema, profileSchema} from '../../lib/types'
import { DotLoader } from 'react-spinners'
 

export function MyProfileCard(){
    const currentUserId= Number(localStorage.getItem('currentUserId'))
    const[userData,setUserData] = useState<user>()
 

    const[editingName,setEditingName] = useState(false)
    const[editingBio,setEditingBio] = useState(false)
    const[editingWebsite,setEditingWebsite] = useState(false)
    const[editingGithubLink,setEditingGithubLink] = useState(false)



 

  const [error, setError] = useState(false)
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TProfileSchema>({
    resolver: zodResolver(profileSchema)
  })
 

const displayNameWatch = watch('displayName')
const bioWatch = watch('bio')
const websiteWatch = watch('website')
const githubWatch = watch('github')

    const user = async ()=>{
        const response = await getUserID(currentUserId)
        if(response.status===200){
            const responseData:user = await response.json()
            setValue('displayName',responseData.displayname)
            setValue('bio',responseData.bio)
            setValue('website',responseData.website)
            setValue('github',responseData.githubLink)
            setUserData(responseData)
        }
    }

    const onSubmit = async (data:TProfileSchema) => {
            setEditingName(false)
            setEditingBio(false)
            setEditingWebsite(false)
            setEditingGithubLink(false)
           const response = await updateProfile(data)
           // later on get a toast library and show a success message on successful update and an error message on failure instead of just logging to console
           if(response.status===200){
            user()
           }

           //and maybe also show an error message if the update fails for some reason url name not in range etc
    }

    useEffect(()=>{
        user()
    },[])

    return(
        <form className='flex flex-col gap-7  border-b border-gray-400/15 p-4' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex items-center mb-5 gap-15 mt-3  '> 
                <img src={userData?.pictureURL} className="size-30 rounded-full"/> 

                <div className='flex flex-col items-center ml-10 gap-4 w-60'>

                    <h1 className="font-bold text-lg">{userData?.username}</h1>
                            
                    {editingName?
                        <div className='flex ml-5 -mt-4'>
                            <input
                           
                            {...register('displayName')}
                             type='text'  
                             className='outline-gray-400/65 outline rounded-xs  
                             text-center w-44 text-xs  '/>
                            <img src={check} className='hover:opacity-60 cursor-pointer' onClick={()=>setEditingName(false)}/> 
                        </div> :
                        <div className='flex items-center -mt-4'>
                            <p className="text-[#c7c6ccd2]">{displayNameWatch || userData?.displayname}</p>
                            <img src={edit} className="size-6 cursor-pointer hover:opacity-60" onClick={()=>setEditingName(true)}/>
                        </div>
                    }

                    <div className='flex gap-4 text-[0.9rem]'>
                        <div>
                            <div className="font-bold text-center">0</div>
                            <span className="text-[#e7e7eb] text-md">Followers</span>
                        </div>

                        <div>
                            <div className="font-bold text-center">0</div>
                            <span className="text-[#e7e7eb] text-md">Following</span>
                        </div>

                        <div>
                            <div className="font-bold text-center">0</div>
                            <span className="text-[#e7e7eb] text-md">Posts</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col text-sm gap-3'> 

              
                <div className='flex gap-2 items-center'>
                    {editingBio ? (
                        <>
                            <input
                            {...register('bio')}
                             className='outline-gray-400/65 outline rounded-xs text-xs px-2 py-1.5 w-97.5'/>
                            <img src={check} className='cursor-pointer hover:opacity-40' onClick={()=>setEditingBio(false)}/>
                        </>
                    ) : (
                        <>
                            <div>{bioWatch || userData?.bio}</div>
                            <img src={edit} className='cursor-pointer hover:opacity-40' onClick={()=>setEditingBio(true)}/>
                                 <div className='text-[#7c818f]'>bio</div>
                        </>
                    )}
                </div>

        
                <div className='flex gap-2 items-center'>
                    <img src={global} className='size-6'/>
                    {editingWebsite ? (
                        <>
                            <input
                            {...register('website')}
                             className='outline-gray-400/65 outline rounded-xs text-xs px-2 w-90'/>
                            <img src={check} className='cursor-pointer hover:opacity-40' onClick={()=>setEditingWebsite(false)}/>
                        </>
                    ) : (
                        <>
                            <div>{websiteWatch || userData?.website}</div>
                            <img src={edit} className='cursor-pointer hover:opacity-40' onClick={()=>setEditingWebsite(true)}/>
                            <div className='text-[#7c818f]'>website</div>
                        </>
                    )}
                </div>
                
               
                <div className='flex gap-2 items-center  '>
                    <img src={github} className='size-6'/>
                    {editingGithubLink ? (
                        <>
                            <input
                            {...register('github')}
                             className='outline-gray-400/65 outline rounded-xs text-xs px-2 w-90'/>
                            <img src={check} className='cursor-pointer hover:opacity-40' onClick={()=>setEditingGithubLink(false)}/>

                        
                        </>
                    ) : (
                        <>
                            <div>{githubWatch || userData?.githubLink}</div>
                            <img src={edit} className='cursor-pointer hover:opacity-40' onClick={()=>setEditingGithubLink(true)}/>
                            <div className='text-[#7c818f]'>github</div>
                        </>
                    )}
                </div>

            </div>
            <div className='flex items-center gap-5 h-8'> 
            <button
                type='submit'
                disabled={isSubmitting}
                 className='bg-white text-black font-[500] -mb-3 w-fit p-1.5 px-3.5 rounded-lg text-[0.9rem] outline-2 cursor-pointer hover:bg-black hover:outline-white hover:text-white'>
                Save Changes
            </button>
            {isSubmitting && <DotLoader color="#ffffff" size={25}/>}
            </div>

            <h2 className='text-center -mb-3'>Posts</h2>
        </form>
    )
}