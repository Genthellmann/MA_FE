import React, {useState} from 'react';
import TrendDataService from "../services/trend_service";
import Button from "react-bootstrap/Button";

function UploadPicture(props) {
    // $(document).ready(function() {
    //     let imagesPreview = function(input, placeToInsertImagePreview) {
    //         if (input.files) {
    //             let filesAmount = input.files.length;
    //             for (i = 0; i < filesAmount; i++) {
    //                 let reader = new FileReader();
    //                 reader.onload = function(event) {
    //                     $($.parseHTML("<img>"))
    //                         .attr("src", event.target.result)
    //                         .appendTo(placeToInsertImagePreview);
    //                 };
    //                 reader.readAsDataURL(input.files[i]);
    //             }
    //         }
    //     };
    //     $("#input-files").on("change", function() {
    //         imagesPreview(this, "div.preview-images");
    //     });
    // });


    //select the file
    const [selectedFile, setselectedFile] = useState(null);

    //On file select (from pop up)
    const onFileChange = event => {
        //Update state
        setselectedFile(event.target.files[0]);
        console.log(selectedFile);
    }

    //On file upload (click upload button)
    const newPicture = () => {
        TrendDataService.createUpload()
            .catch(e => {
                console.log(e);
            })
    };

    //On file upload (click upload button)
    const PictureUpload = (selectedFile) => {
        TrendDataService.submitUpload()
            .catch(e => {
                console.log(e);
            })
    };

    const fileData = () => {
        console.log(selectedFile)
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
                <Button onClick={PictureUpload}>Upload</Button>
            </div>
            {fileData()}
        </div>



        //
        // return (
        //     <div className="container">
        //         <div className="row">
        //             <div className="col-sm-8 mt-3">
        //                 <h4>Upload Image</h4>
        //                 <form
        //                     className="mt-4"
        //                     action={newPicture}
        //                     method="POST"
        //                     encType="multipart/form-data"
        //                 >
        //                     <div className="form-group">
        //                         <input
        //                             type="file"
        //                             name="file"
        //                             id="input-files"
        //                             className="form-control-file border"
        //                         />
        //                     </div>
        //                     <button type="submit" className="btn btn-primary">Submit</button>
        //                 </form>
        //             </div>
        //         </div>
        //         <hr/>
        //         <div className="row">
        //             <div className="col-sm-12">
        //                 <div className="preview-images"></div>
        //             </div>
        //         </div>
        //     </div>
        // <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
        // <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
        // <script>
        //     $(document).ready(function() {
        //     let imagesPreview = function(input, placeToInsertImagePreview) {
        //     if (input.files) {
        //     let filesAmount = input.files.length;
        //     for (i = 0; i < filesAmount; i++) {
        //     let reader = new FileReader();
        //     reader.onload = function(event) {
        //     $($.parseHTML("<img>"))
        //     .attr("src", event.target.result)
        //     .appendTo(placeToInsertImagePreview);
        // };
        //     reader.readAsDataURL(input.files[i]);
        // }
        // }
        // };
        //     $("#input-files").on("change", function() {
        //     imagesPreview(this, "div.preview-images");
        // });
        // });
        // </script>
    );
}

export default UploadPicture;