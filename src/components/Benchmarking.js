import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import TrendDataService from "../services/trend_service";
import LoginError from "../services/LoginError";
import {DropdownButton, Dropdown, Table, Row, Col} from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import trend_service from "../services/trend_service";
import {BsFillCaretDownFill, BsFillCaretUpFill, BsThreeDotsVertical} from "react-icons/bs";
import RenderBmTable from "./benchmarkBmTable";


function Benchmarking(props) {
    const navigate = useNavigate();
    const {trendID} = useParams();


    //===========================
    //RSEs
    //===========================
    const [references, setReferences] = useState(false);

    const getReferences = () => {
        TrendDataService.getReference(trendID)
            .then(response => {
                if (response.data.length > 0) {
                    setReferences(response.data);
                    console.log(response.data)
                    setUxAttributes(filterUxAttributes(response.data))
                } else {
                    setReferences([{rproduct: "no references yet"}])
                }
            })
            .catch(e => {
                LoginError(navigate, e)
            });
    };

    //===========================
    //UX/Usability Attributes
    //===========================

    const [uxAttributes, setUxAttributes] = useState([]);

    function filterUxAttributes(RSE) {
        let filterUX = RSE.map(a => a.usabilityattributes)
        let filterAttributes = [].concat.apply([], filterUX)
        let filterFeatures = filterAttributes.map(a => a.feature)
        console.log(filterFeatures)

        let uniqueId = [];

        let uniqueFeatures = filterFeatures.filter(element => {
            const isDuplicate = uniqueId.includes(element);

            if (!isDuplicate) {
                uniqueId.push(element);
                return true;
            }
            return false;
        });

        return uniqueFeatures
    }


    //===========================
    // Benchmarks
    //===========================
    const [benchmarks, setBenchmarks] = useState(false);

    //get Benchmarks
    const getBenchmarks = () => {
        TrendDataService.getBenchmarks(trendID)
            .then(response => {
                setBenchmarks(response.data);
                setBenchmark(initialBmState);
            })
            .catch(e => {
                LoginError(navigate, e)
            });
    };


    React.useEffect(() => {
        getBenchmarks();
        getReferences();
    }, [trendID])

    //handle RSE change in Benchmark List
    const handleSelect = (event, id) => {
        const {value} = event.target
        console.log("id: " + id + " value: " + value)
        let currentBenchmark = benchmarks.find(element => element.id == id)
        currentBenchmark.rse = value;
        trend_service.updateBenchmark(id, currentBenchmark)
            .then(response => {
                console.log(response)
            })
            .catch(e => {
                LoginError(navigate, e)
            })
    }

    const setfalse = () => {
        setCreationSpace(false);
    }

    //===========================
    //create new Benchmark
    //===========================
    const initialBmState = {
        id: null,
        trendID: trendID,
        ux: null,
        rse: "",
        note: ""
    }

    const [creationSpace, setCreationSpace] = useState(false);
    const [benchmark, setBenchmark] = useState(initialBmState);


    const handleAddBm = () => {
        setCreationSpace(true);
        console.log(references)
        setBenchmark({...benchmark, ux: uxAttributes[0], rse: references[0].rproduct});
    }

    const handleCancel = () => {
        setCreationSpace(false);
    }

    const handleInputChange = event => {
        const {name, value} = event.target;
        console.log("name: " + name + "value: " + value)
        console.log(benchmark)
        setBenchmark({...benchmark, [name]: value});
    };

    //handle RSE change in Benchmark Creation
    const handleSelectUxBmCreate = (event) => {
        const {name, value} = event.target
        console.log("name: " + name + "value: " + value)
        console.log(benchmark)
        setBenchmark({...benchmark, ux: value});
    }

    //handle RSE change in Benchmark Creation
    const handleSelectRseBmCreate = (event) => {
        const {name, value} = event.target
        console.log("name: " + name + "value: " + value)
        console.log(benchmark)
        setBenchmark({...benchmark, rse: value});
    }

    // const addBmtoList = () => {
    //     setBenchmarks(benchmarks => benchmarks.concat(benchmark));
    // }

    const handleSaveBm = () => {
        TrendDataService.createBenchmark(benchmark)
            .then(response => {
                console.log(response.data)
                getBenchmarks();
            })
            .catch(e => {
                LoginError(navigate, e)
            })
    }

    const handleCreate = () => {
        // addBmtoList();
        handleSaveBm();
        setCreationSpace(false)
    }

    //===========================
    //Delete Benchmark
    //===========================
    const deletefromBmList = id => {
        setBenchmarks(benchmarks.filter(x =>
            x.id != id));
    }

    const deleteBm = id => {
        TrendDataService.deleteBenchmark(id)
            .then(response => {
                console.log(response)
            })
            .catch(e => {
                LoginError(navigate, e)
            })
    }

    const handleDeleteBm = e => {
        const bmId = e.currentTarget.id
        deletefromBmList(bmId);
        deleteBm(bmId);
    }


    return (
        <div style={{paddingTop: '2rem'}}>
            <h2>Benchmarking</h2>
            <div className="card border-secondary mt-3" style={styles.ListContainer}>
                {(benchmarks.length > 0) ? (
                    // <ul className="list-group" className="list-group" style={styles.ListGroup}>
                    //     {benchmarks &&
                    //         benchmarks.map((benchmark, index) => (
                    //             <li className="list-group-item "
                    //                 key={`index:${index}id:${benchmark.id}`}
                    //                 style={styles.ListItem}
                    //             >
                    //
                    //                 <div style={{display: "flex", justifyContent: "space-between"}}>
                    //                     <div>
                    //                         <div style={{flexGrow: 3}}>UX/Usability Attribute:
                    //                         </div>
                    //                         <div>
                    //                             <strong>{` ${benchmark.ux}`}</strong>
                    //                         </div>
                    //                     </div>
                    //                     <Form.Group style={{flexGrow: 3}}>
                    //                         <Form.Label>Reference System Element</Form.Label>
                    //                         <Form.Select onChange={event => handleSelect(event, benchmark.id)}
                    //                                      style={{borderRadius: '1.078rem'}}
                    //
                    //                         >
                    //                             {references && references.map((reference, index) => (
                    //                                 <option selected={benchmark.rse === reference.rproduct}
                    //                                         value={reference.rproduct}
                    //                                         key={reference.id}
                    //                                 >{reference.rproduct}</option>
                    //                             ))}
                    //                         </Form.Select>
                    //                     </Form.Group>
                    //                     <div style={{flexGrow: 3}}>
                    //                         <div>Note:</div>
                    //                         <div>{benchmark.note}</div>
                    //                     </div>
                    //                     <div style={{flexGrow: 1}}>
                    //                         <button className="btn btn-danger btn-sm pt-0 pb-0"
                    //                                 id={benchmark.id}
                    //                                 eventkey={`${benchmark.id}`}
                    //                                 onClick={handleDeleteBm}
                    //                                 style={{height: "1.2rem"}}
                    //                         >delete
                    //                         </button>
                    //                     </div>
                    //                 </div>
                    //             </li>
                    //         ))}
                    // </ul>

                    <Table striped="columns" hover responsive="sm">
                        <thead>
                        <tr>
                            <th>UX/Usability Attributes</th>
                            <th>Reference System Elements</th>
                            <th>Note</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <RenderBmTable benchmarks={benchmarks} references={references}
                                       handleselect={handleSelect} handledeletebm={handleDeleteBm}>

                        </RenderBmTable>
                        </tbody>
                    </Table>


                ) : (
                    <ul className='list-group' style={styles.ListGroup}>
                        <li
                            key={"emptyList"}
                            style={{padding: '1rem'}}>
                            <div>
                                No Benchmarks yet...
                            </div>
                        </li>
                    </ul>
                )}
                <div>{console.log(uxAttributes)}</div>
            </div>
            {creationSpace ? (
                <Row>
                    <Col lg={4} sm={6}>
                        <div>
                            <Form>
                                <Form.Group style={{marginTop: "2rem"}}>
                                    <Form.Label><strong>UX/Usability Attribute</strong></Form.Label>
                                    <Form.Select
                                        onChange={event => handleSelectUxBmCreate(event)}
                                        style={{borderRadius: '1.078rem'}}
                                    >
                                        {uxAttributes && uxAttributes.map((uxAttr, index) => (
                                            <option
                                                name="ux"
                                                value={uxAttr}
                                                key={`uxAttribute${index}`}
                                                selected={benchmark.ux === uxAttr}
                                            >{uxAttr}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group style={{marginTop: "1rem"}}>
                                    <Form.Label> <strong>Reference System Element</strong>
                                    </Form.Label>
                                    <Form.Select
                                        onChange={event => handleSelectRseBmCreate(event)}
                                        style={{borderRadius: '1.078rem'}}
                                    >
                                        {references && references.map((reference, index) => (
                                            <option
                                                name="rse"
                                                value={reference.rse}
                                                key={`rse${index}`}
                                                selected={benchmark.rse === reference.rproduct}
                                            >{reference.rproduct}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group style={{marginTop: "1rem"}}>
                                    <Form.Label>
                                        <strong>Note</strong>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        id="benchmarkTitle"
                                        name="note"
                                        value={benchmark.note}
                                        onChange={handleInputChange}
                                        style={{borderRadius: '1.078rem'}}
                                        autoComplete="off"
                                    />
                                </Form.Group>
                            </Form>
                            <div style={{display: "flex", justifyContent: "flex-start", marginTop: "1rem"}}>
                                <button className="btn btn-primary" onClick={handleCreate}
                                        style={{
                                            paddingLeft: '1.5rem',
                                            paddingRight: '1.5rem',
                                            marginRight: "1rem"
                                        }}>Save
                                </button>
                                <button className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    </Col>
                    <Col lg={4} sm={6}/>
                    <Col lg={4} sm={0}/>

                </Row>
            ) : (
                <div style={{display: "flex", justifyContent: "flex-start"}}>
                    <button className="btn btn-primary" onClick={handleAddBm}>Add Benchmark</button>
                </div>)}

        </div>);
}

export default Benchmarking;

const styles = {
    SortButton: {
        marginRight: '2rem',
    },

    FilterSortBtnContainer: {
        display: "flex",
        justifyContent: "left",
        paddingLeft: 0,
        paddingBottom: '1rem'
    },
    ListContainer: {
        marginBottom: '1rem',
        display: "flex",
        justifyContent: "center",
        maxHeight: '60vh',
        borderRadius: '1.078rem',
        padding: 0,

    },
    ListGroup: {
        borderRadius: '1em',
        overflow: 'scroll',
        maxHeight: '70vh',
        width: '100%',
    },
    ListItem: {
        borderLeft: 0,
        borderRight: 0
    },
    AddButton: {
        paddingLeft: '2rem',
        paddingRight: '2rem'
    },
    BtnContainer: {
        display: "flex",
        justifyContent: "space-around",
        marginBottom: '2rem'
    }
}