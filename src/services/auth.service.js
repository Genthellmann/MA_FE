// Axios for HTTP requests and Local Storage for user information & JWT.
// provides following functions:
// login(): POST {username, password} & save JWT to Browsers Local Storage
// logout(): remove JWT from Browsers Local Storage
// register(): POST {username, email, password}
// getCurrentUser(): get user information (including JWT)

import axios from "axios";
//User can sign up
const register = (username, email, password) =>{
    return axios.post("http://localhost:4000/login/signup",{
        username,
        email,
        password
    });
};

//user can login
const login = (username,password) => {
    return axios.post("http://localhost:4000/login/signin",{
        username,
        password
    }).then((response) => {
        //write JWT to Browser localStorage
        if(response.data.accessToken){
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    });
};

//user can log out
const logout = () =>{
    //TO DO: Link to backend method logout
    localStorage.removeItem("user");
}

//return current user
const getCurrentUser= () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;