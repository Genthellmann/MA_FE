
import React from 'react';
//import Button from "react-bootstrap/Button";
import '../index.css';

function SeparatingLines ({angle, length}){

    return(
        <div  className="vl"
              style={{'height':`${length}vw`,
                  'width':'2px', 'zIndex': '100',
                  'transform': `rotate(${angle}deg) translateX(-1px)`}}>
        </div>
    )
}
export default SeparatingLines;