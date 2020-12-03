import { navigate } from "gatsby";
import React from "react"
import Header from "../components/Header";
import Lolly from "../components/Lolly";
//import Lolly from '../Svg/lolly-image.svg'
export default function Home() {
  return( 
  
  <div >
<div className="container"><Header/></div>
<div className="listlolly">
  <div>
     <Lolly LollyBottom="#C06C50" LollyTop="#E3A28D" LollyMiddle="#8C0040" />
    </div>
    <div>
     <Lolly LollyBottom="#C24C50" LollyTop="#8B4513" LollyMiddle="#8C0090" />
    </div>
    <div>
     <Lolly LollyBottom="#FF00FF" LollyTop="#A52A2A" LollyMiddle="#ADFF2F" />
    </div>
</div>
    <input type="button" value="Create Lolly"
    onClick={()=>
    navigate("/createLolly")
    }
    ></input>
  </div>

  );
}
