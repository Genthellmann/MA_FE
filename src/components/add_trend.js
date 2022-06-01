import React, {useState} from "react";
import TrendDataService from "../services/trend_service";
import {ButtonGroup, Form, ToggleButton} from "react-bootstrap";

const AddTrend=()=>{
    const initialTrendState={
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

    const handleInputChange = event => {
        const {name,value} = event.target;
        setTrend({...trend, [name]:value});
    };

    const handleDropChange = event => {
        const {name,value} = event.target;
        setTrend({...trend,["category"]:value});
        console.log({...trend,["category"]:value})
    }

    const handleProbChange = event => {
        const {name,value, id} = event.target;
        setTrend({...trend, ["probability"]:id});
    }

    const handleMatChange = event => {
        const {name,value, id} = event.target;
        setTrend({...trend, ["maturity"]:id});
    }

    const handleImpactChange = event => {
        const {name,value, id} = event.target;
        setTrend({...trend, ["impact"]:id});
    }



    const saveTrend=()=>{
        // var data = {
        //     title: trend.title,
        //     description: trend.description,
        //     implication: trend.implication,
        //     picture: trend.picture,
        //     probability: trend.probability,
        //     impact: trend.impact,
        //     maturity: trend.maturity,
        //     category: trend.category,
        // };
        console.log(trend)
        //console.log(data)

        TrendDataService.create(trend)
            .then(response=>{
                setTrend({
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    implication: response.data.impact,
                    picture: response.data.picture,
                    probability: response.data.probability,
                    impact: response.data.impact,
                    maturity: response.data.maturity,
                    category: response.data.category
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e=>{
                console.log(e);
            });
    };
    const newTrend = () =>{
        setTrend(initialTrendState);
        setSubmitted(false);
    };
    return(
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newTrend}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={trend.title}
                            onChange={handleInputChange}
                            name="title"
                        />
                    </div>
                    <br/>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={trend.description}
                            onChange={handleInputChange}
                            name="description"
                        />
                    </div>
                    <br/>
                    <label htmlFor="title">Category</label>
                    <Form.Select
                        aria-label="Default select example"
                        onChange={handleDropChange}
                    >
                        <option value="user">Customer / User</option>
                        <option value="technology">Technology</option>
                        <option value="menv">Market Environment</option>
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
                                    value={trend.probability}
                                    onChange={handleProbChange}
                                />
                                <Form.Check
                                    inline
                                    label="medium"
                                    name="prob_radio"
                                    type={type}
                                    id={"medium"}
                                    value={trend.probability}
                                    onChange={handleProbChange}
                                />
                                <Form.Check
                                    inline
                                    label="high"
                                    name="prob_radio"
                                    type={type}
                                    id={"high"}
                                    value={trend.probability}
                                    onChange={handleProbChange}
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
                                    value={trend.maturity}
                                    onChange={handleMatChange}
                                />
                                <Form.Check
                                    inline
                                    label="medium"
                                    name="mat_radio"
                                    type={type}
                                    id={"medium"}
                                    value={trend.maturity}
                                    onChange={handleMatChange}
                                />
                                <Form.Check
                                    inline
                                    label="high"
                                    name="mat_radio"
                                    type={type}
                                    id={"high"}
                                    value={trend.maturity}
                                    onChange={handleMatChange}
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
                                    value={trend.impact}
                                    onChange={handleImpactChange}
                                />
                                <Form.Check
                                    inline
                                    label="medium"
                                    name="impact_radio"
                                    type={type}
                                    id={"medium"}
                                    value={trend.impact}
                                    onChange={handleImpactChange}
                                />
                                <Form.Check
                                    inline
                                    label="high"
                                    name="impact_radio"
                                    type={type}
                                    id={"high"}
                                    value={trend.impact}
                                    onChange={handleImpactChange}
                                />
                            </div>
                        ))}
                    </Form>
                    <button onClick={saveTrend} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};
export default AddTrend;