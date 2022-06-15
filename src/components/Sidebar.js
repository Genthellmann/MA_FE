import React from "react";
import {Nav, Navbar} from "react-bootstrap";
// import { withRouter } from "react-router";
import { Routes, Route, Link } from "react-router-dom";
import TrendList from "../unused/trend_list";
import AddTrend from "../views/AddTrend";
import Trend from "./Trend";
import '../index.css'

const Sidebar = props => {
    return (
        <>
            <Nav className="bg-dark sidebar" style={{'height':'60vw','width':'15vw','left':'1vw',
            'borderRadius':'15px', 'marginTop':'15px'}}>
                <div style={{'width':'15vw','justifyContent':'center'}}>
                    {/*<Nav>*/}
                        <Navbar.Brand href="/trend" style={{'margin':'0vw'}}>Porsche</Navbar.Brand>
                    {/*</Nav>*/}
                    <Nav.Item>
                        <Nav.Link href="/trend">Trends</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/add" >Add</Nav.Link>
                    </Nav.Item>
                </div>
            </Nav>
            {/*<div className={"container mt-3"}>*/}
            {/*    <Routes>*/}
            {/*        <Route path="/" element={<TrendList/>} />*/}
            {/*        <Route path="/trend" element={<TrendList/>} />*/}
            {/*        <Route path="/add" element={<AddTrend/>} />*/}
            {/*        <Route path="/trend/:id" element={<Trend/>} />*/}
            {/*    </Routes>*/}
            {/*</div>*/}
        </>
    );
};
// const Sidebar = withRouter(Side);
export default Sidebar