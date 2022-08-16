import React, {useContext, useEffect, useState} from "react";
import TrendDataService from "../services/trend_service";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FileUp from "../components/FileUp";
import {Link, useNavigate, useParams} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Account from "./Account";
import LoginError from "../services/LoginError";
import {Route} from "react-router-dom";

const AddReference = () => {
    const navigate = useNavigate();

    const {id} = useParams();

    const initialReferenceState = {
        trend: id,
        rproduct: "",
        rsystememelements: "",
        usabilityattributes: "",
    }

    const [reference, setReference] = useState(initialReferenceState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const {name, value} = event.target;
        setReference({...reference, [name]: value});
    };


    const saveReference = () => {
        TrendDataService.createReference(reference)
            .then(response => {
                    setSubmitted(true)
                    navigate("../RS/" + id)
                }
            )
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
            <div className="submit-form">
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
                <br/>
                <div className="form-group">
                    <label htmlFor="rsystememelements">Reference System Elements</label>
                    <input
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
                        type="text"
                        className="form-control"
                        id="usabilityattributes"
                        required
                        value={reference.usabilityattributes}
                        onChange={handleInputChange}
                        name="usabilityattributes"
                    />
                </div>
                <br/>
                <button onClick={saveReference} className="btn btn-success">
                    Submit
                </button>
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
