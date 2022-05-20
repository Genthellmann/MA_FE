import logo from './logo.svg';
import './App.css';
import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link } from "react-router-dom";
import Trend from "./components/trend"
import AddTrend from "./components/add_trend"
import TrendList from "./components/trend_list"



function App() {
  return (
    <div className="App">
      <div>
        <nav className={"navbar navbar-expand navbar-dark bg-dark"}>
          <a href="/trend" className={"navbar-brand"}>
            PORSCHE
          </a>
          <div className={"navbar-nav mr-auto"}>
            <li className={"nav-item"}>
              <Link to={"/trend"} className={"nav-link"}>
                Trends
              </Link>
            </li>
            <li className={"nav-item"}>
              <Link to={"/add"} className={"nav-link"}>
                Add
              </Link>
            </li>
          </div>
        </nav>
        <div className={"container mt-3"}>
          <Routes>
            <Route path="/" element={<TrendList/>} />
            <Route path="/trend" element={<TrendList/>} />
            <Route path="/add" element={<AddTrend/>} />
            <Route path="/trend/:id" element={<Trend/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
