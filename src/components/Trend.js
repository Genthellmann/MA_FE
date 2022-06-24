import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import TrendDataService from "../services/trend_service";
import {Form} from "react-bootstrap";
import FileUpload from "./FileUpload";
import FileReturn from "./FileReturn";
import FileEdit from "./FileEdit";
import FileUp from "./FileUp";

const Trend = props => {
    const { id }= useParams();
    let navigate = useNavigate();
    const initialTrendState = {
        id: null,
        title: "",
        description: "",
        implication: "",
        category: "",
        picture: "",
        xpos: 0,
        ypos:0,
    };
    const [currentTrend, setCurrentTrend] = useState(initialTrendState);
    const [message, setMessage] = useState("");
    const getTrend = id => {
        TrendDataService.get(id)
            .then(response => {
                setCurrentTrend(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    useEffect(() => {
        if (id)
            getTrend(id);
    }, [id]);

    //=======================
    //Input Changes

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentTrend({ ...currentTrend, [name]: value });
        console.log(currentTrend.implication)
    };

    const handleDropChange = event => {
        const {name,value} = event.target;
        setCurrentTrend({...currentTrend,["category"]:value});
        console.log({...currentTrend,["category"]:value})
    }

    const handleProbChange = event => {
        const {name,value, id} = event.target;
        setCurrentTrend({...currentTrend, ["probability"]:id});
    }

    const handleMatChange = event => {
        const {name,value, id} = event.target;
        setCurrentTrend({...currentTrend, ["maturity"]:id});
    }

    const handleImpactChange = event => {
        const {name,value, id} = event.target;
        setCurrentTrend({...currentTrend, ["impact"]:id});
    }
    // const updatePublished = status => {
    //     var data = {
    //         id: currentTutorial.id,
    //         title: currentTutorial.title,
    //         description: currentTutorial.description,
    //         published: status
    //     };
    //     TutorialDataService.update(currentTutorial.id, data)
    //         .then(response => {
    //             setCurrentTutorial({ ...currentTutorial, published: status });
    //             console.log(response.data);
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // };
    const updateTrend = () => {
        TrendDataService.update(currentTrend.id, currentTrend)
            .then(response => {
                console.log(response.data);
                setMessage("The trend was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };
    const deleteTrend = () => {
        TrendDataService.remove(currentTrend.id)
            .then(response => {
                console.log(response.data);
                navigate("/crud");
            })
            .catch(e => {
                console.log(e);
            });
    };
    return (
        <div>
            {currentTrend ? (
                <div className="edit-form">
                    <h4>Trend</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={currentTrend.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={currentTrend.description}
                                onChange={handleInputChange}

                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="implication">Implication</label>
                            <input
                                type="text"
                                className="form-control"
                                id="implication"
                                name="implication"
                                value={currentTrend.implication}
                                onChange={handleInputChange}

                            />
                        </div>
                    </form>
                    <br/>
                    <label htmlFor="title">Category</label>
                    <Form.Select
                        aria-label="Default select example"
                        onChange={handleDropChange}
                    >
                        <option value="user"
                                selected={"user" === currentTrend.category}>Customer / User</option>
                        <option value="technology"
                                selected={"technology" === currentTrend.category}>Technology</option>
                        <option value="menv"
                                selected={"menv" === currentTrend.category}>Market Environment</option>
                    </Form.Select>
                    <br/>
                    <label htmlFor="title">Probability of Occurence</label>
                    <Form>
                        {['radio'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                                <Form.Check
                                    inline
                                    label="low"
                                    name="prob_radio"
                                    type={type}
                                    id={"low"}
                                    value={currentTrend.probability}
                                    onChange={handleProbChange}
                                    checked={"low" === currentTrend.probability}
                                />
                                <Form.Check
                                    inline
                                    label="medium"
                                    name="prob_radio"
                                    type={type}
                                    id={"medium"}
                                    // value={currentTrend.probability}
                                    value={currentTrend.probability}
                                    onChange={handleProbChange}
                                    checked={"medium" === currentTrend.probability}
                                />
                                <Form.Check
                                    inline
                                    label="high"
                                    name="prob_radio"
                                    type={type}
                                    id={"high"}
                                    value={currentTrend.probability}
                                    onChange={handleProbChange}
                                    checked={"high" === currentTrend.probability}
                                />
                            </div>
                        ))}
                    </Form>
                    <br/>
                    <label htmlFor="title">Maturity</label>
                    <Form>
                        {['radio'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                                <Form.Check
                                    inline
                                    label="low"
                                    name="mat_radio"
                                    type={type}
                                    id={"low"}
                                    value={currentTrend.maturity}
                                    onChange={handleMatChange}
                                    checked={"low" === currentTrend.maturity}

                                />
                                <Form.Check
                                    inline
                                    label="medium"
                                    name="mat_radio"
                                    type={type}
                                    id={"medium"}
                                    value={currentTrend.maturity}
                                    onChange={handleMatChange}
                                    checked={"medium" === currentTrend.maturity}

                                />
                                <Form.Check
                                    inline
                                    label="high"
                                    name="mat_radio"
                                    type={type}
                                    id={"high"}
                                    value={currentTrend.maturity}
                                    onChange={handleMatChange}
                                    checked={"high" === currentTrend.maturity}
                                />
                            </div>
                        ))}
                    </Form>
                    <br/>
                    <label htmlFor="title">Impact on System Generation</label>
                    <Form>
                        {['radio'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                                <Form.Check
                                    inline
                                    label="low"
                                    name="impact_radio"
                                    type={type}
                                    id={"low"}
                                    value={currentTrend.impact}
                                    onChange={handleImpactChange}
                                    checked={"low" === currentTrend.impact}

                                />
                                <Form.Check
                                    inline
                                    label="medium"
                                    name="impact_radio"
                                    type={type}
                                    id={"medium"}
                                    value={currentTrend.impact}
                                    onChange={handleImpactChange}
                                    checked={"medium" === currentTrend.impact}
                                />
                                <Form.Check
                                    inline
                                    label="high"
                                    name="impact_radio"
                                    type={type}
                                    id={"high"}
                                    value={currentTrend.impact}
                                    onChange={handleImpactChange}
                                    checked={"high" === currentTrend.impact}

                                />
                                <br/>
                                <label htmlFor="title">Picture</label>
                                <div>
                                <FileEdit ID={currentTrend.id}>FileUpload</FileEdit>
                            </div>
                            </div>
                        ))}
                    </Form>

                        <br/>
                    <button type="button"
                            class="btn btn-dark"
                            onClick={deleteTrend}>
                        Delete
                    </button>
                    <button
                        type="button"
                        class="btn btn-dark"
                        onClick={updateTrend}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Trend...</p>
                </div>
            )}
        </div>
    );
};
export default Trend;