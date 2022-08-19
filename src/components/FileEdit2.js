import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import FileReturn from "./FileReturn";
import TrendDataService from "../services/trend_service";
import FileUp from "./FileUp";
import {useParams} from "react-router-dom";
import http from "../http-common";


function FileEdit({props, ID}) {
    const [edit, setEdit] = useState(false);
    const {refID} = useParams();

    //===========================
    //Reference Product Picture Fetch
    //===========================
    const getOneRpPicture = id => {
        return http.get(`/rppicture/${refID}`)
    }

    const [rpPictures, setRpPictures] = useState(null);
    const [rpImgUrl, setRpImgUrl] = useState("");
    const [rpPicType, setRpPicType] = useState("");
    // const reader = new FileReader();


    //html-request: fetch Reference Product Pictures
    React.useEffect(() => {
        getOneRpPicture(refID)
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
    }, [refID])

    //===========================
    //Explanatory Picture Fetch
    //===========================
    const getOneExplPicture = id => {
        return http.get(`/explpicture/${refID}`)
    }

    const [explPictures, setExplPictures] = useState(null);
    const [explImgUrl, setExplImgUrl] = useState("");
    const [explPicType, setExplPicType] = useState("");
    //const reader = new FileReader();


    //html-request: fetch Reference Product Pictures
    React.useEffect(() => {
        getOneExplPicture(refID)
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
    }, [refID])

    const handleChange = () => {
        setEdit(true);
    }


    return (<div>
            {edit ? (
                <div>
                    <FileUp link={`http://localhost:3001/rppicture?trendID=${ID}&refID=${refID}`}
                            submitted={true}></FileUp>
                </div>

            ) : (
                <div>
                    <FileReturn id={ID}></FileReturn>
                    <Button onClick={handleChange}>Edit</Button>
                </div>

            )} </div>
    );
}

export default FileEdit;