import React from 'react'
import { useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthContext from '../utils/AuthContext'
const SignupPage = () => {
  let {loginUser,user} = useContext(AuthContext)
  let nav = useNavigate()
  useEffect(()=>{
    if(user){nav('/notes')}
  },[])
  return (
    <div>
        {/* <form className = "form" onSubmit={loginUser}>
          <input type = "text" name = "username" placeholder = "Enter username" className = "cred"/>
          
          <input type = "password" name = "password" placeholder = "Enter password" className = "cred"/>
          <br></br>
          <input type = "submit" value = "Login" className = "cred add credbut"/>
      </form> */}
      {/* <Link to = "/signup">Sign up</Link> */}
      <form className = "form" onSubmit={loginUser}>
          <input type = "text" name = "username" placeholder = "Enter username" className = "cred"/>
          <br></br>
          <input type = "password" name = "password" placeholder = "Enter password" className = "cred"/>
          <br></br>
          <input type = "submit" value = "Signup" className = "cred add credbut"/>    
      </form>
      <Link to = "/">Login</Link>
    </div>
  )
}

export default SignupPage