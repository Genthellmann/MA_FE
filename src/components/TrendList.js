import React, {useState, useEffect} from "react";
import TrendDataService from "../services/trend_service";
import Button from "react-bootstrap/Button";
import {Container, DropdownButton, Form} from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import Filter from "./Filter";
import {ProjectContext} from "./ProjectContextProvider";
import {Link, useNavigate} from "react-router-dom";
import LoginError from "../services/LoginError";


export default function TrendList({
                                      setActiveTrend,
                                      currentTrend,
                                      currentIndex,
                                      filteredTrends,
                                      removeAllTrends,
                                      filterMask,
                                      setFilterMask,
                                      deleteTrend,
                                  }) {
    let navigate = useNavigate();
    const currentProject = React.useContext(ProjectContext);

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
        <div style={{paddingTop: '1vw', paddingLeft: 0}}>
            <Container style={styles.FilterSortBtnContainer}>
                <DropdownButton id="dropdown-sort-button" title={sorting}
                                variant="light"
                                style={styles.SortButton}>
                    {sortOptions.map((sortOptions) => (
                        <Dropdown.Item
                            onClick={e => setSorting(e.target.text)}
                            value={sortOptions}
                            key={"sorting" + sortOptions}
                            variant="primary"
                        >{sortOptions}</Dropdown.Item>
                    ))}
                </DropdownButton>
                <Filter filterMask={filterMask} setFilterMask={setFilterMask}></Filter>
            </Container>
            <div style={styles.ListContainer}>
                <ul className="list-group" style={styles.ListGroup}>
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
            </div>
            <div style={styles.BtnContainer}>
                <button class='btn btn-outline-primary' onClick={(e) => {
                    navigate("/trend/" + currentTrend.id)
                }}
                        disabled={!currentTrend}
                        style={{paddingLeft: "3em", paddingRight: "3em"}}
                > Edit
                </button>
                <button class="btn btn-outline-warning" style={{paddingLeft: "2.5em", paddingRight: "2.5em"}}
                        onClick={() => deleteTrend()}
                        disabled={!currentTrend}
                >
                    Delete
                </button>
                <button class="btn btn-outline-danger"
                        onClick={() => removeAllTrends()}
                        disabled={true}
                >
                    Remove All
                </button>
            </div>
            <div className="mt-3" style={{display: "flex", justifyContent: "center"}}>
                <button class="btn btn-primary btn-lg"
                        onClick={() => navigate("/add")}
                        style={styles.AddButton}>Add Trend
                </button>
            </div>
        </div>
    );
}

const styles = {
    SortButton: {
        marginRight: '2rem',
    },

    FilterSortBtnContainer: {
        display: "flex",
        justifyContent: "left",
        paddingLeft: 0,
        paddingBottom: '1rem'
    },
    ListContainer: {
        marginBottom: '2rem',
        display: "flex",
        justifyContent: "center",

    },
    ListGroup: {
        borderRadius: '1em',
        overflow: 'scroll',
        maxHeight: '70vh',
        width: '100%'
    },
    AddButton: {
        paddingLeft: '2rem',
        paddingRight: '2rem'
    },
    BtnContainer: {
        display: "flex",
        justifyContent: "space-around",
        marginBottom: '2rem'
    }
}