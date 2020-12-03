import { gql, useMutation, useQuery } from '@apollo/client';
import { navigate } from 'gatsby';
import React, { useRef, useState } from 'react'
import Header from '../components/Header'
import Lolly from '../components/Lolly'

const GET_DATA = gql`{
hello
}`

const lollyMutation = gql`
mutation createLolly($recipientName: String!, $message: String!, $senderName: String!, $flavourTop: String!, $flavourMiddle: String!, $flavourBottom: String!),{
    createLolly(recipientName: $recipientName, message: $message, senderName: $senderName, flavourTop: $flavourTop, flavourMiddle: $flavourMiddle, flavourBottom: $flavourBottom),{
        message
        lollyPath
        
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
    const { loading, error, data } = useQuery(GET_DATA);

    const [createLolly] = useMutation(lollyMutation);
    const submit = async (values, actions) => {
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
        await actions.resetForm({
            values: {
                recipientName: "",
                message: "",
                senderName: "",
            },
        });
        await navigate(`/frozen/${result.data.createLolly?.slug}`)
        // await navigate(`/lollies/${result.data?.craeteLolly?.slug}`);
        console.log(result);
    
    }
    return (
        <div className="container">
            {data && data.hello && <div>{data.hello}</div>}
            <Header />
            <div className="LollyForm">
                <div>
                    <Lolly LollyTop={color1} LollyMiddle={color2} LollyBottom={color3} />
                </div>
                <div className="lollyFlavour">
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
                        <label htmlFor="recipientName">
                            To
                       </label>
                        <input type="text" required name="recipientName" id="recipientName" ref={recipientNameRef} />
                        <label htmlFor="recipientName">
                            Message:
                       </label>
                        <textarea rows="10" columns="20" ref={messageRef} />
                        <label htmlFor="recipientName">
                            From
                       </label>
                        <input type="text" required name="senderName" id="senderName" ref={senderRef} />
                    </div>
                    <input type="button" disabled={loading ? true : false} value="Create" onClick={submit} />
                </div>
            </div>
        </div>
    )
}
