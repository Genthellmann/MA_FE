import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import NavBar2 from "../components/NavBar2";
import FileUpload from "../components/FileUpload";
import {useEffect, useState} from "react";
import TrendDataService from "../services/trend_service";
import LoginError from "../services/LoginError";
import http from "../http-common";
import FileEdit2 from "../components/FileEdit2";

function ReferenceEditRp(props) {

    const navigate = useNavigate();
    const {trendID, refID, dest} = useParams();

    // const initialReferenceState = {
    //     id: null,
    //     trendID: "",
    //     rproduct: "",
    //     rsystemelements: "",
    //     usabilityattributes: "",
    // }
    //
    // const [currentReference, setCurrentReference] = useState(initialReferenceState);
    // const [prevReferenceConfig, setPrevReferenceConfig] = useState(initialReferenceState);
    //
    // const getReference = refID => {
    //     TrendDataService.getOneReference(refID)
    //         .then(response => {
    //             setCurrentReference(response.data);
    //             setPrevReferenceConfig(response.data);
    //             console.log(response.data)
    //         })
    //         .catch(e => {
    //             console.log(e);
    //             LoginError(navigate, e)
    //         })
    // };

    //Convert to binary data string
    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    // //===========================
    // //Reference Product Picture Fetch
    // //===========================
    // const getOneRpPicture = () => {
    //     return http.get(`/rppicture/${refID}`)
    // }

    //const [rpPictures, setRpPictures] = useState(null);
    const [rpImgUrl, setRpImgUrl] = useState(false);
    const [rpPicType, setRpPicType] = useState(false);
    // const reader = new FileReader();


    // //html-request: fetch Reference Product Pictures
    // React.useEffect(() => {
    //     console.log(refID)
    //     getOneRpPicture(refID)
    //         .then(response => {
    //             console.log(response)
    //             //setRpPictures(response.data)
    //             const b64 = arrayBufferToBase64(response.data.data.data)
    //             setRpImgUrl(b64)
    //             setRpPicType(response.data.type)
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // }, [])
    //
    //
    // useEffect(() => {
    //     if (refID)
    //         getReference(refID);
    // }, [refID]);


    return (
        <div>
            <NavBar2/>
            <div style={styles.backgroundContainer}>
                <div style={styles.FormContainer}>
                    <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
                        <h4>Edit Reference Product Picture</h4>
                        <div style={{height: '3rem'}}></div>
                        <h6>Choose Reference Product Picture</h6>
                    </div>
                    <div style={{width: '100%', display: "flex"}}>
                        <FileEdit2 trendID={trendID} refID={refID} dest="explpicture"
                                   navigateTo={`../RS/${trendID}`}
                        ></FileEdit2>
                        <div style={{marginLeft: "2rem"}}>
                            <button className="btn btn-secondary"
                                    onClick={() => navigate(`../RS/${trendID}`, {replace: true})}
                                    style={{
                                        paddingLeft: "1.5rem",
                                        paddingRight: "1.5rem",
                                        marginRight: "2rem"
                                    }}>Done
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReferenceEditRp;

const styles = {
    mainContainer: {
        borderRadius: 10,
        width: "100%",
        // height: "100%",
        backgroundColor: "white",
        paddingLeft: "10%"
    },
    FormContainer: {
        width: "60%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
    backgroundContainer: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        paddingLeft: '1vw',
        paddingRight: '1vw',
        paddingTop: '2vw',
        display: 'flex',
        justifyContent: 'center'
    },
    RowStyle: {
        margin: 0
    },
    ColStyle: {
        padding: 0
    },
    PictureEdit: {
        width: '50%'
    }
}