import './App.css';
import React, {useRef} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Trend from "./views/Trend"
import AddTrend from "./views/AddTrend"
import TrendsView from "./views/TrendsView";
import Login from "./views/Login";
import Register from "./views/Register";
import Account from "./views/Account";
import Profile from "./components/Profile";
import MainContainer from "./components/MainContainer";
import Sidebar from "./components/Sidebar";
import {ProjectContextProvider} from "./components/ProjectContextProvider";
import Welcome from "./views/Welcome";
import AddProject from "./views/AddProject";
import ReferenceSystem from "./views/ReferenceSystem";
import AddReference from "./views/AddReference";
import EditReference from "./views/ReferenceEdit";
import Vpa from "./views/Vpa";


function App() {


    return (

        <div style={styles.backgroundContainer}>
            <ProjectContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login/>}></Route>
                        <Route path="/register" element={<Register/>}></Route>
                        <Route path="/profile" element={<Profile/>}></Route>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/trend" element={<TrendsView/>}/>
                        <Route path="/add" element={<AddTrend/>}/>
                        <Route path="/trend/:id" element={<Trend/>}/>
                        <Route path="/welcome" element={<Welcome/>}/>
                        <Route path="/newproject" element={<AddProject/>}/>
                        <Route path="/RS/:trendID" element={<ReferenceSystem/>}/>
                        <Route path="/RS/add/:trendID" element={<AddReference/>}/>
                        <Route path="RS/edit/:refID" element={<EditReference/>}/>
                        <Route path="Vpa/:trendID" element={<Vpa/>}/>
                    </Routes>
                </BrowserRouter>
            </ProjectContextProvider>
        </div>

    );
}

export default App;

const styles = {
    backgroundContainer: {
        backgroundColor: "black",
        width: "100%",
        height: "100%",
        padding: 10,
        paddingLeft: 70,
        margin: 0
    },
    mainContainer: {
        borderRadius: 10,
        width: "100%",
        // height: "100%",
        backgroundColor: "white",
        paddingLeft: "50px",
        paddingRight: "10px",
        paddingTop: "10px",
        paddingBottom: "10px"
    }
}