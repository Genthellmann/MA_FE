import React from 'react';
import http from "../http-common";
import FileUp from "./FileUp";
import {Image} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useState} from 'react'
import {useParams} from "react-router-dom";
import FileReturn from "./FileReturn";

//===========================
//Change this when host switches
//===========================

const link = "http://localhost:3001/"

// const link = "https://ux-trendradar.de"

function FileEditTrend({ID, show, setShow, isValid, setIsValid}) {
    const [edit, setEdit] = useState(false);
    const {id} = useParams();

    //Convert to binary data string
    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    //===========================
    //Trend  Picture Fetch
    //===========================
    const getOneTrendPicture = id => {
        return http.get(`/web/upload?trendID=${ID}`)
    }

    //const [rpPictures, setRpPictures] = useState(null);
    const [rpImgUrl, setRpImgUrl] = useState("");
    const [rpPicType, setRpPicType] = useState("");
    // const reader = new FileReader();


    //html-request: fetch Reference Product Pictures
    React.useEffect(() => {
        getOneTrendPicture(ID)
            .then(response => {
                console.log(response)
                //setRpPictures(response.data)
                const b64 = arrayBufferToBase64(response.data.data.data)
                setRpImgUrl(b64)
                setRpPicType(response.data.type)
            })
            .catch(e => {
                console.log(e);
            });
    }, [])


    const handleChange = () => {
        setEdit(true);
    }


    return (
        <div>
            {edit ? (
                <div>
                    <FileUp link={link + `web/upload?trendID=${id}`}
                            submitted={true} isValid={isValid} setIsValid={setIsValid} show={show}
                            setShow={setShow}></FileUp>
                    {/*<Button onClick={() => setEdit(false)}>Cancel</Button>*/}
                </div>
            ) : (
                <div style={{display: "flex", alignItems: "flex-start"}}>
                    <FileReturn id={id}></FileReturn>
                    <Button onClick={handleChange} style={{marginLeft: '2rem'}}>Edit</Button>
                </div>

            )}
        </div>
    );
}

export default FileEditTrend;