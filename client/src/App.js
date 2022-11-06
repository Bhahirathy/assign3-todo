import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from './Component/register';
import Login from './Component/login';
import Protect from './Component/protect';
import TaskSheet from './Component/taskSheet';


const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path="/tasksheet" element={<Protect><TaskSheet/></Protect>}></Route>
      <Route path='/login' element={<Login/>} />
      <Route path='/' element={<Register/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App