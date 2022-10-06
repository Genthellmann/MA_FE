import React, {useContext, useEffect, useRef, useState} from "react";
import TrendDataService from "../services/trend_service";
import {Form, Modal, Overlay, OverlayTrigger, Popover, Tooltip} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FileUp from "../components/FileUp";
import {Link, useNavigate, useParams} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Account from "./Account";
import LoginError from "../services/LoginError";
import {Route} from "react-router-dom";
import ExplPicFileUp from "../components/ExplPicFileUp";
import RpPicFileUp from "../components/RpPicFileUp";
import NavBar2 from "../components/NavBar2";
import {RiMenuAddLine} from 'react-icons/ri'
import Autocomplete from "../components/Autocomplete";
import {Typeahead} from 'react-bootstrap-typeahead';
import {AiOutlineQuestion} from 'react-icons/ai'
import {PromptContext} from "../components/ContextPromptProvider";
import {usePrompt} from "../components/Prompt";


const ReferenceAdd = () => {
    const navigate = useNavigate();

    let {trendID} = useParams();

    const [message, setMessage] = useState(false);


    const initialReferenceState = {
        id: null,
        trendID: trendID,
        rproduct: "",
        rsystemelements: "",
        usabilityattributes: [{feature: "", expression: ""}, {feature: "", expression: ""}],
        prior: 1000,
    }

    const [reference, setReference] = useState(initialReferenceState);
    const [submitted, setSubmitted] = useState(false);
    // const [page1, setPage1] = useState(false);
    // const [page3, setPage3] = useState(false);

    //=======================
    //UX Attributes
    //=======================
    const handleInputChange = event => {
        setMessage(false)
        const {name, value} = event.target;
        setReference({...reference, [name]: value, trendID: trendID});
    };


    const handleAddAttribute = event => {
        setReference({
            ...reference,
            ["usabilityattributes"]: reference.usabilityattributes.concat({feature: "", expression: ""}),
            trendID: trendID
        });

    }

    const handleAttrChange = (event, index) => {
        const {name, value} = event.target;

        console.log(reference.usabilityattributes)

        setReference({
            ...reference, ["usabilityattributes"]: reference.usabilityattributes.map((el, elindex) => {
                if (elindex !== index) {
                    return el
                } else {
                    return {
                        ...el,
                        [name]: value
                    }
                }
            })
        })
    }

    const handleAttrDeletion = (event, index) => {
        const ref = reference.usabilityattributes;
        ref.splice(index, 1)
        setReference({...reference, ["usabilityattributes"]: ref})
    }

    //=======================
    //Auto complete
    //=======================
    const [references, setReferences] = useState(false);

    const getReferences = () => {
        TrendDataService.getReference(trendID)
            .then(response => {
                if (response.data.length > 0) {
                    setReferences(response.data);
                    setUxAttributes(filterUxAttributes(response.data))
                } else {
                    setReferences([{rproduct: "no references yet"}])
                }
            })
            .catch(e => {
                LoginError(navigate, e)
            });
    };

    React.useEffect(() => {
            getReferences()
        }, []
    )

    const [uxAttributes, setUxAttributes] = useState([]);

    function filterUxAttributes(RSE) {
        let filterUX = RSE.map(a => a.usabilityattributes)
        let filterAttributes = [].concat.apply([], filterUX)
        let filterFeatures = filterAttributes.map(a => a.feature)

        let uniqueId = [];

        let uniqueFeatures = filterFeatures.filter(element => {
            const isDuplicate = uniqueId.includes(element);

            if (!isDuplicate) {
                uniqueId.push(element);
                return true;
            }
            return false;
        });

        return uniqueFeatures
    }

    const [selected, setSelected] = useState([]);

    const handleAttrChangewithAC = (text, event, index) => {
        console.log(index)
        console.log(text)

        setReference({
            ...reference, ["usabilityattributes"]: reference.usabilityattributes.map((el, elindex) => {
                if (elindex !== index) {
                    return el
                } else {
                    return {
                        ...el,
                        ["feature"]: text
                    }
                }
            })
        })

        console.log(reference.usabilityattributes)
    }

    const handleAttrSelectwithAC = (selected, index) => {
        console.log(selected[0])


        setReference({
            ...reference, ["usabilityattributes"]: reference.usabilityattributes.map((el, elindex) => {
                if (elindex !== index) {
                    return el
                } else {
                    return {
                        ...el,
                        ["feature"]: selected[0]
                    }
                }
            })
        })

    }


    //=======================
    //save Reference
    //=======================
    const saveReference = () => {
        // const referenceToSave = reference;
        // referenceToSave.usabilityattributes = JSON.stringify(referenceToSave.usabilityattributes)
        TrendDataService.createReference(reference)
            .then(response => {
                    setReference(response.data)
                    setSubmitted(true);
                    navigate(`../../RS/edit/page2/${reference.trendID}/${response.data.id}`, {replace: true})
                }
            )
            .catch(e => {
                setMessage(e.response.data.message)
                LoginError(navigate, e)
            });
    };

    //======================
    //prompt page reload
    //======================
    const promptContext = useContext(PromptContext);

    useEffect(() => {
        return () => {
            promptContext.setShowExitPrompt(true);
        }
    }, [])

    //======================
    //prompt page navigation
    //======================

    usePrompt('Are you sure you want to leave? All unsaved changes might be lost. ' +
        'Complete form and submit trend to prevent data loss. ', !submitted, promptContext.setShowExitPrompt);


    //=======================
    //Info-Modal
    //=======================

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (

        <div>
            <NavBar2/>
            <div style={styles.backgroundContainer}>
                <div style={styles.FormContainer}>
                    <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
                        <h4>Step 1/3 - Reference Content</h4>
                        <Form style={{width: '100%'}}>
                            <Form.Group className="mb-3">
                                <Form.Label><strong>Reference Product</strong></Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="rproduct"
                                    required
                                    value={reference.rproduct}
                                    onChange={handleInputChange}
                                    name="rproduct"
                                    style={{borderRadius: '1.078rem'}}
                                    autoComplete="off"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label><strong>Reference System Elements</strong></Form.Label>
                                <Form.Control
                                    as="textarea"
                                    type="text"
                                    className="form-control"
                                    id="rsystemelements"
                                    required
                                    value={reference.rsystemelements}
                                    onChange={handleInputChange}
                                    name="rsystemelements"
                                    style={{borderRadius: '1.078rem', minHeight: '5rem'}}
                                    // disabled={!submitted}
                                />
                            </Form.Group>
                            {/*<Form.Group>*/}
                            {/*    <Form.Label><strong>UX/Usability Attributes</strong></Form.Label>*/}
                            {/*    <Form.Control*/}
                            {/*        as="textarea"*/}
                            {/*        type="text"*/}
                            {/*        className="form-control"*/}
                            {/*        id="usabilityattributes"*/}
                            {/*        required*/}
                            {/*        value={reference.usabilityattributes}*/}
                            {/*        onChange={handleInputChange}*/}
                            {/*        name="usabilityattributes"*/}
                            {/*        style={{borderRadius: '1.078rem', minHeight: '10rem'}}*/}
                            {/*        // disabled={!submitted}*/}
                            {/*    />*/}
                            {/*</Form.Group>*/}
                        </Form>
                        {/*<Form.Group>*/}
                        <Form.Label><strong>UX/Usability Attributes</strong></Form.Label>
                        <div style={{
                            borderStyle: "solid",
                            borderColor: "rgba(0,0,0,0.1)",
                            padding: "1.2rem",
                            borderRadius: "1.078rem",
                            borderWidth: "1px"
                        }}>
                            <ul style={styles.uaList}>
                                {reference.usabilityattributes && reference.usabilityattributes.map((ua, index) => (
                                    <li style={{display: "flex",}}>
                                        {/*<Form.Control*/}
                                        {/*    type="text"*/}
                                        {/*    className="form-control"*/}
                                        {/*    id="usabilityattributes"*/}
                                        {/*    value={ua.feature}*/}
                                        {/*    onChange={(e) => handleAttrChange(e, index)}*/}
                                        {/*    name="feature"*/}
                                        {/*    style={styles.ua}*/}
                                        {/*    placeholder="Attribute Feature"*/}
                                        {/*    // disabled={!submitted}*/}
                                        {/*>*/}

                                        {/*</Form.Control>*/}
                                        <Typeahead
                                            className="form-control"
                                            options={uxAttributes}
                                            id="usabilityattributes"
                                            // selected={ua.feature}
                                            onInputChange={(e, text) => handleAttrChangewithAC(e, text, index)}
                                            onChange={(selected) => handleAttrSelectwithAC(selected, index)}
                                            placeholder="Attribute Feature"
                                            style={{
                                                padding: 0,
                                                marginBottom: "0.5rem",
                                                marginRight: "0.5rem",
                                                borderColor: "transparent",
                                            }}
                                        ></Typeahead>
                                        <Form.Control
                                            type="text"
                                            className="form-control"
                                            id="usabilityattributes"
                                            value={ua.expression}
                                            onChange={(e) => handleAttrChange(e, index)}
                                            name="expression"
                                            style={styles.ua}
                                            placeholder="Attribute Expression"
                                            autoComplete="off"
                                        />
                                        <div>
                                            <button className="btn btn-sm btn-danger"
                                                    type="button"
                                                    onClick={(event) => handleAttrDeletion(event, index)}
                                            >Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div style={{display: "flex", justifyContent: "flex-end"}}>
                                <button type="button" className="btn btn-success" onClick={handleAddAttribute}
                                >
                                    <RiMenuAddLine size='1.5rem'/>
                                </button>
                            </div>
                        </div>
                        <div>
                            <span>Why do I get suggestions </span>
                            <button className="btn btn-info btn-sm" onClick={handleShow}
                                    style={{aspectRatio: 1}}>
                                <AiOutlineQuestion></AiOutlineQuestion></button>
                        </div>
                        <div>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>UX/Usability Attributes</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>We recommend using the consistent designations for Attribute Features
                                    to produce a clearer reference table. New Attribute Features will be proposed
                                    for future References and in Benchmarking.</Modal.Body>
                            </Modal>
                        </div>
                        {/*    </Form.Group>*/}
                        {/*</Form>*/}
                        <div style={{marginTop: '2rem'}}>
                            <Button className="btn btn-primary" onClick={saveReference}
                            >Next
                            </Button>
                        </div>
                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ReferenceAdd;

const styles = {
    mainContainer: {
        borderRadius: 10,
        width: "100%",
        // height: "100%",
        backgroundColor: "white",
        paddingLeft: "10%"
    },
    FormContainer: {
        width: "60%",
        display: "flex",
        alignItems: "center",
    },
    backgroundContainer: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        paddingLeft: '1vw',
        paddingRight: '1vw',
        paddingTop: '2vw',
        display: 'flex',
        justifyContent: 'center'
    },
    RowStyle: {
        margin: 0
    },
    ColStyle: {
        padding: 0
    },
    PictureEdit: {
        width: '50%'
    },
    uaList: {
        padding: 0,
        marginBottom: 0
    }
    ,
    ua: {
        marginBottom: '0.5rem',
        marginRight: '0.5rem',
        height: "3rem"
    }
}