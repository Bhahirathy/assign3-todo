import React, { useEffect, useState } from 'react'
import { useTimer } from './timer';

const ItemList = (props) => {
    const { pause, reset, running, seconds, start, stop } = useTimer();
    const [action,setaction]=useState(true)

    const [button,setbutton]=useState(false)

        useEffect(()=>{
            if(props.task.Status==="Completed"){
                setaction(false)
            }
        },[])       
    
        const handleAction=()=>{
            if(props.started===true){
                alert("Task is running already")
            }else{
                props.handleStarted()
                setbutton(true)
                start()
            }            
        }     

        const handlePause=()=>{
            props.handleStarted()
            pause()
        }

        const handleEnd=()=>{
            props.handleStarted()
            setbutton(false)
            
            handleTask()
            window.location.reload()
            
        }
        
        const handleTask=()=>{
            fetch("https://todo-list-app-3.herokuapp.com/update", {
            method: "post",
            body: JSON.stringify({
                _id:props.task._id,
                timetaken:seconds
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res)=>{
            alert(" Task Updated Successfully")
        })
        }
  return (
    <>
        <tr style={{fontWeight:"bolder", textAlign:"center", backgroundColor:"blue", padding:"10px"}}>
            <td style={{ margin:"20px", height:"40px" }}>{props.task.Activity}</td>
            <td>{props.task.Status}</td>
            <td>{button ? seconds:props.task.timetaken}</td>
            
            <td>{button ? <><button style={{color:"yellow"}} onClick={handlePause}>Pause</button> <button style={{color:"red"}} onClick={handleEnd}>End</button></> : <>{action ? <button onClick={handleAction}>Start</button> : ""}</>}</td>
          </tr>
    </>
  )
}

export default ItemList