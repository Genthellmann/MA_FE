import React, {useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import Account from "./Account";
import Sidebar from "../components/Sidebar";
import TrendDataService from "../services/trend_service";
import LoginError from "../services/LoginError";
import {Col, DropdownButton, Image, Row, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import http from "../http-common";
import NavBar2 from "../components/NavBar2";
import {BsFillCaretDownFill, BsFillCaretUpFill, BsThreeDotsVertical} from 'react-icons/bs'
import Benchmarking from "../components/Benchmarking";
import {AiOutlineArrowRight} from "react-icons/ai";
import Actions from "../components/Actions";


function ReferenceSystem() {
    const {trendID} = useParams();
    let navigate = useNavigate();


    //===========================
    //Trend and Reference Content Return
    //===========================
    const [currentTrend, setCurrentTrend] = useState("");
    const [references, setReferences] = useState(false);
    const [numberReferences, setNumberReferences] = useState(0);
    // const [rppictures, setRppictures] = useState(null);
    // const [explpictures, setExplpictures] = useState(null);

    React.useEffect(() => {
        TrendDataService.get(trendID)
            .then(response => {
                setCurrentTrend(response.data)
            })
            .catch(e => {
                LoginError(navigate, e)
            })
        TrendDataService.getReference(trendID)
            .then(response => {
                console.log(response.data)
                // const res_toString = response.data;
                // for (let i = 0; i < response.data.length; i++) {
                //     res_toString[i].usabilityattributes = JSON.parse(res_toString[i].usabilityattributes)
                // }
                setReferences(response.data);
                setNumberReferences(response.data.length)
            })
            .catch(e => {
                console.log(e)
                LoginError(navigate, e)
            });
    }, [trendID])


    //Sort references by priority
    function ByPrio(a, b) {
        const prioA = a.prior;
        const prioB = b.prior;

        if (prioA < prioB) {
            return -1;
        }
        if (prioA > prioB) {
            return 1;
        }
        // prio is equal (can happen if newly added)
        return 0;
    };


    //===========================
    //For Picture Fetch
    //===========================
    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    const reader = new FileReader();

    //===========================
    //Reference Product Picture Fetch
    //===========================
    const getRpPicture = id => {
        return http.get(`/rppicture?trendID=${id}`)
    }

    const [rpPictures, setRpPictures] = useState(null);
    const [rpImgUrl, setRpImgUrl] = useState("");
    const [rpPicType, setRpPicType] = useState("");
    // const reader = new FileReader();


    //html-request: fetch Reference Product Pictures
    React.useEffect(() => {
        getRpPicture(trendID)
            .then(response => {
                setRpPictures(response.data)
                // const b64 = arrayBufferToBase64(response.data[0].data.data)
                // setRpImgUrl(b64)
                // setRpPicType(response.data[0].data.type)
            })
            .catch(e => {
                console.log(e);
            });
    }, [trendID])

    //===========================
    //Explanatory Picture Fetch
    //===========================
    const getExplPicture = id => {
        return http.get(`/explpicture?trendID=${id}`)
    }

    const [explPictures, setExplPictures] = useState(null);
    const [explImgUrl, setExplImgUrl] = useState("");
    const [explPicType, setExplPicType] = useState("");
    //const reader = new FileReader();


    //html-request: fetch Reference Product Pictures
    React.useEffect(() => {
        getExplPicture(trendID)
            .then(response => {
                setExplPictures(response.data)
                // const b64 = arrayBufferToBase64(response.data[0].data.data)
                // setExplImgUrl(b64)
                // setExplPicType(response.data[0].data.type)
            })
            .catch(e => {
                console.log(e);
            });
    }, [trendID])


    //find respective picture for reference in returned picture Object
    function isRpPicture(searchID) {

        if (rpPictures) {
            let result = rpPictures.find(({refID}) => refID === searchID);
            if (result !== undefined) {
                let b64 = arrayBufferToBase64(result.data.data)
                let type = result.data.type
                return (
                    <Image src={`data:${type}; base64,${b64}`}
                           style={styles.tableImg}>
                    </Image>)
            } else {
                return (<div>no Image</div>)
            }
        } else {
            return (
                <div>loading...</div>
            )
        }
    }

    //find respective picture for reference in returned picture Object
    function isExplPicture(searchID) {
        if (explPictures) {
            let result = explPictures.find(({refID}) => refID === searchID);
            if (result !== undefined) {
                let result = explPictures.find(({refID}) => refID === searchID);
                let b64 = arrayBufferToBase64(result.data.data)
                let type = result.data.type
                return (
                    <Image src={`data:${type}; base64,${b64}`}
                           style={styles.tableImg}>
                    </Image>)
            } else {
                return (<div>no Image</div>)
            }
        } else {
            return (
                <div>loading...</div>
            )
        }
    }

    //===========================
    //Render Table
    //===========================

    //Render Table
    const renderTable = () => {
        return (references && references.sort((a, b) => ByPrio(a, b)).map((reference, index) => {
                const {id, trendID, rproduct, rsystemelements, usabilityattributes} = reference;
                return (
                    <tr key={id}>
                        <td>{isRpPicture(id)}<br/>
                            <strong>{rproduct}</strong>
                        </td>
                        <td>{rsystemelements}</td>
                        <td>
                            <ul>
                                {reference.usabilityattributes && reference.usabilityattributes.map((ua, index) => (
                                    <li style={styles.attList} key={`ua${index}`}>
                                    <span>
                                        <strong>{`${ua.feature}: `}</strong>
                                        {ua.expression}
                                    </span>
                                    </li>
                                ))}

                            </ul>
                        </td>
                        <td>{isExplPicture(id)}</td>
                        <td>
                            <div style={{display: "flex",}}>
                                <button className="btn btn-secondary"
                                        onClick={e => incrPrior(e, index, reference)}
                                        name="up"
                                        id={`up${reference.id}`}
                                        style={{padding: "0.5rem", width: "3rem", height: "3rem"}}
                                >
                                    <BsFillCaretUpFill></BsFillCaretUpFill>
                                </button>
                                <button className="btn btn-secondary"
                                        onClick={e => decrPrior(e, index, reference)}
                                        name="down"
                                        id={`down${reference.id}`}
                                        style={{padding: "0.5rem", width: "3rem", height: "3rem"}}
                                >
                                    <BsFillCaretDownFill></BsFillCaretDownFill>
                                </button>
                            </div>
                        </td>
                        <td>
                            <Dropdown id={`id:${id}`} title={""}>
                                <Dropdown.Toggle
                                    style={{padding: "0.5rem", width: "3rem", height: "3rem"}}>
                                    <BsThreeDotsVertical/>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item id={`EditContent${id}`}
                                                   eventKey={`EditContent${id}`}
                                                   href={`../../RS/edit/${trendID}/${id}`}
                                    >Edit Content</Dropdown.Item>
                                    <Dropdown.Item id={`EditRp${id}`}
                                                   eventKey={`EditRp${id}`}
                                                   href={`../../RS/edit/rppicture/${trendID}/${id}`}
                                    >Edit Reference Picture</Dropdown.Item>
                                    <Dropdown.Item id={`EditExpl${id}`}
                                                   eventKey={`EditExpl${id}`}
                                                   href={`../../RS/edit/explpicture/${trendID}/${id}`}
                                    >Edit Explanatory Picture</Dropdown.Item>
                                    <Dropdown.Item id={id}
                                                   eventKey={`${id}`}
                                                   onClick={handleDelete}>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                )
            })
        );
    }

    // //Rerender Table when picture fetching proceeds
    // React.useRef(() => {
    //     renderTable();
    // }, [rpPictures, explPictures])

    //===========================
    //Reference Delete
    //===========================

    const handleDelete = e => {

        const refID = e.currentTarget.id
        TrendDataService.deleteReference(refID)
            .then(response => {
                console.log(response.data)
            })
            .catch(e => {
                LoginError(navigate, e)
            });

        TrendDataService.deleteRpPicture(refID)
            .then(response => {
                console.log(response.data)
            })
            .catch(e => {
                LoginError(navigate, e)
            });

        TrendDataService.deleteExplPicture(refID)
            .then(response => {
                console.log(response.data)
            })
            .catch(e => {
                LoginError(navigate, e)
            });
        window.location.reload();
    }

    //===========================
    //Reference Change Priority
    //===========================
    const initialReferenceState = {
        id: null,
        trendID: "",
        rproduct: "",
        rsystemelements: "",
        usabilityattributes: "",
        prior: -1,
    }

    const [currentReference, setCurrentReference] = useState(initialReferenceState);

    //Increase Priority
    const incrPrior = (event, index, reference) => {
        const {name, id} = event.target;
        console.log("id: " + id)
        console.log("name" + name)
        let referenceCopy = structuredClone(reference);
        console.log("index: " + index)
        console.log("prior: " + referenceCopy.prior)

        if (index > 0) {
            console.log("Up")
            let referenceElbefore = structuredClone(references[index - 1]);
            referenceElbefore.prior = index;
            referenceCopy.prior = index - 1;
            updatePriorElement(referenceCopy);
            updatePriorElPredSuc(referenceElbefore);
        }
    }

    //Decrease Priority
    const decrPrior = (event, index, reference) => {
        const {name, id} = event.target;
        console.log("id: " + id)
        console.log("name" + name)
        let referenceCopy = structuredClone(reference);
        console.log("index: " + index)
        console.log("prior: " + referenceCopy.prior)

        if (index < (numberReferences - 1)) {
            console.log("down")
            let referenceElafter = structuredClone(references[index + 1]);
            referenceElafter.prior = index;
            referenceCopy.prior = index + 1;
            updatePriorElement(referenceCopy);
            updatePriorElPredSuc(referenceElafter);
        }
    }

    //===========================
    //update Reference
    //===========================

    const updatePriorElement = ref => {
        TrendDataService.updateReference(ref)
            .then(response => {
                console.log(response)
            })
            .catch(e => {
                console.log(e);
                LoginError(navigate, e)
            });
    };

    const updatePriorElPredSuc = ref => {
        TrendDataService.updateReference(ref)
            .then(response => {
                console.log(response)
                retrieveReferencesafterPrioUpdate()
            })
            .catch(e => {
                console.log(e);
                LoginError(navigate, e)
            });
    };

    const retrieveReferencesafterPrioUpdate = () => {
        TrendDataService.getReference(trendID)
            .then(response => {
                console.log(response.data)
                setReferences(response.data);
                setNumberReferences(response.data.length)
            })
            .catch(e => {
                console.log(e)
                LoginError(navigate, e)
            });
    }

    return (
        <div>
            <NavBar2/>
            <div style={styles.backgroundContainer}>
                <Row>
                    <Col>
                        <h1>{currentTrend.title}</h1>
                        <h5>{`Probability of Occurence: ${currentTrend.probability}, 
                                 Maturity: ${currentTrend.maturity}, 
                                 Impact: ${currentTrend.impact}`}</h5>
                        <div>
                            {references.length > 0 ? (
                                <div>
                                    <div className="card" style={styles.TableStyle}>
                                        <Table striped="columns" hover responsive="sm">
                                            <thead>
                                            <tr>
                                                <th>Reference Product</th>
                                                <th>Reference System Elements</th>
                                                <th>UX/Usability Attributes</th>
                                                <th>Explanatory Picture</th>
                                                <th>Priority</th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {renderTable()}
                                            </tbody>
                                        </Table>
                                    </div>
                                    <Button
                                        onClick={() => navigate("/RS/add/" + trendID)}
                                        style={styles.AddButton}
                                    >Add Reference</Button>
                                </div>

                            ) : (
                                <div>
                                    <div style={{fontStyle: "italic"}}>
                                        no references yet...
                                    </div>
                                    <Button
                                        onClick={() => navigate("/RS/add/" + trendID)}
                                        style={styles.AddButton}>Add Reference
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Benchmarking></Benchmarking>
                    </Col>
                </Row>
                <Row>
                    <Col xl={9} sm={0}></Col>
                    <Col xl={3}>

                        <Actions Trend="true" BS="true"></Actions>
                    </Col>
                </Row>
            </div>
        </div>
    );
};


export default ReferenceSystem;

const styles = {
    backgroundContainer: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        paddingLeft: '1vw',
        paddingRight: '1vw',
        paddingTop: '2vw',
        paddingBottom: '2vw'
    },
    RowStyle: {
        margin: 0
    },
    ColStyle: {
        padding: 0
    },
    TableStyle: {
        borderRadius: '1.078rem',
        overflow: 'scroll',
        minHeight: '20rem',
        maxHeight: "80vh"
    },
    AddButton: {
        marginTop: '1rem'
    },
    tableImg: {
        maxWidth: '20vw',
        maxHeight: '20vh',
        borderRadius: '1.078rem',
        marginBottom: '0.5rem'
    },
    attList: {},
    actionBtn: {
        width: '18rem',
        display: "flex",
        justifyContent: "center",
        marginBottom: '1rem'
    }
}