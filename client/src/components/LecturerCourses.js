/* ########################################### */
/* #         I M P O R T S                   # */
/* ########################################### */
import React from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

/* ########################################### */
/* #  C L A S S   D E F I N I T I O N        # */
/* ########################################### */
class LecturerCourses extends React.Component {

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
        let userDetails = JSON.parse(sessionStorage.getItem('User'));
        const setState = this.setState.bind(this);
        const requestMsg = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    title: "GetLecturerCourses",
                    LecturerId: userDetails.UserId,
                })
        };
        await fetch('/GetLecturerCourses', requestMsg)
            .then((res) => res.json())
            .then(function (response) {
                setState({coursesResponse: response})
                console.log(response)
            });
    };

    getCourseStudents = async (e) => {
        e.preventDefault();
        // Data Validation
        if (sessionStorage.getItem('User') === null) {
            alert("You have been disconnected...");
            this.props.history.push('/');
            return;
        }
        if (this.state.SelectedCourse === null) {
            alert("Please select a course...");
            return;
        }
        this.props.history.push('/CourseParticipants/'+this.state.SelectedCourse.CourseName);
    };

    render() {
        return (
            <Form className="container-fluid contact-info-container" onSubmit={this.getCourseStudents}>
                <center>
                    <h2 className="mb-3">Lecturer Courses</h2>
                    {this.state.coursesResponse === null ?
                    <div>Loading Data From Server</div>
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

                    {/* StudentsCount */}
                    <Form.Group controlId="coStudentsCount">
                        <Form.Label>No. of Students</Form.Label>
                        {this.state.SelectedCourse === null ?
                            <Form.Control type="text" value="---" readOnly />
                            :
                            <Form.Control type="text" value={this.state.SelectedCourse.StudentsCount} readOnly />
                        }
                    </Form.Group>

                    {/* View Course Students */}
                    <Button variant="primary" type="submit">
                        View Course Students
                    </Button>
                </center>           
            </Form>
        );
    }
}

export default LecturerCourses;
