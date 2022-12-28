import React,{useState,useEffect} from 'react';
import './App.css';
import Post from './Post/Post';
import {db,auth} from './firebase'
import {collection,onSnapshot,query,orderBy} from 'firebase/firestore'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { sendSignInLinkToEmail, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import TextField from '@mui/material/TextField';
import {signOut,onAuthStateChanged,
  createUserWithEmailAndPassword} from 'firebase/auth';
import ImageUpload from './ImageUpload/ImageUpload';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [posts,setPosts] = useState([]);
  const [open,setOpen] = useState(false)
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')
  const [user,setUser] = useState(null)
  const [signin,setSignIn] = useState(false)

  useEffect(()=>{
    const q = query(collection(db,'posts'),orderBy('timestamp','desc'))
    onSnapshot(q,(snapshot)=>{
      setPosts(snapshot.docs.map((doc)=>({
        id:doc.id,
        post:doc.data()}
      )))
    });
    },[]);

    useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
      if(user){
        setUser(user);
        console.log(user.displayName);
        if(user.displayName){
          return
        }else{
          return updateProfile(user,{
            displayName:username,
          })}
        }else{
        setUser(null)}
        })},[user,username])

    const handleSignin = (e)=>{
      e.preventDefault();
      signInWithEmailAndPassword(auth,email,password).then(cred=>
        setSignIn(false)).catch(err=>
          alert(err.message))
    }

    const handleSignUp = (e)=>{
      e.preventDefault();
      createUserWithEmailAndPassword(auth,email,password).then(cred=>
        setOpen(false))
      .catch(err=>alert(err.message))
    }
    
    const handleOpen = ()=>{}


  return (
    <div className="App">
<Modal
  open={open}
  onClose={()=>setOpen(false)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <form onSubmit={handleSignUp} className='app-signup'>
    <center>
      <img src='https://www.kindpng.com/picc/m/45-454818_instagram-new-logo-multi-color-vector-logo-instagram.png'
       className='app-headerimage'/>
       </center>
      <TextField value={username} inputProps={{
        maxLength: 10000000000,
      }} onChange={(e)=>setUsername(e.target.value)} 
      id="standard-basic" label="username" variant="standard" />
      <TextField value={email} type='email' onChange={(e)=>setEmail(e.target.value)} id="standard-basic" 
      label="email" variant="standard" />
      <TextField id="standard-basic" type='password' value={password} onChange={(e)=>setPassword(e.target.value)}
      label="password" variant="standard" />
      <br></br>
      <button className='signup-button'>Sign Up</button>
    </form>
  </Box>
</Modal>

<Modal
  open={signin}
  onClose={()=>setSignIn(false)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <form onSubmit={handleSignin} className='app-signup'>
    <center>
      <img src='https://www.kindpng.com/picc/m/45-454818_instagram-new-logo-multi-color-vector-logo-instagram.png'
       className='app-headerimage'/>
       </center>
      <TextField value={email} type='email' onChange={(e)=>setEmail(e.target.value)} id="standard-basic" 
      label="email" variant="standard" />
      <TextField id="standard-basic" type='password' value={password} onChange={(e)=>setPassword(e.target.value)}
      label="password" variant="standard" />
      <br></br>
      <button className='signup-button'>SignIn</button>
    </form>
  </Box>
</Modal>
    <div className="app-header">
      <img className='header-image' src='https://logos-download.com/wp-content/uploads/2016/03/Instagram_Logo_2010.png' />
    <div>
    {!user&&<Button onClick={()=>setSignIn(true)}>SignIn</Button>}
    {user?
    <Button onClick={()=>signOut(auth)}>Logout</Button>:
    <Button onClick={()=>setOpen(true)}>SignUP</Button>}
    </div>
      </div>

      <div className='app-posts'>
      {posts.map(({id,post})=>(
  <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
))}
      </div>


{user?.displayName?
      <ImageUpload username={user.displayName} />:
      <h4>Sorry you need to login</h4>}
  </div>
  );
}

export default App;
