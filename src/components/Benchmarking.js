import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import TrendDataService from "../services/trend_service";
import LoginError from "../services/LoginError";
import {DropdownButton, Dropdown} from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import trend_service from "../services/trend_service";


function Benchmarking(props) {
    const navigate = useNavigate();
    const {trendID} = useParams();


    //===========================
    //Benchmark Content Return
    //===========================
    const [benchmarks, setBenchmarks] = useState(false);

    const getBenchmarks = () => {
        TrendDataService.getBenchmarks(trendID)
            .then(response => {
                setBenchmarks(response.data);
            })
            .catch(e => {
                LoginError(navigate, e)
            });
    };

    //===========================
    //Return RSE
    //===========================
    const [references, setReferences] = useState(false);

    const getReferences = () => {
        TrendDataService.getReference(trendID)
            .then(response => {
                setReferences(response.data);
            })
            .catch(e => {
                LoginError(navigate, e)
            });
    };

    React.useEffect(() => {
        getBenchmarks();
        getReferences();
    }, [trendID])


    const handleSelect = (event, id) => {
        const {value} = event.target
        console.log("id: " + id + " value: " + value)
        let currentBenchmark = benchmarks.find(element => element.id = id)
        currentBenchmark.rse = value;
        trend_service.updateBenchmark(id, currentBenchmark)
            .then(response => {
                console.log(response)
            })
            .catch(e => {
                LoginError(navigate, e)
            })
    }


    return (
        <div style={{paddingTop: '30px'}}>
            <h2>Benchmarking</h2>
            <ul className="list-group">
                {benchmarks &&
                    benchmarks.map((benchmark, index) => (
                        <li className="list-group-item "
                            key={index} style={{display: "flex", justifyContent: "space-between"}}
                        >
                            <Form.Group>
                                <Form.Label>{benchmark.ux}</Form.Label>
                                <Form.Select onChange={event => handleSelect(event, benchmark.id)}
                                >
                                    {references && references.map((reference, index) => (
                                        <option selected={benchmark.rse === reference.rproduct}
                                                value={reference.rproduct}
                                                key={reference.id}
                                        >{reference.rproduct}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </li>
                    ))}
            </ul>
        </div>);
}

export default Benchmarking;