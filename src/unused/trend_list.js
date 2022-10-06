// import React, { useState, useEffect } from "react";
// import TrendDataService from "../services/trend_service";
// import { Link } from "react-router-dom";
// import SeparatingLines from "../components/SeparatingLines";
// import VPCCircle from "../components/VPCCircle";
// import Button from 'react-bootstrap/Button';
// import {Col, Container, Row} from "react-bootstrap";
// import SimpleArc from "../components/SimpleArc";
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
//         <Container
//             // style={{'position':'absolute'}}
//         >
//             <Row>
//             <Col>
//
//                 {/*Search Bar*/}
//
//                 <Row>
//                     <div>
//                         <div >
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Search TrendEdit by title"
//                                 value={searchTitle}
//                                 onChange={onChangeSearchTitle}
//                             />
//                             <div className="input-group-append">
//                                 <button
//                                     className="btn btn-outline-secondary"
//                                     type="button"
//                                     onClick={findByTitle}
//                                 >
//                                     Search
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </Row>
//
//                 {/*TrendEdit Radar*/}
//
//                 <Row >
//                     <div>
//                     <div style={{'display':'flex','width':'90%','position':'absolute','justifyContent':'center', "alignItems": "center", "aspectRatio":1}}
//                     >
//                     <VPCCircle radius={radius.radius1} color={"#d2d2d5"} position={0}/>
//                     <VPCCircle radius={radius.radius2} color={"#b8b8b8"} position={1}/>
//                     <VPCCircle radius={radius.radius3} color={"#999797"} position={2}/>
//                     <SimpleArc />
//                     <SeparatingLines length={radius.radius1/2} angle={90}/>
//                     <SeparatingLines length={radius.radius1/2} angle={210}/>
//                     <SeparatingLines length={radius.radius1/2} angle={330}/>
//
//                         {trends &&
//                             trends.map((trend, index) => (
//                                 // <div style={{'position':'relative', 'display':'flex','justifyContent':'center', 'alignItems':'center',
//                                 //     'zIndex':`${zIndex_trend[trend.maturity]}`,
//                                 //     'left': `${trend.xpos}vw`,
//                                 //     'bottom': `${trend.ypos}vw` }}>
//                                     <Button variant="primary"
//                                             checked={index === currentIndex ? "active" : ""}
//                                             onClick={() => setActiveTrend(trend, index)}
//                                             key={index}
//                                             style={{
//                                                 'position': 'absolute',
//                                                 'zIndex':`${zIndex_trend[trend.maturity]}`,
//                                                 // 'margin-left':'50px',
//                                                 'margin-left': `${trend.xpos}%`,
//                                                 'margin-bottom': `${trend.ypos}%`,
//                                                 'width': `${radius_trend[trend.maturity]}%`,
//                                                 'height': `${radius_trend[trend.maturity]}%`,
//                                                 'borderRadius': '100%',
//                                                 //'display': 'flex',
//                                                 'background': `${color_impact[trend.impact]}`,
//                                                 'border-color':'black',
//                                                 //'position': 'relative',
//                                                 // 'left': `${trend.xpos}px`,
//                                                 // 'bottom': `${trend.ypos}px`,
//                                                 'padding':'0',}}
//                                     ></Button>
//                             ))}
//                 </div>
//                     </div>
//                 </Row>
//             </Col>
//
//             {/*Trends List*/}
//
//             <Col>
//             <div>
//                 <h4>Trends List</h4>
//                 <ul className="list-group">
//                     {trends &&
//                         trends.map((trend, index) => (
//                             <li
//                                 className={
//                                     "list-group-item " + (index === currentIndex ? "active" : "")
//                                 }
//                                 onClick={() => setActiveTrend(trend, index)}
//                                 key={index}
//                             >
//                                 {trend.title}
//                             </li>
//                         ))}
//                 </ul>
//                 <button
//                     className="m-3 btn btn-sm btn-danger"
//                     onClick={removeAllTrends}
//                 >
//                     Remove All
//                 </button>
//             </div>
//
//             {/*Detail View of TrendEdit    */}
//
//             <div
//                 // className="col-md-6"
//             >
//                 {currentTrend ? (
//                     <div>
//                         <h4>TrendEdit</h4>
//                         <div>
//                             <label>
//                                 <strong>Title:</strong>
//                             </label>{" "}
//                             {currentTrend.title}
//                         </div>
//                         <div>
//                             <label>
//                                 <strong>Description:</strong>
//                             </label>{" "}
//                             {currentTrend.description}
//                         </div>
//                         <button className={"m-3 btn btn-sm variant=link"}>
//                         <Link
//                             to={"/trend/" + currentTrend.id}
//                         >
//                             Edit
//                         </Link>
//                     </button>
//                     </div>
//                 ) : (
//                     <div>
//                         <br />
//                         <p>Please click on a TrendEdit...</p>
//                     </div>
//                 )}
//             </div>
//             </Col>
//             </Row>
//         </Container>
//     );
// };
// export default TrendList;
