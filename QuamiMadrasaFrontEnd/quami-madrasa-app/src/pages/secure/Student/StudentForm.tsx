import React, { Component } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import studentService from '../../../services/student.service';

class StudentForm extends Component<any,any> {

    constructor(props: any) {
        super(props);
        this.state ={
            ClassList : []
        };

        this.getClassList();
    }

    getClassList() {
        studentService.getAllClasses().then(resp => {
            this.setState({ClassList:resp.data});
        });
    }

    render() {
        return (
            <>
                <Container>
                    <Row>
                        <Col md={6} >
                            <Form>
                                <Form.Group className="mb-3" controlId="formClassType">
                                    <Form.Label>Class</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option>Please Select </option>
                                        {
                                            this.state.ClassList.map((v:any,i:number)=>{
                                                return <option value={v.id}>{v.name}</option>
                                            })
                                        }
                                    
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Check me out" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>

                </Container>
            </>
        );
    }
}

export default StudentForm;