import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./register.css"
const Register = () => {
  const navigate=useNavigate()
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")
  const [error,setError]=useState("")
  
  const handleUsername=(e)=>{
    setUsername(e.target.value)
  }

  const handlePassword=(e)=>{
    setPassword(e.target.value)
  }

  const handleConfirmPassword=(e)=>{
    setConfirmPassword(e.target.value)
  }
  const handleLogin=()=>{
    navigate("/login")
  }
  const handleRegister=()=>{
     if(password!==confirmPassword){
      setError("Password doesn't Match")
     }else if(setUsername === username){
        alert("username already exist")
     }else if(username===""){
        alert("Enter username")
     }else if(password===""){
        alert("Enter password")
     }
     else{
      fetch("https://todo-list-app-3.herokuapp.com/register", {
            method: "post",
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            console.log(res)            
        }).catch((err) => {
            console.log(err)
        })
        navigate("/Login")
     }
  }

  return (
    <>
   <div className='container'>
   <div className='register'>
    <h2>Register</h2>
    <input className='username' type="text" onChange={(e)=>{handleUsername(e)}} placeholder="Username"></input>
  <br></br>
  <input className='pass' type="text" onChange={(e)=>{handlePassword(e)}} placeholder="Password"></input>
  <br></br>
  <input className='confirm'  type="text" onChange={(e)=>{handleConfirmPassword(e)}} placeholder="Confirm Password"></input>
  <p>{error}</p>
  <button className='btn' onClick={()=>handleRegister()}>Register</button>
  <button className='btn' onClick={handleLogin}>Login</button>
    </div>
   </div>
    </>
  )
}

export default Register