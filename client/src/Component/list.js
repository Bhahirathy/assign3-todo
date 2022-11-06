import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ItemList from './itemList';



const List = () => {
  const token = localStorage.getItem("authorization");
  if (token === null) {
    localStorage.setItem("authorization","")
  }
  const [task,setTask]=useState([])
  const [started,setStarted]=useState(false)
  
  const handleStarted=()=>{
    setStarted(!started)
  }
  
  useEffect(()=>{
    fetch("https://todo-list-app-3.herokuapp.com/all", {
      method:"GET",
      headers: {
        "authorization": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setTask(data);
      });
    
  }, [token]);
  return (
    <>
      <table style={{    margin: "20px"}}>
        <thead>
        <tr style={{   backgroundColor:"green",position:"relative"}}>
          <th style={{    padding: "30px"}}>Activity</th>
          <th style={{width:"70%"}}>Status</th>
          <th>Time taken in Seconds</th>
          
          <th>Action</th>
          </tr>
        </thead>
        {task.map((task,i)=>{  
          return(
          <>
          <ItemList task={task} handleStarted={handleStarted} started={started}/>
          </>
          )
        })}
      </table>
      
    </>
  )
}

export default List