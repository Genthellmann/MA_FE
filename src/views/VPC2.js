import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Trend_service from "../services/trend_service";
import LoginError from "../services/LoginError";
import {Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import VPCCircle from "../components/VPCCircle";
import SeparatingLines from "../components/SeparatingLines";
import Button from "react-bootstrap/Button";
import StrategicPositioning from "../components/StrategicPositioning";
import NavBar2 from "../components/NavBar2";
import * as PropTypes from "prop-types";

import {PromptContext} from "../components/ContextPromptProvider";
import {usePrompt} from "../components/Prompt";
import {BiMove} from "react-icons/bi";
import Actions from "../components/Actions";


function NewComponent(props) {
    return (<Form
            draggable
            onDragStart={props.onDragStart}
            onDragOver={props.onDragOver}
            onDrop={props.onDrop}
            id={props.id}

            style={{
                transform: "translate(-95%,-10%)",
                position: "absolute",
                zIndex: 100,
                marginLeft: `${props.ve.xpos}%`,
                marginTop: `${props.ve.ypos}%`,
                width: "15%",
                minHeight: "7.5%"
            }}>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end"}}>
                <button type="button"
                        className="btn-close"
                        onClick={props.onClick}
                        id={props.id}
                        style={{fontSize: '0.75rem', marginBottom: 0}}></button>
                <div>
                    <BiMove size="1rem"></BiMove>
                </div>
            </div>
            <Form.Control as="textarea"
                // onClick={props.onClick}
                          value={props.ve.content}
                          onChange={props.onChange}
                          id={props.id}

                          style={{
                              padding: '0.2rem',
                              fontSize: "0.75rem",
                              width: "7.5",
                              minHeight: "5rem",
                              wordBreak: "break-all"
                          }}>
            </Form.Control>
        </Form>
    );

    // return (<Form
    //         style={{
    //             transform: "translate(-50%,-50%)",
    //             position: "absolute",
    //             zIndex: 100,
    //             marginLeft: `${props.ve.xpos}%`,
    //             marginTop: `${props.ve.ypos}%`,
    //             width: "15%",
    //             minHeight: "7.5%"
    //         }}>
    //         <button type="button"
    //                 className="btn-close"
    //                 onClick={props.onClick}
    //                 id={props.id}
    //                 style={{fontSize: '0.35rem', marginBottom: 0}}></button>
    //         <Form.Label style={{fontSize: "0.5rem", marginBottom: "-1.5rem"}}>grab</Form.Label>
    //         <Form.Control as="textarea"
    //             // ref={props.ref}
    //
    //                       draggable
    //                       onDragStart={props.onDragStart}
    //                       onDragOver={props.onDragOver}
    //                       onDrop={props.onDrop}
    //             // onClick={props.onClick}
    //                       value={props.ve.content}
    //                       onChange={props.onChange}
    //                       id={props.id}
    //                       style={{
    //                           padding: '0.2rem',
    //                           fontSize: "0.75rem",
    //                           width: "100%",
    //                           minHeight: "100%"
    //                       }}>
    //         </Form.Control>
    //     </Form>
    // );
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


    useEffect(() => {
        // return () => {
        promptContext.setShowExitPrompt((unsavedChangesVPC || unsavedChangesSP));
        // }
    }, [unsavedChangesVPC, unsavedChangesSP, promptContext.showExitPrompt])

    // useEffect(() => {
    //     console.log("showExitPrompt" + promptContext.showExitPrompt)
    //     console.log("unsavedChangesVPC" + unsavedChangesVPC)
    //     console.log("unsavedChangesSP" + unsavedChangesSP)
    // }, [promptContext.showExitPrompt])


    usePrompt('Are you sure you want to leave? All unsaved changes might be lost.'
        , (unsavedChangesVPC || unsavedChangesSP), promptContext.setShowExitPrompt);


    const initialVpaElementState = {
        id: null,
        trendID: trendID,
        content: "",
        xpos: 0,
        ypos: 0,
    };

    //======================
    //VPC Cards
    //======================

    const [vpaElements, setVpaElements] = useState(null);
    const [currentVpaElement, setCurrentVpaElement] = useState(initialVpaElementState);
    const [idsToDelete, setIdstoDelete] = useState([-1])


    React.useEffect(() => {
    }, [vpaElements])

    const getVPAElements = () => {
        Trend_service.getVpaElements(trendID)
            .then(response => {
                setVpaElements(response.data)
                setLoading(false);
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
    const [loading, setLoading] = useState(false);


    const handleCreate = () => {
        setLoading(true);


        setVpaElements(vpaElements => vpaElements.concat({
            "trendID": trendID,
            "content": "",
            "xpos": 10,
            "ypos": 10,
        }));
        console.log("created")
    }

    React.useEffect(() => {
        getVPAElements()
    }, [vpaElements.length])


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
                    <Col xl={1} sm={0}></Col>
                    <Col xl={6} style={styles.ColStyle}>
                        <div style={{display: "flex", justifyContent: "flex-start"}}>
                            <Button className="btn btn-primary"
                                    onClick={handleSave}
                                    disabled={!unsavedChangesVPC}
                                    style={{width: '6.5rem'}}
                            >Save</Button>
                            <Button className="btn btn-success"
                                    onClick={handleCreate}
                                    style={{marginLeft: '1rem', width: '6.5rem'}}
                            >
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Add Card</span>
                            </Button>
                        </div>
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
                                    <NewComponent key={index}
                                                  onDragStart={(e) => onDragStart(e, ve)}
                                                  onDragOver={(e) => onCardDragOver(e)}
                                                  onDrop={(e) => onDropCard(e)}
                                                  ve={ve}
                                                  onChange={handleInputChange}
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
                                <VPCCircle radius={radius} color={"#ffff88"} position={0}/>
                                <SeparatingLines length={radius / 2} angle={60}/>
                                <SeparatingLines length={radius / 2} angle={180}/>
                                <SeparatingLines length={radius / 2} angle={300}/>
                            </div>
                        </div>
                    </Col>
                    <Col lg={1} sm={0}></Col>
                    <Col lg={3} style={styles.ColStyle}>
                        {/*<Benchmarking/>*/}
                        <StrategicPositioning unsavedChangesSP={unsavedChangesSP}
                                              setUnsavedChangesSP={setUnsavedChangesSP}/>
                        <Actions Trend="true" BS="true"></Actions>
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
    },
    actionBtn: {
        width: '18rem',
        display: "flex",
        justifyContent: "center",
        marginBottom: '1rem'
    }
}