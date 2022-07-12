import React, {useState, useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import TrendDataService from "../services/trend_service";
import TrendRadar from "../components/TrendRadar";
import TrendList from "../components/TrendList";
import TrendDetails from "../components/TrendDetails";
import TrendCircle from "../components/TrendCircle";
import {Navigate, useNavigate} from "react-router-dom";
import LoginError from "../services/LoginError";
import Account from "../components/Account";
import Sidebar from "../components/Sidebar";
import Filter from "../components/Filter";


export default function TrendsView() {
    const navigate = useNavigate()
    const [trends, setTrends] = useState([]);
    const [currentTrend, setCurrentTrend] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    // const retrieveTrends = () => {
    //     TrendDataService.getAll()
    //         .then(response => {
    //             setTrends(response.data);
    //             console.log(response.data);
    //         })
    //         .catch((e,res) => {
    //             console.log('error catch')
    //             console.log(res)
    //             LoginError(navigate, e)
    //             console.log(e);
    //         });
    // };

    const retrieveTrends = () => {
        TrendDataService.getAll()
            .then(response => {
                setTrends(response.data);
                console.log(response.data);
            })
            .catch((e, res) => {
                console.log(res)
                LoginError(navigate, e)
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
        TrendDataService.deleteAllPictures();
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
        console.log(filterMask)
        console.log(trends)
        const trendfilter = trends.filter(trend => filterMask.category.includes(trend.category))
            .filter(trend => filterMask.probability.includes(trend.probability))
            .filter(trend => filterMask.maturity.includes(trend.maturity))
            .filter(trend => filterMask.impact.includes(trend.impact))
        console.log(trendfilter)
        setFilteredTrends(trendfilter)
    }, [filterMask, trends]);


    return (
        // <div style={styles.backgroundContainer}>
        //     <div style={styles.mainContainer}>
        <div style={styles.mainContainer}>
            <Account/>
            <Sidebar/>
            <Row>
                <Col lg={8}>
                    <Filter filterMask={filterMask} setFilterMask={setFilterMask}></Filter>
                </Col>
                <Col lg={4}>
                    <SearchBar trends={trends} setTrends={setTrends} searchTitle={searchTitle}
                               setSearchTitle={setSearchTitle}/>
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
                                   removeAllTrends={removeAllTrends}
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
