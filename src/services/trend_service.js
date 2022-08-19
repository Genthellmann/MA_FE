import http from "../http-common";

//============================
//Trends
//============================

//get all trends from all projects
const getAll = cp => {
    return http.get(`/crud?project=${cp}`);
};

const get = id => {
    return http.get(`/crud/${id}`);
};
const create = (data, project) => {
    let newData = {...data, project: project}
    console.log(newData)
    return http.post("/crud", newData);
};
const update = (id, data) => {
    return http.put(`/crud/${id}`, data);
};
const remove = id => {
    return http.delete(`/crud/${id}`);
};
const removeAll = cp => {
    return http.delete(`/crud?project=${cp}`);
};

// const findByTitle = title => {
//     return http.get(`/crud?title=${title}`);
// };

const getAllCond = data => {
    console.log(data)
    return http.post("/crud/cond", data)
}

//============================
//Pictures
//============================

const getPicture = id => {
    return http.get(`/web/upload?trendID=${id}`)
}

// //transfer uploaded picture to db
// const submitUpload = file => {
//     for (var pair of file.entries()) {
//         console.log(pair[0] + ', ' + pair[1]);
//     }
//     return http.post("/web/upload", file);
// }

const deletePicture = id => {
    return http.delete(`/web/upload?trendID=${id}`)
}

const deleteAllPictures = () => {
    return http.delete("web/")
}

//============================
//Projects
//============================

const createProject = data => {
    return http.post("/projects", data);
}

const getAllProjects = id => {
    return http.get(`/projects/${id}`);
}


//edit Project properties,i.e. users with access rights
const updateProject = data => {
    return http.put("/projects", data);
}

//============================
//Reference Systems
//============================

const getReference = id => {
    return http.get(`/reference/all/${id}`);
}

const getOneReference = id => {
    return http.get(`/reference/${id}`);
}

const createReference = (id, data) => {
    console.log(data)
    return http.post("/reference", data);
}

const updateReference = data => {
    console.log(data.id)
    return http.put(`/reference/${data.id}`, data);
}

const deleteReference = id => {
    return http.delete(`/reference/${id}`);
}


const TrendService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    // findByTitle,
    getPicture,
    // createUpload,
    //submitUpload,
    deletePicture,
    deleteAllPictures,
    getAllCond,
    createProject,
    getAllProjects,
    updateProject,
    getReference,
    getOneReference,
    createReference,
    updateReference,
    deleteReference
};
export default TrendService;
