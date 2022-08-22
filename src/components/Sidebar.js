import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import '../index.css'

const Sidebar = props => {
    return (
        <div>
            <Nav className="bg-dark sidebar" style={styles.sidebarBG}>
                <div style={{'width': '100px', 'height': '300px'}}>
                    {/*<Nav>*/}
                    <Navbar.Brand className='navbar-brand' href="/trend"
                                  style={styles.sidebarBrand}>Porsche</Navbar.Brand>
                    {/*</Nav>*/}
                    <Nav.Item>
                        <Nav.Link href="/trend" style={styles.sidebarItem}>Trends</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/add" style={styles.sidebarItem}>Add</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/welcome" style={styles.sidebarItem}>Projects</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/vpa/1" style={styles.sidebarItem}>Vpa</Nav.Link>
                    </Nav.Item>
                </div>
            </Nav>
        </div>
    );
};

const styles = {
    sidebarBG: {
        position: 'fixed',
        justifyItems: 'center',
        height: '300px',
        width: '100px',
        left: '1vw',
        borderRadius: '15px',
        marginTop: '15px',
    },
    sidebarBrand: {
        color: 'white',
        position: 'relative',
        marginLeft: '10px',
        marginTop: '20px'
    },
    sidebarItem: {
        color: "white"
    }

}
// const Sidebar = withRouter(Side);
export default Sidebar