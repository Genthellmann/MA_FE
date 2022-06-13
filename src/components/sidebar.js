import React from "react";
import {Nav} from "react-bootstrap";
// import { withRouter } from "react-router";
import { Routes, Route, Link } from "react-router-dom";
import TrendList from "./trend_list";
import AddTrend from "./add_trend";
import Trend from "./trend";
import '../index.css'

const Sidebar = props => {
    return (
        <>
            <Nav className="bg-dark sidebar">
                <div className="sidebar-sticky">
                    <Nav.Item>
                        <Nav.Link href="/trend">Porsche</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/trend">Trends</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/add">Add</Nav.Link>
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