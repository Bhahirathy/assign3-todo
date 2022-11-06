import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./register.css"
const Login = () => {
  const navigate=useNavigate()
  const [error,setError]=useState("")
  const [login, setLogin] = useState({username: "", password: ""})


  
const handleSubmit=(e)=>{
    e.preventDefault();
        axios({
            url: "https://todo-list-app-3.herokuapp.com/login",
            method: "post",
            headers: {
            },
            data: login
        }).then((loginData)=> {
           localStorage.setItem("authorization", loginData.data.authToken);          
        }).catch((err)=> {
            console.log(err.response.data)
            setError(err.response.data)
        })
        navigate("/Tasksheet")
    }
 



  return (
    <>
    <div className='container'>
    <div className='register'>
    
    <h2>Member Login</h2>
    
      <input className='username' type="text" placeholder='Username' onChange={(e)=>{setLogin({...login, username: e.target.value})}}/>
      <br></br>
      <input className='pass' type="password" placeholder='Password' onChange={(e)=>{setLogin({...login, password: e.target.value})}}/>
      <p>{error}</p>
      <button  className='btn' onClick={(e)=>handleSubmit(e)}>Submit</button>
      </div>
      </div>
      
    </>
  )
}

export default Login