import './App.css';
import React  from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link } from "react-router-dom";
import Trend from "./components/Trend"
import AddTrend from "./views/AddTrend"


import Sidebar from "./components/Sidebar";
import TrendsView from "./views/TrendsView";


function App() {
  return (
              <div style={{marginTop:0, height: window.innerHeight, width:window.innerWidth}}>
                  <Sidebar />
                        <Routes>
                          <Route path="/" element={<TrendsView/>} />
                          <Route path="/trend" element={<TrendsView/>} />
                          <Route path="/add" element={<AddTrend/>} />
                          <Route path="/trend/:id" element={<Trend/>} />
                        </Routes>
              </div>
  );
}

export default App;
