import React from 'react'
import Header from '../components/Header'
import { Lolly } from '../components/Lolly'
import Result from '../components/Result'

const lollyPage = ({ pageContext: {
    recipientName,
    message,
    senderName,
    flavourTop,
    flavourMiddle,
    flavourBottom,
    lollyPath } }) => {

    return (
        <div >
            <Header />
            <div className="lollyFormDiv">

                <div>
                    <Lolly LollyTop={flavourTop} LollyMiddle={flavourMiddle} LollyBottom={flavourBottom} />
                </div>

                <Result lollyPath={lollyPath} recipientName={recipientName} senderName={senderName} message={message} />
            </div>
        </div>
    )
}

export default lollyPage
