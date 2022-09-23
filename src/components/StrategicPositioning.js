import React, {useState} from 'react';
import {Form} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import TrendService from "../services/trend_service";
import LoginError from "../services/LoginError";

function StrategicPositioning(props) {
    const navigate = useNavigate();
    const {trendID} = useParams();

    const initPos = {
        trendID: trendID,
        content: "",
    }

    const [stratPos, setStratPos] = useState(initPos);

    const getStratPos = id => {
        TrendService.getStratPos(id)
            .then(response => {
                if (stratPos.data[0])
                    setStratPos(response.data[0])
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
                LoginError(navigate, e)
            })
    }

    const saveStratPos = () => {
        let strategicPos = {
            trendID: trendID,
            content: stratPos.content,
        }
        TrendService.updateStratPos(strategicPos)
            .then(response => {
                console.log(response.data)
            })
            .catch(e => {
                LoginError(navigate, e);
            })
    }

    React.useEffect(() => {
        getStratPos(trendID);
    }, [])

    const handleInputChange = event => {
        const {name, value} = event.target;
        setStratPos({...stratPos, [name]: value});
        console.log(stratPos.trendID)
    };

    const onSave = () => {
        saveStratPos()
    }


    return (
        <div style={{paddingTop: '30px', paddingBottom: '30px'}}>
            <h2>Strategic Positioning</h2>
            <Form>
                <Form.Group>
                    <Form.Control as="textarea"
                                  type="text"
                                  className="form-control"
                                  id="description"
                                  name="content"
                                  value={stratPos.content}
                                  onChange={handleInputChange}
                                  style={{borderRadius: '1.078rem', height: '20vh', marginBottom: '1rem'}}
                    ></Form.Control>
                </Form.Group>
            </Form>
            <div style={{display: "flex", justifyContent: "center"}}>
                <button className="btn btn-primary" onClick={onSave}>Save</button>
            </div>
        </div>
    );
}

export default StrategicPositioning;