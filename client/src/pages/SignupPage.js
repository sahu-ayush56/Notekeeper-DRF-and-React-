import React, { useRef } from 'react'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthContext from '../utils/AuthContext'
const SignupPage = () => {
  let {signupUser,user, available} = useContext(AuthContext)
  let [password,setPassword] = useState(null)
  let [confirm,setConfirm] = useState([])
  let [check,setCheck] = useState([false])
  const valid = useRef()
  let nav = useNavigate()
  // const 
  useEffect(()=>{
    if(user){nav('/notes')}
    const validator = valid.current
    console.log(check)
    if(password&&check){
      validator.style.borderColor = 'green'
    }
    else if(password){
      validator.style.borderColor = 'red'
    }
  },[check,password])
  return (
    <div>
      <form className = "form" onSubmit={signupUser}>
          <input type = "text" name = "username" placeholder = "Enter username" className = "cred"/>
          <br></br>
          <input type = "password" name = "password" placeholder = "Enter password" className = "cred" onChange={(e)=>{setPassword(e.target.value);(e.target.value===confirm)?setCheck(true):setCheck(false)}}/>
          <br></br>
          <input type = "password" name = "confirm" placeholder = "Confirm password" className = "cred" onChange={(e)=>{setConfirm(e.target.value);(e.target.value===password)?setCheck(true):setCheck(false)}} ref = {valid}/>
          <br></br>
          <input type = "submit" value = "Signup" className = "cred add credbut"/>    
      </form>
      {available?null:<span className = "warn">Username already taken</span>}
      <Link to = "/">Login</Link>
    </div>
  )
}

export default SignupPage