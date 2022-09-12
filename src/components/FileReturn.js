import React, {useState, memo} from 'react';
import TrendDataService from "../services/trend_service";
import {Image} from "react-bootstrap";

const FileReturn = memo((id) => {
    console.log("FileReturn ID")
    console.log(id)

    const [imgUrl, setImgUrl] = useState("");
    const [picType, setPicType] = useState("");
    const reader = new FileReader();

    const [src, setSrc] = useState("");


    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    React.useEffect(() => {
        TrendDataService.getPicture(id.id)
            .then(response => {
                console.log(response);

                const picType = response.data[0].data.type;
                const b64 = arrayBufferToBase64(response.data[0].data.data);
                setSrc(`data:${picType};base64,${b64}`)


                // const b64 = arrayBufferToBase64(response.data[0].data.data)
                // setImgUrl(b64)
                // setPicType(response.data[0].data.type)


            })
            .catch(e => {
                console.log(e);
                setSrc(require("../images/img_placeholder.png"))
            });
    }, [id])

    return (
        <Image src={src}
               className='rounded'
               style={{'width': '100%'}}>
        </Image>
        // <Image src={`data:${picType};base64,${imgUrl}`}
        //        className='rounded'
        //        style={{'width': '100%'}}>
        // </Image>
    );
})

export default FileReturn;