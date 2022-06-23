import React, {useState, useEffect} from "react";
import TrendCircle from "./TrendCircle";
import SimpleArc from "./SimpleArc";
import SeparatingLines from "./SeparatingLines";
import Button from "react-bootstrap/Button";

export default function TrendRadar ({trends, currentIndex, setActiveTrend}) {

    let radius = {radius1: 90 , radius2: 60, radius3: 30}

    //radius of trend depending on maturity
    let radius_trend = {low: radius.radius1/24, medium:radius.radius1/18, high:radius.radius1/12}

    //zIndex depending on maturity
    let zIndex_trend = {low: 3, medium: 2, high: 1}

    //color depending on impact
    let color_impact = {low: "#15CDCA", medium:"#4F80E2", high:"#3E54D3"}

    return (
        <div>
            <div style={{'display':'flex','width':'90%','position':'relative','justifyContent':'center', "alignItems": "center", "aspectRatio":1}}
            >
                <TrendCircle radius={radius.radius1} color={"#d2d2d5"} position={0}/>
                <TrendCircle radius={radius.radius2} color={"#b8b8b8"} position={1}/>
                <TrendCircle radius={radius.radius3} color={"#999797"} position={2}/>
                <SimpleArc />
                <SeparatingLines length={radius.radius1/2} angle={90}/>
                <SeparatingLines length={radius.radius1/2} angle={210}/>
                <SeparatingLines length={radius.radius1/2} angle={330}/>

                {trends &&
                    trends.map((trend, index) => (
                        // <div style={{'position':'relative', 'display':'flex','justifyContent':'center', 'alignItems':'center',
                        //     'zIndex':`${zIndex_trend[trend.maturity]}`,
                        //     'left': `${trend.xpos}vw`,
                        //     'bottom': `${trend.ypos}vw` }}>
                        <Button variant="primary"
                                checked={index === currentIndex ? "active" : ""}
                                onClick={() => setActiveTrend(trend, index)}
                                key={index}
                                style={{
                                    'position': 'absolute',
                                    'zIndex':`${zIndex_trend[trend.maturity]}`,
                                    // 'margin-left':'50px',
                                    'marginLeft': `${trend.xpos}%`,
                                    'marginBottom': `${trend.ypos}%`,
                                    'width': `${radius_trend[trend.maturity]}%`,
                                    'height': `${radius_trend[trend.maturity]}%`,
                                    'borderRadius': '100%',
                                    //'display': 'flex',
                                    'background': `${color_impact[trend.impact]}`,
                                    'border-color':'black',
                                    //'position': 'relative',
                                    // 'left': `${trend.xpos}px`,
                                    // 'bottom': `${trend.ypos}px`,
                                    'padding':'0',}}
                        ></Button>
                    ))}
            </div>
        </div>
    )
}