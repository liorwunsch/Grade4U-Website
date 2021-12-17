/* ########################################### */
/* #         I M P O R T S                   # */
/* ########################################### */
import React from 'react'
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

/* ########################################### */
/* #  C L A S S   D E F I N I T I O N        # */
/* ########################################### */
class CourseParticipants extends React.Component {

    constructor(props) 
    {
        super(props);
        this.state = {
            studentsResponse: null,
        }

        this.onClick = this.bind
    }

    componentDidMount = async () => {
        const setState = this.setState.bind(this);
        /* TODO: Perhaps add validation that this is the lecturer of the course... */
        // let userDetails = JSON.parse(sessionStorage.getItem('User'));
        
        const requestMsg = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    title: "GetCourseStudents",
                    CourseName: String(this.props.match.params.name),
                })
        };

        await fetch('/GetCourseStudents',requestMsg)
            .then((res) => res.json())
            .then(function (response) {
                setState({studentsResponse: response})
                console.log(response)
            });
    };

    // When this function is called, the lecturer updates the student grade
    editGrade = async (e) => {
        e.preventDefault();
        let studentKey = e.target.value;
        let studentId = this.state.studentsResponse[studentKey].StudentId;
        let courseName = String(this.props.match.params.name);
        let newGrade = parseInt(this.state.studentsResponse[studentKey].Grade);
        
        console.log("Editing student Id: " + studentId);
        console.log("New Grade is: " + newGrade);

        // Data Validation
        if (sessionStorage.getItem('User') === null) {
            alert("You have been disconnected...");
            this.props.history.push('/');
            return;
        }

        if (isNaN(this.state.studentsResponse[studentKey].Grade)) {
            alert("Grade ,ust be a number..")
            return;
        }
        if (newGrade < 0) {
            alert("Grade must be a positive number :(");
            return;
        }
        if (newGrade > 100) {
            alert("Grade can not exceed 100 :(");
            return;
        }

         // Create The Server 'POST' Request 
         console.log("Requesting Editing Grade");
         const requestMsg = {
             method: 'POST',
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify(
                 {
                     title: 'SetGrade',
                     Grade: newGrade,
                     CourseName: courseName,
                     StudentId: studentId,
                 })
         };
 
         // Wait for server response
         const response = await fetch('/SetGrade', requestMsg);
         console.log(response)
         if (!response.ok) {
             alert('Something went wrong, could not edit grade...');
             return;
         }
         else
         {
             alert("Grade edited successfully!");
             return;
         }
    };

    render() {
        return (
            <center>
                <h1>{String(this.props.match.params.name)}</h1>

                {/* Loading Message */}
                {this.state.studentsResponse === null ?
                <h1>Loading Data From Server...</h1> 
                : null
                }

                {/* Show a list of students */}
                <Form>
                {
                    this.state.studentsResponse === null ? null
                    :
                    this.state.studentsResponse.map((student, key) => {
                        return(
                            <Form.Group as={Row} key={key} controlId={key}>
                                <Col>
                                    <Form.Control type="text" defaultValue={"Student Id: " + student.StudentId} readOnly/>
                                </Col>
                                <Col>
                                    <Form.Control type="text" defaultValue="Grade" readOnly/>
                                </Col>
                                <Col>
                                    <Form.Control
                                    value={this.state.studentsResponse[key].Grade}
                                    onChange={e => {
                                        // 1. Make a shallow copy of the items
                                        let students = [...this.state.studentsResponse];
                                        // 2. Make a shallow copy of the item you want to mutate
                                        let student = {...students[key]};
                                        // 3. Replace the property you're intested in
                                        student.Grade = e.target.value;
                                        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                                        students[key] = student;
                                        // 5. Set the state to our new copy
                                        this.setState({studentsResponse: students});
                                    }}
                                    required/>
                                </Col>
                                <Col>
                                    <Button value={key} onClick={this.editGrade}>
                                        Edit Grade
                                    </Button>
                                </Col>
                            </Form.Group>
                        );
                    })
                }
                </Form>
                
            </center>
            
        );
    }
}

export default CourseParticipants;
