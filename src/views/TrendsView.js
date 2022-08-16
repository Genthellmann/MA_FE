import React, {useState, useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import TrendDataService from "../services/trend_service";
import TrendRadar from "../components/TrendRadar";
import TrendList from "../components/TrendList";
import TrendDetails from "../components/TrendDetails";
import {Link, Navigate, useNavigate} from "react-router-dom";
import LoginError from "../services/LoginError";
import Account from "./Account";
import Sidebar from "../components/Sidebar";
import {ProjectContext} from "../components/ProjectContextProvider";
import Button from "react-bootstrap/Button";


export default function TrendsView() {
    const navigate = useNavigate();
    //set global project state for entire app component
    const currentProject = React.useContext(ProjectContext);

    const [trends, setTrends] = useState([]);
    const [currentTrend, setCurrentTrend] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    const retrieveTrends = cp => {
        TrendDataService.getAll(cp)
            .then(response => {
                setTrends(response.data);
            })
            .catch(e => {
                LoginError(navigate, e)
            });
    };

    useEffect(() => {
        retrieveTrends(currentProject.project)
    }, [])

    const refreshList = () => {
        retrieveTrends(currentProject.project);
        setCurrentTrend(null);
        setCurrentIndex(-1);
    };

    const setActiveTrend = (trend, index) => {
        setCurrentTrend(trend);
        setCurrentIndex(index);
    };

    const removeAllTrends = () => {
        //TrendDataService.deleteAllPictures();
        TrendDataService.removeAll(currentProject.project)
            .then(response => {
                refreshList();
            })
            .catch(e => {
                console.log(e);
                LoginError(navigate, e)
            });
    };


    //Only show trends depending on Filter setting
    //Retrieve all trends from db and only change view depending on filters set
    //initially show all trends and set all filters checked
    const initFilterMask = {
        category: ["user", "technology", "menv"],
        maturity: ["low", "medium", "high"],
        probability: ["low", "medium", "high"],
        impact: ["low", "medium", "high"],
    }
    const [filterMask, setFilterMask] = useState(initFilterMask);
    const [filteredTrends, setFilteredTrends] = useState([]);

    React.useEffect(() => {
        const trendfilter = trends.filter(trend => filterMask.category.includes(trend.category))
            .filter(trend => filterMask.probability.includes(trend.probability))
            .filter(trend => filterMask.maturity.includes(trend.maturity))
            .filter(trend => filterMask.impact.includes(trend.impact))
            .filter(trend => trend.title.toLowerCase().includes(searchTitle.toLowerCase()))
        setFilteredTrends(trendfilter)
    }, [filterMask, trends, searchTitle]);

    return (
        // <div style={styles.backgroundContainer}>
        //     <div style={styles.mainContainer}>
        <div style={styles.mainContainer}>
            <Account/>
            <Sidebar/>
            <Row>
                <Col lg={8}>
                </Col>
                <Col lg={4}>
                    <SearchBar searchTitle={searchTitle} setSearchTitle={setSearchTitle}/>
                </Col>
            </Row>
            <Row>
                <Col lg={8}>
                    <div>
                        <TrendRadar trends={trends} setTrends={setTrends}
                                    filteredTrends={filteredTrends}
                                    setActiveTrend={setActiveTrend} currentIndex={currentIndex}/>
                    </div>
                </Col>
                <Col lg={4}>
                    <div>
                        <TrendList trends={trends} setActiveTrend={setActiveTrend} currentIndex={currentIndex}
                                   filteredTrends={filteredTrends} setFilteredTrends={setFilteredTrends}
                                   removeAllTrends={removeAllTrends} filterMask={filterMask}
                                   setFilterMask={setFilterMask}
                                   style={{width: '45%'}}/>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={8}>
                    <div>
                        <TrendDetails currentTrend={currentTrend}/>
                    </div>
                </Col>
            </Row>
        </div>

        // </div>
    )
}

const styles = {
    mainContainer: {
        borderRadius: 10,
        width: "100%",
        // height: "100%",
        backgroundColor: "white",
        paddingLeft: "10%",
        paddingBottom: 5,
        paddingTop: 5,
        paddingRight: 5,
    }
}
