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
import NavBar2 from "../components/NavBar2";
import FileEditRp from "../components/FileEditRp";
import FileEditExpl from "../components/FileEditExpl";


const ReferenceAdd = () => {
    const navigate = useNavigate();

    let {trendID} = useParams();


    const initialReferenceState = {
        id: null,
        trendID: trendID,
        rproduct: "",
        rsystemelements: "",
        usabilityattributes: "",
    }

    const [reference, setReference] = useState(initialReferenceState);
    const [submitted, setSubmitted] = useState(false);
    // const [page1, setPage1] = useState(false);
    // const [page3, setPage3] = useState(false);

    //=======================
    //Input Changes
    //=======================
    const handleInputChange = event => {
        const {name, value} = event.target;
        setReference({...reference, [name]: value, trendID: trendID});
    };

    const saveReference = () => {
        TrendDataService.createReference(reference)
            .then(response => {
                    console.log(response.data)
                    setReference(response.data)
                    setSubmitted(true);
                    navigate(`../../RS/add/page2/${reference.trendID}/${response.data.id}/rppicture`)
                }
            )
            .catch(e => {
                console.log(e);
                LoginError(navigate, e)
            });
    };


    return (

        <div>
            <NavBar2/>
            <div style={styles.backgroundContainer}>
                <div style={styles.FormContainer}>
                    <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
                        <h4>Add New Trend - Step 1/3</h4>
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
                                    style={{borderRadius: '1.078rem', height: '5vh'}}
                                    // disabled={!submitted}
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
                                    value={reference.usabilityattributes}
                                    onChange={handleInputChange}
                                    name="usabilityattributes"
                                    style={{borderRadius: '1.078rem', height: '30vh'}}
                                    // disabled={!submitted}
                                />
                            </Form.Group>
                        </Form>
                        <div style={{marginTop: '2rem'}}>
                            <button className="btn btn-primary" onClick={saveReference}
                            >Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        // <div>
        //     <NavBar2/>
        //     <div style={styles.backgroundContainer}>
        //         <div style={styles.FormContainer}>
        //             {page1 ? (
        //                 <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
        //                     <div>{reference.id}</div>
        //                     <Form style={{width: '100%'}}>
        //                         <Form.Group className="mb-3">
        //                             <Form.Label><strong>Reference Product</strong></Form.Label>
        //                             <Form.Control
        //                                 type="text"
        //                                 className="form-control"
        //                                 id="rproduct"
        //                                 required
        //                                 value={reference.rproduct}
        //                                 onChange={handleInputChange}
        //                                 name="rproduct"
        //                                 style={{borderRadius: '1.078rem'}}
        //                             />
        //                         </Form.Group>
        //                         {/*<button className='btn btn-primary' onClick={e => {*/}
        //                         {/*    saveReference(e)*/}
        //                         {/*}} disabled={submitted}>Create*/}
        //                         {/*</button>*/}
        //                         <Form.Group className="mb-3">
        //                             <Form.Label><strong>Reference System Elements</strong></Form.Label>
        //                             <Form.Control
        //                                 as="textarea"
        //                                 type="text"
        //                                 className="form-control"
        //                                 id="rsystemelements"
        //                                 required
        //                                 value={reference.rsystemelements}
        //                                 onChange={handleInputChange}
        //                                 name="rsystemelements"
        //                                 style={{borderRadius: '1.078rem', height: '5vh'}}
        //                                 // disabled={!submitted}
        //                             />
        //                         </Form.Group>
        //                         <Form.Group>
        //                             <Form.Label><strong>UX/Usability Attributes</strong></Form.Label>
        //                             <Form.Control
        //                                 as="textarea"
        //                                 type="text"
        //                                 className="form-control"
        //                                 id="usabilityattributes"
        //                                 required
        //                                 value={reference.usabilityattributes}
        //                                 onChange={handleInputChange}
        //                                 name="usabilityattributes"
        //                                 style={{borderRadius: '1.078rem', height: '30vh'}}
        //                                 // disabled={!submitted}
        //                             />
        //                         </Form.Group>
        //                         <button onClick={saveReference} className="btn btn-success">
        //                             Submit
        //                         </button>
        //                     </Form>
        //                 </div>
        //             ) : (
        //                 <div>
        //                     {page3 ? (
        //                         <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
        //                             <Form.Label><strong>Explanatory Picture or Drawing</strong></Form.Label>
        //                             <div style={styles.PictureEdit}>
        //                                 <FileEditExpl ID={reference.trendID} refID={reference.id} show={show}
        //                                               setShow={setShow} submitted={submitted}
        //                                               isValid={isValid} setIsValid={setIsValid}
        //                                               target={`../../RS/${trendID}`}
        //                                 ></FileEditExpl>
        //                             </div>
        //                             <div style={{
        //                                 display: "flex",
        //                                 justifyContent: "center",
        //                                 width: '50%',
        //                                 marginTop: '2rem'
        //                             }}>
        //                                 <button className="btn btn-success"
        //                                         onClick={saveExplPicture}
        //                                         style={{
        //                                             paddingLeft: '1.5rem',
        //                                             paddingRight: '1.5rem',
        //                                             marginRight: '2rem'
        //                                         }}
        //                                         disabled={!show && !isValid}
        //                                 >Submit
        //                                 </button>
        //                                 <button className="btn btn-danger" onClick={() => {
        //                                     navigate(`../../RS/${trendID}`)
        //                                 }}
        //                                 >Cancel
        //                                 </button>
        //                             </div>
        //                         </div>) : (
        //                         <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
        //                             <Form.Label><strong>Reference Picture</strong></Form.Label>
        //                             <div style={styles.PictureEdit}>
        //                                 <FileEditRp ID={reference.trendID} refID={reference.id} show={show}
        //                                             setShow={setShow} submitted={submitted}
        //                                             isValid={isValid} setIsValid={setIsValid}
        //                                 ></FileEditRp>
        //                             </div>
        //                             <div style={{
        //                                 display: "flex",
        //                                 justifyContent: "center",
        //                                 width: '50%',
        //                                 marginTop: '2rem'
        //                             }}>
        //                                 <button className="btn btn-success"
        //                                         onClick={saveRpPicture}
        //                                         style={{
        //                                             paddingLeft: '1.5rem',
        //                                             paddingRight: '1.5rem',
        //                                             marginRight: '2rem'
        //                                         }}
        //                                         disabled={!show && !isValid}
        //                                 >Save
        //                                 </button>
        //                                 <button className="btn btn-danger" onClick={cancelRpPicture}
        //                                 >Cancel
        //                                 </button>
        //                             </div>
        //                         </div>
        //
        //                     )}
        //                 </div>
        //             )}
        //         </div>
        //     </div>
        // </div>

        // <div>
        //     <NavBar2/>
        //     <div style={styles.backgroundContainer}>
        //         <div style={styles.FormContainer}>
        //             <Form style={{width: '100%'}}>
        //                 <Form.Group className="mb-3">
        //                     <Form.Label><strong>Reference Product</strong></Form.Label>
        //                     <Form.Control
        //                         type="text"
        //                         className="form-control"
        //                         id="rproduct"
        //                         required
        //                         value={reference.rproduct}
        //                         onChange={handleInputChange}
        //                         name="rproduct"
        //                         style={{borderRadius: '1.078rem'}}
        //                     />
        //                 </Form.Group>
        //                 <Form.Label><strong>Reference Product Picture</strong></Form.Label>
        //                 <div style={styles.PictureEdit}>
        //                     <FileEditRp ID={reference.trendID} refID={null} show={show} setShow={setShow}
        //                                 isValid={isValid} setIsValid={setIsValid}
        //                     >Reference Product
        //                         Picture</FileEditRp>
        //                 </div>
        //                 <Form.Label><strong>Reference Product Picture</strong></Form.Label>
        //                 <div style={styles.PictureEdit}>
        //                     <FileEditExpl ID={reference.trendID} refID={null}
        //                                   show={show} setShow={setShow} isValid={isValid} setIsValid={setIsValid}
        //                     >Explanatory Picture or Drawing
        //                         Picture</FileEditExpl>
        //                 </div>
        //                 <Form.Group className="mb-3">
        //                     <Form.Label><strong>Reference System Elements</strong></Form.Label>
        //                     <Form.Control
        //                         as="textarea"
        //                         type="text"
        //                         className="form-control"
        //                         id="rsystemelements"
        //                         required
        //                         value={reference.rsystemelements}
        //                         onChange={handleInputChange}
        //                         name="rsystemelements"
        //                         style={{borderRadius: '1.078rem', height: '5vh'}}
        //                     />
        //                 </Form.Group>
        //                 <Form.Group>
        //                     <Form.Label><strong>UX/Usability Attributes</strong></Form.Label>
        //                     <Form.Control
        //                         as="textarea"
        //                         type="text"
        //                         className="form-control"
        //                         id="usabilityattributes"
        //                         required
        //                         value={reference.usabilityattributes}
        //                         onChange={handleInputChange}
        //                         name="usabilityattributes"
        //                         style={{borderRadius: '1.078rem', height: '30vh'}}
        //                     />
        //                 </Form.Group>
        //                 <button onClick={saveReference} className="btn btn-success">
        //                     Submit
        //                 </button>
        //             </Form>
        //         </div>
        //     </div>
        // </div>

        // <div style={styles.mainContainer}>
        //     <Sidebar/>
        //     <Account/>
        //     <div style={{display: "flex", justifyContent: "flex-start"}}>
        //
        //         <div className="submit-form" style={{margin: 0, width: "50%"}}>
        //             <div className="form-group">
        //                 <label htmlFor="rproduct">Reference Product</label>
        //                 <input
        //                     type="text"
        //                     className="form-control"
        //                     id="rproduct"
        //                     required
        //                     value={reference.rproduct}
        //                     onChange={handleInputChange}
        //                     name="rproduct"
        //                 />
        //             </div>
        //             <button onClick={saveReference} className="btn btn-primary">
        //                 Create
        //             </button>
        //             <FileUp
        //                 link={`http://localhost:3001/rppicture?trendID=${reference.trendID}&refID=${reference.id}`}
        //                 ID={reference.id} submitted={submitted}
        //             ></FileUp>
        //             <FileUp
        //                 link={`http://localhost:3001/explpicture?trendID=${reference.trendID}&refID=${reference.id}`}
        //                 ID={reference.id} submitted={submitted}
        //             ></FileUp>
        //             <div className="form-group">
        //                 <label htmlFor="rsystemelements">Reference System Elements</label>
        //                 <input
        //                     disabled={!submitted}
        //                     type="text"
        //                     className="form-control"
        //                     id="rsystemelements"
        //                     required
        //                     value={reference.rsystemelements}
        //                     onChange={handleInputChange}
        //                     name="rsystemelements"
        //                 />
        //             </div>
        //             <br/>
        //             <div className="form-group">
        //                 <label htmlFor="usabilityattributes">UX/Usability Attributes</label>
        //                 <input
        //                     disabled={!submitted}
        //                     type="text"
        //                     className="form-control"
        //                     id="usabilityattributes"
        //                     required
        //                     value={reference.usabilityattributes}
        //                     onChange={handleInputChange}
        //                     name="usabilityattributes"
        //                 />
        //             </div>
        //             <button onClick={updateReference} className="btn btn-success">
        //                 Submit
        //             </button>
        //         </div>
        //
        //     </div>
        // </div>
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
    }
}