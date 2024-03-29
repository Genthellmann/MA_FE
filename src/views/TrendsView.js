import React, {useState, useEffect, useContext} from "react";
import {Col, Container, Modal, Row} from "react-bootstrap";
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
import NavBar from "../unused/NavBar";
// import Button from '@mui/material/Button';
import NavBar2 from "../components/NavBar2";
import {AiOutlineArrowRight} from "react-icons/ai";
import CStyles from "../components/customTheme/ComponentStyles";
import Actions from "../components/Actions";
import Button from "react-bootstrap/Button";
import {PromptContext} from "../components/ContextPromptProvider";


export default function TrendsView() {
    const navigate = useNavigate();
    //set global project state for entire app component
    const currentProject = React.useContext(ProjectContext);

    var stored_trend = sessionStorage.getItem("trend");

    var stored_index = sessionStorage.getItem("index");

    //======================
    //prompt page reload
    //======================
    const promptContext = useContext(PromptContext);
    useEffect(() => {
        return () => {
            promptContext.setShowExitPrompt(false);
        }
    }, [])

    const initStoredTrend = {
        id: null
    }


    const [trends, setTrends] = useState([]);
    const [currentTrend, setCurrentTrend] = useState(JSON.parse(stored_trend) ? JSON.parse(stored_trend) : initStoredTrend);
    const [currentIndex, setCurrentIndex] = useState(JSON.parse(stored_index));
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

    //refresh List after Delete
    const refreshListad = () => {
        retrieveTrends(currentProject.project);
        // setCurrentTrend(null);
        // setCurrentIndex(-1);
    };

    // //refresh List after Delete
    // const refreshList = () => {
    //     retrieveTrends(currentProject.project);
    // };

    // const setActiveTrend = (trend, index) => {
    //     setCurrentTrend(trend);
    //     setCurrentIndex(index);
    //     sessionStorage.setItem("trend", JSON.stringify(trend))
    //     sessionStorage.setItem("index", JSON.stringify(index))
    //     // localStorage.setItem("user", JSON.stringify(response.data));
    //     console.log(filteredTrends)
    //     console.log(trends)
    //
    // };

    const setActiveTrend = (trend, index) => {
        setCurrentTrend(trend);
        sessionStorage.setItem("trend", JSON.stringify(trend))
    };

    const removeAllTrends = () => {
        //TrendDataService.deleteAllPictures();
        TrendDataService.removeAll(currentProject.project)
            .then(response => {
                refreshListad();
                setShow(false);
            })
            .catch(e => {
                console.log(e);
                LoginError(navigate, e)
            });
    };

    const deleteTrend = () => {
        TrendDataService.remove(currentTrend.id)
            .then(response => {
                refreshListad();
                sessionStorage.clear();
                setCurrentTrend(initStoredTrend)
                // setCurrentTrend(false);
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
    const [filteredTrends, setFilteredTrends] = useState(trends);

    React.useEffect(() => {
        const trendfilter = trends.filter(trend => filterMask.category.includes(trend.category))
            .filter(trend => filterMask.probability.includes(trend.probability))
            .filter(trend => filterMask.maturity.includes(trend.maturity))
            .filter(trend => filterMask.impact.includes(trend.impact))
            .filter(trend => trend.title.toLowerCase().includes(searchTitle.toLowerCase()))
        setFilteredTrends(trendfilter)
    }, [filterMask, trends, searchTitle]);


    //=================
    //Modal Delete All
    //================
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div>
            <NavBar2/>
            <div style={CStyles.backgroundContainer}>
                <Row style={styles.RowStyle}>
                    <Col xl={1} sm={0}></Col>
                    <Col xl={6} style={styles.ColStyle}>
                        <div style={{
                            display: 'flex',
                            position: 'relative',
                            justifyContent: 'center',
                            alignItems: "center",
                            flexDirection: "column",
                            aspectRatio: 1
                        }}>
                            <TrendRadar trends={trends} setTrends={setTrends} currentTrend={currentTrend}
                                        filteredTrends={filteredTrends}
                                        setActiveTrend={setActiveTrend} currentIndex={currentIndex}/>
                        </div>
                        <TrendDetails currentTrend={currentTrend}/>
                    </Col>
                    <Col xl={1} sm={0}></Col>
                    <Col xl={3} style={styles.ColStyle}>
                        <div style={{marginBottom: "5rem"}}>
                            <SearchBar searchTitle={searchTitle} setSearchTitle={setSearchTitle}/>
                            <TrendList trends={trends} setActiveTrend={setActiveTrend}
                                       currentIndex={currentIndex} currentTrend={currentTrend}
                                       filteredTrends={filteredTrends} setFilteredTrends={setFilteredTrends}
                                       removeAllTrends={removeAllTrends} filterMask={filterMask}
                                       setFilterMask={setFilterMask} deleteTrend={deleteTrend}
                                       handleClose={handleClose} handleShow={handleShow}
                                       style={{width: '45%'}}/>
                        </div>
                        <Actions RB="true" BS="true"></Actions>
                    </Col>
                    <Col xl={1} sm={0}></Col>
                    <div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Warning</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to delete all trends? This step can not be
                                undone.</Modal.Body>
                            <Modal.Footer>
                                <Button className="btn btn-secondary" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button className="btn btn-danger" onClick={() => removeAllTrends()}>
                                    Delete All
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </Row>
                {/*<Row style={styles.RowStyle}>*/}
                {/*    <Col style={styles.ColStyle}>*/}
                {/*        <div>*/}
                {/*            <TrendDetails currentTrend={currentTrend}/>*/}
                {/*        </div>*/}
                {/*    </Col>*/}
                {/*</Row>*/}
            </div>
        </div>
    )
}

const styles = {
    backgroundContainer: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        paddingLeft: '1vw',
        paddingRight: '1vw',
        paddingTop: '2vw',
    },
    RowStyle: {
        margin: 0
    },
    ColStyle: {
        padding: 0,
        // display: "flex",
        // justifyContent: "center",
        // flexDirection: "column",
        // alignItems: "center"
    },
    actionBtn: {
        width: '18rem',
        display: "flex",
        justifyContent: "center",
        marginBottom: '1rem'
    }
}