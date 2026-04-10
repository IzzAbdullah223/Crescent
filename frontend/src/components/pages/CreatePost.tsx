import { useState } from "react"
import clip from '../../assets/paperclip.svg'
import tag from '../../assets/tags.svg'
import github from '../../assets/github.svg'

export function CreatePost(){
    const[text,setText]= useState('')
    const[tagInput,setTagInput]=useState('')
    const[tags,setTags]=useState<string[]>([])
    
    const handleSubmit = (e:React.FormEvent) =>{
        e.preventDefault()
    }
    const addTag=( )=>{
        setTags(t=>[...t,tagInput])
        setTagInput('')
    }

    return(
        <div className="w-full overflow-y-auto font-Inter tab:border-x tab:border-gray-400/15 desk:border-x desk:border-gray-400/15">
            <form
              onSubmit={(e)=>handleSubmit(e)}
              onKeyDown={(e)=>{
                if(e.key==="Enter"){
                    e.preventDefault()
                }
            }} className="mt-12 px-6 flex flex-col gap-6"> 

            <textarea 
                placeholder="Share what's happening.."
                className="text-lg overflow-hidden focus:outline-none resize-none mb-10"
                 rows={1}
                required 
                value={text}
                maxLength={2000}
                onChange={(e)=>{
                    const text = e.currentTarget
                    setText(e.target.value)
                    text.style.height="auto"
                    text.style.height= text.scrollHeight + 'px'
                }}
             />
            {tags?.map(tag => (
                 <div key={tag} className="flex items-center gap-2 p-1 rounded-full  bg-white/5 w-fit">
                    <div>{tag}</div>
                    <div className="hover:bg-white/10 text-red-500">x</div>
                 </div>
            ))}
             <div className="flex items-center justify-between mt-0"> 

                <div className="flex items-center gap-3">
                    <img src={clip} className="cursor-pointer"/>
                    <img src={tag} className=" cursor-pointer border-b-2  border-white pb-1"/>
                    <img src={github} className="cursor-pointer"/>
                </div>

                <div className="flex items-center gap-2"> 
                    <div>{text.length}/2000</div>
                    <button type="submit" className="bg-white text-black  rounded-full py-0.5 px-3.5 cursor-pointer hover:text-white hover:bg-[#E56C47]">Post</button>
                </div>

             </div>
             <div className="flex flex-col gap-4"> 
                <span>Tags:</span>
                <input
                value={tagInput}
                onChange={(e)=>setTagInput(e.target.value)}
                onKeyDown={(e)=>{
                    if(e.key==="Enter"){
                        addTag()
                    }
                }}
                 type="text"
                 placeholder="Please Enter to push a new tag."
                 className="outline-1 outline-gray-400/60 rounded-2xl py-1.5 px-3 text-sm focus:outline-[#E56C47]"
                 />
             </div>
             </form>



 
        </div>
    )
}