import React, {useEffect,useState} from "react";
import {Link} from "react-router-dom";

export default function TrendDetails({currentTrend}){
    return(
        <div>
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
    );
}