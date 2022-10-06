import React, {useContext, useState} from 'react';
import TrendDataService from "../services/trend_service";
import LoginError from "../services/LoginError";
import {useNavigate} from "react-router-dom";
import {ProjectContext} from "../components/ProjectContextProvider";
import AuthService from "../services/auth.service";
import Button from "react-bootstrap/Button";
import NavBarWelcome from "../components/NavBarWelcome";
import {Col, Row} from "react-bootstrap";
import {PromptContext} from "../components/ContextPromptProvider";


function Welcome(props) {
    const navigate = useNavigate();
    const currentProject = useContext(ProjectContext);

    //======================
    //reload prompt disable from previous state
    //======================

    const promptContext = useContext(PromptContext);
    // React.useEffect(() => {
    //     promptContext.setShowExitPrompt(false);
    // }, [])

    //======================
    //retrieve Projects
    //======================

    const currentUserId = AuthService.getCurrentUser().id;
    const [projects, setProjects] = useState([])
    const [projectSelected, setProjectSelected] = useState(false);

    //method to return all projects of user
    const retrieveProjects = id => {
        TrendDataService.getAllProjects(id)
            .then(response => {
                console.log(response.data)
                setProjects(response.data);
            })
            .catch(e => {
                LoginError(navigate, e)
            });
    };

    React.useEffect(() => {
        retrieveProjects(currentUserId);
    }, [currentUserId]);


    const handleAddNew = () => {
        navigate("/newproject")
    }

    const handleClick = project => {
        currentProject.setProject(project.id)
        navigate("/trend")
    }

    const handleDelete = project => {
        console.log("project: ")
        console.log(project)
        //TrendDataService.deleteAllPictures();

        //TODO: Delete Project from Project Table


        TrendDataService.deleteProject(project)
            .then(response => {
                console.log(response.data)
                retrieveProjects(currentUserId);
            })
            .catch(e => {
                console.log(e);
                LoginError(navigate, e)
            });
    }


    return (
        <div>
            <NavBarWelcome/>
            <div style={styles.backgroundContainer}>
                <Row style={{display: "flex", justifyContent: "center"}}>
                    <Col lg={8}>
                        <div style={{display: "flex", justifyContent: "flex-start", width: '100%'}}>
                            {projects.length > 0 ? (
                                <div style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    width: '100%',
                                    flexDirection: "column"
                                }}>
                                    <h3>Welcome!</h3>
                                    <h5>Select or Create Project to continue...</h5>
                                    {projects.map((project, index) => (
                                        <ul key={index} className="list-group"
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                width: '100%',
                                                borderRadius: '1.078rem',
                                            }}>
                                            <li key={index} className="list-group-item"
                                                style={{display: "flex", width: '100%', flexDirection: "column"}}>
                                                <div style={{
                                                    display: "flex",
                                                    width: '100%',
                                                    justifyContent: "space-between"
                                                }}>
                                                    <h3>{project.title}</h3>
                                                    <div>
                                                        <button className="btn btn-danger btn-sm"
                                                                onClick={() => handleDelete(project.id)}>delete
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span>Project ID: {project.id}</span>
                                                </div>
                                                <div style={{display: "flex", justifyContent: "center"}}>
                                                    <button className="btn btn-primary"
                                                            onClick={() => handleClick(project)}>select
                                                    </button>
                                                </div>
                                            </li>
                                        </ul>
                                    ))}
                                </div>
                            ) : (
                                <div>
                                    <span> Welcome! Create a new Project</span>
                                </div>
                            )
                            }
                        </div>
                        <Button className="btn btn-success" onClick={handleAddNew}
                                style={{marginTop: "1rem"}}>Add new</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Welcome;

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
        margin: 0
    },
    ColStyle: {
        padding: 0
    }
}