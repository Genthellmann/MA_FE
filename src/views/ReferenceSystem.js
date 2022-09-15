import React, {useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import Account from "./Account";
import Sidebar from "../components/Sidebar";
import TrendDataService from "../services/trend_service";
import LoginError from "../services/LoginError";
import {DropdownButton, Image, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import http from "../http-common";
import NavBar2 from "../components/NavBar2";


function ReferenceSystem() {
    const {trendID} = useParams();
    let navigate = useNavigate();


    //===========================
    //Trend and Reference Content Return
    //===========================
    const [currentTrend, setCurrentTrend] = useState("");
    const [references, setReferences] = useState(false);
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
                setReferences(response.data);
            })
            .catch(e => {
                LoginError(navigate, e)
            });
    }, [trendID])


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
                           className='rounded'
                           style={{'width': '100%'}}>
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
                           className='rounded'
                           style={{'width': '100%'}}>
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
        return references.map((reference, index) => {
            const {id, trendID, rproduct, rsystemelements, usabilityattributes} = reference;
            return (
                <tr key={id}>
                    <td>{rproduct}{isRpPicture(id)}</td>
                    <td>{rsystemelements}</td>
                    <td>{usabilityattributes}</td>
                    <td>{isExplPicture(id)}</td>
                    <td>
                        <DropdownButton id={`id:${id}`} title={""}>
                            <Dropdown.Item id={`EditContent${id}`}
                                           eventKey={`EditContent${id}`}
                                           href={`../../RS/edit/${id}`}
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
                        </DropdownButton>
                    </td>
                </tr>
            )
        })
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


    return (
        <div>
            <NavBar2/>
            <div style={styles.backgroundContainer}>
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
                            >Add</Button>
                        </div>

                    ) : (
                        <div>
                            <p>No References yet...</p>
                            <Button
                                onClick={() => navigate("/RS/add/" + trendID)}
                                style={styles.AddButton}>Add</Button>
                        </div>
                    )}
                </div>
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
        minHeight: '25vh'
    },
    AddButton: {
        marginTop: '1rem'
    }
}