/* ########################################### */
/* #         I M P O R T S                   # */
/* ########################################### */
// React Imports
import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
// Images
import logo from '../Images/Logo.png';
// Website Services
import {isLecturer, isStudent, isLoggedIn} from "../HelpFunctions";

/* ########################################### */
/* #  C L A S S   D E F I N I T I O N        # */
/* ########################################### */
class NavBar extends React.Component {
   
    render() {
        return (
            <Navbar bg="dark" className='m-auto' variant="dark">
                <Navbar.Brand href={sessionStorage.getItem('User') === null ? '\\' : '#home'} className="m-auto">
                    <img
                        src={logo}
                        width="140"
                        className="d-inline-block align-top"
                        alt="MyGrades"
                    />
                </Navbar.Brand>

                {/* Display the actual elements if user is logged in */}
                {isLoggedIn() ?
                    <Nav className="mr-auto">
                        <Nav.Link><Link to="/home">Home</Link></Nav.Link>
                        {isStudent() ? <Nav.Link><Link to="/RegisterCourse">Enroll to Course</Link></Nav.Link> : null}
                        {isStudent() ? <Nav.Link><Link to="/StudentCourses">Grades</Link></Nav.Link> : null}
                        {isLecturer() ? <Nav.Link><Link to="/NewCourse">New Course</Link></Nav.Link> : null}
                        {isLecturer() ? <Nav.Link><Link to="/LecturerCourses">Lecturer Courses</Link></Nav.Link> : null}
                        <Nav.Link><Link to="/Reports">Reports</Link></Nav.Link>
                        <Nav.Link><Link to="/About">About</Link></Nav.Link>
                        <Nav.Link><Link to="/" onClick={() => sessionStorage.clear()}>Logout</Link></Nav.Link>
                    </Nav>
                    :
                    null
                }
            </Navbar>
        );
    }
}

export default withRouter(NavBar);
