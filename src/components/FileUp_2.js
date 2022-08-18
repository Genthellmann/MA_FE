import React, {useState} from 'react';


function FileUp_2({link, ID, submitted, submitRef}) {
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);

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


    const url = "http://localhost:3001/" + link + ID;
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-8 mt-3">
                    <h4>Upload Image</h4>
                    <form
                        className="mt-4"
                        action={url}
                        target="file_upload"
                        method="POST"
                        encType="multipart/form-data"
                    >
                        <div className="form-group">
                            <input
                                disabled={!submitted}
                                // id={ID}
                                type="file"
                                // name={ID}
                                name="file"
                                id="input-files"
                                className="form-control-file border"
                                onChange={onChangePicture}
                            />
                        </div>
                        <button ref={submitRef} type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
            <div className="row">
                <div>
                    <img className="preview-images" src={imgData}></img>
                </div>
            </div>
        </div>
    );
}

export default FileUp_2;