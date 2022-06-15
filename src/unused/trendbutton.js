// import React from 'react';
// import {Overlay, OverlayTrigger, Popover} from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import {Link} from "react-router-dom";
//
// function TrendFC ({position, radius, color, left, bottom}) {
//     const popover = (
//         <Popover id="popover-basic">
//             <Popover.Header as="h3">Popover right</Popover.Header>
//             <Popover.Body>
//                 <div>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</div>
//                 <Link to="trend-detail">Details</Link>
//             </Popover.Body>
//         </Popover>
//     );
//
//     return (
//         <>
//             <OverlayTrigger trigger="click" placement="auto" overlay={popover}>
//                 <Button variant="success" style={{
//                     'background': `${color}`,
//                     'width': `${radius}vw`,
//                     'height': `${radius}vw`,
//                     'borderRadius': '100%',
//                     'display': 'flex',
//                     'color': 'white',
//                     'position': 'relative',
//                     'zIndex': `${position}`,
//                     'left': `${left}px`,
//                     'bottom': `${bottom}px`,
//                     'padding':'0',
//                 }}></Button>
//             </OverlayTrigger>
//         </>
//     )
// }
//
// export default TrendFC;