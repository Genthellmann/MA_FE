import React, {useState, useEffect} from "react";
import TrendDataService from "../services/trend_service";
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import TrendList from "../unused/trend_list";
import {Search} from "react-bootstrap-icons";
import Form from 'react-bootstrap/Form';
import {AiOutlineSearch} from "react-icons/ai"


const SearchBar = ({searchTitle, setSearchTitle}) => {
    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    return (
        <div className="d-flex" style={{marginRight: 0}}>
            <Form.Control
                variant="outline-dark"
                type="text"
                className="form-control me-sm-2"
                placeholder="Search"
                value={searchTitle}
                onChange={onChangeSearchTitle}
                style={{borderRadius: '1em', marginRight: 0}}
            />
        </div>
    )
};

export default SearchBar;
