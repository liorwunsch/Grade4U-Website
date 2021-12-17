/* ########################################### */
/* #         I M P O R T S                   # */
/* ########################################### */
import React from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

/* ########################################### */
/* #  C L A S S   D E F I N I T I O N        # */
/* ########################################### */
class NewCourse extends React.Component {

    constructor(props) 
    {
      super(props);
      
        this.state = {
            CourseName: '',
            CourseDescription: '',
            CreditScore: 2,
        }
    }

    createNewCourse = async (e) => {
        e.preventDefault();
        // Data Validation
        let userDetails = JSON.parse(sessionStorage.getItem('User'));
        console.log("User Data: " + userDetails);
        console.log("LecturerId: " + userDetails.UserId);
        console.log("Course Name: " + this.state.CourseName);
        console.log("Description: " + this.state.CourseDescription);
        console.log("Credit Score: " + this.state.CreditScore);

        // Create The Server 'POST' Request 
        console.log("Requesting Create New Course");
        const requestMsg = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    title: 'CreateCourse',
                    LecturerId: userDetails.UserId,
                    CourseName: this.state.CourseName,
                    Description: this.state.CourseDescription,
                    Credits: this.state.CreditScore,
                })
        };

        // Wait for server response
        const response = await fetch('/CreateCourse', requestMsg);
        if (!response.ok) {
            alert('Could not create new course, please try again later');
            return;
        }
        else
        {
            alert("Course added successfully!");
            this.setState({CourseName: ''});
            this.setState({CourseDescription: ''});
            this.setState({CreditScore: 2});
        }
        
    };

    render() {
        return (
            <Form className="container-fluid contact-info-container" onSubmit={this.createNewCourse}>
                <center>
                    <h2 className="mb-3">Course Information</h2>
                    {/* Course Name */}
                    <Form.Group controlId="coCourseName">
                        <Form.Label>Course Name</Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="Course Name"
                            value={this.state.CourseName}
                            onChange={e => this.setState({CourseName: e.target.value})}
                            required
                        />
                    </Form.Group>

                    {/* Course Description */}
                    <Form.Group controlId="coDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            type="text"
                            name="formDescription"
                            placeholder="Description"
                            value={this.state.CourseDescription}
                            onChange={e => this.setState({CourseDescription: e.target.value})}
                            required
                            />
                    </Form.Group>

                    {/* Credit Score */}
                    <Form.Group controlId="coCreditScore">
                        <Form.Label>Credit Score</Form.Label>
                        <Form.Control 
                            as="select"
                            onChange={e => this.setState({CreditScore: e.target.value})}
                            value={this.state.CreditScore}
                        >
                            <option>2</option>
                            <option>2.5</option>
                            <option>3</option>
                            <option>3.5</option>
                            <option>4</option>
                            <option>4.5</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>

                    {/* Add New Course */}
                    <Button variant="primary" type="submit">
                        Add Course
                    </Button>
                </center>
            </Form>
        );
    }
    
}

export default NewCourse;
