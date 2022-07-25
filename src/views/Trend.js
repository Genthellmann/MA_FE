import React, {useState, useEffect, useMemo, useContext} from "react";
import {useParams, useNavigate} from 'react-router-dom';
import TrendDataService from "../services/trend_service";
import {Form} from "react-bootstrap";
import FileReturn from "../components/FileReturn";
import FileEdit from "../components/FileEdit";
import FileUp from "../components/FileUp";
import ExpendableText from "../components/ExpendableText";
import RichText from "../temp_comps/richText";
import HelperPositioning from "../services/HelperPositioning";
import LoginError from "../services/LoginError";
import Sidebar from "../components/Sidebar";
import {ProjectContext} from "../components/ProjectContextProvider";

const Trend = props => {
    const {id} = useParams();
    let navigate = useNavigate();
    const currentProject = React.useContext(ProjectContext)

    const initialTrendState = {
        id: null,
        title: "",
        description: "",
        implication: "",
        category: "",
        probability: "",
        maturity: "",
        impact: "",
        project: currentProject.id,
        xpos: 0,
        ypos: 0,
    };
    const [currentTrend, setCurrentTrend] = useState(initialTrendState);
    const [prevTrendConfig, setPrevTrendConfig] = useState(initialTrendState);
    const [message, setMessage] = useState("");

    const getTrend = id => {
        TrendDataService.get(id)
            .then(response => {
                setCurrentTrend(response.data);
                setPrevTrendConfig(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
                LoginError(navigate, e)
            })
    };

    useEffect(() => {
        if (id)
            getTrend(id);
    }, [id]);


    //=======================
    //Input Changes
    const type = "radio"

    const handleInputChange = event => {
        const {name, value} = event.target;
        setCurrentTrend({...currentTrend, [name]: value});
    };

    const handleDropChange = event => {
        const {name, value} = event.target;
        setCurrentTrend({...currentTrend, ["category"]: value});
    }

    const handleProbChange = event => {
        const {name, value, id} = event.target;
        setCurrentTrend({...currentTrend, ["probability"]: id});
    }

    const handleMatChange = event => {
        const {name, value, id} = event.target;
        setCurrentTrend({...currentTrend, ["maturity"]: id});
    }

    const handleImpactChange = event => {
        const {name, value, id} = event.target;
        setCurrentTrend({...currentTrend, ["impact"]: id});
    }

    const updateTrend = () => {
        if ((currentTrend.category !== prevTrendConfig.category) || (currentTrend.probability !== prevTrendConfig.probability)) {
            let position = HelperPositioning(currentTrend.category, currentTrend.probability);
            TrendDataService.update(currentTrend.id, {...currentTrend, ["xpos"]: position[0], ["ypos"]: position[1]}
            )
                .then(response => {
                    setMessage("The trend was updated successfully!");
                })
                .catch(e => {
                    console.log(e);
                    console.log("update trend " + e.response.status);
                    LoginError(navigate, e)
                });
        } else {
            TrendDataService.update(currentTrend.id, currentTrend)
                .then(response => {
                    setMessage("The trend was updated successfully!");
                    navigate("/trend")
                })
                .catch(e => {
                    console.log(e);
                    console.log("update trend 2 " + e.response.status);
                    LoginError(navigate, e)
                });
        }
    };

    const deleteTrend = () => {
        TrendDataService.remove(currentTrend.id)
            .then(response => {
                navigate("/trend");
            })
            .catch(e => {
                console.log(e);
                LoginError(navigate, e)
            });
    };

    return (
        <div style={styles.mainContainer}>
            <Sidebar/>
            <div>
                {currentTrend ? (
                    <div className="edit-form">
                        <h4>Trend</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <ExpendableText>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        value={currentTrend.title}
                                        onChange={handleInputChange}
                                    />
                                </ExpendableText>
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
                                    selected={"user" === currentTrend.category}>Customer / User
                            </option>
                            <option value="technology"
                                    selected={"technology" === currentTrend.category}>Technology
                            </option>
                            <option value="menv"
                                    selected={"menv" === currentTrend.category}>Market Environment
                            </option>
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
                            </div>
                        </Form>
                        {/*<RichText></RichText>*/}
                        <label htmlFor="title">Picture</label>
                        <div>
                            <FileEdit ID={currentTrend.id}>FileUpload</FileEdit>
                        </div>

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
                        <br/>
                        <p>Please click on a Trend...</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Trend;

const styles = {
    mainContainer: {
        borderRadius: 10,
        width: "100%",
        // height: "100%",
        backgroundColor: "white",
        paddingLeft: "10%",
        paddingBottom: 5,
        paddingTop: 5,
        paddingRight: 5,
    }
}