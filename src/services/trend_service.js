import http from "../http-common";

const getAll = () => {
    return http.get("/crud");
};
const get = id => {
    return http.get(`/crud/${id}`);
};
const create = data => {
    console.log(data)
    return http.post("/crud", data);
};
const update = (id, data) => {
    return http.put(`/crud/${id}`, data);
};
const remove = id => {
    return http.delete(`/crud/${id}`);
};
const removeAll = () => {
    return http.delete(`/crud`);
};

// const findByTitle = title => {
//     return http.get(`/crud?title=${title}`);
// };

const getAllCond = data => {
    console.log(data)
    return http.post("/crud/cond", data)
}


const getPicture = id => {
    return http.get(`/web/upload?trendID=${id}`)
}

//transfer uploaded picture to db
const submitUpload = file => {
    for (var pair of file.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }
    return http.post("/web/upload", file);
}

const deletePicture = id => {
    return http.delete(`/web/upload?trendID=${id}`)
}

const deleteAllPictures = () => {
    return http.delete("web/")
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
    submitUpload,
    deletePicture,
    deleteAllPictures,
    getAllCond
};
export default TrendService;
