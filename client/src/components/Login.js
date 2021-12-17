/* ########################################### */
/* #         I M P O R T S                   # */
/* ########################################### */
import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import Button from "react-bootstrap/Button";
import { Container } from 'react-bootstrap';
import Form from "react-bootstrap/Form";

/* ########################################### */
/* #  C L A S S   D E F I N I T I O N        # */
/* ########################################### */
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            UserId: '',
            UserName: '',
            Password: '',
            data: '',
            getData: false
        }
    }

    componentDidMount = async () => {
    };

    loginUser = async () => {
        const requestMsg = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    title: 'Login',
                    UserId: this.state.UserId,
                    Password: this.state.Password,
                })
        };
        const response = await fetch('/Login', requestMsg);
        console.log(response);
        if (!response.ok) {
            alert('Something Went Wrong');
            return;
        }
        let responseData = await response.json();
        responseData = JSON.parse(responseData.body);
        console.log(responseData)
        sessionStorage.setItem(
            'User',
            JSON.stringify({
                UserId: responseData.UserId,
                UserName: responseData.UserName,
                Permission: responseData.Permission,
            }));
        return (this.props.history.push('/home'));
    };

    render() {
        return (
            <div>
                <center>
                    <h1>Login</h1>
                    <Container style={{marginTop: '1rem', width: 500}}>

                    <Form>
                        <Form.Group controlId="fID">
                            <Form.Label>UserId</Form.Label>
                            <Form.Control
                                placeholder="UserId"
                                value={this.state.UserId}
                                onChange={e => this.setState({UserId: e.target.value})}
                                required/>
                        </Form.Group>

                        <Form.Group controlId="fPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={this.state.Password}
                                onChange={e => this.setState({Password: e.target.value})}
                                required/>
                        </Form.Group>
                        <Button onClick={this.loginUser} style={{marginRight: "25px"}}>Login</Button>
                        <Link to="/Register">Signup</Link>
                    </Form>
                    </Container>
                </center>
            </div>
        );
    }
}

export default withRouter(Login);
