
import React from 'react';
//import Button from "react-bootstrap/Button";
import '../index.css';

function SeparatingLines ({angle, length}){
    return(
        <div  className="vl"
              style={{'height':`${length}vw`,
                  'width':'0.2vw','transform': `rotate(${angle}deg) translateX(-0.1vw)`}}>
        </div>
    )
}
export default SeparatingLines;