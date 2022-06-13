
import React from 'react';
//import Button from "react-bootstrap/Button";
import '../index.css';

function SeparatingLines ({angle, length}){
    return(
        <div  className="vl"
              style={{
                  'width':`${length}%`,
                  'height':'0.4%',
                  'left':'50%',
                  // 'transform-origin': '0%0%',
                  'transform': `rotate(${angle}deg)`,
                  'position':'absolute'}}>
        </div>
    )
}
export default SeparatingLines;