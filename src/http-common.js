import axios from "axios";
import AuthHeader from "./services/AuthHeader";

export default axios.create({
    baseURL: "http://localhost:3001",
    headers:{
        // "Content-type":"application/json"
        ...AuthHeader()
    }
});

