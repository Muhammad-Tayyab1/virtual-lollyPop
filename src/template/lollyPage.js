import React from 'react'
import Header from '../components/Header'
import { Lolly } from '../components/Lolly'
import Result from '../components/Result'

const lollyPage = ({ pageContext: { data } } ) => {

    return (
        <div >
            <Header />
            <div className="lollyFormDiv">

                <div>
                    <Lolly LollyTop={data.flavourTop} LollyMiddle={data.flavourMiddle} LollyBottom={data.flavourBottom} />
                </div>

                <Result lollyPath={data.lollyPath} recipientName={data.recipientName} senderName={data.senderName} message={data.message} />
            </div>
        </div>
    )
}

export default lollyPage
