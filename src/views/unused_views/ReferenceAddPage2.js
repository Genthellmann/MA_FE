// import React from 'react';
// import {useNavigate, useParams} from "react-router-dom";
// import NavBar2 from "../../components/NavBar2";
// import FileUpload from "../../components/FileUpload";
//
// function ReferenceAddPage2(props) {
//     const navigate = useNavigate();
//     const {trendID, refID, dest} = useParams();
//     return (
//         <div>
//             <NavBar2/>
//             <div style={styles.backgroundContainer}>
//                 <div style={styles.FormContainer}>
//                     <div style={{display: "flex", width: '100%',}}>
//                         <button className="btn btn-secondary btn-sm"
//                                 onClick={() => {
//                                     navigate(`../RS/edit/${trendID}/${refID}`, {replace: true})
//                                 }}
//                         >back
//                         </button>
//                     </div>
//                     <div style={{display: 'flex', width: '100%', flexDirection: 'column', marginTop: "2rem"}}>
//                         <h4 style={{width: '100%'}}>Add Reference - Step 2/3</h4>
//                         <h6 style={{width: '100%', marginTop: '2rem'}}>Choose Reference Product
//                             Picture</h6>
//                         <div style={{width: '70%', marginTop: '2rem', display: "flex"}}>
//                             <FileUpload trendID={trendID} refID={refID} dest={dest}
//                                         navigateTo={`../../RS/add/page3/${trendID}/${refID}/explpicture`}></FileUpload>
//                             <div style={{marginLeft: '2rem'}}>
//                                 <button className="btn btn-secondary"
//                                         onClick={() => navigate(`../../RS/add/page3/${trendID}/${refID}/explpicture`, {replace: true})}
//                                 >Skip
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default ReferenceAddPage2;
//
// const styles = {
//     mainContainer: {
//         borderRadius: 10,
//         width: "100%",
//         // height: "100%",
//         backgroundColor: "white",
//         paddingLeft: "10%"
//     },
//     FormContainer: {
//         width: "60%",
//         display: "flex",
//         alignItems: "center",
//         flexDirection: "column",
//     },
//     backgroundContainer: {
//         backgroundColor: "white",
//         width: "100%",
//         height: "100%",
//         paddingLeft: '1vw',
//         paddingRight: '1vw',
//         paddingTop: '2vw',
//         display: 'flex',
//         justifyContent: 'center'
//     },
//     RowStyle: {
//         margin: 0
//     },
//     ColStyle: {
//         padding: 0
//     },
//     PictureEdit: {
//         width: '50%'
//     }
// }