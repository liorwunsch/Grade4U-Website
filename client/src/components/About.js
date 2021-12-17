/* ########################################### */
/* #         I M P O R T S                   # */
/* ########################################### */
import React from "react";
import Card from "react-bootstrap/Card";

/* ########################################### */
/* #  C L A S S   D E F I N I T I O N        # */
/* ########################################### */
export default function About() {
    return (
        <div>
            <center>
                <Card style={{width: '30rem', marginTop: '3rem'}} >
                    <Card.Body>
                        <Card.Text >
                            <h4><b>Website by Raviv and Lior</b></h4>
                            <br></br>
                            Web Technologies course, Spring 2021, Ort Braude
                            <br></br><br></br>
                            Client side written in ReactJS
                            <br></br>
                            Server side written in Node.js, Express, MySQL Database
                        </Card.Text>
                    </Card.Body>
                </Card>
            </center>
        </div>
    )
}
