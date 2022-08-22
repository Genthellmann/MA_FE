import React, {useState, useEffect} from "react";
import TrendCircle from "./TrendCircle";
import SimpleArc from "./SimpleArc/SimpleArc";
import SeparatingLines from "./SeparatingLines";
import Button from "react-bootstrap/Button";
import TrendDataService from "../services/trend_service";
import {useNavigate, useParams} from "react-router-dom";
import VpaSimpleArc from "./SimpleArc/VpaSimpleArc";
import SeparatingLines2 from "./SeparatingLines2";


export default function VpaCircle({vpaElements, setVpaElements}) {

    let radius = 90;

    const onDragOver = e => {
        e.preventDefault();
        console.log("drag")

    }

    const onDrop = (e) => {
        e.preventDefault();
        let id = e.dataTransfer.getData("text")

        setVpaElements(prev => {
            return prev.map(el => {
                if (el.id != id) return el
                else return {
                    ...el,
                    xpos: e.nativeEvent.layerX,
                    ypos: e.nativeEvent.layerY,
                }
            })
        })
    }


    return (
        <div>
            <div onDragOver={(e) => onDragOver(e)}
                 onDrop={(e) => onDrop(e)}
                 style={{
                     'display': 'flex',
                     'width': '90%',
                     'position': 'relative',
                     'justifyContent': 'center',
                     "alignItems": "center",
                     "aspectRatio": 1
                 }}
            >
                <TrendCircle radius={radius} color={"#d2d2d5"} position={0}/>
                <VpaSimpleArc/>
                <SeparatingLines2 length={radius / 2} angle={90}/>
                <SeparatingLines2 length={radius / 2} angle={210}/>
                <SeparatingLines2 length={radius / 2} angle={330}/>
            </div>
        </div>
    )
}