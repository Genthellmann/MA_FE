import React from 'react';
import {AiOutlineArrowRight} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Modal} from "react-bootstrap";

function Actions({Trend, RB, BS}) {
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Navigate to RS if Trends is selected else show Modal
    const handleRefNav = () => {
        var curTrend = JSON.parse(sessionStorage.getItem("trend"))
        if (curTrend)
            navigate(`/RS/${curTrend.id}`)
        else
            setShow(true)
    }

    //Navigate to User & Customer Benefits if Trends is selected else show Modal
    const handleUnCNav = () => {
        var curTrend = JSON.parse(sessionStorage.getItem("trend"))
        if (curTrend)
            navigate(`/VPC/${curTrend.id}`)
        else
            setShow(true)
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            marginTop: '2rem',
            padding: 0
        }}>
            <h4>Actions</h4>
            {Trend ? (
                <button className="btn btn-lg btn-outline-secondary"
                        onClick={() => navigate("/trend")}
                        style={styles.actionBtn}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}
                    >TrendRadar <AiOutlineArrowRight size='1.75rem' style={{marginLeft: '0.5rem'}}/>
                    </div>
                </button>) : (<div></div>)}
            {RB ? (
                <button className="btn btn-lg btn-outline-secondary"
                        onClick={handleRefNav}
                        style={styles.actionBtn}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}
                    >References & Benchmarks <AiOutlineArrowRight size='1.75rem' style={{marginLeft: '0.5rem'}}/>
                    </div>
                </button>) : (<div></div>)}
            {BS ? (
                <button className="btn btn-lg btn-outline-secondary"
                        onClick={handleUnCNav}
                        style={styles.actionBtn}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}
                    >Benefits & Strategy<AiOutlineArrowRight size='1.75rem'
                                                             style={{
                                                                 marginLeft: '0.5rem',
                                                             }}/>
                    </div>
                </button>) : (<div></div>)}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Trend Selection Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>To see the desired content, please select a trend on the trend radar or the trend
                    list.</Modal.Body>
            </Modal>
        </div>);
}

export default Actions;

const styles = {
    actionBtn: {
        width: '22rem',
        display: "flex",
        justifyContent: "center",
        marginBottom: '1rem'
    }
}