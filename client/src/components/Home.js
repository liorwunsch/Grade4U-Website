/* ########################################### */
/* #         I M P O R T S                   # */
/* ########################################### */
import React from "react";
import Card from "react-bootstrap/Card";
import { isLecturer, isStudent } from "../HelpFunctions";

/* ########################################### */
/* #  C L A S S   D E F I N I T I O N        # */
/* ########################################### */
export default function Home() {
    return (
        <div>
            <center>
                <Card style={{width: '40rem' , marginTop: '3rem',background: 'rgba(252, 252, 252, 0.6)'}} >
                    <Card.Body>
                        <Card.Text >
                            <h1><b>Hey {JSON.parse(sessionStorage.getItem('User')).UserName}!</b></h1>
                            {isLecturer() ? <h2>Many students to grade today, Mr Lecturer :)</h2> : null }
                            {isStudent() ? <h2>Good luck in your exams dear student :)</h2> : null }
                        </Card.Text>
                    </Card.Body>
                </Card>
            </center>
        </div>
    )
}
