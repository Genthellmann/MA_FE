// import {useState} from "react";
//
//
// function RpPicFileUp({props, ID}) {
//     const [picture, setPicture] = useState(null);
//     const [imgData, setImgData] = useState(null);
//     const onChangePicture = e => {
//         if (e.target.files[0]) {
//             console.log("picture: ", e.target.files);
//             setPicture(e.target.files[0]);
//             const reader = new FileReader();
//             reader.addEventListener("load", () => {
//                 setImgData(reader.result);
//             });
//             reader.readAsDataURL(e.target.files[0]);
//         }
//     }
//
//
//     const url = "http://localhost:3001/rppicture?id=" + ID;
//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-sm-8 mt-3">
//                     <h4>Upload Image</h4>
//                     <form
//                         className="mt-4"
//                         action={url}
//                         target="file_upload"
//                         method="POST"
//                         encType="multipart/form-data"
//
//                     >
//                         <div className="form-group">
//                             <input
//                                 // id={ID}
//                                 type="file"
//                                 // name={ID}
//                                 name="file"
//                                 id="input-files"
//                                 className="form-control-file border"
//                                 onChange={onChangePicture}
//                             />
//                         </div>
//                         <button type="submit" className="btn btn-primary">Submit</button>
//                     </form>
//                     <iframe name="file_upload"></iframe>
//                 </div>
//             </div>
//             <hr/>
//             <div className="row">
//                 <div className="col-sm-12">
//                     <img className="preview-images" src={imgData}></img>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default RpPicFileUp;