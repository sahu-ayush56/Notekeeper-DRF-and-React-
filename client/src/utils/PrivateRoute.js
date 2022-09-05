import React, { useContext } from 'react'
import AuthContext from './AuthContext'
import {Navigate} from 'react-router-dom'
const PrivateRoute = ({children}) => {
    let {user} = useContext(AuthContext)
  return (
    <>{user?children:<Navigate to = "/"/>}</>
  )
}

export default PrivateRoute