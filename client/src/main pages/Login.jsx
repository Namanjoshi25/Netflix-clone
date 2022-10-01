import React , {useContext, useRef, useState} from 'react'
import { login } from '../context/authContext/ApiCalls'
import { AuthContext } from '../context/authContext/AuthContext'

import "../styles/login.scss"

function Login() {
  const  {isfetching,dispatch} = useContext(AuthContext)
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

 const handleSubmit = (e)=>{
  e.preventDefault();
  login({email,password},dispatch)
 }



  return (
    <div className='login'>
        <div className="top">
            <div className="wrapper">
            <img src="/images/netflix-logo.png" alt="" className="logo" />
          
            </div>
            
        </div>
        <div className="container">
           <form>
               <h1>Sign In</h1>
               <input type='email' placeholder='Email or phone number' name='email' onChange={(e)=>setEmail(e.target.value)}/>
               <input type='password' placeholder='Password' name='password' onChange={(e)=>setPassword(e.target.value)} />
               <button className="loginButton" onClick={handleSubmit} disabled={isfetching}>Sign In</button>
               <span>
                   New to Netflix? <b>Sign up now.</b>
               </span>
               <small>This page is protected bu Google reCAPTCHA to ensure you're not a bot.
                   <b>Learn more</b>
                   </small>
           </form>
        </div>
    </div>
  )
}

export default Login