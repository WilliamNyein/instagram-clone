import React,{useState} from 'react'
import { Button } from '@material-ui/core'
import { db,storage } from '../firebase'
import {ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import {doc,serverTimestamp,
addDoc,collection} from 'firebase/firestore'
import './ImageUpload.css'

function ImageUpload({username}) {
    const [image,setImage] = useState('')
    const [progress,setProgress] = useState(0)
    const [caption,setCaption] = useState('')
    
    const handleChange = (e)=>{
        if(e.target[0].files[0]){
            setImage(e.target[0].files[0])
        }
    };
    
    const handleUpload = ()=>{
        const storageRef = ref(storage,`images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef,image)
        uploadTask.on(
            'state_changed',
            (snapshot)=>{
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress)
            },
            (error)=>{
                console.log(error.payload)
                alert(error.message)
            },
            ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                addDoc(collection(db,'posts'),{
                    timestamp:serverTimestamp(),
                    caption:caption,
                    imageUrl:downloadURL,
                    username:username
                })
                setProgress(0)
                setCaption('')
                setImage('')
            })}
                
        )


    }
    console.log(image.name)

    return (
    <div className='image-upload'>
        <progress className='progressbar' value={progress} max='100' />
        <input type='text' placeholder='Enter a caption....' 
        value={caption} onChange={(e)=>setCaption(e.target.value)} />
        <input type='file' onChange={handleChange} />
        <Button onClick={handleUpload}>
            Upload
        </Button>

    </div>
  )
}

export default ImageUpload
