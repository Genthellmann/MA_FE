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
const findByTitle = title => {
    return http.get(`/crud?title=${title}`);
};

// //upload mask for picture
// const createUpload = () =>{
//     return http.get("/web/home");
// }

const getPicture = id => {
    return http.get(`/web/upload?trendID=${id}`)
}

//transfer uploaded picture to db
const submitUpload = file =>{
    return http.post("/web/upload");
}

const deletePicture = id =>{
    return http.delete(`/web/upload?trendID=${id}`)
}

const deleteAllPictures =() =>{
    return http.delete("web/")
}

const TrendService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle,
    getPicture,
    // createUpload,
    submitUpload,
    deletePicture,
    deleteAllPictures,
};
export default TrendService;
