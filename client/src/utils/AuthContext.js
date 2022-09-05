import React, { createContext, useEffect, useState } from 'react'
import jwt_decode from "jwt-decode"
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {
    let data = JSON.parse(localStorage.getItem('authTokens'))
    let [token,setToken] = useState(()=>data?data:null)
    let [user, setUser] = useState(()=>data?jwt_decode(data.access):null)
    let [loading, setLoading] = useState(true)
    let [access,setAccess] = useState(true)
    let [available, setAvailable] = useState(true)
    let nav = useNavigate()
    const loginUser = async(e) => {
        e.preventDefault()
        let response = await fetch('/api/token/',{
            method : 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({username:e.target.username.value, password:e.target.password.value}) 
        })
        let data = await response.json()
        if(response.status === 200){
            setToken(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            setAccess(true)
            nav('/notes')
        }
        else{
            setAccess(false)
        }
    }
    const logoutUser=()=>{
        localStorage.removeItem('authTokens')
        setToken(null)
        setUser(null)
    }
    const signupUser=async(e)=>{
        e.preventDefault()
        if(e.target.password.value!==e.target.confirm.value){
            setAvailable(true)
            return;
        }
        let response = await fetch('/api/signup/',{
            method : 'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({username:e.target.username.value,password:e.target.password.value})
        })
        if(response.status!==200){
            setAvailable(false)
            return;
        }
        nav('/')
    }
    const updateToken=async()=>{
        // console.log(token.refresh)
        console.log("Updated Token")
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({refresh:token?.refresh})
        })
        let data = await response.json()
        // console.log(data)
        if(response.status === 200){
            setToken(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
        }
        else{
            logoutUser()    
        }
        if(loading)setLoading(false)
    }
    useEffect(()=>{
        if(loading){
            let isExpired = true
            if(token){
                const user = jwt_decode(token.access)
                isExpired = dayjs.unix(user.exp).diff(dayjs())<1
            }
            if(isExpired){
                // console.log("Expired")
                updateToken()
            }
            else{
                setLoading(false)
            }
        }
        // setLoading(false)
        let fourMinutes = 1000*60*4
        let interval = setInterval(()=>{
            if(token)
                updateToken()
        },fourMinutes)
        return () => clearInterval(interval)
    },[token, loading])
    const contextData = {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
        authToken : token,
        access : access,
        signupUser: signupUser,
        available : available,
        setAvailable : setAvailable
    }
    return (
    <AuthContext.Provider value = {contextData}>
        {loading?null:children}
    </AuthContext.Provider>  
    )
}