import React, {useEffect,useState} from "react";
import {Link} from "react-router-dom";
import {Card} from "react-bootstrap";
import ExpendableText from "./ExpendableText";

export default function TrendDetails({currentTrend}){



    const maxHeight = 150;
    return(
        <div>
            {currentTrend ? (
                <div>
                    <h4>{currentTrend.title}</h4>
                    <Card style={{width:'50%'}}>
                        <Card.Body>
                            <Card.Title>Description</Card.Title>
                            <ExpendableText maxHeight={maxHeight}>
                                    {currentTrend.description}
                            </ExpendableText>
                        </Card.Body>
                    </Card>
                    <Card style={{width:'50%'}}>
                        <Card.Body>
                            <Card.Title>Implication</Card.Title>
                            <ExpendableText maxHeight={150}>
                                {"implication:" + currentTrend.implication}
                            </ExpendableText>
                        </Card.Body>
                    </Card>
                    <Card style={{width:'50%'}}>
                        <Card.Body>
                            <Card.Title>Picture</Card.Title>
                            <ExpendableText maxHeight={maxHeight}>
                                {currentTrend.picture}
                            </ExpendableText>
                        </Card.Body>
                    </Card>
                    <Card style={{width:'50%'}}>
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





                    <button className={"m-3 btn btn-sm variant=link"}>
                        <Link
                            to={"/trend/" + currentTrend.id}
                        >
                            Edit
                        </Link>
                    </button>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Trend...</p>
                </div>
            )}
        </div>
    // <div>
    //     {currentTrend ? (
    //         <div>
    //             <h4>Trend</h4>
    //             <div>
    //                 <label>
    //                     <strong>Title:</strong>
    //                 </label>{" "}
    //                 {currentTrend.title}
    //             </div>
    //             <div>
    //                 <label>
    //                     <strong>Description:</strong>
    //                 </label>{" "}
    //                 {currentTrend.description}
    //             </div>
    //             <button className={"m-3 btn btn-sm variant=link"}>
    //                 <Link
    //                     to={"/trend/" + currentTrend.id}
    //                 >
    //                     Edit
    //                 </Link>
    //             </button>
    //         </div>
    //     ) : (
    //         <div>
    //             <br />
    //             <p>Please click on a Trend...</p>
    //         </div>
    //     )}
    // </div>
    );
}