// function ExplPicFileUp({link, ID}) {
//     const url = "http://localhost:3001/" + link + ID;
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
//                     >
//                         <div className="form-group">
//                             <input
//                                 // id={ID}
//                                 type="file"
//                                 // name={ID}
//                                 name="file"
//                                 id="input-files"
//                                 className="form-control-file border"
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
//                     <div className="preview-images"></div>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default ExplPicFileUp;