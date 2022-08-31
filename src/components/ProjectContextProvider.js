import React, {useState} from 'react';


export const ProjectContext = React.createContext();

export function ProjectContextProvider({children}) {
    let currentProject = window.localStorage.getItem("project")
    let json = JSON.parse(currentProject)

    let currentUser = window.localStorage.getItem("user")
    let json_user = JSON.parse(currentUser)

    const [project, setProject] = useState(json?.project ? json.project : null);
    const [user, setUser] = useState(json_user ? json_user : null);

    React.useEffect(() => {
        let currentProject = window.localStorage.getItem("project")
        let json = JSON.parse(currentProject)
        if (currentProject && json?.project) setProject(json.project)

        let currentUser = window.localStorage.getItem("user")
        let json_user = JSON.parse(currentUser)
        console.log(json_user)
        if (currentUser && json_user) setUser(json_user)
    }, [])

    React.useEffect(() => {
        window.localStorage.setItem("project", JSON.stringify({project: project}))
    }, [project])

    return (
        <ProjectContext.Provider value={{project, setProject, user, setUser}}>
            {children}
        </ProjectContext.Provider>
    );
}
