import React, {useContext, useState} from 'react';
import TrendDataService from "../services/trend_service";
import LoginError from "../services/LoginError";
import {useNavigate} from "react-router-dom";
import {ProjectContext} from "../components/ProjectContextProvider";
import AuthService from "../services/auth.service";
import Account from "./Account";
import Button from "react-bootstrap/Button";
import {Col} from "react-bootstrap";


function Welcome(props) {
    const navigate = useNavigate();
    const currentProject = useContext(ProjectContext);
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

    React.useEffect(() => {
    }, [projects])


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


        TrendDataService.removeAll(project)
            .then(response => {
            })
            .catch(e => {
                console.log(e);
                LoginError(navigate, e)
            });
    }


    return (
        <div style={styles.mainContainer}>
            <Account></Account>
            <div>
                {projects.length > 0 ? (
                    <div>
                        <span>Welcome! Currently Selected Project:</span>
                        <h2>{`Project ID: ${currentProject?.project}`}</h2>
                        <Button onClick={() => navigate("/trend")}>Continue</Button>
                        <Button variant="success" onClick={handleAddNew}>Add new</Button>
                        <div>
                            {projects.map((project, index) => (
                                <ul key={index} className="list-group">
                                    <li key={index} className="list-group-item">
                                        <h3>{project.title}</h3>
                                        <span>Project ID: {project.id}</span>
                                        <Button variant='primary'
                                                onClick={() => handleClick(project)}>select</Button>
                                        <Button variant='danger'
                                                onClick={() => handleDelete(project.id)}>delete
                                        </Button>
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        <span> Welcome! Create a new Project</span>
                        <br/>
                        <Button variant="success" onClick={handleAddNew}>Add new</Button>
                    </div>
                )
                }
            </div>
        </div>
    )
}

export default Welcome;

const styles = {
    mainContainer: {
        borderRadius: 10,
        width: "100%",
        // height: "100%",
        backgroundColor: "white",
        paddingLeft: "10%",
        paddingBottom: 5,
        paddingTop: 5,
        paddingRight: 5,
    }
}