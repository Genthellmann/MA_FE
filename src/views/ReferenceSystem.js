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


function ReferenceSystem() {
    const {trendID} = useParams();
    let navigate = useNavigate();

    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    const reader = new FileReader();

    //===========================
    //Reference Content Return
    //===========================
    const [references, setReferences] = useState(false);
    // const [rppictures, setRppictures] = useState(null);
    // const [explpictures, setExplpictures] = useState(null);

    React.useEffect(() => {
        TrendDataService.getReference(trendID)
            .then(response => {
                setReferences(response.data);
            })
            .catch(e => {
                LoginError(navigate, e)
            });
    }, [trendID])

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
                console.log(response)
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
                console.log(response)
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
            console.log(result)
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
            console.log(reference)
            const {id, trendID, rproduct, rsystemelements, usabilityattributes} = reference;
            return (
                <tr key={id}>
                    <td>{rproduct}</td>
                    {/*<td>{id}</td>*/}
                    <td>{isRpPicture(id)}</td>
                    <td>{rsystemelements}</td>
                    <td>{usabilityattributes}</td>
                    <td>{isExplPicture(id)}</td>
                    <td>
                        <DropdownButton id={`id:${id}`} title={""}>
                            <Dropdown.Item id={`Edit${id}`}
                                           eventKey={`Edit${id}`}
                            >
                                <Link to={`../../RS/edit/${id}`}
                                      style={{'color': 'white', textDecoration: 'none'}}> Edit </Link>
                            </Dropdown.Item>
                            <Dropdown.Item id={`Delete${id}`}
                                           eventKey={`Delete${id}`}
                                           onClick={handleDelete(reference)}>Delete</Dropdown.Item>
                        </DropdownButton>
                    </td>
                </tr>
            )
        })
    }

    //Rerender Table when picture fetching proceeds
    React.useRef(() => {
        renderTable();
    }, [rpPictures, explPictures])

    //===========================
    //Table Edit
    //===========================

    const handleEdit = () => {

    }

    const handleDelete = () => {

    }


    return (
        <div style={styles.mainContainer}>
            <Account/>
            <Sidebar/>
            <div>
                {references.length > 0 ? (
                    <div>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Reference Product</th>
                                <th>RP Pic Link</th>
                                <th>Reference System Elements</th>
                                <th>UX/Usability Attributes</th>
                                <th>Explanatory Picture or Drawing</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {renderTable()}
                            </tbody>
                        </Table>
                        <Button>
                            <Link to={"/RS/add/" + trendID}
                                  style={{'color': 'white', textDecoration: 'none'}}>Add</Link>
                        </Button>
                        {/*{rppictures.map()}*/}
                    </div>

                ) : (
                    <div>
                        <p>No References yet...</p>
                        <Button
                            onClick={() => navigate("/RS/add/" + trendID)}>Add</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReferenceSystem;

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
};