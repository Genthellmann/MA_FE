import React, {useState} from 'react';
import Account from "./Account";
import Sidebar from "../components/Sidebar";
import VpaCircle from "../components/VpaCircle";
import {useNavigate, useParams} from "react-router-dom";
import Trend_service from "../services/trend_service";
import LoginError from "../services/LoginError";
import {Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import TrendCircle from "../components/TrendCircle";
import VpaSimpleArc from "../components/SimpleArc/VpaSimpleArc";
import SeparatingLines from "../components/SeparatingLines";
import Button from "react-bootstrap/Button";

function Vpa(props) {
    const navigate = useNavigate();

    const {trendID} = useParams();

    const initialVpaElementState = {
        id: null,
        trendID: null,
        content: "",
        xpos: 0,
        ypos: 0,
    };

    const [vpaElements, setVpaElements] = useState(null);
    const [currentVpaElement, setCurrentVpaElement] = useState(null);

    React.useEffect(() => {
        console.log(vpaElements)
    }, [vpaElements])

    React.useEffect(() => {
        Trend_service.getVpaElements(trendID)
            .then(response => {
                console.log(response.data)
                setVpaElements(response.data)
            })
            .catch(e => {
                console.log(e);
                LoginError(navigate, e)
            });
    }, [trendID])

    const handleSave = () => {
        Trend_service.bulkUpdate(vpaElements)
            .then(response => {
                console.log(response)
            })
            .catch(e => {
                console.log(e)
                LoginError(navigate, e)
            })
    };

    //=================
    //Drag & Drop Card
    //=================

    //onDragStart: grab the parameter and store within the dataTransfer object
    //parameters: event 'e', respective trend 'trend'
    const onDragStart = (e, ve) => {
        console.log(e)
        console.log(ve.id)
        // e.dataTransfer.setData("text", JSON.stringify(currentVpaElement.id))
        e.dataTransfer.setData("text", JSON.stringify(ve.id))
    }

    const [dropZindex, setDropZindex] = useState(5);

    //Bring ZIndex of droppable area above other cards when drag over droppable area
    const onDragOver = e => {
        e.preventDefault();
        setDropZindex(999);
    }

    //Bring ZIndex of droppable area above other cards when drag over other card to
    //make overlap possible
    const onCardDragOver = e => {
        e.preventDefault();
        setDropZindex(999);
    }

    const onDrop = (e) => {
        e.preventDefault();
        let id = e.dataTransfer.getData("text")
        setDropZindex(5)

        setVpaElements(prev => {
            return prev.map(el => {
                if (el.id != id) return el
                else return {
                    ...el,
                    xpos: (e.nativeEvent.layerX / e.target.clientHeight) * 100,
                    ypos: (e.nativeEvent.layerY / e.target.clientHeight) * 100,
                }
            })
        })
    }

    const onDropCard = (e) => {
        e.preventDefault();
    }

    //=================
    //Edit Cards
    //=================


    const handleInputChange = event => {
        const {id, value} = event.target;
        console.log("id: " + id + " value: " + value)


        setVpaElements(prev => {
            return prev.map(el => {
                if (el.id != id) return el
                else return {
                    ...el, ["content"]: value
                }
            })
        })
    };


    let radius = 90;

    return (
        <div style={styles.mainContainer}>
            <Account/>
            <Sidebar/>
            <Row>
                <Col lg={8}>
                    <div style={{
                        display: "flex",
                        position: "relative",
                        width: "100%",
                        justifyContent: "left",
                        alignItems: "flex-start",
                        aspectRatio: 1
                    }}>
                        <div style={{
                            display: "flex",
                            position: "relative",
                            width: "100%",
                            justifyContent: "left",
                            alignItems: "flex-start",
                            aspectRatio: 1,
                        }}>
                            <div onDragOver={(e) => onDragOver(e)}
                                 onDrop={(e) => onDrop(e)}
                                 style={{
                                     display: "flex",
                                     position: "absolute",
                                     width: '100%',
                                     justifyContent: 'left',
                                     alignItems: "flex-start",
                                     aspectRatio: 1,
                                     zIndex: `${dropZindex}`,
                                 }}
                            ></div>

                            {vpaElements && vpaElements.map((ve, index) => (
                                // <Card key={ve.id}
                                //       draggable
                                //       onDragStart={(e) => onDragStart(e, ve)}
                                //       onDragOver={(e) => onCardDragOver(e)}
                                //       onDrop={(e) => onDropCard(e)}
                                //
                                //       style={{
                                //           transform: "translate(-50%,-50%)",
                                //           position: 'absolute',
                                //           zIndex: 100,
                                //           marginLeft: `${ve.xpos}%`,
                                //           marginTop: `${ve.ypos}%`,
                                //           width: "10%",
                                //           height: "10%"
                                //
                                //       }}>
                                //
                                //     {/*<Card.Body style={{padding: "2px"}}>*/}
                                //     {/*<Card.Text>*/}
                                //     {/*<input value={ve.content}*/}
                                //     {/*       onChange={handleInputChange}*/}
                                //     {/*       id={ve.id}*/}
                                //     {/*       style={{width: "100%", height: "100%"}}*/}
                                //     {/*>*/}
                                //
                                //     {/*</input>*/}
                                //     <Form.Control as="textarea" value={ve.content}
                                //                   onChange={handleInputChange}
                                //                   id={ve.id}
                                //                   style={{width: "100%", height: "100%"}}
                                //     >
                                //
                                //     </Form.Control>
                                //     {/*</Card.Text>*/}
                                //     {/*</Card.Body>*/}
                                // </Card>
                                <Form.Control as="textarea"
                                              key={ve.id}
                                              draggable
                                              onDragStart={(e) => onDragStart(e, ve)}
                                              onDragOver={(e) => onCardDragOver(e)}
                                              onDrop={(e) => onDropCard(e)}
                                              value={ve.content}
                                              onChange={handleInputChange}
                                              id={ve.id}


                                              style={{
                                                  paddingTop: "5px",
                                                  fontSize: "12pt",
                                                  transform: "translate(-50%,-50%)",
                                                  position: 'absolute',
                                                  zIndex: 100,
                                                  marginLeft: `${ve.xpos}%`,
                                                  marginTop: `${ve.ypos}%`,
                                                  width: "15%",
                                                  height: "7.5%"
                                              }}>
                                </Form.Control>

                            ))}
                        </div>
                        <div style={{
                            display: "flex",
                            position: "absolute",
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: "center",
                            aspectRatio: 1,
                            zIndex: 1,
                        }}>
                            <TrendCircle radius={radius} color={"#d2d2d5"} position={0}/>
                            <VpaSimpleArc/>
                            <SeparatingLines length={radius / 2} angle={90}/>
                            <SeparatingLines length={radius / 2} angle={210}/>
                            <SeparatingLines length={radius / 2} angle={330}/>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div>
                        <Button className="btn btn-primary"
                                onClick={handleSave}>Save</Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Vpa;

const styles = {
    mainContainer: {
        position: "",
        borderRadius: 10,
        // width: "100%",
        // height: "100%",
        backgroundColor: "white",
        paddingLeft: "10%",
        paddingBottom: 5,
        paddingTop: 5,
        paddingRight: 5,
    }
}