import React, {useEffect, useState} from 'react';
import {Col, Offcanvas, Row} from "react-bootstrap";
import avatar from "../images/avatar.png"
import Button from "react-bootstrap/Button";
import {Image} from "react-bootstrap";
import {AiOutlineUser} from "react-icons/ai"
import Login from "./Login";
import AuthService from "../services/auth.service";
import Profile from "../components/Profile";
import {useNavigate} from "react-router-dom";
import authService from "../services/auth.service";

function Account(props) {
    let navigate = useNavigate();

    //Side drawer
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const currentUser = AuthService.getCurrentUser();

    const handleClick = () => {
        AuthService.logout(navigate)
    }
    
    return (
        <Row style={{paddingBottom: 10}}>
            <Col sm={8}></Col>
            <Col sm={4} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <h3>{currentUser.username}</h3>
                <Button className="btn float-end" onClick={handleShow} style={styles.avatarButton}>
                    <AiOutlineUser className="fa-10x" size={'70%'}></AiOutlineUser>
                </Button>


                <Offcanvas show={show} onHide={handleClose} placement='end'>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>User</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Profile></Profile>
                        <Button onClick={handleClick}>Logout</Button>
                    </Offcanvas.Body>
                </Offcanvas>
            </Col>
        </Row>

    );
}

export default Account;

const styles = {
    avatarButton: {
        padding: 0,
        borderRadius: '100%',
        width: '15%',
        aspectRatio: '1',
    }

}