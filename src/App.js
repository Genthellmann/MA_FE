import logo from './logo.svg';
import './App.css';
import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link } from "react-router-dom";
import Trend from "./components/trend"
import AddTrend from "./components/add_trend"

import TrendList from "./components/trend_list"

// import TrendList from "./components/TrendList_2"


import {Col, Container, Navbar, Row} from "react-bootstrap";
import Sidebar from "./components/sidebar";
import SearchBar from "./components/SearchBar";


function App() {
  return (
    <div className="App">
      <div>
        {/*<Sidebar>Porsche</Sidebar>*/}
        {/*<Navbar className={"sidebar-sticky navbar navbar-expand navbar-dark bg-dark"}*/}
        {/*>*/}
        {/*  <a href="/trend" className={"navbar-brand"}>*/}
        {/*    PORSCHE*/}
        {/*  </a>*/}
        {/*  <div className={"navbar-nav mr-auto"}>*/}
        {/*    <li className={"nav-item"}>*/}
        {/*      <Link to={"/trend"} className={"nav-link"}>*/}
        {/*        Trends*/}
        {/*      </Link>*/}
        {/*    </li>*/}
        {/*    <li className={"nav-item"}>*/}
        {/*      <Link to={"/add"} className={"nav-link"}>*/}
        {/*        Add*/}
        {/*      </Link>*/}
        {/*    </li>*/}
        {/*  </div>*/}
        {/*</Navbar>*/}
          <Row>
            <Col>
              <Sidebar />
            </Col>
            <Col >
                <Routes>
                  <Route path="/" element={<TrendList/>} />
                  <Route path="/trend" element={<TrendList/>} />
                  <Route path="/add" element={<AddTrend/>} />
                  <Route path="/trend/:id" element={<Trend/>} />
                </Routes>
            </Col>
            <Col ></Col>
          </Row>
      </div>
    </div>
  );
}

export default App;
