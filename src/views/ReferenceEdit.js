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
        <div style={styles.mainContainer}>
            <Sidebar/>
            <Account/>
            <div style={{display: "flex", justifyContent: "flex-start"}}>

                <div className="submit-form" style={{margin: 0, width: "50%"}}>
                    <div className="form-group">
                        <label htmlFor="rproduct">Reference Product</label>
                        <input
                            type="text"
                            className="form-control"
                            id="rproduct"
                            required
                            value={currentReference.rproduct}
                            onChange={handleInputChange}
                            name="rproduct"
                        />
                    </div>
                    <FileEditRp ID={currentReference.trendID} refID={refID}>Reference Product Picture</FileEditRp>
                    {/*<FileUp*/}
                    {/*    link={`http://localhost:3001/rppicture?trendID=${currentReference.trendID}&refID=${currentReference.id}`}*/}
                    {/*    ID={currentReference.id} submitted={true}*/}
                    {/*></FileUp>*/}
                    <div className="form-group">
                        <label htmlFor="rsystemelements">Reference System Elements</label>
                        <input
                            type="text"
                            className="form-control"
                            id="rsystemelements"
                            required
                            value={currentReference.rsystemelements}
                            onChange={handleInputChange}
                            name="rsystemelements"
                        />
                    </div>
                    <br/>
                    <div className="form-group">
                        <label htmlFor="usabilityattributes">UX/Usability Attributes</label>
                        <input
                            type="text"
                            className="form-control"
                            id="usabilityattributes"
                            required
                            value={currentReference.usabilityattributes}
                            onChange={handleInputChange}
                            name="usabilityattributes"
                        />
                    </div>
                    <FileEditExpl ID={currentReference.trendID} refID={refID}>Reference Product Picture</FileEditExpl>
                    {/*<FileUp*/}
                    {/*    link={`http://localhost:3001/explpicture?trendID=${currentReference.trendID}&refID=${currentReference.id}`}*/}
                    {/*    ID={currentReference.id} submitted={true}*/}
                    {/*></FileUp>*/}
                    <button onClick={updateReference} className="btn btn-success">
                        Submit
                    </button>
                </div>

            </div>
        </div>
    );
};
export default ReferenceEdit;

const styles = {
    mainContainer: {
        borderRadius: 10,
        width: "100%",
        // height: "100%",
        backgroundColor: "white",
        paddingLeft: "10%"
    }
}
