import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import FileReturn from "./FileReturn";
import TrendDataService from "../services/trend_service";
import FileUp from "./FileUp";
import {useParams} from "react-router-dom";
import http from "../http-common";
import {Image} from "react-bootstrap";


function FileEditRp({props, ID, refID}) {
    const [edit, setEdit] = useState(false);

    //Convert to binary data string
    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    //===========================
    //Reference Product Picture Fetch
    //===========================
    const getOneRpPicture = id => {
        return http.get(`/rppicture/${refID}`)
    }

    //const [rpPictures, setRpPictures] = useState(null);
    const [rpImgUrl, setRpImgUrl] = useState(false);
    const [rpPicType, setRpPicType] = useState(false);
    // const reader = new FileReader();


    //html-request: fetch Reference Product Pictures
    React.useEffect(() => {
        getOneRpPicture(refID)
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


    return (<div>
            {edit ? (
                <div>
                    <FileUp link={`http://localhost:3001/rppicture?trendID=${ID}&refID=${refID}`}
                            submitted={true}></FileUp>
                    {/*<Button onClick={() => setEdit(false)}>Cancel</Button>*/}
                </div>

            ) : (<div>
                    {rpPicType ? (
                        <div style={{display: "flex", alignItems: "flex-start", justifyContent: "space-between"}}>
                            <Image src={`data:${rpPicType}; base64,${rpImgUrl}`}
                                   className='rounded'
                                   style={{'width': '70%'}}>
                            </Image>
                            <Button onClick={handleChange}>Edit</Button>
                        </div>
                    ) : (
                        <div style={{display: "flex", alignItems: "flex-start", justifyContent: "space-between"}}>
                            <Image src={require("../images/img_placeholder.png")}
                                   style={{'width': '50%'}}>
                            </Image>
                            <Button onClick={handleChange}>Edit</Button>
                        </div>
                    )
                    }
                </div>


            )} </div>
    );
}

export default FileEditRp;