import './App.css';
import React  from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link } from "react-router-dom";
import Trend from "./components/Trend"
import AddTrend from "./views/AddTrend"


import Sidebar from "./components/Sidebar";
import TrendsView from "./views/TrendsView";
import Login from "./components/Login";
import Register from "./components/Register";


function App() {
  return (

                  // style={{marginTop:0, height: window.innerHeight, width:window.innerWidth}}


                  <div style={styles.backgroundContainer}>
                      <Sidebar />
                      <div style={styles.mainContainer}>
                        <Routes>
                            <Route path="/login" element={<Login/>}></Route>
                            <Route path="/register" element={<Register/>}></Route>
                            <Route path="/" element={<TrendsView/>} />
                            <Route path="/trend" element={<TrendsView/>} />
                            <Route path="/add" element={<AddTrend/>} />
                            <Route path="/trend/:id" element={<Trend/>} />
                         </Routes>
                      </div>
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