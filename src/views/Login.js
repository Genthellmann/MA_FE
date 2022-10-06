import React, {useState, useRef} from "react";
import {Link, Route, Routes, useNavigate} from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import {AiOutlineUser} from "react-icons/ai";
import {Col, Image, Modal, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};
const Login = () => {
    let navigate = useNavigate();
    const form = useRef();
    const checkBtn = useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    const handleLogin = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(username, password).then(
                () => {
                    navigate("/welcome", {replace: true});
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    };

    //===================
    //Modal
    //===================
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div style={styles.backgroundContainer}>
            <Row style={styles.RowStyle}>
                <Col lg={3} sm={0}></Col>
                <Col lg={6} sm={12}>
                    <Image src={require("../images/trendRadarLogo.png")} fluid="true"
                    ></Image>
                    <div onClick={handleShow}
                         style={{display: "flex", justifyContent: "flex-end", marginBottom: "2rem"}}
                    >
                        <button type="button" className="btn btn-link btn-sm">Register
                        </button>
                    </div>
                    <Form onSubmit={handleLogin} ref={form}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="username"
                                value={username}
                                onChange={onChangeUsername}
                                validations={[required]}
                                style={{borderRadius: '1.078rem'}}
                                autoComplete={"off"}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={onChangePassword}
                                validations={[required]}
                                style={{borderRadius: '1.078rem'}}
                                autoComplete={"off"}
                            />
                        </div>
                        <div className="form-group" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}>
                            <button className="btn btn-primary btn-block" disabled={loading} style={{margin: 10}}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Login</span>
                            </button>
                        </div>
                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <CheckButton style={{display: "none"}} ref={checkBtn}/>
                    </Form>
                </Col>
                <Col lg={3} sm={0}></Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Function Unavailable</Modal.Title>
                </Modal.Header>
                <Modal.Body>Sorry, this function is currently unavailable. Please use Test Account.</Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default Login;

const styles = {
    backgroundContainer: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        paddingLeft: '1vw',
        paddingRight: '1vw',
        paddingTop: '2vw',
    },
    RowStyle: {
        margin: 0,
        paddingTop: "10rem"
    },
    ColStyle: {
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
    },
    logMain: {
        display: 'flex',
        paddingRight: '60px',
        paddingTop: '60px',
        justifyContent: 'center'
    },
    logForm: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: 15
    }
}




