import React, {useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import Account from "./Account";
import Sidebar from "../components/Sidebar";
import TrendDataService from "../services/trend_service";
import LoginError from "../services/LoginError";
import {Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";


function ReferenceSystem() {
    const {id} = useParams();
    let navigate = useNavigate();

    const [references, setReferences] = useState(false);

    React.useEffect(() => {
        TrendDataService.getReference(id)
            .then(response => {
                setReferences(response.data);
                console.log(response.data);
            })
            .catch(e => {
                LoginError(navigate, e)
            });
    }, [])

    const renderTable = () => {
        return references.map((reference, index) => {
            const {id, rproduct, rsystemelements, usabilityattributes} = reference;
            return (
                <tr key={id}>
                    <td>{rproduct}</td>
                    <td>{rsystemelements}</td>
                    <td>{usabilityattributes}</td>
                </tr>
            )
        })
    }


    return (
        <div style={styles.mainContainer}>
            <Account/>
            <Sidebar/>
            <div>
                {references.length > 0 ? (
                    <div>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Reference Product</th>
                                <th>Reference System Elements</th>
                                <th>UX/Usability Attributes</th>
                                <th>Explanatory Picture or Drawing</th>
                            </tr>
                            </thead>
                            <tbody>
                            {renderTable()}
                            </tbody>
                        </Table>

                        <Button>
                            <Link to={"/RS/add/" + id} style={{'color': 'white', textDecoration: 'none'}}>Add</Link>
                        </Button>
                    </div>
                ) : (
                    <div>
                        <p>No References yet...</p>
                        <Button>Add</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReferenceSystem;

const styles = {
    mainContainer: {
        borderRadius: 10,
        width: "100%",
        // height: "100%",
        backgroundColor: "white",
        paddingLeft: "10%",
        paddingBottom: 5,
        paddingTop: 5,
        paddingRight: 5,
    }
};