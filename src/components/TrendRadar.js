import React, {useState, useEffect, useRef} from "react";
import TrendCircle from "./TrendCircle";
import SimpleArc from "./SimpleArc/SimpleArc";
import SeparatingLines from "./SeparatingLines";
import Button from "react-bootstrap/Button";
import TrendDataService from "../services/trend_service";
import {useNavigate, useParams} from "react-router-dom";
import {ButtonGroup, Overlay, OverlayTrigger, ToggleButton, ToggleButtonGroup, Tooltip} from "react-bootstrap";
import styles from '../views/trend.styles.css'
import LoginError from "../services/LoginError";

export default function TrendRadar({trends, setTrends, currentTrend, filteredTrends, currentIndex, setActiveTrend}) {
    const navigate = useNavigate();

    // console.log(currentIndex)
    // document.getElementById(`trend${currentIndex}`)?.focus();

    const initialTrendState = {
        id: null,
        title: "",
        description: "",
        implication: "",
        category: "",
        picture: "",
        xpos: 0,
        ypos: 0,
    };

    // const[draggedTrend,setDraggedTrend] = useState(initialTrendState)
    const [message, setMessage] = useState("");

    let radius = {radius1: 90, radius2: 60, radius3: 30}
    //radius of trend depending on maturity
    let radius_trend = {low: radius.radius1 / 24, medium: radius.radius1 / 18, high: radius.radius1 / 12}
    //zIndex depending on maturity
    let zIndex_trend = {low: 3, medium: 2, high: 1}
    //color depending on impact
    let color_impact = {low: "#15CDCA", medium: "#4F80E2", high: "#3E54D3"}

    //onDragStart: grab the parameter and store within the dataTransfer object
    //parameters: event 'e', respective trend 'trend'
    const onDragStart = (e, trend) => {
        e.dataTransfer.setData("text", JSON.stringify(trend.id))
        //setDraggedTrend(trend)
    }

    const onDragOver = e => {
        e.preventDefault();
    }


    // React.useEffect(() => {
    //     document.getElementById(`trend${currentIndex}`)?.focus();
    // }, [])
    //
    // React.useEffect(() => {
    //     document.getElementById(`trend${currentIndex}`)?.focus();
    // }, [currentIndex])


    const onDrop = e => {
        e.preventDefault();
        const id = e.dataTransfer.getData("text")

        setTrends(prev => {
            return prev.map(el => {
                if (el.id != id) return el
                else return {
                    ...el,
                    xpos: ((e.nativeEvent.layerX - e.target.clientHeight / 2) / (e.target.clientHeight / 2)) * 100,
                    ypos: ((e.target.clientHeight / 2 - e.nativeEvent.layerY) / (e.target.clientHeight / 2)) * 100
                }
            })
        })

        const draggedTrend = trends.find(el => {
            return el.id == id
        })

        TrendDataService.update(draggedTrend.id, draggedTrend)
            .then(response => {
                // console.log("after response")
                console.log("Updated pos in db: ", response.data.xpos, response.data.ypos);
                setMessage("The trend was updated successfully!");
            })
            .catch(e => {
                console.log(e);

            });
    }

    const [show, setShow] = useState(false);
    const target = useRef(null);

    return (
        <div>
            <div
                style={{
                    'display': 'flex',
                    'width': '90%',
                    'position': 'relative',
                    'justifyContent': 'center',
                    "alignItems": "center",
                    "aspectRatio": 1
                }}
            >
                <TrendCircle radius={radius.radius1} color={"#d2d2d5"} position={0}/>
                <TrendCircle radius={radius.radius2} color={"#b8b8b8"} position={1}/>
                <TrendCircle radius={radius.radius3} color={"#999797"} position={2}/>
                <SimpleArc/>
                <SeparatingLines length={radius.radius1 / 2} angle={90}/>
                <SeparatingLines length={radius.radius1 / 2} angle={210}/>
                <SeparatingLines length={radius.radius1 / 2} angle={330}/>

                {/*<div id={'targetDiv'}*/}
                {/*     onDragOver={(e) => onDragOver(e)}*/}
                {/*     onDrop={(e) => onDrop(e)}*/}
                {/*     style={{'width': '100%', 'position': 'absolute', "aspectRatio": 1, 'zIndex': '100'}}>*/}
                {/*</div>*/}

                {filteredTrends &&
                    filteredTrends.map((trend, index) => (
                        // <OverlayTrigger
                        //     key='top'
                        //     placement='top'
                        //     overlay={
                        //         <Tooltip id={`${trend.id}-top`}>
                        //             {trend.title}
                        //         </Tooltip>
                        //     }
                        // >
                        <button className="btn btn-primary"

                            // aria-pressed={true}

                            // ref={target}
                            // onMouseOver={() => setShow(!show)}

                            // onClick={() => setActiveTrend(trend, index)}
                                onClick={() => setActiveTrend(trend)}

                                key={trend.id}
                            // draggable
                                id={`trend${trend.id}`}
                            // onDragStart={(e) => onDragStart(e, trend)}
                                style={{
                                    'position': 'absolute',
                                    // 'zIndex':`${zIndex_trend[trend.maturity]}+100`,
                                    zIndex: 101,
                                    boxShadow: trend.id == currentTrend.id ? '0 0 0 .3rem rgba(238, 243, 253, 0.5)' : "",
                                    'marginLeft': `${trend.xpos}%`,
                                    'marginBottom': `${trend.ypos}%`,
                                    'width': `${radius_trend[trend.maturity]}%`,
                                    'height': `${radius_trend[trend.maturity]}%`,
                                    'borderRadius': '100%',
                                    'background': `${color_impact[trend.impact]}`,
                                    'padding': '0',
                                }}
                        ></button>
                    ))}
                {/*    <OverlayTrigger*/}
                {/*    key={placement}*/}
                {/*    placement={placement}*/}
                {/*    overlay={*/}
                {/*        <Tooltip id={`tooltip-${placement}`}>*/}
                {/*            Tooltip on <strong>{placement}</strong>.*/}
                {/*        </Tooltip>*/}
                {/*    }*/}
                {/*>*/}
                {/*</OverlayTrigger></button>*/}


                {/*<Overlay target={target.current} show={show} placement="right">*/}
                {/*    {(props) => (*/}
                {/*        <Tooltip id="overlay-example" {...props}>*/}
                {/*            My Tooltip*/}
                {/*        </Tooltip>*/}
                {/*    )}*/}
                {/*</Overlay>*/}
            </div>
        </div>
    )
}