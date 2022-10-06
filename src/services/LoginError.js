import React from 'react';
import {Navigate, useNavigate} from 'react-router-dom';

const LoginError = (navigate, e) => {
    console.log(e.response)
    if ((e.response.status === 401) || (e.response.status === 403)) {
        navigate("/login");
        window.location.reload();
    }

    if (e.response.status === 400) {

    }

    return
}

export default LoginError;