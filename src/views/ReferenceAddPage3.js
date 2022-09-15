import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import NavBar2 from "../components/NavBar2";
import FileUpload from "../components/FileUpload";

function ReferenceAddPage3(props) {
    const navigate = useNavigate();
    const {trendID, refID, dest} = useParams();
    return (
        <div>
            <NavBar2/>
            <div style={styles.backgroundContainer}>
                <div style={styles.FormContainer}>
                    <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
                        <h4>Add New Trend - Step 3/3</h4>
                        <div style={{height: '3rem'}}></div>
                        <h6>Choose Explanatory Picture or Drawing</h6>
                        <FileUpload trendID={trendID} refID={refID} dest={dest}></FileUpload>
                    </div>
                    <div style={{height: '3rem'}}></div>
                    <button className="btn btn-primary"
                            onClick={() => navigate(`../../RS/${trendID}`)}>Done
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReferenceAddPage3;

const styles = {
    mainContainer: {
        borderRadius: 10,
        width: "100%",
        // height: "100%",
        backgroundColor: "white",
        paddingLeft: "10%"
    },
    FormContainer: {
        width: "60%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
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