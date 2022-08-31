import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {ProjectContext} from "./ProjectContextProvider";
import {AiOutlineUser} from "react-icons/ai";


function NavBar2(props) {
    const navigate = useNavigate();
    const username = useContext(ProjectContext).user.username;

    return (
        <Navbar collapseOnSelect expand="lg" bg="light">
            <Container style={styles.NavBar}>
                <Navbar.Brand href="/trend">trendRadar</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/trend">Trends</Nav.Link>
                        <Nav.Link href="/welcome">Projects</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <NavDropdown title={username} id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another Action</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4">
                                Log Out
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar2;

const styles = {
    NavBar: {
        marginLeft: '1rem',
        marginRight: '1rem'
    }
}