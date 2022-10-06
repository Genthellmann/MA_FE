import React from 'react';
import {Link} from "react-router-dom";

function PageNotFound(props) {
    return (
        <div style={{padding: '5rem'}}>
            <h1>404 Page not Found</h1>
            <span>The page you are trying access was not found or does not exist.</span>
            <br/>
            <Link to={"../trend"}>Home</Link>
        </div>
    );
}

export default PageNotFound;