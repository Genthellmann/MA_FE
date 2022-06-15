import React, {useState, useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import TrendDataService from "../services/trend_service";
import TrendRadar from "../components/TrendRadar";
import TrendList from "../components/TrendList";
import TrendDetails from "../components/TrendDetails";

export default  function TrendsView (){


    const [trends, setTrends] = useState([]);
    const [currentTrend, setCurrentTrend] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

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

    useEffect(() => {
        retrieveTrends();
    }, []);

    return (
        <div style={styles.backgroundContainer}>
            <div style={styles.mainContainer}>
                <Row>
                    <div style={{width: "45%"}}>
                        <SearchBar trends={trends} setTrends={setTrends} searchTitle={searchTitle} setSearchTitle={setSearchTitle} />
                    </div>
                </Row>
                <Row>
                    <div style={ {width: "50%"}}>
                       <TrendRadar trends={trends} setActiveTrend={setActiveTrend} currentIndex={currentIndex}/>
                   </div>
                </Row>
                <Col>
                    <div style={ {width: "50%"}}>
                       <TrendList trends={trends} setActiveTrend={setActiveTrend} currentIndex={currentIndex} removeAllTrends={removeAllTrends}/>
                    </div>
                </Col>
                <div>
                    <TrendDetails currentTrend={currentTrend} />
                </div>
            </div>
        </div>
    )
}

const styles = {
    backgroundContainer: {
        backgroundColor: "black",
        width: "100%",
        height: "100%",
        padding: 10,
        paddingLeft: 70,
        marginTop:0
    },
    mainContainer: {
        borderRadius: 10,
        width: "100%",
        // height: "100%",
        backgroundColor: "white",
        paddingLeft: "10%"
    }
}
