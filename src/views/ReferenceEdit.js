import React, {useContext, useEffect, useRef, useState} from "react";
import TrendDataService from "../services/trend_service";
import {Form, Modal} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import LoginError from "../services/LoginError";
import NavBar2 from "../components/NavBar2";
import {Typeahead} from "react-bootstrap-typeahead";
import {RiMenuAddLine} from "react-icons/ri";
import {AiOutlineQuestion} from "react-icons/ai";


const ReferenceEdit = () => {
    const navigate = useNavigate();

    let {trendID, refID} = useParams();


    const initialReferenceState = {
        id: null,
        trendID: "",
        rproduct: "",
        rsystemelements: "",
        usabilityattributes: "",
    }

    const [currentReference, setCurrentReference] = useState(initialReferenceState);
    const [prevReferenceConfig, setPrevReferenceConfig] = useState(initialReferenceState);

    const getReference = refID => {
        TrendDataService.getOneReference(refID)
            .then(response => {
                setCurrentReference(response.data);
                setPrevReferenceConfig(response.data);
            })
            .catch(e => {
                console.log(e);
                LoginError(navigate, e)
            })

    };

    useEffect(() => {
        if (refID)
            getReference(refID);
    }, [refID]);

    //=======================
    //UX Attributes
    //=======================
    const handleInputChange = event => {
        const {name, value} = event.target;
        setCurrentReference({...currentReference, [name]: value});
    };


    const handleAddAttribute = event => {
        setCurrentReference({
            ...currentReference,
            ["usabilityattributes"]: currentReference.usabilityattributes.concat({feature: "", expression: ""}),
        });

    }

    const handleAttrChange = (event, index) => {
        const {name, value} = event.target;

        console.log(currentReference.usabilityattributes)

        setCurrentReference({
            ...currentReference, ["usabilityattributes"]: currentReference.usabilityattributes.map((el, elindex) => {
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
        const ref = currentReference.usabilityattributes;
        ref.splice(index, 1)
        setCurrentReference({...currentReference, ["usabilityattributes"]: ref})
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
        console.log("handleAttrChangewihtAC")

        console.log(index)
        console.log(text)

        setCurrentReference({
            ...currentReference, ["usabilityattributes"]: currentReference.usabilityattributes.map((el, elindex) => {
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

        console.log(currentReference.usabilityattributes)
    }

    const handleAttrSelectwithAC = (text, index) => {

        // setCurrentReference({
        //     ...currentReference, ["usabilityattributes"]: currentReference.usabilityattributes.map((el, elindex) => {
        //         console.log("el" + el + "elindex" + elindex)
        // if (elindex !== index) {
        //     return el
        // } else {
        //     return {
        //         ...el,
        //         ["feature"]: selected[0]
        //     }
        // }
        //     })
        // })

    }


    // //=======================
    // //Input Changes
    // //=======================
    //
    // const handleInputChange = event => {
    //     const {name, value} = event.target;
    //     setCurrentReference({...currentReference, [name]: value});
    // };


    //=======================
    //Update Reference
    //=======================

    const updateReference = () => {
        TrendDataService.updateReference(currentReference)
            .then(response => {
            })
            .catch(e => {
                console.log(e);
                LoginError(navigate, e)
            });
        navigate(`../RS/edit/page2/${trendID}/${refID}`, {replace: true})

    };

    //=======================
    //Modal
    //=======================

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const returnArray = (toArray) => {
        return [toArray]
    }

    return (
        <div>
            <NavBar2/>
            <div style={styles.backgroundContainer}>
                <div style={styles.FormContainer}>
                    <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
                        <h4>Add Reference Content</h4>
                        <Form style={{width: '100%'}}>
                            <Form.Group className="mb-3">
                                <Form.Label><strong>Reference Product</strong></Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="rproduct"
                                    required
                                    value={currentReference.rproduct}
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
                                    value={currentReference.rsystemelements}
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
                                {currentReference.usabilityattributes && currentReference.usabilityattributes.map((ua, index) => (
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
                                            defaultSelected={returnArray(ua.feature)}
                                            onInputChange={(e, text) => handleAttrChangewithAC(e, text, index)}
                                            onChange={(text) => handleAttrSelectwithAC(selected, index)}
                                            placeholder="Attribute Feature"
                                            limit="1000"
                                            style={{
                                                padding: 0,
                                                marginBottom: "0.5rem",
                                                marginRight: "0.5rem",
                                                borderColor: "transparent",
                                            }}
                                        ></Typeahead>
                                        <div></div>
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

                        {/*<Form.Group className="mb-3">*/}
                        {/*    <Form.Label><strong>Reference Product</strong></Form.Label>*/}
                        {/*    <Form.Control*/}
                        {/*        type="text"*/}
                        {/*        className="form-control"*/}
                        {/*        id="rproduct"*/}
                        {/*        required*/}
                        {/*        value={currentReference.rproduct}*/}
                        {/*        onChange={handleInputChange}*/}
                        {/*        name="rproduct"*/}
                        {/*        style={{borderRadius: '1.078rem'}}*/}
                        {/*    />*/}
                        {/*</Form.Group>*/}
                        {/*/!*<Form.Label><strong>Reference Product Picture</strong></Form.Label>*!/*/}
                        {/*/!*<div style={styles.PictureEdit}>*!/*/}
                        {/*/!*    <FileEditRp ID={currentReference.trendID} refID={refID}*!/*/}
                        {/*/!*    >Reference Product*!/*/}
                        {/*/!*        Picture</FileEditRp>*!/*/}
                        {/*/!*</div>*!/*/}
                        {/*<Form.Group className="mb-3">*/}
                        {/*    <Form.Label><strong>Reference System Elements</strong></Form.Label>*/}
                        {/*    <Form.Control*/}
                        {/*        as="textarea"*/}
                        {/*        type="text"*/}
                        {/*        className="form-control"*/}
                        {/*        id="rsystemelements"*/}
                        {/*        required*/}
                        {/*        value={currentReference.rsystemelements}*/}
                        {/*        onChange={handleInputChange}*/}
                        {/*        name="rsystemelements"*/}
                        {/*        style={{borderRadius: '1.078rem', height: '5vh'}}*/}
                        {/*    />*/}
                        {/*</Form.Group>*/}
                        {/*<Form.Group>*/}
                        {/*    <Form.Label><strong>UX/Usability Attributes</strong></Form.Label>*/}
                        {/*    <Form.Control*/}
                        {/*        as="textarea"*/}
                        {/*        type="text"*/}
                        {/*        className="form-control"*/}
                        {/*        id="usabilityattributes"*/}
                        {/*        required*/}
                        {/*        value={currentReference.usabilityattributes}*/}
                        {/*        onChange={handleInputChange}*/}
                        {/*        name="usabilityattributes"*/}
                        {/*        style={{borderRadius: '1.078rem', height: '30vh'}}*/}
                        {/*    />*/}
                        {/*</Form.Group>*/}
                        {/*<Form.Label><strong>Explanatory Picture or Drawing</strong></Form.Label>*/}
                        {/*<div style={styles.PictureEdit}>*/}
                        {/*    <FileEditExpl ID={currentReference.trendID} refID={refID}*/}
                        {/*    >Reference Product Picture</FileEditExpl>*/}
                        {/*</div>*/}

                        {/*<FileUp*/}
                        {/*    link={`http://localhost:3001/explpicture?trendID=${currentReference.trendID}&refID=${currentReference.id}`}*/}
                        {/*    ID={currentReference.id} submitted={true}*/}
                        {/*></FileUp>*/}
                        <div style={{marginTop: "2rem"}}>
                            <button onClick={updateReference} className="btn btn-primary">
                                Save
                            </button>
                            {/*</Form>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // <div>
        //     <NavBar2/>
        //     <div style={styles.backgroundContainer}>
        //         <div style={styles.FormContainer}>
        //             <Form style={{width: '100%'}}>
        //                 <Form.Group className="mb-3">
        //                     <Form.Label><strong>Reference Product</strong></Form.Label>
        //                 <input
        //                     type="text"
        //                     className="form-control"
        //                     id="rproduct"
        //                     required
        //                     value={currentReference.rproduct}
        //                     onChange={handleInputChange}
        //                     name="rproduct"
        //                 />
        //                 </Form.Group>
        //             <FileEditRp ID={currentReference.trendID} refID={refID}>Reference Product Picture</FileEditRp>
        //             {/*<FileUp*/}
        //             {/*    link={`http://localhost:3001/rppicture?trendID=${currentReference.trendID}&refID=${currentReference.id}`}*/}
        //             {/*    ID={currentReference.id} submitted={true}*/}
        //             {/*></FileUp>*/}
        //             <div className="form-group">
        //                 <label htmlFor="rsystemelements">Reference System Elements</label>
        //                 <input
        //                     type="text"
        //                     className="form-control"
        //                     id="rsystemelements"
        //                     required
        //                     value={currentReference.rsystemelements}
        //                     onChange={handleInputChange}
        //                     name="rsystemelements"
        //                 />
        //             </div>
        //             <br/>
        //             <div className="form-group">
        //                 <label htmlFor="usabilityattributes">UX/Usability Attributes</label>
        //                 <input
        //                     type="text"
        //                     className="form-control"
        //                     id="usabilityattributes"
        //                     required
        //                     value={currentReference.usabilityattributes}
        //                     onChange={handleInputChange}
        //                     name="usabilityattributes"
        //                 />
        //             </div>
        //             <FileEditExpl ID={currentReference.trendID} refID={refID}>Reference Product Picture</FileEditExpl>
        //             {/*<FileUp*/}
        //             {/*    link={`http://localhost:3001/explpicture?trendID=${currentReference.trendID}&refID=${currentReference.id}`}*/}
        //             {/*    ID={currentReference.id} submitted={true}*/}
        //             {/*></FileUp>*/}
        //             <button onClick={updateReference} className="btn btn-success">
        //                 Submit
        //             </button>
        //             </Form>
        //         </div>
        //     </div>
        // </div>
    );
};
export default ReferenceEdit;

const styles = {
    FormContainer: {
        width: "70%",
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
