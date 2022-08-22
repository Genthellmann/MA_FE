import React from 'react';

export default function TrendCircle({radius, color, pos}) {

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
                 'width': `${radius}%`,
                 'background': `${color}`,
                 'aspectRatio': 1,
                 'borderRadius': '100%',
                 'zIndex': `${pos}`,
                 'position': 'absolute',
                 'borderStyle': 'solid'

             }}>
        </div>
    )
}