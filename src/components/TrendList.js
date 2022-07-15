import React, {useState, useEffect} from "react";
import TrendDataService from "../services/trend_service";
import Button from "react-bootstrap/Button";
import {DropdownButton, Form} from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';


export default function TrendList({
                                      setActiveTrend,
                                      currentIndex,
                                      filteredTrends,
                                      removeAllTrends
                                  }) {

    function sortHandler(a, b, type) {
        switch (type) {
            case "ByName":
                return ByName(a, b);
            case "AddedFirst":
                return AddedFirst(a, b);
            case "AddedLast":
                return AddedLast(a, b);
            case "UpdatedLast":
                return UpdatedLast(a, b);
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

    function AddedFirst(a, b) {
        return new Date(a.createdAt) - new Date(b.createdAt)
    }

    function AddedLast(a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt)

    }

    function UpdatedLast(a, b) {
        return new Date(b.updatedAt) - new Date(a.updatedAt)
    }

    const [sorting, setSorting] = useState('ByName');

    const sortOptions = ["ByName", "AddedFirst", "AddedLast", "UpdatedLast"]

    return (
        <div>
            <h4>Trends List</h4>
            <DropdownButton id="dropdown-basic-button" title={sorting}>
                {sortOptions.map((sortOptions) => (
                    <Dropdown.Item
                        onClick={e => setSorting(e.target.text)}
                        value={sortOptions}
                        key={"sorting" + sortOptions}
                    >{sortOptions}</Dropdown.Item>
                ))}
            </DropdownButton>
            {/*<Form.Select >*/}
            {/*    {sortOptions.map((sortOptions) => (*/}
            {/*        <option*/}
            {/*            // onChange={e => setSorting(e.target.value)}*/}
            {/*            onChange={e => handleSelect(e)}*/}
            {/*            checked={sorting == sortOptions}*/}
            {/*            value={sortOptions}*/}
            {/*            key={"sorting" + sortOptions}*/}
            {/*            label={sortOptions}*/}
            {/*        ></option>*/}
            {/*    ))}*/}
            {/*</Form.Select>*/}
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
