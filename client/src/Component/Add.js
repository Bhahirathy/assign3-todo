import React, { useState } from 'react'

const Add = () => {
    const token = localStorage.getItem("authorization");
    if (token === null) {
        localStorage.setItem("authorization", "")
    }
    const [Activity, setActivity] = useState("")
    const payload = Activity
    console.log(payload)
    const handleadd = () => {
        if (Activity === "") {
            alert("Please Enter a Task")
        }
        else {
            fetch("https://todo-list-app-3.herokuapp.com/add",{
                method:"POST",
                headers: {
                        "Content-Type": "application/json",
                        "authorization": token,
                },
                Activity,
                }).then((Activity) => {
                    setActivity(Activity)
                }).catch((err) => {
                    console.log(err)
                });
        }
    }

    return (
        <div style={{left:"800px", position:"relative"}}>
            <input placeholder='Add Here' style={{ height:"25px" }} type="text" onChange={(e) => { setActivity(e.target.value) }}></input>
            <button style={{ height:"30px", backgroundColor:"violet",margin:"10px" }} onClick={handleadd}>ADD NEW ACTIVITY</button>
        </div>
    )
}

export default Add