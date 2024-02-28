"use client";
import React, {useRef, useState } from 'react'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { useToast } from "@/components/ui/use-toast"

export default function Tts(){
    const {toast} = useToast();
    const textarea = useRef<HTMLTextAreaElement|null>(null);
    const [isLoading,setLoading] = useState(false);
    const [audioURL,setAudioURL] = useState("");
    const handleSubmit = async ()=>{
        if(textarea?.current?.value==""){
            toast({
                title: "Error",
                description: "Please enter some text into the textarea",
            })   
            return;
        }
        if(isLoading){
            toast({
                title: "Error",
                description: "Wait till the previous request gets finished",
            }) 
            return;
        }
        setLoading(true);
        try{
            const res = await fetch("/api/convert",{method:"POST",body:JSON.stringify({text:textarea?.current?.value})})
            if (!res.ok) {
                throw new Error("Something went wrong");
            }
            const data = await res.arrayBuffer();
            const blob = new Blob([data], { type: "audio/mpeg" });
            const audioURL = URL.createObjectURL(blob);
            setAudioURL(audioURL);
        }catch(e){
            toast({
                title: "Request Failed",
                description: "Something went wrong",
            })
        }
        setLoading(false);
    }
  return (
    <section className="w-full my-4 md:my-24 flex flex-col items-center justify-center">
    <div className="w-full flex flex-col gap-1 px-4 md:px-16">
      <Label htmlFor="textarea"><h3 className="text-lg font-bold">Text</h3><p className='text-gray-500 text-md'>Max 256 letters</p></Label>
      <Textarea ref={textarea} maxLength={256} placeholder="Enter your text here..." id="textarea" className="text-md h-64 focus:!ring-transparent"/>
    </div>
    <div className="w-full max-w-xl flex items-center flex-col justify-center mx-auto my-4">
    {audioURL && !isLoading && (
        <div className='my-4 block w-full text-center'>
            <p className='my-2 text-lg font-semibold'>Here is your converted audio</p>
            <audio controls className='mx-auto w-full px-2'>
                <source id="audioSource" type="audio/flac" src={audioURL} />
            </audio>
        </div>
    )}
      {isLoading?<Button disabled>Loading...</Button>
      :
      <Button onClick={()=>handleSubmit()}>Convert</Button>}
    </div>
  </section>
  )
}

