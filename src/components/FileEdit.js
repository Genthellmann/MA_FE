import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import FileReturn from "./FileReturn";
import TrendDataService from "../services/trend_service";
import FileUp from "./FileUp";


function FileEdit({props, ID}){
    console.log("FileEdit: " + ID)
    const [edit, setEdit] = useState(false);

    const url = "http://localhost:3001/web/upload?id=" + ID;

    const handleChange=()=>{
        TrendDataService.deletePicture(ID);
        setEdit(true);
        console.log(edit);
    }

    // React.useEffect(()=>{
    // }, [])

    return (<div>
        {edit ? (
            <div>
                <FileUp ID={ID}></FileUp>
            </div>

            ):(
            <div>
                <FileReturn id={ID}></FileReturn>
                <Button onClick={handleChange}>Edit</Button>
            </div>

        )} </div>
        );
}

export default FileEdit;