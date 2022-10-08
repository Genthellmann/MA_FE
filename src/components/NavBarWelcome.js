import React from 'react';
import {Container, Image, Modal, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {ProjectContext} from "./ProjectContextProvider";
import {AiOutlineUser} from "react-icons/ai";
import {useState} from "react";
import AuthService from "../services/auth.service";


function NavBarWelcome(props) {
    const navigate = useNavigate();

    let user = localStorage.getItem("user")
    let json_user = JSON.parse(user)
    let username = json_user.username;
    let email = json_user.email;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Navigate to RS if Trends is selected else show Modal
    const handleRefNav = () => {
        var curTrend = JSON.parse(sessionStorage.getItem("trend"))
        if (curTrend)
            navigate(`/RS/${curTrend.id}`)
        else
            setShow(true)
    }

    //Navigate to User & Customer Benefits if Trends is selected else show Modal
    const handleUnCNav = () => {
        var curTrend = JSON.parse(sessionStorage.getItem("trend"))
        if (curTrend)
            navigate(`/VPC/${curTrend.id}`)
        else
            setShow(true)
    }

    //User Account Info
    const [showUA, setShowUA] = useState(false);

    const handleCloseUA = () => setShowUA(false);
    const handleShowUA = () => setShowUA(true);

    const logout = () => {
        //TO DO: Link to backend method logout
        localStorage.removeItem("user");
        localStorage.removeItem("project");
        sessionStorage.removeItem("trend")
        navigate("/login");
    }


    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="light" sticky="top">
                <Container style={styles.NavBar}>
                    <Navbar.Brand href="/trend" style={{padding: 0}}>
                        <Image src={require("../images/trendRadarLogo.png")} style={{width: "10rem", padding: 0}}
                        ></Image>
                    </Navbar.Brand> <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => navigate("/welcome")}>Projects</Nav.Link>
                            <Nav.Link onClick={() => navigate("/trend")} disabled={true}>Trends</Nav.Link>
                            <Nav.Link onClick={handleRefNav} disabled={true}>References & Benefits</Nav.Link>
                            <Nav.Link onClick={handleUnCNav} disabled={true}>Benefits & Strategy</Nav.Link>

                        </Nav>
                        <Nav className="ms-auto">
                            <NavDropdown title={username} id="collasible-nav-dropdown">
                                <NavDropdown.Item onClick={handleShowUA}>User Info</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item onClick={logout}>
                                    Log Out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Trend Selection Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>To see the desired content, please select a trend on the trend radar or the trend
                    list.</Modal.Body>
            </Modal>
            <Modal show={showUA} onHide={handleCloseUA}>
                <Modal.Header closeButton>
                    <Modal.Title>User Account Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>
                        <strong>Username: </strong>{username}
                    </span>
                    <br/>
                    <span>
                        <strong>Email: </strong>{email}
                    </span>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={logout}>
                        Log Out
                    </button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default NavBarWelcome;

const styles = {
    NavBar: {
        marginLeft: '1rem',
        marginRight: '1rem'
    }
}