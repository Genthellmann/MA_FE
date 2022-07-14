import React, {useState, memo} from 'react';
import TrendDataService from "../services/trend_service";
import {Image} from "react-bootstrap";

const FileReturn = memo((id) => {
    console.log("FileReturn ID")
    console.log(id)

    const [imgUrl, setImgUrl] = useState("");
    const [picType, setPicType] = useState("");
    const reader = new FileReader();

    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    //useEffect renders component only once, when site is loaded if dependencies are empty
    React.useEffect(() => {
        TrendDataService.getPicture(id.id)
            .then(response => {
                console.log(response)
                const b64 = arrayBufferToBase64(response.data[0].data.data)
                setImgUrl(b64)
                setPicType(response.data[0].data.type)


            })
            .catch(e => {
                console.log(e);
            });
    }, [id])

    return (
        <Image src={`data:${picType}; base64,${imgUrl}`}
               className='rounded'
               style={{'width': '100%'}}></Image>
    );
})

export default FileReturn;