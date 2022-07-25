import React, {useState} from 'react';


export const ProjectContext = React.createContext();

export function ProjectContextProvider({children}) {
    let currentProject = window.localStorage.getItem("project")
    let json = JSON.parse(currentProject)

    const [project, setProject] = useState(json?.project ? json.project : null);

    React.useEffect(() => {
        let currentProject = window.localStorage.getItem("project")
        let json = JSON.parse(currentProject)
        if (currentProject && json?.project) setProject(json.project)
    }, [])

    React.useEffect(() => {
        window.localStorage.setItem("project", JSON.stringify({project: project}))
    }, [project])

    return (
        <ProjectContext.Provider value={{project, setProject}}>
            {children}
        </ProjectContext.Provider>
    );
}
