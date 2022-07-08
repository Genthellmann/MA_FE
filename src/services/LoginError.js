import React from 'react';
import {Navigate, useNavigate} from 'react-router-dom';

const LoginError = (navigate, e) => {
    if((e.response.status === 401) || (e.response.status === 403)) {
        navigate("/login");
        window.location.reload();
    }
    return
}

export default LoginError;