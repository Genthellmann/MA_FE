import React, {useState} from 'react';
import LoginError from "../services/LoginError";
import {useNavigate} from "react-router-dom";


function FileUpExpl({link, submitted}) {
    const navigate = useNavigate();

    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    const [uploaded, setUploaded] = useState(false);

    const onChangePicture = e => {
        if (e.target.files[0]) {
            console.log("picture: ", e.target.files);
            setPicture(e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    }


    // const submitForm = (event) => {
    //     event.default
    //         .then(response => {
    //             console.log(response)
    //         })
    //     setUploaded(true)
    //         .catch(e => {
    //             console.log(e);
    //             console.log("add trend: " + e.response.status);
    //             LoginError(navigate, e)
    //         });
    // };

    // document.forms["fileUploadForm"].addEventListener("submit", async (event) => {
    //     event.preventDefault();
    //     const resp = await fetch(event.target.action, {
    //         method: "POST",
    //         body: new URLSearchParams(new FormData(event.target)),
    //     });
    //     const body = await resp.json();
    //     console.log(body);
    // });

    // function logSubmit(event) {
    //     console.log(event)
    //     setUploaded(true)
    //     event.preventDefault();
    // }
    //
    // let form = document.getElementById('fileUploadForm');
    // if (form) {
    //     form.addEventListener('submit', logSubmit)
    // }


    const url = link;
    return (
        <div style={{width: '100%'}}>
            <form
                id="fileUploadFormExpl"
                action={url}
                target="file_upload"
                method="POST"
                encType="multipart/form-data"
                style={{width: '100%'}}
            >
                <div className="form-group">
                    <input
                        disabled={!submitted}
                        id={`ExplPicture+${url}`}
                        type="file"
                        // name={ID}
                        name="file"
                        className="form-control border"
                        style={{borderRadius: '1.078rem'}}
                        onChange={onChangePicture}
                    />
                </div>
                <div style={{width: '100%'}}>
                    <img className="rounded" src={imgData}
                         style={{width: '100%', marginTop: '1rem', marginBottom: '1rem'}}></img>
                </div>
                {/*<button type="submit" className="btn btn-primary"*/}
                {/*        disabled={!submitted}*/}
                {/*>Upload*/}
                {/*</button>*/}
                <br/>

                <iframe name="file_upload"></iframe>
            </form>
        </div>
    );

}

export default FileUpExpl;