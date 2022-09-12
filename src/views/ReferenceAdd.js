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


const ReferenceAdd = () => {
    const navigate = useNavigate();

    let {trendID} = useParams();


    const initialReferenceState = {
        id: null,
        trendID: null,
        rproduct: "",
        rsystemelements: "",
        usabilityattributes: "",
    }

    const [reference, setReference] = useState(initialReferenceState);
    const [submitted, setSubmitted] = useState(false);
    const [created, setCreated] = useState(false);


    const handleInputChange = event => {
        const {name, value} = event.target;
        setReference({...reference, [name]: value, trendID: trendID});
    };


    const saveReference = id => {
        TrendDataService.createReference(id, reference)
            .then(response => {
                    console.log(response)
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

    React.useEffect(() => {
        console.log(reference)
    }, [reference])


    const updateReference = () => {
        TrendDataService.updateReference(reference)
            .then(response => {
                console.log(response)
            })
            .catch(e => {
                console.log(e);
                LoginError(navigate, e)
            });
        navigate(`../../RS/${reference.trendID}`)
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
                    <FileUp
                        link={`http://localhost:3001/explpicture?trendID=${reference.trendID}&refID=${reference.id}`}
                        ID={reference.id} submitted={submitted}
                    ></FileUp>
                    <div className="form-group">
                        <label htmlFor="rsystemelements">Reference System Elements</label>
                        <input
                            disabled={!submitted}
                            type="text"
                            className="form-control"
                            id="rsystemelements"
                            required
                            value={reference.rsystemelements}
                            onChange={handleInputChange}
                            name="rsystemelements"
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
                    <button onClick={updateReference} className="btn btn-success">
                        Submit
                    </button>
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
    }
}