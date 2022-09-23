import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {ProjectContext} from "./ProjectContextProvider";
import {AiOutlineUser} from "react-icons/ai";


function NavBarWelcome(props) {
    const navigate = useNavigate();
    const username = useContext(ProjectContext).user.username;

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" sticky="top">
            <Container style={styles.NavBar}>
                <Navbar.Brand>trendRadar</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
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

export default NavBarWelcome;

const styles = {
    NavBar: {
        marginLeft: '1rem',
        marginRight: '1rem'
    }
}