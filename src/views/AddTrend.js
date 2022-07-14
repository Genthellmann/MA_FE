import React, {useState} from "react";
import TrendDataService from "../services/trend_service";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FileUp from "../components/FileUp";
import {Link, useNavigate} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Account from "../components/Account";
import LoginError from "../services/LoginError";

const AddTrend = () => {
    const navigate = useNavigate();

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
    const [id, setID] = useState(1);

    const handleInputChange = event => {
        const {name, value} = event.target;
        setTrend({...trend, [name]: value});
    };

    const handleDropChange = event => {
        const {name, value} = event.target;
        setTrend({...trend, ["category"]: value});
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


    const saveTrend = () => {
        TrendDataService.create(trend)
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
                    category: response.data.category
                });
                setSubmitted(true);
                setID(response.data.id);
            })
            .catch(e => {
                console.log(e);
                console.log("add trend: " + e.response.status);
                LoginError(navigate, e)
            });
        setID()
    };

    const newTrend = () => {
        setTrend(initialTrendState);
        setSubmitted(false);
    };

    return (
        <div style={styles.mainContainer}>
            <Sidebar/>
            <Account/>
            <div className="submit-form">
                {submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        {/*<h4>{trend.id}</h4>*/}
                        <FileUp ID={trend.id}>Upload Picture</FileUp>
                        <Button><Link to={"/trend"} style={{'color': 'white'}}> Skip </Link></Button>
                        <br/>
                        <br/>
                        <Button><Link to={"/trend"} style={{'color': 'white'}}> Done </Link></Button>
                        <Button className="btn btn-success" onClick={newTrend}>Add Next</Button>
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
                        <div className="form-group">
                            <label htmlFor="implication">Implication</label>
                            <input
                                type="text"
                                className="form-control"
                                id="implication"
                                required
                                value={trend.implication}
                                onChange={handleInputChange}
                                name="implication"
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
        </div>
    );
};
export default AddTrend;

const styles = {
    mainContainer: {
        borderRadius: 10,
        width: "100%",
        // height: "100%",
        backgroundColor: "white",
        paddingLeft: "10%"
    }
}
