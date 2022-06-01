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
const TrendService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};
export default TrendService;
