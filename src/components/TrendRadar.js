import React, {useState, useEffect, useRef} from "react";
import VPCCircle from "./VPCCircle";
import SimpleArc from "./SimpleArc/SimpleArc";
import SeparatingLines from "./SeparatingLines";
import Button from "react-bootstrap/Button";
import TrendDataService from "../services/trend_service";
import {useNavigate, useParams} from "react-router-dom";
import {
    ButtonGroup,
    Image,
    Overlay,
    OverlayTrigger,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip as tp
} from "react-bootstrap";
import styles from '../views/trend.styles.css'
import LoginError from "../services/LoginError";
import * as PropTypes from "prop-types";

import Tooltip from '@mui/material/Tooltip';
import TrendCircle from "./TrendCircle";

function TrendCircleOverlay({
                                trend, onClick,
                                id, radiusTrend,
                                colorImpact
                            }) {

    const ref = useRef(null);

    const [show, setShow] = useState(false)

    return (
        <Tooltip title={trend.title} placement={"top"}
        >
            <button className="btn btn-info"

                    onMouseOver={(e) => {
                        setShow(true)
                    }}
                    onMouseOut={() => setShow(false)}
                // aria-pressed={true}
                // onMouseOver={() => setShow(!show)}

                // onClick={() => setActiveTrend(trend, index)}
                    onClick={onClick}

                    ref={ref}
                // draggable
                    id={`trend${trend.id}`}
                // onDragStart={(e) => onDragStart(e, trend)}
                    style={{
                        "position": "absolute",
                        // 'zIndex':`${zIndex_trend[trend.maturity]}+100`,
                        zIndex: 101,
                        boxShadow: trend.id == id ? "0 0 0 .5rem rgba(0, 255, 255, 1)" : "",
                        "marginLeft": `${trend.xpos}%`,
                        "marginBottom": `${trend.ypos}%`,
                        "width": `${radiusTrend[trend.maturity]}%`,
                        "height": `${radiusTrend[trend.maturity]}%`,
                        "borderRadius": "100%",
                        "background": `${colorImpact[trend.impact]}`,
                        "padding": "0",
                    }}
            >

            </button>
        </Tooltip>);
}

TrendCircleOverlay.propTypes = {
    trend: PropTypes.any,
    onClick: PropTypes.func,
    id: PropTypes.any,
    radiusTrend: PropTypes.shape({high: PropTypes.number, low: PropTypes.number, medium: PropTypes.number}),
    colorImpact: PropTypes.shape({high: PropTypes.string, low: PropTypes.string, medium: PropTypes.string})
};

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
    let radius_trend = {low: radius.radius1 / 26, medium: radius.radius1 / 22, high: radius.radius1 / 18}
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
        <div
            style={{
                display: 'flex',
                // maxWidth: '80vh',
                // maxHeight: '80vw',
                // position: 'relative',
                height: '100%',
                justifyContent: 'center',
                alignItems: "center",
                aspectRatio: 1
            }}
        >

            <Image src={require("../images/TrendRadarImg.png")} style={{width: "100%", padding: 0}}
            ></Image>

            {/*<TrendCircle radius={radius.radius1} color={"#d2d2d5"} position={0}/>*/}
            {/*<TrendCircle radius={radius.radius2} color={"#b8b8b8"} position={1}/>*/}
            {/*<TrendCircle radius={radius.radius3} color={"#999797"} position={2}/>*/}
            {/*<SimpleArc/>*/}
            {/*<SeparatingLines length={radius.radius1 / 2} angle={90}/>*/}
            {/*<SeparatingLines length={radius.radius1 / 2} angle={210}/>*/}
            {/*<SeparatingLines length={radius.radius1 / 2} angle={330}/>*/}


            {/*<div id={'targetDiv'}*/}
            {/*     onDragOver={(e) => onDragOver(e)}*/}
            {/*     onDrop={(e) => onDrop(e)}*/}
            {/*     style={{'width': '100%', 'position': 'absolute', "aspectRatio": 1, 'zIndex': '100'}}>*/}
            {/*</div>*/}

            {filteredTrends &&
                filteredTrends.map((trend, index) => {

                    return (
                        // <OverlayTrigger
                        //     key='top'
                        //     placement='top'
                        //     overlay={
                        //         <Tooltip id={`${trend.id}-top`}>
                        //             {trend.title}
                        //         </Tooltip>
                        //     }
                        // >
                        <TrendCircleOverlay key={trend.id} trend={trend} onClick={() => setActiveTrend(trend)}
                                            id={currentTrend.id} radiusTrend={radius_trend}
                                            colorImpact={color_impact}/>
                    );
                })}
        </div>
    )
}