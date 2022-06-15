import React, { useState, useEffect } from "react";
import TrendDataService from "../services/trend_service";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import TrendList from "../unused/trend_list";

const SearchBar = ({trends, setTrends, searchTitle, setSearchTitle}) =>{

    //array for all trends from db
    const count = 6;
    const data = Array.from({length:count}, (_,index)=> index);

    useEffect(() => {
        retrieveTrends();
    }, []);

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const retrieveTrends = () => {
        TrendDataService.getAll()
            .then(response => {
                setTrends(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByTitle = () => {
        TrendDataService.findByTitle(searchTitle)
            .then(response => {
                setTrends(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="col-md-8">
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search Trend by title"
                    value={searchTitle}
                    onChange={onChangeSearchTitle}
                />
                <div className="input-group-append">
                    <button
                        className="btn btn-outline-dark"
                        type="button"
                        onClick={findByTitle}
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    )
};

export default SearchBar;
