import React, {useContext, useEffect, useState} from 'react';
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
import {RiEmotionHappyLine} from "react-icons/ri";
import {RiEmotionUnhappyLine} from "react-icons/ri";
import {BsListCheck} from "react-icons/bs";
import {PromptContext} from "../components/ContextPromptProvider";
import {usePrompt} from "../components/Prompt";


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
                              padding: '0.2rem',
                              fontSize: "0.75rem",
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


    //======================
    //prompt page and reload
    //======================
    const [unsavedChangesVPC, setUnsavedChangesVPC] = useState(false);
    const [unsavedChangesSP, setUnsavedChangesSP] = useState(false);

    const promptContext = useContext(PromptContext);

    // useEffect(() => {
    //     return () => {
    //         promptContext.setShowExitPrompt(false);
    //     }
    // }, [])

    useEffect(() => {
        // return () => {
        promptContext.setShowExitPrompt((unsavedChangesVPC || unsavedChangesSP));
        // }
    }, [unsavedChangesVPC, unsavedChangesSP, promptContext.showExitPrompt])

    useEffect(() => {
        console.log("showExitPrompt" + promptContext.showExitPrompt)
        console.log("unsavedChangesVPC" + unsavedChangesVPC)
        console.log("unsavedChangesSP" + unsavedChangesSP)
    }, [promptContext.showExitPrompt])


    usePrompt('Are you sure you want to leave? All unsaved changes might be lost.'
        , (unsavedChangesVPC || unsavedChangesSP));


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
        setUnsavedChangesVPC(false);
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
        setUnsavedChangesVPC(true);
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
        setUnsavedChangesVPC(true);
    };

    //=================
    //create new Card
    //=================

    const handleCreate = () => {
        setVpaElements(vpaElements => vpaElements.concat({
            "trendID": trendID,
            "content": "",
            "xpos": 10,
            "ypos": 95,
        }));
        console.log("created")
        setUnsavedChangesVPC(true);
    }

    // //=================
    // //Delete Card
    // //=================

    const handleDelete = (e, ve) => {
        const id = ve.id;
        setVpaElements(vpaElements.filter(el => el.id !== id))
        setIdstoDelete(idsToDelete => idsToDelete.concat([id]))
        setUnsavedChangesVPC(true);
    };

    React.useEffect(() => {
        console.log(idsToDelete)
    }, [idsToDelete])


    let radius = 90;

    return (
        <div>
            <NavBar2/>
            <div style={styles.backgroundContainer}>
                <Row style={styles.RowStyle}>
                    <Col lg={8}>
                        <Button className="btn btn-primary"
                                onClick={handleSave}
                                disabled={!unsavedChangesVPC}
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
                                <TrendCircle radius={radius} color={"#d2d2d5"} position={0}/>
                                {/*<VpaSimpleArc/>*/}
                                <div style={{
                                    position: 'absolute',
                                    marginBottom: '50%',
                                    marginRight: '30%'
                                }}>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center"
                                    }}></div>
                                    <RiEmotionHappyLine size={'7rem'}></RiEmotionHappyLine>
                                    <div style={{display: "flex", justifyContent: "center"}}><strong>Gains</strong>
                                    </div>
                                </div>
                                <div style={{
                                    position: 'absolute',
                                    marginTop: '50%',
                                    marginRight: '30%'
                                }}>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center"
                                    }}></div>
                                    <RiEmotionUnhappyLine size={'7rem'}></RiEmotionUnhappyLine>
                                    <div style={{display: "flex", justifyContent: "center"}}><strong>Pains</strong>
                                    </div>
                                </div>
                                <div style={{
                                    position: 'absolute',
                                    marginLeft: '50%'
                                }}>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center"
                                    }}></div>
                                    <BsListCheck size={'7rem'}></BsListCheck>
                                    <div style={{display: "flex", justifyContent: "center"}}><strong>Jobs</strong></div>
                                </div>
                                <SeparatingLines length={radius / 2} angle={60}/>
                                <SeparatingLines length={radius / 2} angle={180}/>
                                <SeparatingLines length={radius / 2} angle={300}/>
                            </div>
                        </div>
                        <div style={{display: "flex", justifyContent: "flex-start"}}>
                            <Button className="btn btn-success"
                                    onClick={handleCreate}
                            >
                                Add Card
                            </Button>
                        </div>
                    </Col>
                    <Col>
                        <Benchmarking/>
                        <StrategicPositioning unsavedChangesSP={unsavedChangesSP}
                                              setUnsavedChangesSP={setUnsavedChangesSP}/>
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