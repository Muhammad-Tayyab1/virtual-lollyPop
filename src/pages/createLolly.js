import React, { useRef, useState } from 'react'
import Header from '../components/Header'
import Lolly from '../components/Lolly'

export default function CreateLolly() {
    const [color1, setColor1] = useState("#E3A28D");
    const [color2, setColor2] = useState("#8C0040");
    const [color3, setColor3] = useState("#C06C50");
    const recipientNameRef = useRef();
    const messageRef = useRef();
    const senderRef = useRef();
const submit=()=>{
    console.log('clicked');
    console.log("color1", color1)
    console.log("sender", senderRef.current.value)
}
    return (
        <div className="container">
            <Header />
            <div className="LollyForm">


                <div>
                    <Lolly LollyTop={color1} Lollymiddle={color2} LollyBottom={color3} />
                </div>
                <div className="lollyFlavour">
                    <label htmlFor="FlavourTop" className="pickerLabel">
                        <input type="color" value={color2} className="colorBox" name="FlavourTop" id="FlavourTop"
                            onChange={(e) => {
                                setColor2(e.target.value)
                            }}
                        />
                    </label>
                    <label htmlFor="FlavourTop" className="pickerLabel">
                        <input type="color" value={color1} className="colorBox" name="FlavourTop" id="FlavourTop"
                            onChange={(e) => {
                                setColor3(e.target.value)
                            }}
                        />
                    </label>



                    <label htmlFor="FlavourTop" className="pickerLabel">
                        <input type="color" value={color3} className="colorBox" name="FlavourTop" id="FlavourTop"
                            onChange={(e) => {
                                setColor1(e.target.value)
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
                        <textarea rows="18" columns="30" ref={messageRef} />
                        <label htmlFor="recipientName">
                            From
                       </label>
                        <input type="text" required name="recipientName" id="recipientName" ref={senderRef} />
                    </div>
                    <input type="button" value="Create" onClick={submit}/>
                </div>
            </div>
        </div>
    )
}
