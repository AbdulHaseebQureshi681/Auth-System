import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const RefreshHandler = ({setisAuthenticated}) => {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            setisAuthenticated(true)
            if(location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/' || location.pathname === '/login/' || location.pathname === '/signup/' ){
                navigate('/home')
            }
        }else{
            setisAuthenticated(false)
            if(location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/' && location.pathname !== '/login/' && location.pathname !== '/signup/'){
                navigate('/login')
            }
        }
    },[location, navigate, setisAuthenticated])
    return null
}

export default RefreshHandler
