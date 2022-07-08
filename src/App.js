import './App.css';
import React, {useRef} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link } from "react-router-dom";

import Trend from "./views/Trend"
import AddTrend from "./views/AddTrend"
import TrendsView from "./views/TrendsView";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import Profile from "./components/Profile";
import MainContainer from "./components/MainContainer";
import Sidebar from "./components/Sidebar";


function App() {

    // function RequireAuth({ children }) {
    //     async function verifyToken() {
    //         let token = localStorage.getItem('user');
    //         if (token === null || token === undefined) return <Navigate to="../login" />
    //         let header = AuthHeader;
    //
    //         return header;
    //
    //     return (verifyToken().then(res => { console.log(res); return res.ok; }) ? children : <Navigate to="../sign-in" />);
    //
    // }


    return (

        // <div style={styles.backgroundContainer}>
        //
        //     <Routes>
        //         <Route path="/login" element={<Login/>}></Route>
        //         <Route path="/register" element={<Register/>}></Route>
        //     </Routes>
        //
        //     <MainContainer>
        //         <Sidebar></Sidebar>
        //         <Account/>
        //         <Routes>
        //             {/*<Route path="/login" element={<Login/>}></Route>*/}
        //             {/*<Route path="/register" element={<Register/>}></Route>*/}
        //             <Route path="/profile" element={<Profile/>}></Route>
        //             <Route path="/" element={<TrendsView/>} />
        //             <Route path="/trend" element={<TrendsView/>} />
        //             <Route path="/add" element={<AddTrend/>} />
        //             <Route path="/trend/:id" element={<Trend/>} />
        //         </Routes>
        //     </MainContainer>
        // </div>
                  <div style={styles.backgroundContainer}>
                      <Routes>
                        <Route path="/login" element={<Login/>}></Route>
                        <Route path="/register" element={<Register/>}></Route>
                        <Route path="/profile" element={<Profile/>}></Route>
                        <Route path="/" element={<TrendsView/>} />
                        <Route path="/trend" element={<TrendsView/>} />
                        <Route path="/add" element={<AddTrend/>} />
                        <Route path="/trend/:id" element={<Trend/>} />
                      </Routes>
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