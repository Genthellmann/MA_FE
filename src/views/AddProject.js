import {Link, useNavigate} from "react-router-dom";
import React, {useContext, useState} from 'react';
import TrendDataService from "../services/trend_service";
import LoginError from "../services/LoginError";
import Sidebar from "../components/Sidebar";
import Account from "./Account";
import {ProjectContext} from "../components/ProjectContextProvider";
import AuthService from "../services/auth.service";


const AddProject = () => {
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
        <div style={styles.mainContainer}>
            <Sidebar/>
            <Account/>
            <div className="submit-form">
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Project Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={project.title}
                            onChange={handleInputChange}
                            name="title"
                        />
                    </div>
                    <br/>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={project.description}
                            onChange={handleInputChange}
                            name="description"
                        />
                    </div>
                    <br/>
                    <button onClick={saveProject} className="btn btn-success">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};
export default AddProject;

const styles = {
    mainContainer: {
        borderRadius: 10,
        width: "100%",
        // height: "100%",
        backgroundColor: "white",
        paddingLeft: "10%"
    }
}