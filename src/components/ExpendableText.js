import React, {useEffect, useRef, useState} from 'react';
import {Button, Card} from "react-bootstrap";


function ExpendableText({maxHeight, children, MAX_POSSIBLE_HEIGHT}) {
    // use a ref to identify if the text parent's height is greater than your limit
    const ref = useRef();
    const [shouldShowExpand, setShouldShowExpand] = useState(false);
    const [expanded, setExpanded] = useState(true);

    useEffect(() => {
        if (ref.current.scrollHeight > maxHeight) {
            setShouldShowExpand(true);
            setExpanded(false);
        }
    }, [maxHeight]);
    return (
        <Card style={styles.cardText} ref={ref}>
            <div
                className="inner"
                style={{maxHeight: expanded ? MAX_POSSIBLE_HEIGHT : maxHeight}}
            >
                {children}
            </div>
            {shouldShowExpand && (
                <button onClick={() => setExpanded(!expanded)}
                        style={styles.cardButton}>
                    <div style={styles.buttonText}>{(expanded) ? (<div>less</div>) : (<div>more</div>)}</div>
                </button>
            )}
        </Card>);
}

export default ExpendableText;

const styles = {
    cardText: {
        overflow: 'hidden',
        transition: 'max-height 2s',
        borderWidth: 0,
    },
    cardButton: {
        border: 'rgba(255,255,255,0)',
        backgroundColor: 'rgba(255,255,255,0)',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.3),rgba(255,255,255,1))',
        borderRadius: 0,
        width: '100%',
        boxShadow: '0 0 0 0rem rgba(238, 243, 253, 0.5) !important',

    },
    buttonText: {
        color: 'blue'
    }
}

