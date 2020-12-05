import { navigate } from 'gatsby'
import React from 'react'


const Result = ({ lollyPath,  recipientName, message, senderName }) => {
    return (
        <div className="result">
            <h4>Share lolly with this link:</h4>
            <h3 onClick={()=>{
                navigate(`/${lollyPath}`)
            } }> {`/lolly/${lollyPath}`}</h3>
            <div className="result__details">
                <p className="reciever">{ recipientName}</p>
                <p className="message">{message}</p>
                <p className="sender">____{senderName}</p>
            </div>
            <a className="btn" href="/createLolly" onClick={() => {
            navigate("/createLolly")
          }}>
            <i>Create new Lolly</i>
          </a>
        </div>
    )
}

export default Result
