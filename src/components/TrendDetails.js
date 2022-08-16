import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Card, Col, Row} from "react-bootstrap";
import ExpendableText from "./ExpendableText";
import FileReturn from "./FileReturn";
import Button from "react-bootstrap/Button";

export default function TrendDetails({currentTrend}) {
    //Set max Height for Expendable Text Container
    const maxHeight = 150;

    return (
        <div>
            {currentTrend ? (
                <div>
                    <Row>
                        <h4>{currentTrend.title}</h4>
                        <Col lg={8} style={styles.cardCol}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Description</Card.Title>
                                    <ExpendableText maxHeight={maxHeight}>
                                        {currentTrend.description}
                                    </ExpendableText>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Implication</Card.Title>
                                    <ExpendableText maxHeight={maxHeight}>
                                        {currentTrend.implication}
                                    </ExpendableText>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4} style={styles.cardCol}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Picture</Card.Title>
                                    <FileReturn id={currentTrend.id}></FileReturn>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Evaluation</Card.Title>
                                    <ExpendableText maxHeight={maxHeight}>
                                        <ul>
                                            <li>Category: <strong>{currentTrend.category}</strong>{'\n'}</li>
                                            <li>Probability of
                                                Occurence: <strong>{currentTrend.probability}</strong>{'\n'}</li>
                                            <li>Impact on System
                                                Generation: <strong>{currentTrend.impact}</strong>{'\n'}</li>
                                            <li>Maturity: <strong>{currentTrend.maturity}</strong></li>
                                        </ul>
                                    </ExpendableText>
                                </Card.Body>
                            </Card>
                            <Button variant="primary" size="sm">
                                <Link to={"/trend/" + currentTrend.id}
                                      style={{'color': 'white', textDecoration: 'none'}}> Edit </Link>
                            </Button>
                            <Button variant="primary" size="sm">
                                <Link to={"/RS/" + currentTrend.id} style={{'color': 'white', textDecoration: 'none'}}>Reference
                                    System </Link>
                            </Button>
                        </Col>
                    </Row>
                </div>
            ) : (
                <div>
                    <br/>
                    <p>Please click on a Trend...</p>
                </div>
            )}
        </div>

    );
}

const styles = {
    cardCol: {
        padding: 0,
    }
}