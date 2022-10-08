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

    //Convert to binary data string
    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    //const [rpPictures, setRpPictures] = useState(null);
    const [rpImgUrl, setRpImgUrl] = useState(false);
    const [rpPicType, setRpPicType] = useState(false);

    return (
        <div>
            <NavBar2/>
            <div style={styles.backgroundContainer}>
                <div style={styles.FormContainer}>
                    <div style={{display: "flex", width: '100%', marginBottom: "2rem"}}>
                        <button className="btn btn-secondary btn-sm"
                                onClick={() => {
                                    navigate(`../RS/edit/${trendID}/${refID}`, {replace: true})
                                }}
                        >back
                        </button>
                    </div>
                    <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
                        <h4>Step 2/3 - Reference Product Picture</h4>
                        <div style={{height: '3rem'}}></div>
                        <h6>Choose Reference Product Picture</h6>
                        <div style={{width: '100%', display: "flex"}}>
                            <FileEdit2 refID={refID} trendID={trendID} dest="rppicture"
                                       navigateTo={`../RS/edit/page3/${trendID}/${refID}`}></FileEdit2>
                            <div style={{marginLeft: "2rem"}}>
                                <button className="btn btn-secondary"
                                        onClick={() => navigate(`../RS/edit/page3/${trendID}/${refID}`, {replace: true})}
                                        style={{
                                            paddingLeft: "1.5rem",
                                            paddingRight: "1.5rem",
                                            marginRight: "2rem"
                                        }}>Skip
                                </button>
                            </div>
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