import React from 'react';
import NavBar2 from "../components/NavBar2";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import FileEdit2 from "../components/FileEdit2";

function TrendEditPage2(props) {
    const navigate = useNavigate();

    const initStoredTrend = {
        id: null
    }
    var stored_trend = sessionStorage.getItem("trend");
    const [currentTrend, setCurrentTrend] = useState(JSON.parse(stored_trend) ? JSON.parse(stored_trend) : initStoredTrend);

    return (
        <div>
            <NavBar2/>
            <div style={styles.backgroundContainer}>
                <div style={styles.FormContainer}>
                    <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
                        <h3 style={{width: '100%', marginTop: "2rem"}}>Trend Edit - Step 2/2</h3>

                        <h5 style={{width: '100%', marginTop: "2rem"}}>Edit Trend Picture</h5>
                        <div style={{width: '70%'}}>
                            <FileEdit2 trendID={currentTrend.id} refID={""} dest={"trendpicture"}></FileEdit2>
                            {/*<FileUpload trendID={currentTrend.id} refID={""} dest={"trendpicture"}></FileUpload>*/}
                        </div>
                        <div style={{display: "flex", justifyContent: "center", width: '50%', marginTop: '2rem'}}>
                            <button className="btn btn-primary" onClick={() => {
                                navigate("../../trend")
                            }}
                            >Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrendEditPage2;

const styles = {
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
    }
}