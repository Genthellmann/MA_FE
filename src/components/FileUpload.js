import React, {useState} from 'react';
import axios from "axios";
import TrendDataService from "../services/trend_service";
import Button from "react-bootstrap/Button";

function FileUpload({currentTrend, setCurrentTrend}) {
    const initialTrendState = {
        id: null,
        title: "",
        description: "",
        implication: "",
        category: "",
        picture: null,
        xpos: 0,
        ypos:0,
    };

    //select the file
    const [selectedFile, setselectedFile] = useState(null);
    // const [currentTrend, setCurrentTrend] = useState(initialTrendState);

    //On file select (from pop up)
    const onFileChange = event => {
        //Update state
        setselectedFile(event.target.files[0])
    }

    function loadXHR(file){
        return new Promise(function(resolve, reject) {
            try {
                var xhr = new XMLHttpRequest();
                //xhr.open("GET", url);
                xhr.open(selectedFile);

                xhr.responseType = "blob";
                xhr.onerror = function() {reject("Network error.")};
                xhr.onload = function() {
                    if (xhr.status === 200) {resolve(xhr.response)}
                    else {reject("Loading error:" + xhr.statusText)}
                };
                xhr.send();
            }
            catch(err) {reject(err.message)}
        });
    }




    //On file upload (click upload button)
    const onFileUpload = () => {
        //create new object of formData
        const formData = new FormData();

        //Update formData object
        // formData.append("picture", selectedFile);


        // const handleDropChange = event => {
        //     const {name,value} = event.target;
        //     setCurrentTrend({...currentTrend,["picture"]:value});
        //     console.log({...currentTrend,["picture"]:value})
        // }


        setCurrentTrend({...currentTrend, ["picture"]: selectedFile.data});
        console.log(selectedFile.data)
        //console.log({...currentTrend, ["picture"]: loadXHR(selectedFile)})

        //Details of the uploaded file
        console.log("Uploaded File" + selectedFile);
        console.log(currentTrend.picture)

        //Request to backend-API
        // const uploadFile = () => {
        TrendDataService.update(currentTrend.id, currentTrend)
            .then(response => {
                console.log(response.data);
                // setMessage("File Uploaded successfully!");
            })
            .catch(e => {
                console.log(e);
            });
        // };
    };

    const fileData = () => {
        if (selectedFile) {
            return (
                <div>
                    <h2>File Details:</h2>
                    <p>{selectedFile.name}</p>
                    <p>{selectedFile.type}</p>
                    <p>Last Modified: {" "}{selectedFile.lastModifiedDate.toDateString()}</p>
                </div>
            );
        } else {
            return (
                <div>
                    <div>
                        <p>Please select File, before Upload.</p>
                    </div>
                </div>
            );
        }
    }

    return (
        <div>
            <h1>File Upload</h1>
            <div>
                <input type="file" onChange={onFileChange}/>
                <Button onClick={onFileUpload}>Upload</Button>
            </div>
            {fileData()}
        </div>
    );

}
export default FileUpload;