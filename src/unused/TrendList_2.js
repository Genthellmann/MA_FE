// import React, { useState, useEffect } from "react";
// import TrendDataService from "../services/trend_service";
// import { Link } from "react-router-dom";
// import SeparatingLines from "../components/SeparatingLines";
// import TrendRadar from "../components/TrendCircle";
// import Button from 'react-bootstrap/Button';
// import {Container, Row} from "react-bootstrap";
//
// const TrendList = () => {
//     //radius of trend radar
//     let radius = {radius1: 90 , radius2: 60, radius3: 30}
//
//     //radius of trend depending on maturity
//     let radius_trend = {low: radius.radius1/24, medium:radius.radius1/18, high:radius.radius1/12}
//
//     //zIndex depending on maturity
//     let zIndex_trend = {low: 3, medium: 2, high: 1}
//
//     //color depending on impact
//     let color_impact = {low: "#15CDCA", medium:"#4F80E2", high:"#3E54D3"}
//
//     const [trends, setTrends] = useState([]);
//     const [currentTrend, setCurrentTrend] = useState(null);
//     const [currentIndex, setCurrentIndex] = useState(-1);
//     const [searchTitle, setSearchTitle] = useState("");
//
//     //array for all trends from db
//     const count = 6;
//     const data = Array.from({length:count}, (_,index)=> index);
//
//     //helper function to convert maturity category to radius
//
//
//     useEffect(() => {
//         retrieveTrends();
//     }, []);
//     const onChangeSearchTitle = e => {
//         const searchTitle = e.target.value;
//         setSearchTitle(searchTitle);
//     };
//     const retrieveTrends = () => {
//         TrendDataService.getAll()
//             .then(response => {
//                 setTrends(response.data);
//                 console.log(response.data);
//             })
//             .catch(e => {
//                 console.log(e);
//             });
//     };
//     const refreshList = () => {
//         retrieveTrends();
//         setCurrentTrend(null);
//         setCurrentIndex(-1);
//     };
//     const setActiveTrend = (trend, index) => {
//         setCurrentTrend(trend);
//         setCurrentIndex(index);
//     };
//     const removeAllTrends = () => {
//         TrendDataService.removeAll()
//             .then(response => {
//                 console.log(response.data);
//                 refreshList();
//             })
//             .catch(e => {
//                 console.log(e);
//             });
//     };
//     const findByTitle = () => {
//         TrendDataService.findByTitle(searchTitle)
//             .then(response => {
//                 setTrends(response.data);
//                 console.log(response.data);
//             })
//             .catch(e => {
//                 console.log(e);
//             });
//     };
//     return (
//         <div >
//             <Row style={{'display':'flex',"alignItems":"center", 'justifyContent':'center', 'aspectRatio':1}}
//                 // style={{'display':'flex', 'justifyContent':'center', "alignItems": "center", 'overflow':'hidden', "height" : `${Math.max(radius.radius1)}vw`}}
//             >
//                 <div style={{'display':'flex', 'justifyContent':'center', "alignItems": "center", 'position':'relative'}}>
//                      <div className="mw-100"
//                          style={{'background': 'blue',
//                         'width':'90%',
//                         "zIndex":1,
//                         'aspectRatio':1,
//                         'borderRadius': '100%',
//                              'position':'absolute'
//                         }}>
//                      </div>
//                      <div className="mw-60"
//                          style={{'background': 'red',
//                         'width':'60%',
//                         "zIndex":2,
//                         'aspectRatio':1,
//                         'borderRadius': '100%',
//                              'position':'absolute'
//
//                          }}>
//                      </div>
//                     {/*<TrendRadar radius={radius.radius1} color={"#d2d2d5"} pos={0}/>*/}
//                     {/*<TrendRadar radius={radius.radius2} color={"#b8b8b8"} pos={1}/>*/}
//                     {/*<TrendRadar radius={radius.radius3} color={"#999797"} pos={2}/>*/}
//                 </div>
//                 <div style={{'display':'flex', 'justifyContent':'center', 'alignItems': 'center', "position": "absolute"} }>
//                     <div style={{'position':'absolute', 'zIndex':3,}}>
//                         <SeparatingLines length={radius.radius1/2} angle={60}/>
//                         <SeparatingLines length={radius.radius1/2} angle={180}/>
//                         <SeparatingLines length={radius.radius1/2} angle={300}/>
//
//                         {/*Elements inside Trend Radar    */}
//                     </div>
//                 </div>
//                 <div style={{ "zIndex": 3, "position": "absolute"}}>
//                     {trends &&
//                         trends.map((trend, index) => (
//                             <div style={{'position':'relative', 'display':'flex','justifyContent':'center', 'alignItems':'center',
//                                 'zIndex':`${zIndex_trend[trend.maturity]}`,
//                                 'left': `${trend.xpos}vw`,
//                                 'bottom': `${trend.ypos}vw` }}>
//                                 <Button variant="primary"
//                                         checked={index === currentIndex ? "active" : ""}
//                                         onClick={() => setActiveTrend(trend, index)}
//                                         key={index}
//                                         style={{
//                                             'position': 'absolute',
//                                             'width': `${radius_trend[trend.maturity]}vw`,
//                                             'height': `${radius_trend[trend.maturity]}vw`,
//                                             'borderRadius': '100%',
//                                             'display': 'flex',
//                                             'background': `${color_impact[trend.impact]}`,
//                                             'border-color':'black',
//                                             //'position': 'relative',
//                                             // 'left': `${trend.xpos}px`,
//                                             // 'bottom': `${trend.ypos}px`,
//                                             'padding':'0',}}
//                                 ></Button>
//                             </div>
//                         ))}
//                 </div>
//             </Row>
//         </div>
// );
// };
// export default TrendList;