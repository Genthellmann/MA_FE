import React, {useState} from "react";
import TrendDataService from "../services/trend_service";

const AddTrend=()=>{
    const initialTrendState={
        id: null,
        title: "",
        description: "",
        implication: "",
        picture: "",
        probability_of_occurence: "",
        impact_on_system_generation: "",
        maturity: "",
        category: "",
    }
    const [trend, setTrend] = useState(initialTrendState);
    const [submitted, setSubmitted] = useState(false);
    const handleInputChange = event => {
        const {name,value} = event.target;
        setTrend({...trend, [name]:value});
    };
    const saveTrend=()=>{
        var data = {
            title: trend.title,
            description: trend.description,
        };
        TrendDataService.create(data)
            .then(response=>{
                setTrend({
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description
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
                    <button onClick={saveTrend} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};
export default AddTrend;