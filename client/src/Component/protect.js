import {Navigate} from 'react-router-dom'

const Protect = ({children}) => {
    let token = localStorage.getItem('authorization')

    if(token === null) {
        localStorage.setItem("authorization", "")
      } else{
        token = token
      }
    return (
        <>
        {
            token.length ? children : <Navigate to='/'/>
        }
        </>
    )
}


export default Protect