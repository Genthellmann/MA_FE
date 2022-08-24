import React from 'react';
import {Form} from "react-bootstrap";

function StrategicPositioning(props) {
    return (
        <div style={{paddingTop: '30px', paddingBottom: '30px'}}>
            <h2>Strategic Positioning</h2>
            <Form>
                <Form.Group>
                    <Form.Control as="textarea"></Form.Control>
                </Form.Group>
            </Form>
        </div>
    );
}

export default StrategicPositioning;