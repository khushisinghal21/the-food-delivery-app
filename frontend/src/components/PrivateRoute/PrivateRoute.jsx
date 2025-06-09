import React from 'react'
import{ Navigate } from 'react-router-dom'
const PrivateRoute = ({childern}) => {
    const isAuthenticated = Boolean(localStorage.getItem('loginData'));

    return isAuthenticated?childern: <Navigate to="/login" replace={true} />

 
}

export default PrivateRoute
