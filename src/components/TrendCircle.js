import React from 'react';

export default function TrendCircle({radius,color,pos}){
    console.log(radius,color);
    return (
        <div className="border-dark"
            style={{
            'width': `${radius}%`,
            'background': `${color}`,
            'aspectRatio':1,
            'borderRadius': '100%',
            'zIndex' : `${pos}`,
            'position':'absolute',
            'borderStyle':'solid'

        }}>
        </div>
    )
}