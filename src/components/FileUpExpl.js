import React, {useState} from 'react';
import LoginError from "../services/LoginError";
import {useNavigate} from "react-router-dom";
import {Modal} from "react-bootstrap";


function FileUpExpl({link, submitted, show, setShow, isValid, setIsValid, target}) {
    const navigate = useNavigate();

    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    const [uploaded, setUploaded] = useState(false);

    // const onChangePicture = e => {
    //     if (e.target.files[0]) {
    //         console.log("picture: ", e.target.files);
    //         setPicture(e.target.files[0]);
    //         const reader = new FileReader();
    //         reader.addEventListener("load", () => {
    //             setImgData(reader.result);
    //         });
    //         reader.readAsDataURL(e.target.files[0]);
    //     }
    // }

    //======================
    //Modal to check file type
    //======================
    var fileTypes = ['jpg', 'jpeg', 'png', '']

    const onChangePicture = e => {
        if (e.target.files[0]) {
            var extension = e.target.files[0].name.split('.').pop().toLowerCase()  //file extension from input file
            var isSuccess = fileTypes.indexOf(extension) > -1;  //is extension in acceptable types
            console.log("picture: ", e.target.files);
            if (isSuccess) {
                handleValid();
                setPicture(e.target.files[0]);
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                    setImgData(reader.result);
                });
                reader.readAsDataURL(e.target.files[0]);
            } else {
                handleShow()
                setImgData(null);
                setPicture(null);
            }
        }
    }


    const handleClose = () => {
        setShow(false);
        setIsValid(false);
        document.getElementById("input-files").value = null;

    }

    const handleShow = () => setShow(true);
    const handleValid = () => setIsValid(true);

    const handleSubmit = () => {
        navigate(target);
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
                onSubmit={handleSubmit}
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
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Only Images allowed!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Please select .jpg, .jpeg or .png</Modal.Body>
                </Modal>
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