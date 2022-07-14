import React, {useState, useEffect} from "react";
import TrendDataService from "../services/trend_service";
import Button from "react-bootstrap/Button";
import {DropdownButton, Form} from "react-bootstrap";

export default function TrendList({
                                      trends,
                                      setActiveTrend,
                                      currentIndex,
                                      filteredTrends,
                                      setFilteredTrends,
                                      removeAllTrends
                                  }) {

    function sortHandler(a, b, type) {
        switch (type) {
            case "ByName":
                return ByName(a, b);
            default:
                break;
        }
    }

    function ByName(a, b) {
        const nameA = a.title.toUpperCase(); // ignore upper and lowercase
        const nameB = b.title.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        // names must be equal
        return 0;
    };

    function AddedFirst() {
        return
    }

    function AddedLast() {
        return
    }

    function UpdatedLast() {
        return
    }

    const [sorting, setSorting] = useState('ByName');

    const sortOptions = ["ByName", "AddedFirst", "AddedLast", "UpdatedLast"]

    return (
        <div>
            <h4>Trends List</h4>
            <Form.Select>
                {sortOptions.map((sortOptions) => (
                    <option
                        onChange={(e) => setSorting(e.target.value)}
                        checked={sorting == sortOptions}
                        value={sortOptions}
                        key={"sorting" + sortOptions}
                        label={sortOptions}
                    ></option>
                ))}
            </Form.Select>
            <br/>
            <ul className="list-group">
                {filteredTrends &&
                    filteredTrends.sort((a, b) => sortHandler(a, b, sorting)).map((trend, index) => (
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
