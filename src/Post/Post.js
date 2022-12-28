import React,{useState,useEffect} from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'
import { db } from '../firebase'
import {addDoc,collection,onSnapshot,query,orderBy,serverTimestamp} from 'firebase/firestore'

function Post({postId,user,username,caption,imageUrl}) {
  const [comment,setComment] = useState('')
  const [comments,setComments] = useState([])
  
  useEffect(()=>{
    if(postId){const q = query(collection(db,'posts',postId,'comments'),orderBy('timestamp','desc'))
    onSnapshot(q,(snapshot)=>{
      setComments(snapshot.docs.map(doc=>(doc.data())));
    })}
  },[postId])
  
  const handleComment = (e)=>{
    e.preventDefault();
    addDoc(collection(db,'posts',postId,'comments'),{
      username:user.displayName,
      text:comment,
      timestamp:serverTimestamp(),
    })
    setComment('')
  }

  return (
    <div className='post'>
      <div className='post-header'>
        <div className='avatar'>
        <Avatar/>
        </div>
        <div className='heading3'>
        <h3>{username}</h3>
        </div>
      </div>

      <img class='post-image' src={imageUrl}/>
    <h5 className='post-text'>
        <strong>William Nyein</strong>
        {caption}
    </h5>

    <div className='post-comments'>
    {
      comments.map(comment=>(
        <p><strong>{comment.username}</strong>{comment.text}</p>
      ))
    }
    </div>
    {user&&
    <form onSubmit={handleComment} className='comment-box'>
      <input type='text' value={comment} className='comment-input'
      onChange={(e)=>setComment(e.target.value)} placeholder='Add the comment..' />
      <button className='comment-button' type='submit'>Send</button>
    </form>}
    </div>
  )
}

export default Post;
