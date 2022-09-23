import {Link, useNavigate} from "react-router-dom";
import React, {useContext, useState} from 'react';
import TrendDataService from "../services/trend_service";
import LoginError from "../services/LoginError";
import Sidebar from "../components/Sidebar";
import Account from "./Account";
import {ProjectContext} from "../components/ProjectContextProvider";
import AuthService from "../services/auth.service";
import NavBarWelcome from "../components/NavBarWelcome";
import {Col, Form, Row} from "react-bootstrap";
import Button from "@mui/material/Button";


const ProjectAdd = () => {
    let navigate = useNavigate();
    const currentProject = useContext(ProjectContext);

    const currentUserId = AuthService.getCurrentUser().id;


    const initialProjectState = {
        title: "",
        description: "",
        users: {"users": [{"id": currentUserId}]}
    }
    const [project, setProject] = useState(initialProjectState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const {name, value} = event.target;
        setProject({...project, [name]: value});
    };


    const saveProject = () => {
        TrendDataService.createProject(project)
            .then(response => {
                setProject({
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    users: response.data.users,
                });
                setSubmitted(true);
                currentProject.setProject(response.data.id);
                navigate("/welcome")
            })
            .catch(e => {
                console.log(e);
                console.log("add trend: " + e.response.status);
                LoginError(navigate, e)
            });
    };

    const newTrend = () => {
        setProject(initialProjectState);
        setSubmitted(false);
    };

    return (
        <div>
            <NavBarWelcome/>
            <div style={styles.backgroundContainer}>
                <Row style={{display: "flex", justifyContent: "center"}}>
                    <Col lg={8}>
                        <Form style={{width: '100%'}}>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Title</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    required
                                    value={project.title}
                                    onChange={handleInputChange}
                                    style={{borderRadius: '1.078rem'}}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <strong>Description</strong>
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    className="form-control"
                                    id="description"
                                    required
                                    value={project.description}
                                    onChange={handleInputChange}
                                    name="description"
                                    style={{borderRadius: '1.078rem'}}
                                />
                            </Form.Group>

                            {/*                    */}
                            {/*            <div className="submit-form">*/}
                            {/*    <div>*/}
                            {/*        <div className="form-group">*/}
                            {/*            <label htmlFor="title">Project Title</label>*/}
                            {/*            <input*/}
                            {/*                type="text"*/}
                            {/*                className="form-control"*/}
                            {/*                id="title"*/}
                            {/*                required*/}
                            {/*                value={project.title}*/}
                            {/*                onChange={handleInputChange}*/}
                            {/*                name="title"*/}
                            {/*            />*/}
                            {/*        </div>*/}
                            {/*        <br/>*/}
                            {/*        <div className="form-group">*/}
                            {/*            <label htmlFor="description">Description</label>*/}
                            {/*            <input*/}
                            {/*                type="text"*/}
                            {/*                className="form-control"*/}
                            {/*                id="description"*/}
                            {/*                required*/}
                            {/*                value={project.description}*/}
                            {/*                onChange={handleInputChange}*/}
                            {/*                name="description"*/}
                            {/*            />*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <Button className="btn btn-success"
                                    onClick={saveProject}>
                                Submit
                            </Button>
                        </Form>

                    </Col>

                </Row>
            </div>
        </div>
    );
};
export default ProjectAdd;

const styles = {
    mainContainer: {
        borderRadius: 10,
        width: "100%",
        // height: "100%",
        backgroundColor: "white",
        paddingLeft: "10%"
    }
}