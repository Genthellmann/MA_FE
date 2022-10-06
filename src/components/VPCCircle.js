import React from 'react';
import {RiEmotionHappyLine, RiEmotionUnhappyLine} from "react-icons/ri";
import {BsListCheck} from "react-icons/bs";

export default function VPCCircle({radius, color, pos}) {

    // const onDragOver = e => {
    //     console.log("drag")
    //     e.preventDefault();
    // }
    //
    // const onDrop = (e) => {
    //     let id = e.dataTransfer.getData("id")
    //     console.log(e)
    // }

    return (
        <div className="border-dark"
            // onDragOver={(e) => onDragOver(e)}
            // onDrop={(e) => onDrop(e)}
             style={{
                 width: `${radius}%`,
                 background: `${color}`,
                 aspectRatio: 1,
                 borderRadius: '100%',
                 zIndex: `${pos}`,
                 position: 'absolute',
                 borderStyle: 'solid',
                 borderWidth: '0.1px',
                 borderColor: 'red',
                 display: "flex",
                 justifyContent: "center",
                 alignItems: "center",

             }}>
            <div style={{
                position: 'absolute',
                marginBottom: '50%',
                marginRight: '25%',
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                width: '20%',
                height: '25%'
            }}>
                <RiEmotionHappyLine size={'100%'}></RiEmotionHappyLine>
                <div style={{width: '100%', display: "flex", justifyContent: "center"}}>
                    <strong>Gains</strong>
                </div>
            </div>

            <div style={{
                position: 'absolute',
                marginTop: '50%',
                marginRight: '25%',
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                width: '20%',
                height: '25%'
            }}>
                <RiEmotionUnhappyLine
                    size={'100%'}
                    // style={{
                    //     width: '90%',
                    //     aspectRatio: 1,
                    //     position: 'absolute',
                    // }}
                >></RiEmotionUnhappyLine>
                <div style={{width: '100%', display: "flex", justifyContent: "center", fontSize: '100%'}}>
                    <strong>Pains</strong>
                </div>
            </div>
            <div style={{
                position: 'absolute',
                marginLeft: '50%',
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                width: '20%',
                height: '25%'
            }}>
                <BsListCheck size={'100%'}></BsListCheck>
                <div style={{width: '100%', display: "flex", justifyContent: "center"}}>
                    <strong>Jobs</strong></div>
            </div>
        </div>
    )
}