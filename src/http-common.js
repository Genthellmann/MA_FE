import axios from "axios";
import AuthHeader from "./services/AuthHeader";

//=========================
//change when switching host
//=========================


export default axios.create({
    baseURL: "http://localhost:3001",
    headers: {
        // "Content-type":"application/json"
        ...AuthHeader(),
    }
});


// export default axios.create({
//     baseURL: "https://api.ux-trendradar.de",
//     headers: {
//         // "Content-type":"application/json"
//         ...AuthHeader(),
//     }
// });

