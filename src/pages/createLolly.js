import { gql, useMutation } from '@apollo/client';
import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import Lolly from '../components/Lolly'
import Result from '../components/Result';

const lollyMutation = gql`
mutation createLolly($recipientName: String!, $message: String!, $senderName: String!, $flavourTop: String!, $flavourMiddle: String!, $flavourBottom: String!),{
    createLolly(recipientName: $recipientName, message: $message, senderName: $senderName, flavourTop: $flavourTop, flavourMiddle: $flavourMiddle, flavourBottom: $flavourBottom),{
        message
        lollyPath
        recipientName
        senderName
    }
}
`
export default function CreateLolly() {
    const [color1, setColor1] = useState("#d52358");
    const [color2, setColor2] = useState("#e95946");
    const [color3, setColor3] = useState("#deaa43");
    const recipientNameRef = useRef();
    const messageRef = useRef();
    const senderRef = useRef();
    const [createLolly, { data, loading }] = useMutation(lollyMutation);
    const submit = async () => {
        console.log('clicked');
        console.log("color1", color1)
        console.log("sender", senderRef.current.value);
        const result = await createLolly({
            variables: {
                recipientName: recipientNameRef.current.value,
                message: messageRef.current.value,
                senderName: senderRef.current.value,
                flavourTop: color1,
                flavourMiddle: color2,
                flavourBottom: color3,
            }
        });
        console.log("Result", result);
    }

    useEffect(() => {
        async function runHook() {
            const response = await fetch("https://api.netlify.com/build_hooks/5f9a99467867c005d354dcb7", {
                method: "POST",
            });

        }
        runHook();

    }, [data])
    return (
        <div className="container">
            <Header />
            <div className="LollyForm">
                <div>
                    <Lolly LollyTop={color1} LollyMiddle={color2} LollyBottom={color3} />
                </div>
                {!data ? <>  <div className="lollyFlavour">
                    <label htmlFor="FlavourTop" className="pickerLabel">
                        <input type="color" value={color1} className="colorBox" name="FlavourTop" id="FlavourTop"
                            onChange={(e) => {
                                setColor1(e.target.value)
                            }}
                        />
                    </label>
                    <label htmlFor="FlavourTop" className="pickerLabel">
                        <input type="color" value={color2} className="colorBox" name="FlavourTop" id="FlavourTop"
                            onChange={(e) => {
                                setColor2(e.target.value)
                            }}
                        />
                    </label>



                    <label htmlFor="FlavourTop" className="pickerLabel">
                        <input type="color" value={color3} className="colorBox" name="FlavourTop" id="FlavourTop"
                            onChange={(e) => {
                                setColor3(e.target.value)
                            }}
                        />
                    </label>

                </div>
                    <div>
                        <div className="Form">
                            <label className="label" htmlFor="recipientName">
                                To
                            </label>
                                <input type="text" placeholder="To..." required={'Field Required'} name="recipientName" id="recipientName" ref={recipientNameRef} />
                            <label className="label" htmlFor="recipientName">
                                Message
                            </label>
                                <textarea rows="15" placeholder="Message..." columns="25" ref={messageRef} />
                            <label className="label" htmlFor="recipientName">
                                From
                            </label>
                                <input type="text" placeholder="From..." required name="senderName" id="senderName" ref={senderRef} />
                        </div>
                        <input className="btn" type="button" disabled={loading ? true : false} value="Freeze lolly and get a link" onClick={submit} />
                    </div></> : <Result lollyPath={data?.createLolly?.lollyPath} recipientName={data?.createLolly?.recipientName} senderName={data?.createLolly?.senderName} message={data?.createLolly?.message} />}
            </div>
        </div>
    )
}
