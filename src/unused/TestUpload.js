import React, {useState} from 'react';
import {Form} from "react-bootstrap";
import TrendDataService from "../services/trend_service";
import Button from "react-bootstrap/Button";

function TestUpload(props) {

    const [selectedFile, setSelectedFile] = useState(null);

    //On File Select
    const onFileChange = event => {
        setSelectedFile(event.target.files[0]);
        console.log(event)
    };

    //on file upload (click upload button)
    const onFileUpload = () => {
        //create an object of formData
        const formData = new FormData();

        console.log(selectedFile)

        //update the formData object
        formData.append(
            "myFile",
            selectedFile,
            selectedFile.name
        );
        console.log(selectedFile);
        TrendDataService.submitUpload(formData)
        console.log(formData)
    }

    React.useEffect(() => {
        console.log("selected File")
        console.log(selectedFile)
    }, [selectedFile])


    return (
        <Form.Group controlId="formFile">
            <Form.Label>Picture Upload</Form.Label>
            <Form.Control type="file" onChange={onFileChange}></Form.Control>
            <Button onClick={onFileUpload}>Upload</Button>
        </Form.Group>
    );
}

export default TestUpload;