import React from 'react'
import { useEffect, useState } from 'react'

const Header = () => {
    const [data, setData] = useState([])
    let token = localStorage.getItem("authorization")
    if (token === null) {
        localStorage.setItem("authorization", "")
    }
    useEffect(() => {
        fetch("https://todo-list-app-3.herokuapp.com/details", {
            headers: {
                authorization: token,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setData(data);
            });
    }, [token]);
    return (
        <>
            <div className='header' style={{border:"5px solid black", height:"70px", textAlign:"end"}}><h3>{data.username}</h3></div>
        </>
    )
}

export default Header