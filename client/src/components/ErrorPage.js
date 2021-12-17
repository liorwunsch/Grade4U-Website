/* ########################################### */
/* #         I M P O R T S                   # */
/* ########################################### */
import React from 'react';
import errorImage from '../Images/error404.jpg'

/* ########################################### */
/* #  C L A S S   D E F I N I T I O N        # */
/* ########################################### */
class ErrorPage extends React.Component {

  render() {
    return (
        <center>
            <h1>ERORR 404 - Page not found :/</h1>
            <br></br>
            <img src={errorImage} alt=''></img>
        </center>
      
    );
  }


}

export default ErrorPage;