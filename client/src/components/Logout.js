/* ########################################### */
/* #         I M P O R T S                   # */
/* ########################################### */
import React from 'react'
import {withRouter} from 'react-router-dom';

/* ########################################### */
/* #  C L A S S   D E F I N I T I O N        # */
/* ########################################### */
class Logout extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount = async () => {
        sessionStorage.clear();
        this.props.history.push('/');
    };

    render() {
    }
}

export default withRouter(Logout);
