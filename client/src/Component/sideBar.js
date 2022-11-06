import React from 'react'
import { useNavigate } from 'react-router-dom';
const SideBar = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.setItem("authorization", "");
        navigate("/")
    }
    return (
        <>
            <div style={{
                width: "200px",
                fontSize: "x-large",
                background: "greenyellow", height: "inherit", marginRight: "5px", paddingLeft: "30px"
            }}>
                <h5>To do List</h5>
                <h6>History</h6>
                <button style={{ position: "absolute", bottom: "50px", height: "40px", width: "80px", "border-radius": "10px" }} onClick={handleLogout}>Log Out</button>
            </div>
        </>
    )
}

export default SideBar