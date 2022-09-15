import './App.css';
import React, {useRef} from "react";
//import 'bootstrap/dist/css/bootstrap.min.css';
import '/Users/johannesthellmann/WebstormProjects/ux_trend/src/components/customTheme/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import TrendEdit from "./views/TrendEdit"
import TrendAdd from "./views/TrendAdd"
import TrendsView from "./views/TrendsView";
import Login from "./views/Login";
import Register from "./views/Register";
import Profile from "./components/Profile";
import {ProjectContextProvider} from "./components/ProjectContextProvider";
import Welcome from "./views/Welcome";
import AddProject from "./views/AddProject";
import ReferenceSystem from "./views/ReferenceSystem";
import ReferenceAdd from "./views/ReferenceAdd";
import EditReference from "./views/ReferenceEdit";
import Vpc from "./views/Vpc";
import FileUpload from "./components/FileUpload";
import ReferenceAddPage2 from "./views/ReferenceAddPage2";
import ReferenceAddPage3 from "./views/ReferenceAddPage3";
import ReferenceEditRp from "./views/ReferenceEditRp";
import ReferenceEditExpl from "./views/ReferenceEditExpl";


function App() {

    // const bossTheme = createTheme({
    //     palette: {
    //         primary: {
    //             main:
    //                 '#a86632'
    //         }
    //
    //     }
    // });


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
                        <Route path="/add" element={<TrendAdd/>}/>
                        <Route path="/trend/:id" element={<TrendEdit/>}/>
                        <Route path="/welcome" element={<Welcome/>}/>
                        <Route path="/newproject" element={<AddProject/>}/>
                        <Route path="/RS/:trendID" element={<ReferenceSystem/>}/>
                        <Route path="/RS/add/:trendID" element={<ReferenceAdd/>}/>
                        <Route path="/RS/add/page2/:trendID/:refID/:dest" element={<ReferenceAddPage2/>}/>
                        <Route path="/RS/add/page3/:trendID/:refID/:dest" element={<ReferenceAddPage3/>}/>
                        <Route path="RS/edit/:refID" element={<EditReference/>}/>
                        <Route path="RS/edit/rppicture/:trendID/:refID" element={<ReferenceEditRp/>}/>
                        <Route path="RS/edit/explpicture/:trendID/:refID" element={<ReferenceEditExpl/>}/>
                        <Route path="vpc/:trendID" element={<Vpc/>}/>
                    </Routes>
                </BrowserRouter>
            </ProjectContextProvider>
        </div>

    );
}

export default App;

const styles = {
    backgroundContainer: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        padding: 0,
        paddingLeft: 0,
        margin: 0
    }
}