import React, { useState } from 'react'
import {Link, useNavigate} from"react-router-dom"
import {ToastContainer} from "react-toastify"
import "../App.css"
import { handleError, handleSuccess } from '../utils'

function Login() {
    const [loginIngo, setLoginInfo] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name,value} = e.target
        console.log(name + " " + value)
        const copyLoginInfo = {...loginIngo}
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo)
    }
    
    const handleLogin = async(e) => {
        e.preventDefault()
        const {email,password} = loginIngo;
        
        if(!email || !password){
            return handleError("name, email and password are required")
        }

        try{
            const url = "http://localhost:5000/auth/login"
            const response = await fetch(url,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginIngo)
            })
            
            const result = await response.json()

            const {status,message,jwtToken,email,name} = result
            if(status){
                handleSuccess(message)
                localStorage.setItem('token', jwtToken)
                localStorage.setItem('loggedInUser', name)
                setTimeout(()=>{
                    navigate('/home')
                }, 1000)
            }else{
                handleError(message)
            }
            console.log(result)
        }catch(err){
            handleError(err)
        }
    }

    console.log(loginIngo)

    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input onChange={handleChange} type='email' name='email' placeholder='Enter Your Email ID...' value={loginIngo.email}/>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input onChange={handleChange} type='password' name='password' placeholder='Enter Your Password...' value={loginIngo.password}/>
                </div>
                <button>Login</button>
                <span>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </span>
            </form>
            <ToastContainer/>
        </div>
  )
}

export default Login