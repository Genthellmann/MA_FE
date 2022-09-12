import React, {useContext, useEffect, useRef, useState} from "react";
import TrendDataService from "../services/trend_service";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FileUp from "../components/FileUp";
import {Link, useNavigate, useParams} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Account from "./Account";
import LoginError from "../services/LoginError";
import {Route} from "react-router-dom";
import ExplPicFileUp from "../components/ExplPicFileUp";
import RpPicFileUp from "../components/RpPicFileUp";
import FileEditRp from "../components/FileEditRp";
import FileEditExpl from "../components/FileEditExpl";
import NavBar2 from "../components/NavBar2";


const ReferenceEdit = () => {
    const navigate = useNavigate();

    let {refID} = useParams();


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
                console.log(response.data)
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
    //Input Changes
    //=======================

    const handleInputChange = event => {
        const {name, value} = event.target;
        setCurrentReference({...currentReference, [name]: value});
    };

    const updateReference = () => {
        TrendDataService.updateReference(currentReference)
            .then(response => {
                console.log(response)
            })
            .catch(e => {
                console.log(e);
                LoginError(navigate, e)
            });
        navigate(`../../RS/${currentReference.trendID}`)

    };

    return (
        <div>
            <NavBar2/>
            <div style={styles.backgroundContainer}>
                <div style={styles.FormContainer}>
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
                            />
                        </Form.Group>
                        <Form.Label><strong>Reference Product Picture</strong></Form.Label>
                        <div style={styles.PictureEdit}>
                            <FileEditRp ID={currentReference.trendID} refID={refID}
                            >Reference Product
                                Picture</FileEditRp>
                        </div>
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
                                style={{borderRadius: '1.078rem', height: '5vh'}}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><strong>UX/Usability Attributes</strong></Form.Label>
                            <Form.Control
                                as="textarea"
                                type="text"
                                className="form-control"
                                id="usabilityattributes"
                                required
                                value={currentReference.usabilityattributes}
                                onChange={handleInputChange}
                                name="usabilityattributes"
                                style={{borderRadius: '1.078rem', height: '30vh'}}
                            />
                        </Form.Group>
                        <Form.Label><strong>Explanatory Picture or Drawing</strong></Form.Label>
                        <div style={styles.PictureEdit}>
                            <FileEditExpl ID={currentReference.trendID} refID={refID}
                            >Reference Product Picture</FileEditExpl>
                        </div>

                        {/*<FileUp*/}
                        {/*    link={`http://localhost:3001/explpicture?trendID=${currentReference.trendID}&refID=${currentReference.id}`}*/}
                        {/*    ID={currentReference.id} submitted={true}*/}
                        {/*></FileUp>*/}
                        <button onClick={updateReference} className="btn btn-success">
                            Submit
                        </button>
                    </Form>
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
    }
}
