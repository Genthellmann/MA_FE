import React, {useContext, useEffect, useState} from "react";
import TrendDataService from "../services/trend_service";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FileUp from "../components/FileUp";
import {Link, useNavigate} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Account from "./Account";
import LoginError from "../services/LoginError";
import {ProjectContext} from "../components/ProjectContextProvider";
import NavBar2 from "../components/NavBar2";
import FileEdit from "../components/FileEdit";

const TrendAdd = () => {
    const navigate = useNavigate();

    const currentProject = React.useContext(ProjectContext);

    const initialTrendState = {
        id: null,
        title: "",
        description: "",
        implication: "",
        picture: "",
        probability: "",
        impact: "",
        maturity: "",
        category: "user",
    }

    const [trend, setTrend] = useState(initialTrendState);
    const [submitted, setSubmitted] = useState(false);

    //show Modal if wrong File uploaded
    const [show, setShow] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const handleInputChange = event => {
        const {name, value} = event.target;
        setTrend({...trend, [name]: value});
    };

    const handleDropChange = event => {
        const {name, value} = event.target;
        setTrend({...trend, category: value});
    }

    const handleProbChange = event => {
        const {name, value, id} = event.target;
        setTrend({...trend, ["probability"]: id});
    }

    const handleMatChange = event => {
        const {name, value, id} = event.target;
        setTrend({...trend, ["maturity"]: id});
    }

    const handleImpactChange = event => {
        const {name, value, id} = event.target;
        setTrend({...trend, ["impact"]: id});
    }

    useEffect(() => {
        setTrend(prev => {
            return {...prev, project: currentProject.project}
        })
    }, []);

    useEffect(() => {
    }, [trend])


    const saveTrend = () => {
        TrendDataService.create(trend, currentProject.project)
            .then(response => {
                setTrend({
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    implication: response.data.implication,
                    picture: response.data.picture,
                    probability: response.data.probability,
                    impact: response.data.impact,
                    maturity: response.data.maturity,
                    category: response.data.category,
                    project: response.data.project,
                });
                setSubmitted(true);
                console.log(response)
                // setID(response.data.id);
            })
            .catch(e => {
                LoginError(navigate, e)
            });
        // setID()
    };

    const newTrend = () => {
        setTrend(initialTrendState);
        setSubmitted(false);
    };

    const saveTrendPicture = () => {
        document.getElementById("fileUploadForm").submit();
        
        // navigate("../../trend");
    }

    return (
        <div>
            <NavBar2/>
            <div style={styles.backgroundContainer}>
                <div style={styles.FormContainer}>
                    {submitted ? (
                        <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
                            <h5 style={{width: '100%'}}>Trend created successfully!</h5>
                            <div style={{width: '50%', marginTop: '2rem'}}>
                                <FileUp link={`http://localhost:3001/web/upload?trendID=${trend.id}`} ID={trend.id}
                                        submitted={submitted} show={show} setShow={setShow}
                                        isValid={isValid} setIsValid={setIsValid}>Upload
                                    Picture</FileUp>
                            </div>
                            <div style={{display: "flex", justifyContent: "center", width: '50%', marginTop: '2rem'}}>
                                <button className="btn btn-success"
                                        onClick={saveTrendPicture}
                                        style={{paddingLeft: '1.5rem', paddingRight: '1.5rem', marginRight: '2rem'}}
                                        disabled={!show && !isValid}
                                >Save
                                </button>
                                <button className="btn btn-danger" onClick={() => {
                                    navigate("../../trend")
                                }}
                                >Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Form style={{width: '100%'}}>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Title</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    value={trend.title}
                                    onChange={handleInputChange}
                                    style={{borderRadius: '1.078rem'}}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label> <strong>Description</strong>
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={trend.description}
                                    onChange={handleInputChange}
                                    style={{borderRadius: '1.078rem', height: '30vh'}}


                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label> <strong>Implication</strong>
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    type="text"
                                    className="form-control"
                                    id="implication"
                                    name="implication"
                                    value={trend.implication}
                                    onChange={handleInputChange}
                                    style={{borderRadius: '1.078rem', height: '30vh'}}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label> <strong>Category</strong>
                                </Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    onChange={handleDropChange}
                                    style={{borderRadius: '1.078rem'}}

                                >
                                    <option value="user"
                                            selected={"user" === trend.category}>Customer / User
                                    </option>
                                    <option value="technology"
                                            selected={"technology" === trend.category}>Technology
                                    </option>
                                    <option value="menv"
                                            selected={"menv" === trend.category}>Market Environment
                                    </option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label> <strong>Probability of Occurence</strong>
                                </Form.Label>
                                <br/>
                                <Form.Check
                                    inline
                                    label="low"
                                    name="prob_radio"
                                    type="radio"
                                    id={"low"}
                                    value={trend.probability}
                                    onChange={handleProbChange}
                                />
                                <Form.Check
                                    inline
                                    label="medium"
                                    name="prob_radio"
                                    type="radio"
                                    id={"medium"}
                                    value={trend.probability}
                                    onChange={handleProbChange}
                                />
                                <Form.Check
                                    inline
                                    label="high"
                                    name="prob_radio"
                                    type="radio"
                                    id={"high"}
                                    value={trend.probability}
                                    onChange={handleProbChange}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label> <strong>Maturity</strong>
                                </Form.Label>
                                <br/>
                                <Form.Check
                                    inline
                                    label="low"
                                    name="mat_radio"
                                    type="radio"
                                    id={"low"}
                                    value={trend.maturity}
                                    onChange={handleMatChange}

                                />
                                <Form.Check
                                    inline
                                    label="medium"
                                    name="mat_radio"
                                    type="radio"
                                    id={"medium"}
                                    value={trend.maturity}
                                    onChange={handleMatChange}

                                />
                                <Form.Check
                                    inline
                                    label="high"
                                    name="mat_radio"
                                    type="radio"
                                    id={"high"}
                                    value={trend.maturity}
                                    onChange={handleMatChange}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'
                            >
                                <Form.Label> <strong>Impact on System Generation</strong>
                                </Form.Label>
                                <br/>
                                <Form.Check
                                    inline
                                    label="low"
                                    name="impact_radio"
                                    type='radio'
                                    id={"low"}
                                    value={trend.impact}
                                    onChange={handleImpactChange}
                                />
                                <Form.Check
                                    inline
                                    label="medium"
                                    name="impact_radio"
                                    type='radio'
                                    id={"medium"}
                                    value={trend.impact}
                                    onChange={handleImpactChange}
                                />
                                <Form.Check
                                    inline
                                    label="high"
                                    name="impact_radio"
                                    type='radio'
                                    id={"high"}
                                    value={trend.impact}
                                    onChange={handleImpactChange}
                                />
                            </Form.Group>
                            {/*<label htmlFor="title">Picture</label>*/}
                            {/*<div>*/}
                            {/*    <FileUp ID={trend.id}>FileUpload</FileUp>*/}
                            {/*</div>*/}
                            <span style={{fontStyle: 'italic'}}> Save Trend to Add Pictures in the Next Step...</span>
                            <br/>
                            <button
                                type="button"
                                class="btn btn-primary"
                                onClick={saveTrend}
                                style={styles.saveBtn}
                            >
                                Save Trend
                            </button>
                        </Form>
                    )}
                </div>
            </div>
        </div>
    );
};
export default TrendAdd;

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
    saveBtn: {
        marginTop: '1rem'
    }
}
