import React from 'react';

export default function TrendRadar({radius,color,position}){
    console.log(radius,color);
    return (
        <div style={{
            'background': `${color}`,
            'width': `${radius}vw`,
            'height': `${radius}vw`,
            'borderRadius': '100%',
            'display': 'flex',
            'alignItems': 'center',
            'justifyContent': 'center',
            'color': 'white',
            'position': 'absolute',
            'zIndex' : `${position}`,
            'border': '0.3vw solid black'
        }}>
            <div >
                <h2>

                </h2>
                <h3>

                </h3>
            </div>
        </div>
    )
}