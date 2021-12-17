/* ########################################### */
/* #         I M P O R T S                   # */
/* ########################################### */
import React from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

/* ########################################### */
/* #  C L A S S   D E F I N I T I O N        # */
/* ########################################### */
class RegisterCourse extends React.Component {

    constructor(props) 
    {
      super(props);
      
        this.state = {
            coursesResponse: null,
            SelectedCourse: null,

        }
    }

    // This function is activated upon mount of the component
    // It requests a list of courses from the server, in order to display for the user
    componentDidMount = async () => {
        const setState = this.setState.bind(this);
        const requestMsg = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    title: "GetCourses",
                })
        };

        await fetch('/GetCourses', requestMsg)
            .then((res) => res.json())
            .then(function (response) {
                setState({coursesResponse: response})
                console.log(response)
            });
    };

    enrollCourse = async (e) => {
        e.preventDefault();
        // Data Validation
        if (sessionStorage.getItem('User') === null)
        {
            alert("You have been disconnected...");
            this.props.history.push('/');
            return;
        }
        if (this.state.SelectedCourse === null) {
            alert("Please select a course...");
            return;
        }

        let userDetails = JSON.parse(sessionStorage.getItem('User'));
        console.log("Course Name: " + this.state.SelectedCourse.CourseName);
        console.log("Student ID: " + userDetails.UserId)

        // Create The Server 'POST' Request 
        console.log("Requesting Enroll In Course");
        const requestMsg = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    title: 'Enroll',
                    CourseName: this.state.SelectedCourse.CourseName,
                    StudentId: userDetails.UserId,
                })
        };

        // Wait for server response
        const response = await fetch('/Enroll', requestMsg);
        console.log(response)
        console.log(requestMsg)
        if (!response.ok) {
            alert('Could not enroll in course, please try again later');
            return;
        }
        else
        {
            alert("Enrolled successfully!");
            this.setState({SelectedCourse: null});
            this.props.history.push('/home');
            return;
        }
        
    };

    render() {
        return (
            <Form className="container-fluid contact-info-container" onSubmit={this.enrollCourse}>
                <center>
                    <h2 className="mb-3">Enroll to Course</h2>
                    {this.state.coursesResponse === null ?
                    <h1>Loading Data From Server</h1>
                    : null}
                    {/* Courses List  */}
                    <Form.Group controlId="coCourses">
                        <Form.Label>Courses</Form.Label>
                        <Form.Control 
                            as="select"
                            onChange={e => this.setState({SelectedCourse: JSON.parse(e.target.value)})}
                        >
                        <option>---</option>
                        {
                            this.state.coursesResponse === null ? null
                            :
                            this.state.coursesResponse.map((course, key) => {
                                return(
                                    <option key={key} value={JSON.stringify(course)}>{course.CourseName}</option> 
                                );
                            })
                        }
                        </Form.Control>
                    </Form.Group>

                    {/* Lecturer Name */}
                    <Form.Group controlId="coLecturerName">
                        <Form.Label>Lecturer Name</Form.Label>
                        {this.state.SelectedCourse === null ?
                            <Form.Control type="text" value="---" readOnly />
                            :
                            <Form.Control type="text" value={this.state.SelectedCourse.LecturerName} readOnly />
                        }
                    </Form.Group>
                    {/* Credits */}
                    <Form.Group controlId="coCredits">
                        <Form.Label>Credits</Form.Label>
                        {this.state.SelectedCourse === null ?
                            <Form.Control type="text" value="---" readOnly />
                            :
                            <Form.Control type="text" value={this.state.SelectedCourse.Credits} readOnly />
                        }
                    </Form.Group>
                    {/* Description */}
                    <Form.Group controlId="coDescription">
                        <Form.Label>Description</Form.Label>
                        {this.state.SelectedCourse === null ?
                            <Form.Control type="text" value="---" readOnly />
                            :
                            <Form.Control type="text" value={this.state.SelectedCourse.Description} readOnly />
                        }
                    </Form.Group>
                    {/* Add New Course */}
                    <Button variant="primary" type="submit">
                        Enroll
                    </Button>
                </center>
            </Form>
        );
    }
    
}

export default RegisterCourse;
