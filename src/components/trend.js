import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import TrendDataService from "../services/trend_service";
const Trend = props => {
    const { id }= useParams();
    let navigate = useNavigate();
    const initialTrendState = {
        id: null,
        title: "",
        description: "",
        published: false
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
    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentTrend({ ...currentTrend, [name]: value });
    };
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
                    </form>
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