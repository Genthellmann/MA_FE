import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import FileReturn from "./FileReturn";
import TrendDataService from "../services/trend_service";
import FileUp from "./FileUp";
import {useParams} from "react-router-dom";
import http from "../http-common";
import {Image} from "react-bootstrap";


function FileEditExpl({props, ID, refID}) {
    const [edit, setEdit] = useState(false);

    //Convert to binary data string
    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    //===========================
    //Explanatory Picture Fetch
    //===========================
    const getOneExplPicture = id => {
        return http.get(`/explpicture/${refID}`)
    }

    //const [rpPictures, setRpPictures] = useState(null);
    const [explImgUrl, setExplImgUrl] = useState("");
    const [explPicType, setExplPicType] = useState("");
    // const reader = new FileReader();


    //html-request: fetch Reference Product Pictures
    React.useEffect(() => {
        getOneExplPicture(refID)
            .then(response => {
                console.log(response)
                //setRpPictures(response.data)
                const b64 = arrayBufferToBase64(response.data.data.data)
                setExplImgUrl(b64)
                setExplPicType(response.data.type)
            })
            .catch(e => {
                console.log(e);
            });
    }, [])


    const handleChange = () => {
        setEdit(true);
    }


    return (<div>
            {edit ? (
                <div>
                    <FileUp link={`http://localhost:3001/explpicture?trendID=${ID}&refID=${refID}`}
                            submitted={true}></FileUp>
                    {/*<Button onClick={() => setEdit(false)}>Cancel</Button>*/}
                </div>

            ) : (
                <div>
                    <Image src={`data:${explPicType}; base64,${explImgUrl}`}
                           className='rounded'
                           style={{'width': '100%'}}>
                    </Image>
                    <Button onClick={handleChange}>Edit</Button>
                </div>

            )} </div>
    );
}

export default FileEditExpl;