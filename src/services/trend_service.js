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
    return http.get(`/web/upload?id=${id}`)
}

//transfer uploaded picture to db
const submitUpload = file =>{
    return http.post("/web/upload");
}

const editUpload = () =>{
    return http.get("web/home");
}

const TrendService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle,
    // createUpload,
    submitUpload,
    editUpload
};
export default TrendService;
