import React, {useEffect,useState} from "react";
import {Link} from "react-router-dom";
import {Card, Col, Row} from "react-bootstrap";
import ExpendableText from "./ExpendableText";
import FileReturn from "./FileReturn";
import Button from "react-bootstrap/Button";

export default function TrendDetails({currentTrend}){



    const maxHeight = 150;
    return(
        <div>
            {currentTrend ? (
                // <div>
                //     <h4>{currentTrend.title}</h4>
                //     <Card style={{width:'70%'}}>
                //         <Card.Body>
                //             <Card.Title>Description</Card.Title>
                //             <ExpendableText maxHeight={maxHeight}>
                //                     {currentTrend.description}
                //             </ExpendableText>
                //         </Card.Body>
                //     </Card>
                //     <Card style={{width:'70%'}}>
                //         <Card.Body>
                //             <Card.Title>Implication</Card.Title>
                //             <ExpendableText maxHeight={150}>
                //                 {"implication:" + currentTrend.implication}
                //             </ExpendableText>
                //         </Card.Body>
                //     </Card>
                //     <Card style={{width:'50%'}}>
                //         <Card.Body>
                //             <Card.Title>Picture</Card.Title>
                //                 <FileReturn id={currentTrend.id}></FileReturn>
                //             </Card.Body>
                //     </Card>
                //     <Card style={{width:'50%'}}>
                //         <Card.Body>
                //             <Card.Title>Evaluation</Card.Title>
                //             <ExpendableText maxHeight={maxHeight}>
                //                 Category: <strong>{currentTrend.category}</strong>{'\n'}
                //                 Probability of Occurence: <strong>{currentTrend.probability}</strong>{'\n'}
                //                 Impact on System Generation: <strong>{currentTrend.impact}</strong>{'\n'}
                //                 Maturity: <strong>{currentTrend.maturity}</strong>
                //             </ExpendableText>
                //         </Card.Body>
                //     </Card>
                //     <button className={"m-3 btn btn-sm variant=link"}>
                //         <Link
                //             to={"/trend/" + currentTrend.id}
                //         >
                //             Edit
                //         </Link>
                //     </button>
                // </div>
                <div>
                    <Row>
                    <h4>{currentTrend.title}</h4>
                    <Col lg={8} style={styles.cardCol}>
                        <Card >
                            <Card.Body>
                                <Card.Title>Description</Card.Title>
                                <ExpendableText maxHeight={maxHeight}>
                                    {currentTrend.description}
                                </ExpendableText>
                            </Card.Body>
                        </Card>
                        <Card >
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
                                    Category: <strong>{currentTrend.category}</strong>{'\n'}
                                    Probability of Occurence: <strong>{currentTrend.probability}</strong>{'\n'}
                                    Impact on System Generation: <strong>{currentTrend.impact}</strong>{'\n'}
                                    Maturity: <strong>{currentTrend.maturity}</strong>
                                </ExpendableText>
                            </Card.Body>
                        </Card>
                        <Button variant="primary" size="sm" >
                            <Link to={"/trend/" + currentTrend.id} style={{'color':'white'}}> Edit </Link>
                        </Button>
                        </Col>
                </Row>
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

const styles = {
    cardCol:{
        padding: 0,
    }
}