// import React from 'react';
// import {useNavigate, useParams} from "react-router-dom";
// import NavBar2 from "../../components/NavBar2";
// import FileUpload from "../../components/FileUpload";
//
// function ReferenceAddPage3(props) {
//     const navigate = useNavigate();
//     const {trendID, refID, dest} = useParams();
//     return (
//         <div>
//             <NavBar2/>
//             <div style={styles.backgroundContainer}>
//                 <div style={styles.FormContainer}>
//                     <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
//                         <h4>Add Reference - Step 3/3</h4>
//                         <h6 style={{width: '100%', marginTop: '2rem'}}>Choose Reference Product
//                             Picture</h6>
//                         <div style={{width: '70%', marginTop: '2rem', display: "flex"}}>
//                             <FileUpload trendID={trendID} refID={refID} dest={dest}
//                                         navigateTo={`../../RS/${trendID}`}></FileUpload>
//                             <div style={{marginLeft: '2rem'}}>
//                                 <button className="btn btn-secondary"
//                                         onClick={() => navigate(`../../RS/${trendID}`)}
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
// export default ReferenceAddPage3;
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