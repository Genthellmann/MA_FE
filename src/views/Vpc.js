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
import * as PropTypes from "prop-types";


function NewComponent(props) {
    return (<Form
            style={{
                transform: "translate(-50%,-50%)",
                position: "absolute",
                zIndex: 100,
                marginLeft: `${props.ve.xpos}%`,
                marginTop: `${props.ve.ypos}%`,
                width: "15%",
                height: "7.5%"
            }}>
            <button type="button"
                    className="btn-close"
                    onClick={props.onClick}
                    id={props.id}
                    style={{fontSize: '0.35rem', marginBottom: 0}}></button>
            <Form.Control as="textarea"
                // ref={props.ref}

                          draggable
                          onDragStart={props.onDragStart}
                          onDragOver={props.onDragOver}
                          onDrop={props.onDrop}
                // onClick={props.onClick}
                          value={props.ve.content}
                          onChange={props.onChange}
                          id={props.id}


                          style={{
                              paddingTop: "5px",
                              fontSize: "12pt",

                          }}>
            </Form.Control>
        </Form>
    );
}

NewComponent.propTypes = {
    // ref: PropTypes.any,
    onDragStart: PropTypes.func,
    onDragOver: PropTypes.func,
    onDrop: PropTypes.func,
    // onClick: PropTypes.func,
    ve: PropTypes.any,
    onChange: PropTypes.func,
    id: PropTypes.any,
    onClick: PropTypes.func,
};

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
    const [idsToDelete, setIdstoDelete] = useState([-1])


    React.useEffect(() => {
    }, [vpaElements])

    const getVPAElements = () => {
        Trend_service.getVpaElements(trendID)
            .then(response => {
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
            })
            .catch(e => {
                console.log(e)
                LoginError(navigate, e)
            })
        const dataIdsToDelete = {
            'ids': idsToDelete
        }
        Trend_service.multipleDelete(dataIdsToDelete)
            .then(response => {
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
        const {id} = e.target;
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

        setVpaElements(prev => {
            return prev.map((el, index) => {
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
            "xpos": 10,
            "ypos": 95,
        }));
    }

    // //=================
    // //Delete Card
    // //=================

    const handleDelete = (e, ve) => {
        const id = ve.id;
        setVpaElements(vpaElements.filter(el => el.id !== id))
        setIdstoDelete(idsToDelete => idsToDelete.concat([id]))

    };

    React.useEffect(() => {
        console.log(idsToDelete)
    }, [idsToDelete])

    //=================
    //Delete Card
    //=================
    // const useOutsideClick = (callback) => {
    //     const ref = React.useRef();
    //
    //     React.useEffect(() => {
    //         const handleClick = (event) => {
    //             if (ref.current && !ref.current.contains(event.target)) {
    //                 callback();
    //             }
    //         };
    //
    //         document.addEventListener('click', handleClick);
    //
    //         return () => {
    //             document.removeEventListener('click', handleClick);
    //         };
    //     }, [ref]);
    //
    //     return ref;
    // };
    //
    // const handleClickOutside = () => {
    //     setCurrentVpaElement(null);
    // };
    //
    // const ref = useOutsideClick(handleClickOutside);
    //
    // const handleClick = event => {
    //     var {id} = event.target;
    //     setCurrentVpaElement(id);
    // };
    //
    // React.useEffect(() => {
    //     console.log(currentVpaElement)
    // }, [currentVpaElement])


    let radius = 90;

    return (
        <div>
            <NavBar2/>
            <div style={styles.backgroundContainer}>
                <Row style={styles.RowStyle}>
                    <Col lg={8}>
                        <Button className="btn btn-primary"
                                onClick={handleSave}
                        >Save</Button>
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
                                    <NewComponent key={index} onDragStart={(e) => onDragStart(e, ve)}
                                                  onDragOver={(e) => onCardDragOver(e)} onDrop={(e) => onDropCard(e)}
                                                  ve={ve} onChange={handleInputChange}
                                                  id={index}
                                                  onClick={(e) => handleDelete(e, ve)}
                                    />

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
                                <TrendCircle radius={radius} color={"rgb(210, 210, 213);"} position={0}/>
                                <VpaSimpleArc/>
                                <SeparatingLines length={radius / 2} angle={90}/>
                                <SeparatingLines length={radius / 2} angle={210}/>
                                <SeparatingLines length={radius / 2} angle={330}/>
                            </div>
                        </div>
                        <div style={{display: "flex", justifyContent: "flex-start"}}>
                            <Button className="btn btn-success"
                                    onClick={handleCreate}
                            >
                                Add Card
                            </Button>
                            <Button onClick={() => console.log(idsToDelete)}>ids to delete</Button>
                        </div>
                    </Col>
                    <Col>
                        <Benchmarking/>
                        <StrategicPositioning/>
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