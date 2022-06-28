import React, {useState,useEffect} from "react";
import TrendDataService from "../services/trend_service";
import Button from "react-bootstrap/Button";

export default function TrendList({trends, setActiveTrend, currentIndex, removeAllTrends}){


    return(
        <div>
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
            <Button variant="danger"
                onClick={removeAllTrends}
            >
                Remove All
            </Button>
        </div>
    );
}
