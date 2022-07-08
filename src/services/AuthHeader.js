// helper function called authHeader to retrieve data
// HTTP Authorization header

// If: user logged in with accessToken (JWT), return HTTP Authorization header.
// else: return an empty object.

export default function AuthHeader(){
    const user = JSON.parse(localStorage.getItem('user'));
    if(user && user.accessToken){
        return { Authorization: 'Bearer ' + user.accessToken};
    } else {
        return {};
    }
};