import React, {useState} from 'react';
import {Form} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import TrendService from "../services/trend_service";
import LoginError from "../services/LoginError";

function StrategicPositioning({unsavedChangesSP, setUnsavedChangesSP}) {
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
                if (response.data[0])
                    setStratPos(response.data[0])
                else setStratPos("")
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
        setUnsavedChangesSP(false);
    }

    React.useEffect(() => {
        getStratPos(trendID);
    }, [])

    const handleInputChange = event => {
        const {name, value} = event.target;
        setStratPos({...stratPos, [name]: value});
        setUnsavedChangesSP(true);
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
                                  style={{borderRadius: '1.078rem', height: '15rem', marginBottom: '1rem'}}
                    ></Form.Control>
                </Form.Group>
            </Form>
            <div style={{display: "flex", justifyContent: "center"}}>
                <button className="btn btn-primary" onClick={onSave}
                        disabled={!unsavedChangesSP}>Save
                </button>
            </div>
        </div>
    );
}

export default StrategicPositioning;