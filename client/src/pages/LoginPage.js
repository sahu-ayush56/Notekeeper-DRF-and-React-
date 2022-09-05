import React, { useContext, useEffect } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import AuthContext from '../utils/AuthContext'

const LoginPage = () => {
  let {loginUser,user,access} = useContext(AuthContext)
  let nav = useNavigate()
  useEffect(()=>{
    if(user){nav('/notes')}
  },[])
  return (
    <div>
      <form className = "form" onSubmit={loginUser}>
          <input type = "text" name = "username" placeholder = "Enter username" className = "cred"/>
          <br></br> 
          <input type = "password" name = "password" placeholder = "Enter password" className = "cred"/>
          <br></br>
          <input type = "submit" value = "Login" className = "cred add credbut"/>
      </form>
      {access?null:<span className = "warn">Access Denied</span>}
      <Link to = "/signup">Sign up</Link>
    </div>
  )
}

export default LoginPage