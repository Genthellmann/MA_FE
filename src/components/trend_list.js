import React, { useState, useEffect } from "react";
import TrendDataService from "../services/trend_service";
import { Link } from "react-router-dom";
import SeparatingLines from "../components/SeparatingLines";
import TrendRadar from "../components/trendRadar";


const TrendList = () => {
    let radius = {radius1: 80 , radius2: 60, radius3: 40}
    const [trends, setTrends] = useState([]);
    const [currentTrend, setCurrentTrend] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");
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
    const refreshList = () => {
        retrieveTrends();
        setCurrentTrend(null);
        setCurrentIndex(-1);
    };
    const setActiveTrend = (trend, index) => {
        setCurrentTrend(trend);
        setCurrentIndex(index);
    };
    const removeAllTrends = () => {
        TrendDataService.removeAll()
            .then(response => {
                console.log(response.data);
                refreshList();
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
        <div className="list row">
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
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByTitle}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div style={{'display':'flex', 'justifyContent':'center', "alignItems": "center", 'overflow':'hidden', "height" : `${Math.max(radius.radius1)}vw`}}>
                <TrendRadar radius={radius.radius1} color={"#d2d2d5"} position={0}/>
                <TrendRadar radius={radius.radius2} color={"#b8b8b8"} position={1}/>
                <TrendRadar radius={radius.radius3} color={"#999797"} position={2}/>

                <div style={{'display':'flex', 'justifyContent':'center', 'alignItems': 'center', 'zIndex': 155,} }>
                    <div style={{'position':'absolute', 'zIndex':160,}}>
                        <SeparatingLines length={radius.radius1/2} angle={0}/>
                        <SeparatingLines length={radius.radius1/2} angle={120}/>
                        <SeparatingLines length={radius.radius1/2} angle={240}/>
                    </div>
                    {/*<TrendFC position={3} color={"red"} radius={5} left={100} bottom={100} />*/}
                    {/*<TrendFC position={3} color={"red"} radius={5} left={100} bottom={-100} />*/}
                </div>

            </div>
            <div className="col-md-6">
                <h4>Trends List</h4>
                <ul className="list-group">
                    {trends &&
                        trends.map((trend, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveTrend(trend, index)}
                                key={index}
                            >
                                {trend.title}
                            </li>
                        ))}
                </ul>
                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllTrends}
                >
                    Remove All
                </button>
            </div>
            <div className="col-md-6">
                {currentTrend ? (
                    <div>
                        <h4>Trend</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{" "}
                            {currentTrend.title}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{" "}
                            {currentTrend.description}
                        </div>
                        <div>
                            {/*<label>*/}
                            {/*    <strong>Status:</strong>*/}
                            {/*</label>{" "}*/}
                            {/*{currentTrend.published ? "Published" : "Pending"}*/}
                        </div>
                        <button className={"m-3 btn btn-sm variant=link"}>
                        <Link
                            to={"/trend/" + currentTrend.id}
                        >
                            Edit
                        </Link>
                    </button>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Trend...</p>
                    </div>
                )}
            </div>
        </div>    );
};
export default TrendList;
