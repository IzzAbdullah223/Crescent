import { useState } from "react"
import clip from '../../assets/paperclip.svg'
import tag from '../../assets/tags.svg'
import github from '../../assets/github.svg'
import x from '../../assets/x.svg'
import close from '../../assets/close.svg'
import { createPost } from "../../services/postServices"
import {type postData} from '../../lib/types'
import { useRef } from "react"

export function CreatePost(){
 
    const [formData,setFormData]=useState<postData>({
        content:'',
        tags:[],
        mediaURL:null,
        githubRepo:'',
    })

    const [tagInput, setTagInput] = useState('')
    const [imagePreview, setImagePreview] = useState<string | undefined>(undefined)
    const fileInputRef = useRef<HTMLInputElement>(null)
    

    const HandleImageUpload = async () => {
        fileInputRef.current?.click()
    }

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        if (imagePreview) URL.revokeObjectURL(imagePreview)
        if (fileInputRef.current) fileInputRef.current.value = ""
        const imageUrl = URL.createObjectURL(file)
        setImagePreview(imageUrl)
        setFormData(prev => ({
            ...prev,
            pictureURL:file
        }))

  }


   const handleCancelImage = () => {
        if (imagePreview) URL.revokeObjectURL(imagePreview)
        setImagePreview(undefined)
  }


    const addTag=( )=>{

        const tags = formData.tags ?? []

        if (!tagInput.trim()) return 

        if (tags.includes(tagInput)) return

        setFormData(prev => ({
            ...prev,
            tags: [...tags, tagInput]
        }))

    }

    const removeTag = (removedTag: string) => {
        setFormData(prev => ({
        ...prev,
        tags: (prev.tags ?? []).filter(tag => tag !== removedTag)
    }))
}
    
    const handleSubmit = async (e:React.FormEvent) =>{
        e.preventDefault()
        const data = new FormData()
        data.append("content",formData.content ?? "")
        data.append("githubRepo",formData.githubRepo ?? "")
        data.append("tags",JSON.stringify(formData.tags ?? []))
        if(formData.mediaURL) data.append("media",formData.mediaURL)
            
        const response = await  createPost(data)
        console.log(response)
    }


 

    return(
        <div className=" overflow-y-auto   flex-1  font-Inter tab:border-x tab:border-gray-400/15 desk:border-x desk:border-gray-400/15">
            <form
              onSubmit={(e)=>handleSubmit(e)}
              onKeyDown={(e)=>{
                if(e.key==="Enter"){
                    e.preventDefault()
                }
            }} className="mt-12 px-6 flex flex-col gap-6"> 

            <textarea 
                placeholder="Share what's happening.."
                className="text-lg overflow-hidden focus:outline-none resize-none mb-8"
                 rows={1}
                required 
                value={formData.content}
                maxLength={2000}
                onChange={(e)=>{
                    const text = e.currentTarget
                    setFormData(prev=>({
                        ...prev,
                        content:e.target.value
                    }))
                    text.style.height="auto"
                    text.style.height= text.scrollHeight + 'px'
                }}
             />

            <div className={`relative mx-auto  w-fit h-fit ${imagePreview ? "" : "hidden"}`}>
                <img className="w-80 rounded-lg" src={imagePreview} />
                <button type="button" onClick={handleCancelImage} className="absolute size-6 top-0 right-0 bg-dark-300 rounded-full p-1 cursor-pointer">
                  <img src={close} />
                </button>
            </div>

                <div  className="flex items-center gap-1"> 
                    {(formData.tags?? []).map((tag,id) => (
                        <div key={id} className="flex items-center gap-2 p-1 px-2.5 rounded-xl    bg-white/8 w-fit">
                        <div>{tag}</div>
                        <img src={x} className="size-3.5 hover:bg-gray-400 hover:rounded-full" onClick={()=>removeTag(tag)} />
                    </div>
                ))}
                </div>


             <div className="flex items-center justify-between mt-0"> 

                <div className="flex items-center gap-3">
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />
                    <img src={clip} className="cursor-pointer" onClick={HandleImageUpload}/>
                    <img src={tag} className=" cursor-pointer border-b-2  border-white pb-1"/>
                    <img src={github} className="cursor-pointer"/>
                </div>

                <div className="flex items-center gap-2"> 
                    <div>{formData.content?.length}/2000</div>
                    <button type="submit" className="bg-white text-black  rounded-full py-0.5 px-3.5 cursor-pointer hover:text-white hover:bg-[#E56C47]">Post</button>
                </div>

             </div>

 

             <div className="flex flex-col gap-4 pb-5"> 
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