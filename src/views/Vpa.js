import React, {useState} from 'react';
import Account from "./Account";
import Sidebar from "../components/Sidebar";
import VpaCircle from "../components/VpaCircle";
import {useNavigate, useParams} from "react-router-dom";
import Trend_service from "../services/trend_service";
import LoginError from "../services/LoginError";
import {Card, Col, Row} from "react-bootstrap";
import TrendCircle from "../components/TrendCircle";
import VpaSimpleArc from "../components/SimpleArc/VpaSimpleArc";
import SeparatingLines from "../components/SeparatingLines";

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


    //onDragStart: grab the parameter and store within the dataTransfer object
    //parameters: event 'e', respective trend 'trend'
    const onDragStart = (e, ve) => {
        console.log(e)
        console.log(ve.id)
        // e.dataTransfer.setData("text", JSON.stringify(currentVpaElement.id))
        e.dataTransfer.setData("text", JSON.stringify(ve.id))
    }


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

    let radius = 90;

    return (
        <div style={styles.mainContainer}>
            <Account/>
            <Sidebar/>
            <Row>
                <Col lg={8}>
                    <div onDragOver={(e) => onDragOver(e)}
                         onDrop={(e) => onDrop(e)}
                         style={{
                             display: "flex",
                             position: "relative",
                             width: '80%',
                             justifyContent: 'center',
                             alignItems: "center",
                             "aspectRatio": 1
                         }}
                    >
                        {vpaElements && vpaElements.map((ve, index) => (
                            <Card key={ve.id}
                                  draggable
                                  onDragStart={(e) => onDragStart(e, ve)}
                                  style={{
                                      width: "100px", position: 'absolute', zIndex: 100,
                                  }}>

                                <Card.Body style={{padding: "2px"}}>
                                    <Card.Text>
                                        {ve.content}
                                    </Card.Text>
                                </Card.Body>
                            </Card>

                        ))}
                        <TrendCircle radius={radius} color={"#d2d2d5"} position={0}/>
                        <VpaSimpleArc/>
                        <SeparatingLines length={radius / 2} angle={90}/>
                        <SeparatingLines length={radius / 2} angle={210}/>
                        <SeparatingLines length={radius / 2} angle={330}/>
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