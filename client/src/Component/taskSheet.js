import React from 'react'
import Add from './Add'
import Header from './header.js'
import List from './list'
import SideBar from './sideBar'

const TaskSheet = () => {
    return (
        <>
            <Header></Header>
            <div style={{ display: "flex" }}>
                <SideBar />
                <div style={{width: "-webkit-fill-available",height: "800px"}}>
                    <Add />
                    <List />
                </div>
            </div>
        </>
    )
}

export default TaskSheet