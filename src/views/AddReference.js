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
import FileUp_2 from "../components/FileUp_2";


const AddReference = () => {
    const navigate = useNavigate();

    let {trendID} = useParams();


    const initialReferenceState = {
        id: null,
        trendID: null,
        rproduct: "",
        rsystememelements: "",
        usabilityattributes: "",
    }

    const [reference, setReference] = useState(initialReferenceState);
    const [submitted, setSubmitted] = useState(false);
    const [created, setCreated] = useState(false);


    const handleInputChange = event => {
        const {name, value} = event.target;
        setReference({...reference, [name]: value, trendID: trendID});
        console.log(reference)
    };


    const saveReference = () => {

        TrendDataService.createReference(reference)
            .then(response => {
                    //navigate("../RS/" + id)
                    setReference({...reference, id: response.data.id})
                    setSubmitted(true)
                }
            )
            .catch(e => {
                console.log(e);
                LoginError(navigate, e)
            });
    };


    const updateReference = () => {
        TrendDataService.updateReference(reference)
            .then(response => {
            })
            .catch(e => {
                console.log(e);
                LoginError(navigate, e)
            });
    };


// const newTrend = () => {
//     setTrend(initialTrendState);
//     setSubmitted(false);
// };


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
                            value={reference.rproduct}
                            onChange={handleInputChange}
                            name="rproduct"
                        />
                    </div>
                    <button onClick={saveReference} className="btn btn-primary">
                        Create
                    </button>
                    <FileUp
                        link={`http://localhost:3001/rppicture?trendID=${reference.trendID}&refID=${reference.id}`}
                        ID={reference.id} submitted={submitted}
                    ></FileUp>
                    <div className="form-group">
                        <label htmlFor="rsystememelements">Reference System Elements</label>
                        <input
                            disabled={!submitted}
                            type="text"
                            className="form-control"
                            id="rsystememelements"
                            required
                            value={reference.rsystememelements}
                            onChange={handleInputChange}
                            name="rsystememelements"
                        />
                    </div>
                    <br/>
                    <div className="form-group">
                        <label htmlFor="usabilityattributes">UX/Usability Attributes</label>
                        <input
                            disabled={!submitted}
                            type="text"
                            className="form-control"
                            id="usabilityattributes"
                            required
                            value={reference.usabilityattributes}
                            onChange={handleInputChange}
                            name="usabilityattributes"
                        />
                    </div>
                    {/*<FileUp*/}
                    {/*    link={`http://localhost:3001/explpicture?trendID=${reference.trendID}&refID=${reference.id}`}*/}
                    {/*    ID={reference.id} submitted={submitted}*/}
                    {/*></FileUp>*/}
                    <button onClick={updateReference} className="btn btn-success">
                        Submit
                    </button>
                </div>

            </div>
        </div>
    );
};
export default AddReference;

const styles = {
    mainContainer: {
        borderRadius: 10,
        width: "100%",
        // height: "100%",
        backgroundColor: "white",
        paddingLeft: "10%"
    }
}
