import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Card, Col, Row} from "react-bootstrap";
import ExpendableText from "./ExpendableText";
import FileReturn from "./FileReturn";
import Button from "react-bootstrap/Button";
import {BsArrowRight} from 'react-icons/bs'
import {AiOutlineArrowRight} from 'react-icons/ai'


export default function TrendDetails({currentTrend}) {
    const navigate = useNavigate();
    //Set max Height for Expendable Text Container
    const maxHeight = 150;


    return (
        <div>
            {currentTrend.id ? (
                <Row style={styles.RowStyles}>
                    <h4>{currentTrend.title}</h4>
                    <Col sm={7} style={styles.cardCol}>
                        <Card className="card border-secondary me-3"
                              style={styles.CardStyle}>
                            <Card.Body>
                                <Card.Title>Description</Card.Title>
                                <ExpendableText maxHeight={maxHeight}>
                                    {currentTrend.description}
                                </ExpendableText>
                            </Card.Body>
                        </Card>
                        <Card className="card border-secondary me-3 mt-3"
                              style={styles.CardStyle}
                        >
                            <Card.Body>
                                <Card.Title>Implication</Card.Title>
                                <ExpendableText maxHeight={maxHeight}>
                                    {currentTrend.implication}
                                </ExpendableText>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={5} style={styles.cardCol}>
                        <Card className="card border-secondary"
                              style={styles.CardStyle}
                        >
                            <Card.Body>
                                <Card.Title>Picture</Card.Title>
                                <FileReturn id={currentTrend.id}></FileReturn>
                            </Card.Body>
                        </Card>
                        <Card className="card border-secondary mt-3"
                              style={styles.CardStyle}
                        >
                            <Card.Body>
                                <Card.Title>Evaluation</Card.Title>
                                <div>
                                    <ul>
                                        <li>
                                            <span>Category: <strong>{currentTrend.category}</strong></span>
                                        </li>
                                        <li>
                                            <span>Probability of
                                                Occurence: <strong>{currentTrend.probability}</strong></span>
                                        </li>
                                        <li>
                                        <span>Impact on System
                                            Generation: <strong>{currentTrend.impact}</strong></span>
                                        </li>
                                        <li>
                                            <span>Maturity: <strong>{currentTrend.maturity}</strong></span>
                                        </li>
                                    </ul>
                                </div>
                            </Card.Body>
                        </Card>
                        {/*    </Col>*/}
                        {/*    <Col lg={4} style={{display: "flex", flexDirection: "column", alignItems: "end"}}>*/}
                        {/*        <h4>Actions</h4>*/}
                        {/*        <button class="btn btn-lg btn-outline-secondary"*/}
                        {/*                onClick={() => navigate(`/RS/${currentTrend.id}`)}*/}
                        {/*                style={styles.actionBtn}>*/}
                        {/*            <div style={{display: "flex", alignItems: "center"}}*/}
                        {/*            >Reference System <AiOutlineArrowRight size='1.75rem' style={{marginLeft: '0.5rem'}}/>*/}
                        {/*            </div>*/}
                        {/*        </button>*/}
                        {/*        <button className="btn btn-lg btn-outline-secondary"*/}
                        {/*                onClick={() => navigate(`/vpc/${currentTrend.id}`)}*/}
                        {/*                style={styles.actionBtn}>*/}
                        {/*            <div style={{display: "flex", alignItems: "center",}}*/}
                        {/*            >User Benefit <AiOutlineArrowRight size='1.75rem' style={{marginLeft: '0.5rem'}}/>*/}
                        {/*            </div>*/}
                        {/*        </button>*/}
                        {/*        <button className="btn btn-lg btn-outline-secondary"*/}
                        {/*                onClick={() => navigate(`/vpc/${currentTrend.id}`)}*/}
                        {/*                style={styles.actionBtn}>*/}
                        {/*            <div style={{display: "flex", alignItems: "center"}}*/}
                        {/*            >Strategic Positioning <AiOutlineArrowRight size='1.75rem'*/}
                        {/*                                                        style={{*/}
                        {/*                                                            marginLeft: '0.5rem',*/}
                        {/*                                                        }}/>*/}
                        {/*            </div>*/}
                        {/*        </button>*/}
                        {/*        /!*<Link to={"/RS/" + currentTrend.id}>Reference System </Link>*!/*/}
                        {/*        /!*<Link to={"/vpc/" + currentTrend.id}>User & Customer Benefits</Link>*!/*/}
                        {/*        /!*<Link to={"/vpc/" + currentTrend.id}>Strategic Positioning</Link>*!/*/}
                    </Col>
                </Row>
            ) : (
                <div>
                    <br/>
                    <div>Please click on a Trend...</div>
                </div>
            )}
        </div>

    );
}

const styles = {
    cardCol: {
        padding: 0,
    },
    RowStyles: {
        margin: 0,
        marginTop: '0rem'
    },
    CardStyle: {
        borderRadius: '1.078rem'
    },
    actionBtn: {
        width: '18rem',
        display: "flex",
        justifyContent: "center",
        marginBottom: '1rem'
    }
}

