import React, {useState} from 'react';
import LoginError from "../services/LoginError";
import {useNavigate, useParams} from "react-router-dom";
import {Alert, Image, Modal, Toast} from "react-bootstrap";
import TrendDataService from "../services/trend_service";
import NavBar2 from "./NavBar2";


//=========================
//change when switching host
//=========================

// const host = "http://localhost:3001"

const host = "https://api.ux-trendradar.de"


function FileEdit2({dest, trendID, refID, navigateTo}) {


    const navigate = useNavigate();


    //======================
    //Picture States
    //======================
    //Preview
    const [picture, setPicture] = useState(null);

    //Database
    const [imgData, setImgData] = useState(null);
    const [uploaded, setUploaded] = useState(false);

    //======================
    //Modal to check file type
    //======================
    var fileTypes = ['jpg', 'jpeg', 'png', '']
    const [isValid, setIsValid] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setIsValid(false);
        document.getElementById("input-files").value = null;
    }

    const handleShow = () => setShow(true);
    const handleValid = () => setIsValid(true);

    //======================
    //Picture Upload
    //======================

    const [info, setInfo] = useState("");

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

    const deletePicture = () => {
        TrendDataService.deleteRpPicture(refID)
            .then(response => {
                setUploaded(false)
                document.getElementById("input-files").value = null;
                setImgData(null);
                setPicture(null);
                setInfo("");
                setIsValid(false);
            })
            .catch(e => {
                console.log(e);
                LoginError(navigate, e);
            });
    }


    const handleSubmit = e => {
        setUploaded(true)
        // setInfo("File Uploaded successfully!")
        setShowUploaded(true)
        setIsValid(false)
        setTimeout(() => {
            navigate(navigateTo)
        }, "1750")
    }

    const handleCancel = () => {
        setUploaded(false)
        document.getElementById("input-files").value = null;
        setImgData(null);
        setPicture(null);
        setInfo("");
        setIsValid(false);
    }

    const [link, setLink] = useState("");

    React.useEffect(() => {
        switch (dest) {
            case "rppicture":
                setLink(host + `/rppicture?trendID=${trendID}&refID=${refID}`);
                break;
            case "explpicture":
                setLink(host + `/explpicture?trendID=${trendID}&refID=${refID}`);
                break;
            case "trendpicture":
                setLink(host + `/web/upload?trendID=${trendID}`);
                break;
        }

        console.log("dest: " + dest + ", trendID: " + trendID + ", refID: " + refID)
    }, [])

    React.useEffect(() => {
        console.log(link)
    }, [link])


    //======================
    //return current Picture
    //======================
    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    React.useEffect(() => {
        switch (dest) {
            case "rppicture":
                TrendDataService.getOneRpPicture(refID)
                    .then(response => {
                        console.log(response.data)
                        const picType = response.data.data.type;
                        const b64 = arrayBufferToBase64(response.data.data.data);
                        setImgData(`data:${picType};base64,${b64}`)
                    })
                    .catch(e => {
                        console.log(e);
                        setImgData(require("../images/img_placeholder.png"))
                    });
                break;
            case "explpicture":
                TrendDataService.getOneExplPicture(refID)
                    .then(response => {
                        const picType = response.data.data.type;
                        const b64 = arrayBufferToBase64(response.data.data.data);
                        setImgData(`data:${picType};base64,${b64}`)
                    })
                    .catch(e => {
                        console.log(e);
                        setImgData(require("../images/img_placeholder.png"))
                    });
                break;
            case "trendpicture":
                TrendDataService.getPicture(trendID)
                    .then(response => {
                        const picType = response.data[0].data.type;
                        const b64 = arrayBufferToBase64(response.data[0].data.data);
                        setImgData(`data:${picType};base64,${b64}`)
                    })
                    .catch(e => {
                        console.log(e);
                        setImgData(require("../images/img_placeholder.png"))
                    });
                break;


        }
    }, [])

    //=========================
    //Toast to show file upload completeted
    //=========================

    const [showUploaded, setShowUploaded] = useState(false);


    return (
        <div style={{width: '100%', display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
            <form
                id="fileUploadForm"
                action={link}
                target="file_upload"
                method="POST"
                encType="multipart/form-data"
                style={{width: '100%'}}
                onSubmit={handleSubmit}
            >
                <div className="form-group">
                    <input
                        // disabled={!submitted}
                        // id={ID}
                        type="file"
                        // name={ID}
                        name="file"
                        id="input-files"
                        className="form-control border"
                        style={{borderRadius: '1.078rem'}}
                        onChange={onChangePicture}
                        placeholder="ddd"
                    />
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Only Images allowed!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Please select .jpg, .jpeg or .png</Modal.Body>
                </Modal>
                <div style={{width: '100%'}}>
                    <Image src={imgData}
                           style={{width: '20rem', marginTop: '1rem', marginBottom: '1rem', borderRadius: "1.078rem"}}>

                    </Image>
                </div>
                <span></span>
                {/*<button type="submit" className="btn btn-primary"*/}
                {/*        disabled={!submitted}*/}
                {/*>Upload*/}
                {/*</button>*/}
                {/*<br/>*/}
                <iframe id="iFrameFileUpload" name="file_upload" hidden={true}></iframe>
                {/*<p>{info}</p>*/}
                <div style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    width: '50%',
                    marginTop: '2rem'
                }}>
                    <button type="submit" className="btn btn-success"
                        // disabled={!submitted}
                            style={{
                                paddingLeft: '1.5rem',
                                paddingRight: '1.5rem',
                                marginRight: '2rem'
                            }}
                            disabled={!show && !isValid}

                    >Upload
                    </button>
                    <button type="button" className="btn btn-danger"
                            onClick={handleCancel}
                        // disabled={!submitted}
                            style={{
                                paddingLeft: '1.5rem',
                                paddingRight: '1.5rem',
                                marginRight: '2rem'
                            }}
                            disabled={!show && !isValid}

                    >Cancel
                    </button>
                    {/*<button className="btn btn-danger" onClick={deletePicture}*/}
                    {/*        hidden={!uploaded}*/}
                    {/*>Delete*/}
                    {/*</button>*/}
                </div>

            </form>
            <Toast onClose={() => setShowUploaded(false)}
                   show={showUploaded}
                // delay={1000}
                // autohide
                   style={{
                       marginTop: "2rem",
                   }}
            >
                <Toast.Header>
                    <strong className="me-auto">File Upload</strong>
                </Toast.Header>
                <Toast.Body>Your file was uploaded successfully!</Toast.Body>
            </Toast>
        </div>
    );

}

export default FileEdit2;


const styles = {
    mainContainer: {
        borderRadius: 10,
        width: "100%",
        // height: "100%",
        backgroundColor: "white",
        paddingLeft: "10%"
    },
    FormContainer: {
        width: "70%",
        display: "flex",
        alignItems: "center",
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