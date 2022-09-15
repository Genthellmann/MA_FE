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
import Benchmarking from "../components/Benchmarking";
import StrategicPositioning from "../components/StrategicPositioning";
import NavBar2 from "../components/NavBar2";

function Vpc(props) {
    const navigate = useNavigate();

    const {trendID} = useParams();

    const initialVpaElementState = {
        id: null,
        trendID: trendID,
        content: "",
        xpos: 0,
        ypos: 0,
    };

    const [vpaElements, setVpaElements] = useState(null);
    const [currentVpaElement, setCurrentVpaElement] = useState(initialVpaElementState);

    React.useEffect(() => {
        console.log(vpaElements)
    }, [vpaElements])

    const getVPAElements = () => {
        Trend_service.getVpaElements(trendID)
            .then(response => {
                console.log(response.data)
                setVpaElements(response.data)
            })
            .catch(e => {
                console.log(e);
                LoginError(navigate, e)
            });
    };

    React.useEffect(() => {
        getVPAElements();
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
        console.log("drag")
        console.log(e)
        console.log(ve.id)
        const {id} = e.target;
        console.log(id)
        // e.dataTransfer.setData("text", JSON.stringify(currentVpaElement.id))
        e.dataTransfer.setData("index", id)
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
        const id = e.dataTransfer.getData("index")
        setDropZindex(5)

        setVpaElements(prev => {
            return prev.map((el, index) => {
                console.log("index: " + index + " id: " + id)
                if (index != id) return el
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
            return prev.map((el, index) => {
                console.log(index)
                if (index != id) return el
                else return {
                    ...el, ["content"]: value
                }
            })
        })
    };

    //=================
    //create new Card
    //=================

    // const handleCreate = () => {
    //     Trend_service.createVpaElement({
    //         "trendID": trendID,
    //         "content": "",
    //         "xpos": 90,
    //         "ypos": 90,
    //     })
    //         .then(response => {
    //             console.log(response)
    //             getVPAElements();
    //         })
    //         .catch(e => {
    //             console.log(e)
    //             LoginError(navigate, e)
    //         });
    // }

    const handleCreate = () => {
        setVpaElements(vpaElements => vpaElements.concat({
            "trendID": trendID,
            "content": "",
            "xpos": 90,
            "ypos": 90,
        }));
    }

    let radius = 90;

    return (
        <div>
            <NavBar2/>
            <div style={styles.backgroundContainer}>
                <Row style={styles.RowStyle}>
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
                                    <Form.Control as="textarea"
                                                  key={index}
                                                  draggable
                                                  onDragStart={(e) => onDragStart(e, ve)}
                                                  onDragOver={(e) => onCardDragOver(e)}
                                                  onDrop={(e) => onDropCard(e)}
                                                  value={ve.content}
                                                  onChange={handleInputChange}
                                                  id={index}


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
                        <Benchmarking/>
                        <StrategicPositioning/>
                        <h2>New Card</h2>
                        <div style={{display: "flex", justifyContent: "space-around"}}>
                            <Button className="btn btn-success"
                                    onClick={handleCreate}
                                    style={{width: '30%'}}
                            >
                                Create
                            </Button>
                            <Button className="btn btn-primary"
                                    onClick={handleSave}
                                    style={{width: '30%'}}
                            >Save</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Vpc;

const styles = {
    backgroundContainer: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        paddingLeft: '1vw',
        paddingRight: '1vw',
        paddingTop: '2vw',
    },
    RowStyle: {
        margin: 0
    },
    ColStyle: {
        padding: 0
    }
}