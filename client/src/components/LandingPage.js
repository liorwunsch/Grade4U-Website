/* ########################################### */
/* #         I M P O R T S                   # */
/* ########################################### */
// Import React Elements
import React from 'react';
import {withRouter} from 'react-router-dom';
import {Container, Card} from 'react-bootstrap';

// Import Components
import Login from './Login';

/* ########################################### */
/* #  C L A S S   D E F I N I T I O N        # */
/* ########################################### */
/*  This is the landing page of our web application
*   First page which load when a user enter the site.
*/
class LandingPage extends React.Component {

    constructor(props) {
        super(props);
        sessionStorage.clear();
    }

    render() {
        return (
            <div>
                <Container style={{marginTop: '1rem'}}>
                    <Card style={{background: 'rgba(252, 252, 252, 0.6)', borderRadius: 20}}>
                        <Card.Body>
                            <center>
                                <Login/>
                            </center>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}

export default withRouter(LandingPage);
