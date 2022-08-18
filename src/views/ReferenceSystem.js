import React, {useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import Account from "./Account";
import Sidebar from "../components/Sidebar";
import TrendDataService from "../services/trend_service";
import LoginError from "../services/LoginError";
import {Image, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import RpPicFileReturn from "../components/RpPicFileReturn";
import http from "../http-common";


function ReferenceSystem() {
    const {id} = useParams();
    let navigate = useNavigate();

    //===========================
    //Reference Content Return
    //===========================
    const [references, setReferences] = useState(false);
    // const [rppictures, setRppictures] = useState(null);
    // const [explpictures, setExplpictures] = useState(null);

    React.useEffect(() => {
        TrendDataService.getReference(id)
            .then(response => {
                setReferences(response.data);
            })
            .catch(e => {
                LoginError(navigate, e)
            });
    }, [id])

    //===========================
    //Reference Product Picture Return
    //===========================
    const getPicture = id => {
        return http.get(`/rppicture?trendID=${id}`)
    }

    const [rppictures, setrppictures] = useState(null);
    const [imgUrl, setImgUrl] = useState("");
    const [picType, setPicType] = useState("");
    const reader = new FileReader();

    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    React.useEffect(() => {
        getPicture(id)
            .then(response => {
                console.log(response)
                setrppictures(response.data)
                const b64 = arrayBufferToBase64(response.data[0].data.data)
                setImgUrl(b64)
                setPicType(response.data[0].data.type)
            })
            .catch(e => {
                console.log(e);
            });
    }, [id])


    const renderTable = () => {
        return references.map((reference, index) => {
            const {id, rproduct, rsystemelements, usabilityattributes} = reference;
            return (
                <tr key={id}>
                    <td>{rproduct}</td>
                    {/*<td>{id}</td>*/}
                    <td>{isRpPicture(id)}</td>
                    <td>{rsystemelements}</td>
                    <td>{usabilityattributes}</td>
                </tr>
            )
        })
    }

    function isRpPicture(searchID) {
        console.log("Search Id")
        console.log(searchID)

        let result = rppictures.find(({id}) => id === 6);
        console.log(result)
        // const b64 = arrayBufferToBase64(response.data[0].data.data)
        return (
            <Image src={`data:${picType}; base64,${imgUrl}`}
                   className='rounded'
                   style={{'width': '100%'}}>

            </Image>)
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
                            </tr>
                            </thead>
                            <tbody>
                            {renderTable()}
                            </tbody>
                        </Table>
                        <Button>
                            <Link to={"/RS/add/" + id} style={{'color': 'white', textDecoration: 'none'}}>Add</Link>
                        </Button>
                        {/*{rppictures.map()}*/}
                    </div>

                ) : (
                    <div>
                        <p>No References yet...</p>
                        <Button
                            onClick={() => navigate("/RS/add/" + id)}>Add</Button>
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